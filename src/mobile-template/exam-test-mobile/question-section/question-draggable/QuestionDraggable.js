import { Checkbox } from "antd";
import environment from '../../../../environments/environment'

function QuestionDraggable({ question }) {
    return (
        <div className="mobile-question">
            <div className="mobile-question-text">
                <b>{question.question.content}</b>
            </div>
            <div className="mobile-question-image">
                { 
                    question.question.image ? 
                    <img style={{ maxWidth: '100px' }} src={environment.baseUrl + question.question.image } /> 
                    : null
                }
            </div>
            <div className="mobile-question-desc">
                <i>{ question.description }</i>
            </div>
            <div className="mobile-question-option">
                {
                    question.options.map((item, index) => {
                        return <div key={index} className="mobile-option-item">
                            <div className='mobile-option-item-drag'>
                                <div className="mobile-option-item-text">
                                    <span>{item.value}</span>
                                </div>
                            </div>
                            <div className='mobile-option-item-image'>
                                { 
                                    item.image ? 
                                    <img style={{ maxWidth: '100px' }} src={environment.baseUrl + item.image} /> 
                                    : null
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default QuestionDraggable;