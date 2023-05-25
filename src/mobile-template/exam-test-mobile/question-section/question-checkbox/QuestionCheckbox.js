import { Checkbox } from "antd";
import environment from '../../../../environments/environment'
import { useEffect, useState } from "react";

function QuestionChecbox({ question, handleDapAn }) {
    
    const handleChecked = (e, index) => {
        const arrChecked = question.items.map((item, i) => {
            if(i == index) return { ...item, checked: e.target.checked }
            return item;
        })
        const arrFilter = arrChecked.filter(item => item.checked);
        handleDapAn(arrChecked, arrFilter.map(item => item.value));
    }

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
                     question.items ? question.items.map((item, index) => {
                        return <div key={index} className="mobile-option-item">
                            <div className='mobile-option-item-checked'>
                                <Checkbox 
                                    onChange={(e) => handleChecked(e, index)} 
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} 
                                    checked={item.checked}
                                />
                                <div className="mobile-option-item-text">
                                    <span>{item.label}</span>
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
                    }) : null
                }
            </div>
        </div>
    )
}

export default QuestionChecbox;