import React, { useEffect, useState } from 'react'
import { fetchMeals } from '../http'
import MealItem from './MealItem'

export default function Main(){
    const [meals, setMeals] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/meals')
         .then(response => response.json())
         .then((data) => setMeals(data))
    }, [])

    return (
        <main id='meals'>
            {meals.map(meal => (
                <MealItem 
                    image={meal.image} 
                    title={meal.name} 
                    price={meal.price} 
                    description={meal.description}
                />
            ))}
        </main>
    )
}