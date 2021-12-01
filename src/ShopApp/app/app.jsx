import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

export default function App() {
  const [state, setState] = React.useState({clicked: true})
  console.log(state)
  if(state.clicked){
    return <p>'Hi'</p>
  }
  return <Button variant="contained" onClick={() => setState({clicked: true})}>Hello World</Button>;
}
