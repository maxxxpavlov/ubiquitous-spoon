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
            </div>
            <div>
            <div className={styles.explanation} tabIndex={0}>
                <h3>
                  Учусь
                </h3>
                <p>
                  Продвинутая система обучения, пытливый ум и обширный опыт позволяют постигать сложные вещи.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>
                  Планирую
                </h3>
                <p>
                  Строю разветвленные и глубокие планы и алгоритмы. Вижу дальше конкурентов.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Экспериментирую</h3>
                <p>
                  Во мне бурлит детское любопытство.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Улучшаю</h3>
                <p>
                  Если иное делать не оправдано, совершенствую существующее. 
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Собираю</h3>
                <p>
                  Строю интересные вещи из на первый взгляд несовместимых идей.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Аргументирую</h3>
                <p>
                  Предлагаю понятные аргументы в пользу своих нововведений.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Говорю на языке бизнеса</h3>
                <p>
                  Использую язык, доступный практически любому. Мы поймём друг друга.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Приму к себе любого</h3>
                <p>
                  Мне все равно на "печеньки" на работе. Меня не впечатлить высокой зарплатой. Но если вы знаете, что фортуна любит новаторство, риск и усердие, вы готовы к экспериментам и выходу за границы, то мы поможем друг другу. Ваши ресурсы - мои идеи.
                </p>
              </div>
              <div className={styles.explanation} tabIndex={0}>
                <h3>Ответ на вопрос о технических навыках</h3>
                <p>
                  Я намеренно не стал указывать определенные технологии с которыми я умею работать потому что это не имеет значения. Я не ограничен рамками одного технологического набора и хорош в абсолютно любых задачах (если мне они, конечно, интересны).
                  Отвечу формально: HTML, CSS, JavaScript, React.js
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
