import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { GlobalStyles } from '@mui/material';
import Cursor from './cursor.png'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ProductImage from './fordogs.jpg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton'
// Импорты расположены в том порядке в котором я их добавлял для удобства


/*
 * Для более быстрого изучения код всей страницы находится в одном файлы
 * Это не антипаттерн если более тонкое разделение кода не оправдано снижением издержек при командной работе
 *
 * Функции идут сверху вних так же как компоненты идут от верхнего уровня иеархии к нижнему на странице.
 * 
 * Happy hacking!
 */



function Cart(props)
{
  return (<Box>
            <Grid container direction="column">
              <Grid item> 
                <Typography variant="h6">Корзина <sup>1</sup></Typography>
              </Grid>
              <Grid item> 
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item>
                        <Avatar src={ProductImage} variant="square" alt="Подгузники для собак"></Avatar>
                      </Grid>
                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography>500 Р</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Подгузники для собак</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Цвет: Голубой</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item>
                    - 1 +
                  </Grid>
                <Grid item>
                  <IconButton aria-label="Удалить из корзины" color="secondary" component="span"><DeleteOutlineIcon></DeleteOutlineIcon></IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>)
}
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
     {/*<GlobalStyles styles={{ "*": {cursor: `url(${Cursor}),default`} }} />*/}
     {state.hover && hoverBackground}
      {/*<AppBar sx={hightlightStyles}>
        <Toolbar>Name</Toolbar>
      </AppBar>*/}
      <Cart></Cart>
    </ThemeProvider>
    )
}
