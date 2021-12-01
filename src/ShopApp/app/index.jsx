import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Cursor from './cursor.png'
import ProductImage from './fordogs.jpg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

/*
 * Для более быстрого изучения код всей страницы находится в одном файлы.
 * Это не антипаттерн если более тонкое разделение кода не оправдано снижением издержек при командной работе.
 * Функции идут сверху вних так же как компоненты идут от верхнего уровня иеархии к нижнему на странице.
 * Поэтому вам достаточно прочитать код сверху вних чтобы его понять.
 * 
 * 
 * While I was building the applicaton I have been leaving comments 
 * to describe component purpose both in Russian and English.
 * All application's components are in one file to let you explore the code easier and to make me easier to work.
 * The components are ordered almost as they are ordered in the page.
 *
 * Happy hacking!
 */

/* Создать товарную позицию 
 * Construct new item in the cart
 */
function CartProductItem(title, properties, price, previousPrice, count = 1){
  Object.assign(this, { title, properties, price, previousPrice, count })
}

const defaultCart = [
  new CartProductItem("Cliny / Подгузники для собак и кошек 5-10 кг размер M (9шт)", "Цвет: голубой", 327, 482, 2),
  new CartProductItem("Cliny / Подгузники для собак и кошек 5-10 кг размер M (10шт)", "Цвет: голубой", 327, 482, 1)
]

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
  if(state.hover) {
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
      <Checkout />
    </ThemeProvider>
    )
}


/*
 * Составление заказа в Интернет-магазине
 * Checkout in shop application
 * @component
 */
function Checkout() {
  const [cart, setCart] = React.useState(defaultCart)
  return (<Cart cart={cart}></Cart>)
}

// Start cart definition

/*
 * Корзина
 * Cart
 * 
 * @component
 */
function Cart({ cart }) {
  const cartItems = cart.map((cartItem) => <CartItem {...cartItem}></CartItem>)
  return (<Box>
            <Grid container direction="column">
              <Grid item> 
                <Typography variant="h6">Корзина <sup>{cart.length}</sup></Typography>
              </Grid>
              <Grid item> 
                {cartItems}
              </Grid>
              <Grid item>
              <Typography>На все позиции действует <Link href="#">скидка</Link> постоянного покупателя</Typography>
              </Grid>
            </Grid>
          </Box>)
}

/* 
 * Один товар
 * Single cart item
 *
 * @component 
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.properties
 * @param {number} props.previousPrice
 * @param {number} props.price
 * @param {number} props.count
 * @param {string} props.imageUrl
 */ 
function CartItem({title, properties, previousPrice, price, imageUrl, count}) {
 const description = <CartItemDescription {...{previousPrice, price, title, properties}} />
  return (
          <Grid container direction="column">
            <Grid item>   
              <Grid container direction="row">
                <Grid item>
                  <Avatar src={ProductImage} variant="square" alt={title}></Avatar>
                </Grid>
                <Grid item>
                  {description}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <CartItemActions itemsCount={count}></CartItemActions>
            </Grid>
          </Grid>
          )
}

/* 
 * Описание позиции
 *
 * @component
 * @param {Object} props
 * @param {number} props.previousPrice
 * @param {number} props.price
 * @param {string} props.title
 * @param {string} props.properties
 */
function CartItemDescription({ price, previousPrice, title, properties }){
  const itemPrice = <CartItemPrice currencySymbol="Р" previousPrice={previousPrice}>{price}</CartItemPrice>
  return (
          <Grid container direction="column">
            <Grid item>
              {itemPrice}
            </Grid>
            <Grid item>
              <Typography>{title}</Typography>
            </Grid>
            <Grid item>
              <Typography>{properties}</Typography>
            </Grid>
          </Grid>
          )
}

/*
 * Старая и новая цена
 *
 * @component
 * @param {Object} props
 * @param {number} props.children
 * @param {number} props.previousPrice
 * @param {string} props.currencySymbol
 */
function CartItemPrice({ children, previousPrice, currencySymbol }) {
  const previousPriceElement = Number.isInteger(previousPrice) ? <s>{previousPrice} {currencySymbol}</s> : null
  return (
          <React.Fragment>
            <Typography component="span">{children} {currencySymbol}</Typography>
            {previousPriceElement}
          </React.Fragment>
        )
}

/*
 * Действия над товаром в корзине
 * Actions possible on a cart item
 *
 * @component
 * @param {Object} props
 * @param {number} props.itemsCount
 */
function CartItemActions({ itemsCount }){
  return (
      <Grid container direction="row">
        <Grid item>
            - {itemsCount} +
        </Grid>
        <Grid item sx={{alignSelf: 'end'}}>
          <IconButton aria-label="Удалить из корзины" color="secondary" component="span">
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
}
// End cart definition
