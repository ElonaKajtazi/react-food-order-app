import React, { useContext } from 'react'
import { currencyFormatter } from '../util/formatting'
import UserProgressContext from '../store/UserProgressContext'
import CartContext from '../store/CartContext'
import Modal from './UI/Modal'
import CartItem from './CartItem'
import Checkout from './Checkout'
import Button from './UI/Button'

export default function Cart (){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }

    const handleOpenChecout = () => {
        userProgressCtx.showCheckout()
    }

    return (
        <Modal 
            className={'cart'} 
            open={userProgressCtx.progress === 'cart'} 
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h1>Your Cart</h1>      
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                { cartCtx.items.length > 0 &&  <Button onClick={handleOpenChecout}>Go to Checkout</Button> }
            </p>
        </Modal>
    )
}
