import { Rate } from "antd";
import environment from '../../../../environments/environment'
import { useState } from "react";

function QuestionRating({ question }) {

    const [rating, setRating] = useState(3); 

    const listRating = question.options.map(item => item.value);
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
                        <Rate tooltips={listRating} onChange={setRating} value={rating} style={{ fontSize: 16 }} />
                        { rating ? <span className="ant-rate-text ml-3" style={{ fontSize: 14 }}>{listRating[rating - 1]}</span> : ''}
                    </span>
                }
            </div>
        </div>
    )
}

export default QuestionRating;