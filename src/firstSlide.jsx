import './firstSlide.css'
export default function FirstSlide(props) {
	const { status, moveToNext, onOpen, idx, toRight } = props
	if(status === 'openning' && onOpen){
		setTimeout(() => onOpen(idx), 1300)
	}
	const animationClass = status === 'closing' ? " closing" + (toRight ? '-right' : '') : ""
	return (
		<div className={"background" + animationClass + (status === 'openning' ? " openning" : "")}>
			<div className="blur-background"></div>
			<div className={"content" + (status === 'closing' ? ' hidden' : '') + (status === 'openning' ? " openning" : "")}>
				<div className="heading">Что это за сайт?</div>	
				<div className="text">
					<p>Этот сайт создан чтобы облегчить процесс рекрутинга и показать свои знания.
					<br/>Вы узнаете о процессе его создания сайта, а так же сможете увидеть несколько моих проектов.</p>
				</div>
				<div className="links">
					<a href="https://hh.ru" target="_blank" nofollow><b>Перейти к резюме</b></a>
				</div>			
				<div className="footer">
				<button onClick={moveToNext}>Продолжить </button></div>
			</div>	
		</div>)
}