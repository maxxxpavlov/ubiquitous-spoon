import styles from "./ShopApp.module.css";
import React from "react";

export default function ShopApp(props) {
  const { status, moveToNext, onOpen, idx, toRight } = props;
  React.useEffect(() => {
    if (status === "opening" && onOpen) {
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
        (status === "opening" ? styles.opening : "")
      }
    >
      <div
        className={
          styles.content +
          (status === "closing" ? " hidden" : "") +
          (status === "opening" ? " " + styles.opening : "")
        }
      >
        <div className={styles["description-flex-box"]}>
          <div className={styles.iphone}>
            <div id="shop-app" className={styles["shop-app"]}>
              {status === "open" && (
                <iframe
                  src="#shop"
                  title="Пример приложения на React.js"
                  id="shop-app-iframe"
                  width="100%"
                  height="100%"
                  className={styles.frame}
                ></iframe>
              )}
            </div>
          </div>
          <div className={styles.explanators}>
            <div>
              <h2 className={styles.heading}>
                Страница заказа в магазине одежды
              </h2>
              <p>Красивая страница совершения заказа в онлайн-магазине</p>
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
                  экранах. Проверьте сами, открыв страницу на полный экран.
                </p>
              </div>
            </div>
            <div>
              <div className={styles.link}>
                <a
                  className={styles["code-link"]}
                  href="#shop"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть страницу на полный экран
                </a>
              </div>
              <div className={styles.link}>
                <a
                  className={styles["code-link"]}
                  href="https://github.com/maxxxpavlov/ubiquitous-spoon/tree/main/src/Checkout"
                  target="_blank"
                  rel="noreferrer"
                >
                  Перейти к коду на Github 🐙
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
