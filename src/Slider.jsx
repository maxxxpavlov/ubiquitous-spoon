import React from "react";
import "normalize.css";
import "./app.css";
import IntroSlide from "./Introduction";
import ShopSlide from "./CheckoutSlide";
import DictionarySlide from "./DictionarySlide";
import Outro from "./Outro";
import Styles from "./AppNext.module.css";

const STATUS = {
  openning: "openning",
  open: "open",
  closing: "closing",
};
const slides = [IntroSlide, ShopSlide,DictionarySlide, Outro];

//TODO: Стыдно за такое перелистывание, торопился, перепишу это...
export default function Slider() {
  const [slider, setSliderState] = React.useState({
    idx: 0,
    status: STATUS.openning,
    nextPage: null,
  });
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
    if (slider.status === STATUS.open && idx < slides.length) {
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
      <div className={Styles.pagination}>
        <ol>
          {slides.map((slideElement, i) => (
            <li key={i}>
              <div>
                <div
                  title={"Страница " + (i + 1)}
                  data-enabled={slider.status === STATUS.open}
                  onClick={i !== slider.idx ? () => changeToSlide(i) : ""}
                  className={
                    "page" +
                    " " +
                    Styles["page-number"] +
                    ((slider.nextPage === null && i === slider.idx) ||
                    (slider.nextPage !== null && i === slider.nextPage)
                      ? " current"
                      : "")
                  }
                ></div>
                {(i === slider.idx + 1 && slider.status === STATUS.open) && <PaginationNextButton onClick={moveToNext} />}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div class="slide">{currentSlide}</div>
      <div class="slide next">{nextSlide}</div>
    </div>
  );
}

function PaginationNextButton({ onClick }) {
  return (
    <div onClick={onClick} className={Styles["pagination-next-page-button"]}>
      <span>Далее</span>
    </div>
  );
}
