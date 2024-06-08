import styles from "./AddCart.module.css"
import PropTypes from "prop-types"

export default function AddCart({ confirmCart }) {
    return (
        <div className={`${styles.container} ${confirmCart ? styles.active : ""}`}>
            <div className={styles.message}>Item added to cart!</div>
            <div className={styles.bar}></div>
        </div>
        
    )
}

AddCart.propTypes = {
    confirmCart: PropTypes.bool
}