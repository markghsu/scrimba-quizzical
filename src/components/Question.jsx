import React, {useState, useId} from 'react'
import './Question.css'

export default function Question({question, answers}) {
    const [selectedAnswer, setSelectedAnswer] = useState('')

    function handleChange(evt) {
        const {name, value} = evt.target
        setSelectedAnswer(evt.target.value)
    }

    const id = useId()


    return (
        <div role="radiogroup" className="question" aria-labelledby={id + "-question"}>
            <h3 className="question--label" id={id + "-question"}>{question}</h3>
                <div className="question--answers">
                    {
                        answers.map((ele, index) => (
                            <div className="question--answers--answer"><input
                                    type="radio"
                                    id={id + "-answer-" + index}
                                    name={id + "-question"}
                                    value={ele}
                                    checked={selectedAnswer === ele}
                                    onChange={handleChange}
                                    />
                                    <label htmlFor={id + "-answer-" + index}>{ele}</label>
                                </div>
                            ))
                        }
                </div>

        </div>
    )
}