import React from 'react'
import{ UserProgressContextProvider } from './store/UserProgressContext'
import { CartContextProvider } from './store/CartContext'
import Checkout from './components/Checkout'
import Header from './components/Header'
import Cart from './components/Cart'
import Main from './components/Main'

function App() {

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Main />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
