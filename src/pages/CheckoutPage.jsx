import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useOutletContext()
    console.log(cartItems)

    function handleDeleteButton(item) {
        const newCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(newCart)
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div>
                    <p>Your cart is empty!</p>
                    <Link to="/shop" >Go to shop</Link>
                </div>
            ) : (
                <table className="table">
                    <tr>
                        <th>ITEM</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                    </tr>
                    {cartItems.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.count}</td>
                                <td>${item.count * item.price}</td>
                                <td><button onClick={() => handleDeleteButton(item)}>Remove</button></td>
                            </tr>
                        )
                    })}
                </table>
            )}
        </>
    )
}