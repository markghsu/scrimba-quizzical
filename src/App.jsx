import React, { useState } from 'react'
import Splash from './components/Splash'
import Quiz from './components/Quiz'
import './App.css'

export default function App() {
    const [quizStarted, setQuizStarted] = useState(false)

    return <main className="app">
        {
            quizStarted?
            <Quiz />
            :
            <Splash
                title="Quizzical"
                description="Random trivia questions from the Open Trivia API"
                buttonText="Start Quiz"
                handleClick={() => {setQuizStarted(true)}}
            />
        }
    </main>
}