import { useState } from "react"
import styles from "./Footer.module.css"
import twitterIcon from "../../assets/icons/twitter-original.svg"
import facebookIcon from "../../assets/icons/logo-facebook.svg"
import instagramIcon from "../../assets/icons/logo-instagram.svg"

export default function Footer() {
    const [formState, setFormState] = useState({
        email: "",
        value: "",
        status: false,
    })

    function handleValue(event) {
        setFormState({ ...formState, value: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        setFormState({
            email: formState.value,
            value: "",
            status: true,
        })
    }

    return (
        <footer className={styles.footer}>
                <div>
                    <p>BE PART OF THETEE!</p>
                    <p>Enjoy 10% off your first purchase when you sign up!</p>
                </div>
                <div>
                    {formState.status ? (
                        <div>
                            <p>Confirm your subscription by clicking on the link you will receive at <b>{formState.email}</b> and start receiving our newsletter!</p>
                        </div>
                    ) : (
                        <form className={styles.form} action="#" onSubmit={handleSubmit}>
                            <input className={styles.input} type="email" placeholder="Enter your email" value={formState.value} onChange={handleValue} />
                            <button className={styles.submit} type="submit">Subscribe</button>
                        </form>
                    )}
                </div>
            <div className={styles["links-container"]}>
                <a href="#"><img className={styles.icon} src={twitterIcon} alt="Twitter logo" /></a>
                <a href="#"><img className={styles.icon} src={facebookIcon} alt="Facebook logo" /></a>
                <a href="#"><img className={styles.icon} src={instagramIcon} alt="Instagram logo" /></a>
            </div>
        </footer>
    )
}