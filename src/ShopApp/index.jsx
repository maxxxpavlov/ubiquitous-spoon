import styles from "./ShopApp.module.css";
import React from "react";

export default function Intro(props) {
  const { status, moveToNext, onOpen, idx, toRight } = props;
  if (status === "openning" && onOpen) {
    setTimeout(() => onOpen(idx), 1300);
  }
  const animationClass =
    status === "closing"
      ? styles.closing + " " + (toRight ? styles.right : "")
      : "";
  const testExplanators = (
    <React.Fragment>
      <h3>
        Используется <lang lang="en">MaterialUI</lang>
      </h3>
      <p>
        Товарищи! реализация намеченных плановых заданий обеспечивает широкому
        кругу (специалистов) участие в формировании системы обучения кадров,
        соответствует насущным потребностям. Идейные соображения высшего
        порядка, а также реализация намеченных плановых заданий влечет за собой
        процесс внедрения и модернизации форм развития.
      </p>
    </React.Fragment>
  );
  const dispatchMessage = (message) => {
    const iframe = document.querySelector("#shop-app-iframe");
    if (iframe) {
      iframe.contentWindow.postMessage(JSON.stringify(message), "*");
    }
  };
  return (
    <div
      className={
        styles.background +
        " " +
        animationClass +
        " " +
        (status === "openning" ? styles.openning : "")
      }
    >
      <div
        className={
          styles.content +
          (status === "closing" ? " hidden" : "") +
          (status === "openning" ? " " + styles.openning : "")
        }
      >
        <h2 className={styles.heading}>Страница заказа в магазине одежды</h2>
        <p>Красивая страница покупки одежды в онлай-магазине</p>
        <div className={styles["description-flex-box"]}>
          <div className={styles.iphone}>
            <div id="shop-app" className={styles["shop-app"]}>
              <div className={styles.cursor + " cursor"}></div>
              {status === "open" && (
                <iframe
                  src="#shop"
                  title="Заказать"
                  id="shop-app-iframe"
                  width="100%"
                  height="100%"
                  className={styles.frame}
                ></iframe>
              )}
            </div>
          </div>
          <div
            className={styles.explanators}
            onMouseOut={() =>
              dispatchMessage({ hover: false, highlight: null })
            }
          >
            <div
              className={styles.explanation}
              onMouseOver={() => dispatchMessage({ hover: true, highlight: 1 })}
              tabindex={0}
            >
              {testExplanators}
            </div>
            <div className={styles.explanation} tabindex={0}>
              {testExplanators}
            </div>
            <div className={styles.explanation} tabindex={0}>
              {testExplanators}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
