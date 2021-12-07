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
              <h2 className={styles.heading}>Что я делаю лучше всего?</h2>
            </div>
            <div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Учусь</h3>
                <p>
                  Собственная система обучения, пытливый ум и обширный опыт
                  позволяют постигать сложные вещи.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Экспериментирую</h3>
                <p>Подхожу к вещам с различных сторон.</p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Собираю</h3>
                <p>
                  Строю интересные вещи из на первый взгляд несовместимых идей.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Аргументирую</h3>
                <p>Предлагаю понятные аргументы в пользу своих нововведений.</p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Говорю на языке бизнеса</h3>
                <p>Использую язык доступный любому. Мы поймём друг друга.</p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Работаю со всеми</h3>
                <p>
                  Если вы знаете, что удача любит новаторство, риск и усердие,
                  вы готовы к экспериментам и выходу за границы, то мы поможем
                  друг другу. Ваши ресурсы - мои идеи.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Ответ на вопрос о технических навыках</h3>
                <p>
                  Я не ограничен рамками одного технологического решения и могу
                  решать абсолютно любые задачи. 
                  <br/>
                  Стек: JavaScript • TypeScript • React • Redux • HTML • CSS • SCSS • Node.js
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
