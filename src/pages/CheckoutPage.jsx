import styles from "../App.module.css"
import { useOutletContext } from "react-router-dom";
import CheckoutTable from "../components/checkout-summary/CheckoutTable";
import EmptyCart from "../components/empty-cart/EmptyCart";

export default function CheckoutPage() {
  const [cartItems] = useOutletContext()

  return (
    <div className={styles.screen}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <CheckoutTable />
      )}
    </div>
  );
}
