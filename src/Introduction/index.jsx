import React from 'react'
import styles from "./Introduction.module.css";
import AnimatedBackground from './background.svg'

export default function Intro(props) {
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
      {/* <div className={styles['animated-background']}>
      {status === 'open' && <object type="image/svg+xml" data={AnimatedBackground} class="logo" aria-label='animated background'></object>}
      </div> */}
      <div
        className={
          styles.content +
          (status === "closing" ? " " + styles.hidden : "") +
          (status === "opening" ? " " + styles.opening : "")
        }
      >
        <div className={styles.heading}>Что это за сайт?</div>
        <div className={styles.text}>
          <p>
            Это дополнение к резюме веб-разработчика.
            <br />
            Здесь вы найдете примеры моего кода, что поможет вам в процессе
            рекрутинга.
            <br />
            Здесь немного работ - я сделал акцент на ясности и простоте кода.
          </p>
        </div>
        <div className={styles.links}>
          <a
            href="https://hh.ru/resume/68f87c1fff0979f6120039ed1f566c4361397a"
            target="_blank"
            rel="noreferrer"
          >
            <b>Перейти к резюме</b>
          </a>
        </div>
        <div className={styles.footer}>
          <button className={styles.next} onClick={moveToNext}>
            Начать
          </button>
        </div>
      </div>
    </div>
  );
}
