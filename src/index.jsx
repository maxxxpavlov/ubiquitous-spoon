import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import IntroSlide from "./Introduction";
import ShopSlide from "./ShopApp";
import ShopApp from "./ShopApp/app";

const STATUS = {
  openning: "openning",
  open: "open",
  closing: "closing",
};
const slides = [IntroSlide, ShopSlide];

function App() {
  const [slider, setSliderState] = React.useState({
    idx: 0,
    status: STATUS.openning,
    nextPage: null,
  });
  if (document.location.hash === "#shop") {
    return <ShopApp></ShopApp>;
  }
  if (slider.nextPage !== null && slider.status === STATUS.open) {
    setSliderState({
      idx: slider.idx,
      nextPage: slider.nextPage,
      status: STATUS.closing,
    });
  }
  if (slider.idx === slider.nextPage && slider.status === STATUS.open) {
    setSliderState({ idx: slider.idx, status: slider.status, nextPage: null });
  }
  const changeToSlide = (idx) => {
    if (slider.status !== "openning" && idx < slides.length) {
      setSliderState({
        idx: slider.idx,
        nextPage: idx,
        status: "closing",
      });
    }
  };
  const moveToNext = () => changeToSlide(slider.idx + 1);
  const CurrentSlideComponent = slides[slider.idx];
  const currentSlide = (
    <CurrentSlideComponent
      idx={slider.idx}
      toRight={slider.idx > slider.nextPage}
      status={slider.status}
      moveToNext={moveToNext}
      onOpen={(hisIdx) =>
        setSliderState({
          idx: slider.idx,
          status: STATUS.open,
          nextPage: slider.nextPage,
        })
      }
    >
      Slide 1
    </CurrentSlideComponent>
  );
  let nextSlide;
  if (slider.nextPage !== null && slider.status === STATUS.closing) {
    const NextSlide = slides[slider.nextPage];
    nextSlide = (
      <NextSlide
        idx={slider.nextPage}
        status="openning"
        moveToNext={moveToNext}
        onOpen={(hisIdx) =>
          hisIdx === slider.nextPage &&
          setSliderState({
            idx: slider.nextPage,
            status: STATUS.open,
            nextPage: null,
          })
        }
      ></NextSlide>
    );
  }
  return (
    <div>
      <nav className="left-arrow">
        <ol>
          {slides.map((slideElement, i) => (
            <li key={i}>
              <div
                title={"Страница " + (i + 1)}
                aria-enabled={slider.status === STATUS.open}
                onClick={i !== slider.idx ? () => changeToSlide(i) : ""}
                className={
                  "page" +
                  ((slider.nextPage === null && i === slider.idx) ||
                  (slider.nextPage !== null && i === slider.nextPage)
                    ? " current"
                    : "")
                }
              ></div>
            </li>
          ))}
        </ol>
      </nav>
      <div class="slide">{currentSlide}</div>
      <div class="slide next">{nextSlide}</div>
    </div>
  );
}

const DOMContainer = document.querySelector("#root");
ReactDOM.render(<App />, DOMContainer);
