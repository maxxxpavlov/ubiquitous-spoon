import * as React from 'react';
import ReactDOM from 'react-dom';
import { styled, ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Cursor from './cursor.png'
import ForDogImage from './fordogs.jpg'
import ILoveYouImage from './iloveyou.jpg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { Card, CardHeader, Paper } from '@mui/material'

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
 */

/* 
 * Позиция в корзине 
 * Construct new item in the cart
 */
function CartProductItem(title, properties, price, previousPrice, image, count = 1){
  Object.assign(this, { title, properties, price, previousPrice, image, count })
}
const defaultCart = [
  new CartProductItem("Cliny / Подгузники для собак и кошек 5-10 кг размер M (9шт)", "Цвет: голубой", 327, 482, ForDogImage, 2),
  new CartProductItem("Mellingward / Брелок \"Я люблю тебя\", подвеска", "Цвет: бежевый, красный", 195, 1018, ILoveYouImage, 1)
]

const PAYMENT_METHOD = {
  CARD: "CARD",
  APPLE_PAY: "APPLE_PAY",
  GOOGLE_PAY: "GOOGLE_PAY"
}
const PAYMENT_METHOD_NAMES = {
  [PAYMENT_METHOD.CARD]: "Банковская карта",
  [PAYMENT_METHOD.APPLE_PAY]: "Apple pay",
  [PAYMENT_METHOD.GOOGLE_PAY]: "Google pay",
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#cb11ab",
    },
    secondary: {
      main: "#8b8b8b"
    },
    secondaryContrast: {
      main: "#000000"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
      }
    },
    MuiCard: {
      props: {
        elevation: 5
      }
    }
  }
});
console.log(customTheme)
customTheme.typography.h1 = {
  ...customTheme.typography.h1,
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [customTheme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}



const PaperCard = styled(Box)({
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 0 10px rgb(0 0 0 / 10%)",
    marginLeft: 2,
    marginRight: 2,
    border: "1px solid transparent",
    marginBottom: 2,
  })

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
    <ThemeProvider theme={customTheme}>
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
  const removeItemFromCart = (itemId) => setCart(cart.filter((item, id) => itemId !== id))
  const setItemCount = (itemId, newCount) =>
   setCart(cart.map((item, id) => itemId === id ? { ...item, count: newCount } : item))
  const [paymentMethod, setPaymentMethod] = React.useState(PAYMENT_METHOD.CARD)
  const summary = {
    total: cart.reduce((prev, item) => item.price * item.count + prev, 0),
    count: cart.length,
    discount: cart.reduce((prev, item) => (item.price - item.previousPrice) * item.count + prev, 0),
  }
  return (
            <Grid container direction="row" spacing={2} sx={{justifyContent: "center", marginTop: {lg: 10}}} >
              <Grid item lg={8} sx={{ gridRow: '1', gridColumn: '1 / 4' }}>
                <Grid container direction="column" spacing={3}>
                  <Grid item lg={8}>
                    <PaperCard >
                      <Cart {...{cart, removeItemFromCart, setItemCount}} />
                    </PaperCard>
                  </Grid>
                  <Grid item lg={8}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item lg={6}>
                        <PaperCard >
                          <DeliveryOption />
                        </PaperCard>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <PaperCard >
                          <PaymentOption paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                        </PaperCard>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={3} spacing={2}>
                <PaperCard>
                  <Summary summary={summary}/>
                </PaperCard>
              </Grid>
            </Grid>
          )
}

// Cart definition

/*
 * Корзина
 * Cart
 * 
 * @component
 * @param {CartProductItem[]} props.cart
 * @param {function} props.removeItemFromCart
 * @param {function} props.setItemCount
 */
function Cart({ cart, removeItemFromCart, setItemCount }) {
  const cartItems = 
    cart.map(
              (cartItem, itemId) =>
                <CartItem {...cartItem}
                  removeItemFromCart={() => removeItemFromCart(itemId)}
                  setItemCount={(newCount) => setItemCount(itemId, newCount)}>
                </CartItem>
            )
  return (
          <Box>
            <Grid container direction="column" spacing={3}>
              <Grid item> 
                <Typography variant="h1">Корзина <sup>{cart.length}</sup></Typography>
              </Grid>
              <Grid item> 
                <Grid container direction="column" sx={{justifyContent: 'evenly-spaced'}}>
                  {cartItems.map(cartItem => <Grid item>{cartItem}</Grid>)}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row">
                  <Grid item xs={2} lg={1}>
                    <PriorityHighIcon sx={{width: 1}} color="secondary" />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>
                      На все товары в корзине действует <Link href="#">скидка</Link> постоянного покупателя
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          )
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
 * @param {function} props.removeItemFromCart
 * @param {function} props.setItemCount
 */ 
function CartItem({title, properties, previousPrice, price, image, count, removeItemFromCart, setItemCount}) {
 const description = <CartItemDescription {...{previousPrice, price, title, properties}} />
  return (
          <Grid container direction="row"  sx={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid item xs={2} lg={1} >
              <CartItemImage src={image} title={title} />
            </Grid>
            <Grid item xs={10} lg={7}>
              {description}
            </Grid>
            <Grid item xs={12} lg={3}>
              <CartItemActions itemsCount={count} {...{removeItemFromCart, setItemCount}}></CartItemActions>
            </Grid>
          </Grid>
          )
}


/*
 * Изображения товара
 * Product picture
 *
 * @component
 */
function CartItemImage({ src, title }){
  return <Avatar src={src} variant="square" alt={title} sx={{width: {lg: 80, sm: 60}, height: {lg: 80, sm: 60}, mx: "auto", }}></Avatar>
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
              <Typography color="secondary" variant="body2">{properties}</Typography>
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
  const previousPriceElement = Number.isInteger(previousPrice) ? <Typography component="span" color="secondary" sx={{textDecoration: "line-through"}} variant="body2">{previousPrice} {currencySymbol}</Typography> : null
  return (
          <React.Fragment>
            <Typography component="span">{children} {currencySymbol} {previousPriceElement}</Typography>
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
 * @param {function} props.removeItemFromCart
 * @param {function} props.setItemCount
 */
function CartItemActions({ itemsCount, removeItemFromCart, setItemCount }){
  const decItemCount = () => setItemCount(itemsCount - 1)
  const incItemCount = () => setItemCount(itemsCount + 1)
  return (
      <Grid container direction="row" sx={{justifyContent: "space-between"}}>
        <Grid item xs={6} lg={8}>
            <Button color="secondaryContrast" disabled={itemsCount === 1} onClick={decItemCount}>-</Button>
             {itemsCount} 
            <Button color="secondaryContrast" onClick={incItemCount}>+</Button>
        </Grid>
        <Grid item xs={2} lg={4}>
          <IconButton aria-label="Удалить из корзины" color="secondary" component="span" onClick={removeItemFromCart}>
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    )
}
// End cart definition

// Delivery definition

function DeliveryOption(){
  return (
          <Box>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="row" sx={{justifyContent: "space-between"}}>
                  <Grid item xs={6}>
                    <Typography variant="h1">Адрес доставки</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextButton onClick={() => true}>Изменить</TextButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Г. Санкт-Питербург, улица Молдованских партизан, д. 12</Typography>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <Typography>Доставка завтра с 14:00 до 19:00</Typography>
              </Grid>
            </Grid>
          </Box>
          )
}

// End delivery definitions

// Payment options definitions

function PaymentOption({ paymentMethod, setPaymentMethod }) {
  const [dialogOpen, setDialog] = React.useState(false)
  return (
          <Box>
            <Grid container direction="column">
              <Grid item xs={12}>
                <Grid container direction="row" sx={{alignItems: "center", justifyContent: "space-between"}}>
                  <Grid item xs={6} lg={4}>
                    <Typography variant="h6" component="span">Способ оплаты</Typography>                  
                  </Grid>
                  <Grid item xs={3} lg={5}>
                    <TextButton onClick={() => setDialog(true)}>Выбрать</TextButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {PAYMENT_METHOD_NAMES[paymentMethod]}
              </Grid>
            </Grid>
            <ChoosePaymentOptionDialog 
              open={dialogOpen} 
              onClose={() => setDialog(false)}
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod}
            />
          </Box>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChoosePaymentOptionDialog({ open, onClose, paymentMethod, setPaymentMethod }){
  return (
          <Dialog
            fullScreen
            open={open}
            onClose={onClose}>
              <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={onClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h1" component="div">
                  Способ оплаты
                </Typography>
                <Button autoFocus color="inherit" onClick={onClose}>
                  Сохранить
                </Button>
              </Toolbar>
            </AppBar>
            <FormControl component="fieldset">
              <FormLabel component="legend" variant="text">Способ оплаты</FormLabel>
              <RadioGroup
                aria-label="Способ оплаты"
                name="radio-buttons-group"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(PAYMENT_METHOD[e.target.value])}
              >
              {Object.keys(PAYMENT_METHOD).map((paymentMethodType) => 
                <FormControlLabel value={paymentMethodType} control={<Radio  />} label={PAYMENT_METHOD_NAMES[paymentMethodType]} />
              )}
              </RadioGroup>
            </FormControl>
          </Dialog>
    )
}

// end payment option definitions

// Summary definition

function Summary({summary}) {
  // discount count total
  return (
          <Box>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="row" sx={{justifyContent: "space-between"}}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h1">Итого</Typography>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <Typography align="right" variant="h1">{summary.total} Р</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" sx={{justifyContent: "space-between"}}>
                  <Grid item xs={4} lg={4}>
                    <Typography>Товар, {summary.count}шт</Typography>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <Typography align="right">{summary.total} Р</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" sx={{justifyContent: "space-between"}}>
                  <Grid item xs={4} lg={4}>
                    <Typography>Скидка</Typography>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <Typography align="right">{summary.discount} Р</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" sx={{width: "100%"}}>Заказать</Button>
              </Grid>
            </Grid>
          </Box>
    )
}

// end summary definition

function TextButton({ onClick, children }){
  return <Typography variant="body2" align="right" color="primary" sx={{cursor: "pointer"}} onClick={onClick}>{children}</Typography>
}