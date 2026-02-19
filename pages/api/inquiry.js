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

    const validated = validateInquiry(inquiry);
    if (!validated.valid) {
      return res.status(400).json({ message: "Invalid form data.", errors: validated.errors });
    }

    const rentals = buildRentalLineItems(cartList);

    const serviceId = requiredEnv("EMAILJS_SERVICE_ID");
    const templateId = requiredEnv("EMAILJS_TEMPLATE_ID");
    const publicKey = requiredEnv("EMAILJS_PUBLIC_KEY");

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

    await axios.post(EMAILJS_ENDPOINT, payload, {
      headers: { "Content-Type": "application/json" }
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Internal server error" });
  }
}

