import React from "react";
import PropTypes from "prop-types";

export default function Slider({ slides, slideId }) {
  // Текущий слайд и слайд на "подходе"
  const [state, setState] = React.useState({
    current: {},
    opening: {},
  });
  React.useEffect(() => {
    // Открытие нового слайда
    return () => {};
  }, [slideId]);
}

Slider.propTypes = {
  slides: PropTypes.array,
  slideId: PropTypes.number,
};
