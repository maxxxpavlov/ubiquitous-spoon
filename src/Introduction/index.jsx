import './Introduction.css'


export default function Intro(props) {
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
					<p>Это дополнение к резюме веб-разработчика.
					<br/>Здесь вы найдете примеры моего кода, что поможет вам в процессе рекрутинга.
					<br/>Здесь немного работ - я сделал акцент на ясности и простоте кода.</p>
				</div>
				<div className="links">
					<a href="https://hh.ru/resume/68f87c1fff0979f6120039ed1f566c4361397a" target="_blank" rel="noreferrer"><b>Перейти к резюме</b></a>
				</div>			
				<div className="footer">
				<button className="next" onClick={moveToNext}>Начать</button></div>
			</div>	
		</div>
		)
}