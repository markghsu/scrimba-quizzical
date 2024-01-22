import React, { useState, useEffect } from 'react'
import Splash from './components/Splash'
import './App.css'

export default function App() {
    const [quizStarted, setQuizStarted] = useState(false)

    return <main className="app">
        {
            quizStarted?
            <div>Started</div>
            :
            <Splash
                title="Quizzical"
                description="Some description if needed"
                buttonText="Start Quiz"
                handleClick={() => {setQuizStarted(true)}}
            />
        }
    </main>
}