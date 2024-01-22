import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
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
                const qs = data.results.map((ele) => ({
                    id: nanoid(),
                    question: decode(ele.question),
                    correct_answer: decode(ele.correct_answer),
                    incorrect_answer: ele.incorrect_answers.map(ans => decode(ans)),
                }))
                setQuestions(qs);
            }).catch(err => {
                console.error(err)
            })

        return () => {
            controller.abort()
        };
    },[])
    return (
        <section className="quiz">
            {questions.map(ele => <div key={ele.id}>{ele.question}</div>)}
        </section>
    )
}