import { useState } from "react";
import "./App.module.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  return (
    <>
      <Header cartItems={cartItems} />
      <Outlet context={[cartItems, setCartItems]} />
      <Footer />
    </>
  );
}

export default App;
