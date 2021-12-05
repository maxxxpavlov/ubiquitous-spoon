import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./app.css";
import Slider from './Slider'



function App() {  
  if (document.location.hash === "#shop") {
    const ShopApp = React.lazy(() => import('./Checkout'));
    return <React.Suspense fallback={<div>Загрузка...</div>}><ShopApp></ShopApp></React.Suspense>;
  }
  return <Slider></Slider>
}


const DOMContainer = document.querySelector("#root");
ReactDOM.render(<App />, DOMContainer);
