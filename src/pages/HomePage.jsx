import { useState } from "react";
import Slideshow from "../components/Slideshow/Slideshow";

export default function HomePage() {
  useState(() => {
    document.title = "THETEE Store";
  });

  return <Slideshow />;
}
