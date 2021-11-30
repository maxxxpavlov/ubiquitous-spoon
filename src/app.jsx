'use strict';
import './app.css'
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    return 'Slide one'
  }
}

const DOMContainer = document.querySelector('#React-DOM-Container')
ReactDOM.render(<LikeButton />, DOMContainer)

