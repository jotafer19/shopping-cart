import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import styles from "./Header.module.css"
import { useState } from "react"
import shoppingCart from "../../assets/icons/shopping-cart.svg"

export default function Header({ cartItems }) {
    const [isActive, setIsActive] = useState(0)

    const allItems = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)

    return (
        <header className={styles.header}>
            <div>
                THETEE
            </div>
            <nav>
                <ul className={styles["links-list"]}>
                    <li><Link className={`${styles.link} ${isActive === 0 && styles.active}`} to="/" onClick={() => setIsActive(0)}>Home</Link></li>
                    <li><Link className={`${styles.link} ${isActive === 1 && styles.active}`} to="about" onClick={() => setIsActive(1)}>About</Link></li>
                    <li><Link className={`${styles.link} ${isActive === 2 && styles.active}`} to="shop" onClick={() => setIsActive(2)}>Shop</Link></li>
                    <li><Link className={`${styles.link} ${isActive === 3 && styles.active}`} href="" onClick={() => setIsActive(3)}>Contact</Link></li>
                </ul>
            </nav>
            <div>
                <Link className={`${styles.link} ${styles.checkout}`} onClick={() => setIsActive(null)} to="checkout">
                    <img src={shoppingCart} alt="Shopping cart icon" />
                    {allItems > 0 && <div>{allItems}</div>}
                </Link>
                
            </div>
        </header>
    )
}

Header.propTypes = {
    cartItems: PropTypes.array,
}