import React from 'react'

export default function MealItem({image, title, price, description}){
    return (
        <div className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${image}`} alt={title}/>
            <h3>{title}</h3>
            <div className='meal-item-actions'>
                <div className='meal-item-price'>{`$${price}`}</div>
                <div className='meal-item-description'>{description}</div>
                <button className='button'>Add to Cart</button>
            </div>
        </article>
    </div>
    )
}