import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Question from './Question'
import './Quiz.css'

const api = "https://opentdb.com/api.php?amount=5&category=9&type=multiple"

export default function Quiz() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal

        fetch(api,{ signal })
            .then(res => res.json())
            .then(data => {
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
                setQuestions(qs);

            }).catch(err => {
                console.error(err)
            })

        return () => {
            // ABORT TO CLEAN UP IN CASE WE MOUNT THIS COMPONENT MULITPLE TIME
            // WE NEED THIS TO PREVENT 429 ERRORS
            controller.abort()
        };
    },[])

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
    return (
        <form className="quiz">
            {questions.map(ele =>
                <Question
                    key={ele.id}
                    question={ele.question}
                    answers={ele.allAnswers}
                    selectedAnswer={ele.selectedAnswer}
                    handleAnswerSelected={(val) => handleAnswerSelected(ele.id,val)}
                />
            )}
        </form>
    )
}