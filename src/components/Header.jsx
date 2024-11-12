import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header(){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    const handleShowCart = () => {
        console.log('helloooo 3322 cart')
        userProgressCtx.showCart()
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt='food logo'/>
                <h1>ReactFood</h1>
            </div>
            <Button textOnly={true} onClick={handleShowCart}>Cart({totalCartItems})</Button>
        </header>
    )
}