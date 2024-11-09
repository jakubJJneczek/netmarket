import { Badge, IconButton, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart({ cartItems }) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <IconButton aria-label="cart" sx={{ color: "#FFF" }}>
      <StyledBadge badgeContent={cartItems} color="black">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}

export default Cart;
