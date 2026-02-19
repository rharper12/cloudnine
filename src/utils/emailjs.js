export const buildRentalLineItems = cartList => {
  if (!Array.isArray(cartList) || cartList.length === 0) return "";
  return cartList
    .map(item => `${item?.name || "Rental"} (qty: ${item?.qty || 1})`)
    .join(", ");
};

export const sendInquiryEmail = async ({ inquiry, cartList, totalLabel }) => {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inquiry, cartList, totalLabel })
  });

  if (!response.ok) {
    let message = "Failed to send inquiry.";
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
};
