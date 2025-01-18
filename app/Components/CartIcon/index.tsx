import React from "react";
import { parseCookies } from "nookies"; // To parse cookies
import styles from "./CartIcon.module.css"; // Cart icon styles (you'll create this)

type CartItem = {
  id: number;
  quantity: number;
};

const CartIcon: React.FC = () => {
  const cookies = parseCookies();
  const cart: CartItem[] = cookies.cart ? JSON.parse(cookies.cart) : [];
  console.log(cart, "cart");
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.cartIcon}>
      <span className={styles.icon}>&#128722;</span> {/* Shopping cart icon */}
      {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
