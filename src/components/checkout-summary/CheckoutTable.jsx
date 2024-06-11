import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./CheckoutTable.module.css"

export default function CheckoutTable() {
    const [cartItems, setCartItems] = useOutletContext();

    const totalCost = useMemo(() => {
    return cartItems.reduce((accumulate, item) => accumulate +  item.price * item.count, 0).toFixed(2)
  }, [cartItems])

  function handleDeleteButton(item) {
    const newCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(newCart);
  }

  function handleRemoveItems(item) {
    if (item.count <= 1) return;
    const newCart = cartItems.map(itemCart => {
      if (itemCart.id === item.id) {
        return { ...itemCart, count: itemCart.count - 1};
      } else {
        return itemCart;
      }
    })

    setCartItems(newCart)
  }

  function handleAddItems(item) {
    const newCart = cartItems.map(itemCart => {
      if (itemCart.id === item.id) {
        return { ...itemCart, count: itemCart.count + 1 };
      } else {
        return itemCart
      }
    })

    setCartItems(newCart)
  }

  return (
    <div className={styles.container}>
        <h2>YOUR CART</h2>
          <table className={styles.table}>
            <thead >
              <tr className={styles.head}>
                <th className={styles.name}>ITEM</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL PRICE</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr className={styles.product} key={item.id}>
                    <td className={styles.name}>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className={styles.count}>
                          <button
                          className={styles.btn}
                            onClick={() => handleRemoveItems(item)}
                            type="button"
                          >
                            -
                          </button>
                          <p>{item.count}</p>
                          <button
                          className={styles.btn}
                            onClick={() => handleAddItems(item)}
                            type="button"
                          >
                            +
                          </button>
                      </div>
                    </td>
                    <td>${(item.count * item.price).toFixed(2)}</td>
                    <td>
                      <button className={styles.remove} onClick={() => handleDeleteButton(item)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.subtotal}>
            <p>SUBTOTAL: <span className={styles.total}>${totalCost}</span></p>
          </div>
        </div>
  )
}