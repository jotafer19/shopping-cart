import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Slideshow from "./components/Slideshow/Slideshow";

function App() {
  return (
    <>
      <Header />
      <Slideshow />
      <Footer />
    </>
  );
}

export default App;
