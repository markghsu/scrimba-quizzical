import React from 'react'
import './Splash.css'

export default function Splash({title, description, buttonText, handleClick}) {
    return (
        <div className="splash">
            <h1 className="splash--title">{title}</h1>
            <h2 className="splash--subtitle">{description}</h2>
            <button className="splash--btn" onClick={handleClick} type="button">{buttonText}</button>
        </div>
    )
}