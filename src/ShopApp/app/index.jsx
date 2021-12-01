import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { GlobalStyles } from '@mui/material';
import Cursor from './cursor.png'
import Box from '@mui/material/Box'
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [state, setState] = React.useState({hover: false, highlight: null})
  const hoverBackground = <Box sx={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "white", zIndex: 2000, opacity: 0.9}}></Box>
  window.onmessage = function(e) {
    const newState = JSON.parse(e.data)
    setState(newState)
  };
  let hightlightStyles = {}
  if(state.hover){
    hightlightStyles = {
      zIndex: state.highlight === 1 ?  3000 : 'inherit',
      border: "5px black double"
    }
  }
  return (
    <ThemeProvider theme={darkTheme}>
     <GlobalStyles styles={{ "*": {cursor: `url(${Cursor}),default`} }} />
     {state.hover && hoverBackground}
      <AppBar position="fixed" sx={hightlightStyles}>
        <Toolbar>Name</Toolbar>
      </AppBar>
    </ThemeProvider>
    )
}
