import axios from "axios";
import { buildRentalLineItems } from "utils/emailjs";
import { validateInquiry } from "utils/inquiryValidation";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const getEnv = name => process.env[name] || process.env[`NEXT_PUBLIC_${name}`];

const requiredEnv = name => {
  const value = getEnv(name);
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

const getEmailjsErrorDetail = error => {
  const status = error?.response?.status;
  const data = error?.response?.data;
  if (!status) return null;

  let detail = "";
  if (typeof data === "string") detail = data;
  else if (data && typeof data === "object") {
    if (typeof data.message === "string") detail = data.message;
    else if (typeof data.error === "string") detail = data.error;
    else {
      try {
        detail = JSON.stringify(data);
      } catch {
        detail = String(data);
      }
    }
  }

  return { status, detail };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const inquiry = body?.inquiry || {};
    const cartList = Array.isArray(body?.cartList) ? body.cartList : [];
    const totalLabel = body?.totalLabel || "";

    if (cartList.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Basic bot mitigation: ignore submissions that fill a hidden honeypot field.
    if (typeof inquiry?.website === "string" && inquiry.website.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const validated = validateInquiry(inquiry);
    if (!validated.valid) {
      return res.status(400).json({ message: "Invalid form data.", errors: validated.errors });
    }

    const rentals = buildRentalLineItems(cartList);

    const serviceId = requiredEnv("EMAILJS_SERVICE_ID");
    const templateId = requiredEnv("EMAILJS_TEMPLATE_ID");
    const publicKey = requiredEnv("EMAILJS_PUBLIC_KEY");
    // Never read private keys from NEXT_PUBLIC_ env vars.
    const privateKey = process.env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_ACCESS_TOKEN;

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        full_name: validated.data.fullName,
        preferred_contact: validated.data.preferredContact,
        phone: validated.data.phone || "",
        email: validated.data.email || "",
        city: validated.data.city,
        state: validated.data.state,
        event_date: validated.data.eventDate,
        event_time: validated.data.eventTime,
        rentals,
        total: totalLabel
      }
    };

    // EmailJS can be configured to require a private key for REST API requests.
    if (privateKey) payload.accessToken = privateKey;

    await axios.post(EMAILJS_ENDPOINT, payload, {
      headers: { "Content-Type": "application/json" }
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const emailjs = getEmailjsErrorDetail(error);
    if (emailjs) {
      const detailSuffix = emailjs.detail ? ` (${emailjs.detail})` : "";
      return res.status(502).json({
        message: `EmailJS request failed with status ${emailjs.status}. Check EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY (and EMAILJS_PRIVATE_KEY if required).${detailSuffix}`
      });
    }
    return res.status(500).json({ message: error?.message || "Internal server error" });
  }
}
