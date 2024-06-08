import styles from "./CardContainer.module.css"
import { useEffect, useState } from "react";
import Card from "../item-card/Card";
import AddCart from "../add-to-cart/AddCart";
import PropTypes from "prop-types";

export default function CardContainer({ data }) {
    const [filters, setFilters] = useState({ category: "all", sort: "recommended"})
    const [confirmCart, setConfirmCart] = useState(false)
    const [filteredData, setFilteredData] = useState(data)
    
    useEffect(() => {
        let filtered = [...data];

        if (filters.category !== "all") {
            filtered = filtered.filter(item => item.category === filters.category);
        }

        if (filters.sort !== "recommended") {
            switch ( filters.sort) {
                case "a-z":
                    filtered.sort((a, b) => a.title.localeCompare(b.title))
                    break;
                case "z-a":
                    filtered.sort((a, b) => b.title.localeCompare(a.title))
                    break;
                case "low-high":
                    filtered.sort((a, b) => a.price - b.price)
                    break;
                case "high-low":
                    filtered.sort((a, b) => b.price - a.price)
                    break;
            }
        }

        setFilteredData(filtered)
    }, [filters, data])

    function handleMessageContainer() {
        if (confirmCart) return;
        setConfirmCart(true);
        setTimeout(() => {
            setConfirmCart(false)
        }, 4000)
    }

    function handleCategory(newCategory) {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: newCategory
        }))
    }

    function handleSortChange(event) {
        const sortBy = event.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            sort: sortBy
        }))
    }

    return (
        <div className={styles.shop}>
            <div className={styles.category}>
                <p>Categories</p>
                <ul>
                    <li><button onClick={() => handleCategory("all")}>All Products</button></li>
                    <li><button onClick={() => handleCategory("men's clothing")}>Men's Clothing</button></li>
                    <li><button onClick={() => handleCategory("jewelery")}>Jewelery</button></li>
                    <li><button onClick={() => handleCategory("electronics")}>Electronics</button></li>
                    <li><button onClick={() => handleCategory("women's clothing")}>Women's Clothing</button></li>
                </ul>
                <label htmlFor="sort-order">Sort by</label>
                <select name="sort-order" id="sort-order" onChange={handleSortChange}>
                    <option value="recommended">Recommended</option>
                    <option value="a-z">Alphabetical (A-Z)</option>
                    <option value="z-a">Alphabetical (Z-A)</option>
                    <option value="low-high">Price: low to high</option>
                    <option value="high-low">Price: high to low</option>
                </select>
            </div>
            <div className={styles.container}>
                <AddCart confirmCart={confirmCart} />
                {filteredData.map(item => <Card key={item.id} item={item} handleMessageContainer={handleMessageContainer} />)}
            </div>
        </div>
    )
}

CardContainer.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired
}