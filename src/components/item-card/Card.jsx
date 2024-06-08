import PropTypes from "prop-types"
import styles from "./Card.module.css"
import { useState } from "react"
import StarRating from "../star-rating/StarRating"
import { useOutletContext } from "react-router-dom"

export default function Card({ item, handleMessageContainer }) {
    const [value, setValue] = useState(1)
    const [cartItems, setCartItems] = useOutletContext()

    function handleAddItem(event, item) {
        event.preventDefault()
        handleMessageContainer()
        if (cartItems.some(cartItem => cartItem.id === item.id)) {
            const newCart = cartItems.map(cartItem => {
                if (cartItem.id === item.id) {
                    return { ...cartItem, count: cartItem.count + value };
                } else {
                    return cartItem;
                }
            })
            setCartItems(newCart);
        } else {
            setCartItems([
                ...cartItems,
                { id: item.id, name: item.title, image: item.image, count: value, price: item.price }
            ])
        }
    }

    function handleLessButton() {
        if (value <= 1) return;
        setValue(prevNumber => prevNumber - 1)
    }

    function handleMoreButton() {
        setValue(prevNumber => prevNumber + 1)
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
                <div className={styles.price}>${item.price}</div>
            </div>
            <form className={styles.form} action="#" onSubmit={(event) => handleAddItem(event, item)}>
                <div className={styles.count}>
                    <button className={styles["change-btn"]} onClick={handleLessButton} type="button">-</button>
                    <p>{value}</p>
                    <button className={styles["change-btn"]} onClick={handleMoreButton} type="button">+</button>
                </div>
                <button className={styles["add-btn"]} type="submit">Add to card</button>
            </form>
        </div>
    )
}

Card.propTypes = {
    item: PropTypes.object,
    handleMessageContainer: PropTypes.func,
}