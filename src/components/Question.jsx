import React, {useState, useId} from 'react'
import './Question.css'

export default function Question({question, answers, selectedAnswer, handleAnswerSelected}) {

    function handleChange(evt) {
        handleAnswerSelected(evt.target.value)
    }

    const id = useId()

    return (
        <div role="radiogroup" className="question" aria-labelledby={id + "-question"}>
            <h3 className="question--label" id={id + "-question"}>{question}</h3>
                <div className="question--answers">
                    {
                        answers.map((ele, index) => (
                            <div className="question--answer" key={index}>
                                <input
                                    type="radio"
                                    id={id + "-answer-" + index}
                                    name={id + "-question"}
                                    value={ele}
                                    checked={selectedAnswer === ele}
                                    onChange={(evt) => {handleAnswerSelected(evt.target.value)}}
                                    />
                                    <label htmlFor={id + "-answer-" + index}>{ele}</label>
                            </div>
                        ))
                    }
                </div>

        </div>
    )
}