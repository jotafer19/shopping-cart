import styles from "./CardContainer.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../item-card/Card";
import AddCart from "../add-to-cart/AddCart";
import PropTypes from "prop-types";

export default function CardContainer({ data }) {
  const [filters, setFilters] = useState({
    category: "all",
    sort: "recommended",
    query: "",
  });
  const [confirmCart, setConfirmCart] = useState(false);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (filters.category !== "all") {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.sort !== "recommended") {
      switch (filters.sort) {
        case "a-z":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "z-a":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "low-high":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "high-low":
          filtered.sort((a, b) => b.price - a.price);
          break;
      }
    }

    if (filters.query !== "") {
      filtered = filtered.filter(item => item.title.toLowerCase().includes(filters.query.toLowerCase()))
    }

    return filtered;
  }, [filters, data]);

  useEffect(() => {
    if (confirmCart) {
      const timer = setTimeout(() => {
        setConfirmCart(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [confirmCart]);

  const handleCartConfirmation = useCallback(() => {
    if (!confirmCart) {
      setConfirmCart(true);
    }
  }, [confirmCart]);

  const handleCategoryChange = useCallback((newCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: newCategory,
    }));
  }, []);

  const handleSortChange = useCallback((event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: event.target.value,
    }));
  }, []);

  const handleSearch = useCallback((event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: event.target.value,
    }))
  })

  return (
    <div className={styles.shop}>
      <div className={styles.category}>
        <ul>
          <li>
            <button className={filters.category === "all" ? styles.active : ""} onClick={() => handleCategoryChange("all")}>
              All Products
            </button>
          </li>
          <li>
            <button className={filters.category === "men's clothing" ? styles.active : ""} onClick={() => handleCategoryChange("men's clothing")}>
              Men's Clothing
            </button>
          </li>
          <li>
            <button className={filters.category === "jewelery" ? styles.active : ""} onClick={() => handleCategoryChange("jewelery")}>
              Jewelery
            </button>
          </li>
          <li>
            <button className={filters.category === "electronics" ? styles.active : ""} onClick={() => handleCategoryChange("electronics")}>
              Electronics
            </button>
          </li>
          <li>
            <button className={filters.category === "women's clothing" ? styles.active : ""} onClick={() => handleCategoryChange("women's clothing")}>
              Women's Clothing
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.container}>
        <div className={styles.filter}>
        <input className={styles.search} placeholder="Search products..." type="text" name="search" id="search" onChange={handleSearch} value={filters.query} />
            <div className={styles.select}>
              <label htmlFor="sort-order">Sort by</label>
              <select name="sort-order" id="sort-order" onChange={handleSortChange}>
                <option value="recommended">Recommended</option>
                <option value="a-z">Alphabetical (A-Z)</option>
                <option value="z-a">Alphabetical (Z-A)</option>
                <option value="low-high">Price: low to high</option>
                <option value="high-low">Price: high to low</option>
              </select>
            </div>
          </div>
          <div className={styles.items}>
            <AddCart confirmCart={confirmCart} />
            {filteredData.map((item) => (
              <Card
                key={item.id}
                item={item}
                handleMessageContainer={handleCartConfirmation}
              />
            ))}
          </div>
        </div>
      </div>
  );
}

CardContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
