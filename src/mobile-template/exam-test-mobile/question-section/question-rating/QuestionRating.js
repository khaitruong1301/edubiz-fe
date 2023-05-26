import { Rate } from "antd";
import environment from '../../../../environments/environment'
import { useState } from "react";

function QuestionRating({ question, handleDapAn }) {

    const handleChange = (value) => {
        handleDapAn([], [`${value}`])
    }

    const listRating = question.options.map(item => item.value);
    const rating = question.dapAn ?? 2;
    return (
        <div className="mobile-question">
            <div className="mobile-question-text">
                <b>{question.question.content}</b>
            </div>
            <div className="mobile-question-image">
                {
                    question.question.image ?
                        <img style={{ maxWidth: '100px' }} src={environment.baseUrl + question.question.image} />
                        : null
                }
            </div>
            <div className="mobile-question-desc">
                <i>{question.description}</i>
            </div>
            <div className="mobile-question-option">
                {
                    <span>
                        <Rate tooltips={listRating} onChange={handleChange} value={rating} style={{ fontSize: 20 }} />
                        { rating ? <span className="ant-rate-text ml-3" style={{ fontSize: 16 }}>{listRating[rating - 1]}</span> : ''}
                    </span>
                }
            </div>
        </div>
    )
}

export default QuestionRating;