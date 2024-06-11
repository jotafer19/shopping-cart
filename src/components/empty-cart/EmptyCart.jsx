import styles from "./EmptyCart.module.css"
import { Link } from "react-router-dom"

export default function EmptyCart() {
    return (
        <div className={styles.container}>
            <h2>YOUR CART IS EMPTY</h2>
            <Link className={styles.link} to="/shop"><button>Go to the shop</button></Link>
        </div>
    )
}