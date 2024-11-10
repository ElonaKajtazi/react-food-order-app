import React from 'react'
import logo from '../assets/logo.jpg'

export default function Header(){
    return(
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt='food logo'/>
                <h1>ReactFood</h1>
            </div>
            <button className='text-button'>Cart(0)</button>
        </header>
    )
}