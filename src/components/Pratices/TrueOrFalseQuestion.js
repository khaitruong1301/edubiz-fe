import { Checkbox, Radio } from "antd";
import { useEffect } from "react";

function TrueOrFalseQuestion({ question, handleUserAnswers, itemIndex }) {

    useEffect(() => {
        const items = question.options.map(item => { return {...item, checked: false }})
        handleUserAnswers(items, [], itemIndex);
    }, []);

    const handleChecked = (e, index) => {
        const arrChecked = question.items.map((item, i) => {
            if(i == index) return { ...item, checked: true }
            return { ...item, checked: false };
        })
        const arrFilter = arrChecked.filter(item => item.checked);
        handleUserAnswers(arrChecked, arrFilter.map(item => item.value), itemIndex);
    }
    return (
        <div className="mobile-question">
            <div className="mobile-question-text">
                <b>{question.question}</b>
            </div>
            <div className="mobile-question-desc">
                <i>{ question.description }</i>
            </div>
            <div className="mobile-question-option">
                {
                    question.items ? question.items.map((item, index) => {
                        return <div key={index} className="mobile-option-item">
                            <div className='mobile-option-item-checked'>
                                <Radio 
                                    onChange={(e) => handleChecked(e, index)} 
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} 
                                    checked={item.checked}
                                />
                                <div className="mobile-option-item-text">
                                    <span>{item.value}</span>
                                </div>
                            </div>
                        </div>
                    }) : null
                }
            </div>
        </div>
    )
}

export default TrueOrFalseQuestion;