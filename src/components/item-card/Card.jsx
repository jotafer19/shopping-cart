import PropTypes from "prop-types"
import styles from "./Card.module.css"
import { useState } from "react"
import StarRating from "../star-rating/StarRating"

export default function Card({ item }) {
    const [value, setValue] = useState(1)

    function handleLessButton() {
        if (value <= 1) return;
        setValue(prevNumber => prevNumber - 1)
    }

    function handleMoreButton() {
        setValue(prevNumber => prevNumber + 1)
    }

    function handleSubmitItem(event) {
        event.preventDefault()
        setValue(1)
    }

    function handleInputChange(event) {
        setValue(event.target.value)
    }

    return (
        <div className={styles.item}>
            <div className={styles["image-container"]}>
                <img src={item.image} alt="Product image" />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{item.title}</div>
                <div>
                    <StarRating rating={Number(item.rating.rate)}/>
                    <span>({item.rating.count})</span>
                </div>
                <div>${item.price}</div>
            </div>
            <form className={styles.form} action="#" onSubmit={handleSubmitItem}>
                <div className={styles.count}>
                    <button className={styles["change-btn"]} onClick={handleLessButton} type="button">-</button>
                    <input type="number" value={value} onChange={handleInputChange} />
                    <button className={styles["change-btn"]} onClick={handleMoreButton} type="button">+</button>
                </div>
                <button className={styles["add-btn"]} type="submit">Add to card</button>
            </form>
        </div>
    )
}

Card.propTypes = {
    item: PropTypes.object,
}