import styles from "./Header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                THETEE
            </div>
            <nav>
                <ul className={styles["links-list"]}>
                    <li><a href="#">Home</a></li>
                    <li><a href="">Shop</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
            <div>
                ShopIcon
            </div>
        </header>
    )
}