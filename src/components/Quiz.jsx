import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Question from './Question'
import './Quiz.css'

export default function Quiz() {
    const [questions, setQuestions] = useState([])
    const [isGraded, setIsGraded] = useState(false)

    useEffect(() => {
        if(isGraded) return; // ONLY GET NEW QUESTIONS IF WE ARE NEW/RESETTING GAME
        let controller = new AbortController()
        let signal = controller.signal

        getData(signal).then(data => {
            if(data) setQuestions(data)
        })

        return () => {
            // ABORT TO CLEAN UP IN CASE WE MOUNT THIS COMPONENT MULITPLE TIME
            // WE NEED THIS TO PREVENT 429 ERRORS
            controller.abort()
        };
    },[isGraded])

    function getData(signal) {
        const api = "https://opentdb.com/api.php?amount=5&category=9&type=multiple"

        return fetch(api,{ signal })
            .then(res => {
                if(!res.ok) throw "Error"
                return res.json()
            }).then(data => {
                const qs = data.results.map((ele) => {
                    // CLEAN ALL INCOMING DATA OF HTML ENTITIES
                    const correctAnswer = decode(ele.correct_answer)
                    const incorrectAnswers = ele.incorrect_answers.map(ans => decode(ans))
                    const allAnswers = mixAnswers(correctAnswer, incorrectAnswers)

                    return({
                        id: nanoid(),
                        question: decode(ele.question),
                        correctAnswer,
                        allAnswers,
                        selectedAnswer: ''
                    })
                })
                return qs

            }).catch(err => {
                return null
            })
    }

    function mixAnswers(correct, incorrect) {
        // RANDOMLY INSERT THE CORRECT ANSWER
        const ind = Math.floor(Math.random()*incorrect.length)
        return [...incorrect.slice(0,ind),correct,...incorrect.slice(ind)]
    }

    function handleAnswerSelected(id, val) {
        setQuestions(prev => prev.map(question => {
            return (question.id === id)?
                {
                    ...question,
                    selectedAnswer: val
                }
            :question
        }))
    }

    function gradeQuiz(evt) {
        evt.preventDefault()
        setIsGraded(true)
    }

    function restartQuiz() {
        setIsGraded(false)
    }

    return (
        <form className="quiz" onSubmit={gradeQuiz}>
            {questions.map(ele =>
                <Question
                    key={ele.id}
                    question={ele.question}
                    answers={ele.allAnswers}
                    selectedAnswer={ele.selectedAnswer}
                    handleAnswerSelected={(val) => handleAnswerSelected(ele.id,val)}
                    disable={isGraded}
                    actualAnswer={isGraded?ele.correctAnswer:""}
                />
            )}
            {isGraded?
                <div className="quiz--gameover">
                    <p className="quiz--score">You scored {
                        questions.reduce((score, e) => score + (e.selectedAnswer === e.correctAnswer?1:0),0)
                    }/{questions.length} correct answers</p>
                    <button type="button" className="quiz--btn" onClick={restartQuiz}>Restart Game</button>
                </div>
            :<button type="submit" className="quiz--btn quiz--submit">Check Answers</button>}
        </form>
    )
}