import React, { useContext } from "react"
import Modal from '../components/UI/Modal'
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting"
import UserProgressContext from "../store/UserProgressContext"
import Input from "./UI/Input"
import Button from "./UI/Button"

export default function Checkout(){
    const cartCtx = useContext(CartContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    const userProgressCtx = useContext(UserProgressContext)

    const handleClose = () => {
        userProgressCtx.hideCheckout()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

       const fd = new FormData(event.target)
       const costumerData = Object.fromEntries(fd.entries())
       console.log(costumerData)

    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

                <Input label='Full Name' type='text' id='full-name'/>
                <Input label='Email address' type='email' id='email'/>
                <Input label='Street' type='text' id='street'/>
                <div className='control-row'>
                    <Input label='Postal code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                <p className='modal-actions'>
                    <Button textOnly type='button'>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}