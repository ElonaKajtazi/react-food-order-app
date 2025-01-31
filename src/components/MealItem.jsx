import React, { useContext } from 'react'
import { currencyFormatter } from '../util/formatting'
import CartContext from '../store/CartContext'
import Button from './UI/Button'

export default function MealItem({meal}){
    const cartCtx = useContext(CartContext)
    
    const  handleAddMealToCart = () => {
        cartCtx.addItem(meal)
    }

    return (
        <div className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.title}/>
            <div>
                <h3>{meal.title}</h3>
                <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <div className='meal-item-actions'>
                <Button onClick={handleAddMealToCart}>Add to Cart</Button>
            </div>
        </article>
    </div>
    )
}