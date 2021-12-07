import styles from "./ShopApp.module.css";
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
          <h3>Словарь английского языка на React Native</h3>
          <p>Кросс-платформенное приложение на React Native. </p>
            <iframe className={styles.frame} src={document.location + '/expo.html'} title="Dictionary" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>
  );
}
