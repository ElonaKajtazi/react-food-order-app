import React, { useContext } from 'react'
import Modal from '../components/UI/Modal'
import UserProgressContext from "../store/UserProgressContext"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting"
import useHttp from "../hooks/useHttp"
import ErrorComp from "./ErrorComp"
import Button from "./UI/Button"
import Input from "./UI/Input"

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout(){
    const cartCtx = useContext(CartContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    const {
        data, 
        error, 
        isLoading: isSending, 
        sendRequest, 
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig)

    const userProgressCtx = useContext(UserProgressContext)

    const handleClose = () => {
        userProgressCtx.hideCheckout()
    }

    const handleFinish = () => {
        userProgressCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

       const fd = new FormData(event.target)
       const customerData = Object.fromEntries(fd.entries())

       sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    let acions  = (
        <>
            <Button textOnly type='button'>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if(isSending){
        acions = <span>Sendin order data</span>
    }

    if(data && !error){
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
                <h2>Success</h2>
                <p>Your order was submitted successfuly.</p>
                <p>We will get  back to you with more details via email within the next minutes.</p>
                <p className='modal-actions'>
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>

                <Input label='Full Name' type='text' id='name'/>
                <Input label='Email address' type='email' id='email'/>
                <Input label='Street' type='text' id='street'/>
                <div className='control-row'>
                    <Input label='Postal code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>

                {error && <ErrorComp title='Faiiled to submit order!' message={error}/>}
                
                <p className='modal-actions'>{acions}</p>
            </form>
        </Modal>
    )
}