import './ShopApp.css'
import ReactDOM from 'react-dom'
import {useEffect} from 'react'
import App from './app'

export default function Intro(props) {
	const { status, moveToNext, onOpen, idx, toRight } = props
	if(status === 'openning' && onOpen){
		setTimeout(() => onOpen(idx), 1300)
	}
	const animationClass = status === 'closing' ? " closing" + (toRight ? '-right' : '') : ""
	useEffect(() => {
		ReactDOM.render(<App/>, document.querySelector('#shop-app'))
	})
	return (
		<div className={"background" + animationClass + (status === 'openning' ? " openning" : "")}>
			<div className="blur-background"></div>
			<div className={"content" + (status === 'closing' ? ' hidden' : '') + (status === 'openning' ? " openning" : "")}>
				<h1 class="heading">Веб магазин</h1>
				<div className="description-flex-box">
					<div className="iphone">
						<div id="shop-app"></div>
						<div className="explanators"><p>This app is made using MaterialUI</p></div>
					</div>
				</div>
				<div className="footer">
					<button className="next" onClick={moveToNext}>Продолжить</button>
				</div>
			</div>	
		</div>
		)
}