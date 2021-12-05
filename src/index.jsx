import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./app.css";

import Slider from './Slider'
import ShopApp from "./Checkout";



function App() {  
  if (document.location.hash === "#shop") {
    return <ShopApp></ShopApp>;
  }
  return <Slider></Slider>
}


const DOMContainer = document.querySelector("#root");
ReactDOM.render(<App />, DOMContainer);
