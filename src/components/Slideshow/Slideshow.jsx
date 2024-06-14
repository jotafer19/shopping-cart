import { useEffect, useState } from "react";
import slideImages from "../../data/images";
import styles from "./Slideshow.module.css";
import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";
import { Link } from "react-router-dom";

export default function Slideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex =
        activeIndex === slideImages.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(newIndex);
    }, 8000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  function handlePrevButton() {
    const newIndex =
      activeIndex === 0 ? slideImages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  }

  function handleNextButton() {
    const newIndex =
      activeIndex === slideImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  }

  return (
    <div className={styles.slideshow}>
      <div className={styles["slideshow-container"]}>
        {slideImages.map((slideImage, index) => {
          return (
            <div key={index} className={`${styles.slide} ${index === activeIndex ? styles.active : ""}`}>
              <div className={`${styles.text} ${index % 2 === 0 ? styles.rposition : styles.lposition}`}>
                {slideImage.text}
                <Link className={styles.link} to="/shop"><button>Go to the shop</button></Link>
                </div>
              <img
              className={styles.image}
                src={slideImage.imageURL}
                alt="Home banner"
                key={index}
              />
            </div>
          );
        })}
      </div>
      <div className={styles["buttons-container"]}>
        <button className={styles.left} onClick={handlePrevButton}>
          <img src={leftArrow} alt="Previous image" />
        </button>
        <button className={styles.right} onClick={handleNextButton}>
          <img src={rightArrow} alt="Next image" />
        </button>
      </div>
    </div>
  );
}
