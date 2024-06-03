import { Link } from "react-router-dom"
import styles from "./Header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                THETEE
            </div>
            <nav>
                <ul className={styles["links-list"]}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="about">Home</Link></li>
                    <li><Link href="">Shop</Link></li>
                    <li><Link href="">Contact</Link></li>
                </ul>
            </nav>
            <div>
                ShopIcon
            </div>
        </header>
    )
}