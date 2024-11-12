import React, { useEffect, useState } from 'react'
import MealItem from './MealItem'

export default function Main(){
    const [meals, setMeals] = useState([])

    useEffect(() => {
        async function fetchMeals(){
            const response = await fetch('http://localhost:3000/meals')
            if(!response.ok){
                //...
            }

            const meals = await response.json()
            setMeals(meals)
        }
        
        fetchMeals()
    }, [])

    return (
        <main id='meals'>
            {meals.map(meal => (
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </main>
    )
}