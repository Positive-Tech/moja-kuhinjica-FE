import React, { useState } from 'react'

interface IQuestionLabelProps {
    question: string
    answer: string
}
export const QuestionLabel = ({
    question,
    answer,
}: IQuestionLabelProps): JSX.Element => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    return (
        <>
            <div className={showAnswer ? 'openAnswerLabel' : 'openAnswerLabel openAnswerLabel--labelWrapper'}>
                <label
                    className="questionLabel"
                    onClick={() => setShowAnswer(!showAnswer)}
                >
                    {question}
                </label>
                <svg
                    className={
                        showAnswer
                            ? 'svgButton svgButton--rotated'
                            : 'svgButton'
                    }
                    onClick={() => setShowAnswer(!showAnswer)}
                    width="19"
                    height="19"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L14.0404 8.62623C14.431 9.01675 14.431 9.64992 14.0404 10.0404L7.70711 16.3738C7.31658 16.7643 6.68342 16.7643 6.29289 16.3738C5.90237 15.9832 5.90237 15.3501 6.29289 14.9596L11.9191 9.33333L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289Z" />
                </svg>
            </div>
            {showAnswer && <div className="answerText">{answer}</div>}
        </>
    )
}
