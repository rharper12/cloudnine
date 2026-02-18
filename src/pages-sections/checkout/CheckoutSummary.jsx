import { Avatar, Box, Divider, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { useAppContext } from "contexts/AppContext";
import { FlexBox } from "components/flex-box";

const CheckoutSummary = () => {
  const { state } = useAppContext();
  const cartList = state.cart;

  return (
    <Card1>
      <Typography fontWeight="800" mb={2} color="warning.main">
        Inquiry Summary
      </Typography>

      <Box mb={2}>
        {cartList.map(item => (
          <FlexBox key={item.id} alignItems="center" gap={1.5} mb={1.5}>
            <Avatar
              variant="rounded"
              src={item.imgUrl}
              alt={item.name}
              sx={{
                width: 54,
                height: 54,
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                bgcolor: "rgba(8, 12, 18, 0.35)"
              }}
            />

            <Box>
              <Typography color="warning.main" fontWeight={900} lineHeight={1.2}>
                {item.name}
              </Typography>
              {item.qty > 1 && (
                <Typography color="grey.200" fontWeight={700} fontSize={13}>
                  Qty: {item.qty}
                </Typography>
              )}
            </Box>
          </FlexBox>
        ))}
      </Box>

      <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.25)" }} />
      <Typography color="grey.200" mt={2}>
        These are the rentals included in your inquiry.
      </Typography>
    </Card1>
  );
};

export default CheckoutSummary;
