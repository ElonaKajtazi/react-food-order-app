import React from 'react'
import useHttp from '../hooks/useHttp'
import ErrorComp from './ErrorComp'
import MealItem from './MealItem'

const requestConfig = {}

export default function Main(){

   const {
    data: loadedMeals, 
    isLoading, 
    error
} = useHttp('http://localhost:3000/meals', requestConfig, [])

   if(isLoading) {
    return <p className='center'>Loading meals....</p>
   }
   
   if(error) {
    return <ErrorComp title='Failed to fetch meals' message={error}/>
   }

    return (
        <main id='meals'>
            {loadedMeals.map(meal => (
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </main>
    )
}