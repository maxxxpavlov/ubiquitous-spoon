import styles from "./Outro.module.css";
import React from "react";

export default function ShopApp(props) {
  const { status, moveToNext, onOpen, idx, toRight } = props;
  React.useEffect(() => {
    if (status === "openning" && onOpen) {
      setTimeout(() => onOpen(idx), 1300);
    }
  }, [status]);

  const animationClass =
    status === "closing"
      ? styles.closing + " " + (toRight ? styles.right : "")
      : "";

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
        <div className={styles["description-flex-box"]}>
          <div className={styles.explanators}>
            <div>
              <h2 className={styles.heading}>
                Что я делаю лучше всего?
              </h2>
              <p>Красивая страница совершения заказка в онлайн-магазине</p>
            </div>
            <div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>
                  Работает на фреймворке <lang lang="en">MaterialUI</lang>
                </h3>
                <p>
                  Используется React.js и MaterialUI, который содержит мощные
                  инструменты для стилизации, адаптивности, компановки
                  веб-приложения.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Легко-читаемый первоклассный код</h3>
                <p>
                  Код этого приложения написан в рамкам единого стиля и
                  парадигмы, поэтому он легко читается даже новичком в
                  веб-разработке.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Адаптивная верстка</h3>
                <p>
                  Этот сайт отображается правильно на маленьких и больших
                  экранах. Проверьте сами, открыв страницу на полный экран
                </p>
              </div>
            </div>
            <div>
              <div className={styles.link}>
                <a
                  className={styles["code-link"]}
                  href="https://t.me/thepostal"
                  target="_blank"
                  rel="noreferrer"
                >
                  Написать в телеграм
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
