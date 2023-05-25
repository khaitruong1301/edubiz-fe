import { Checkbox } from "antd";
import environment from '../../../../environments/environment'
import MuiEditor from "../../../common/editor/MuiEditor";
import React, { useEffect, useState } from "react";

function QuestionShortAnswer({ question, handleDapAn }) {

    const handleChange = (field, value) => {
        handleDapAn([], value)
    }

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
                    <MuiEditor
                        html={question.dapAn ?? ''}
                        onChange={handleChange}
                        placeholder="Nhập đáp án"
                        tagName="div"
                        field="dapAn"
                    />
                }
            </div>
        </div>
    )
}


export default React.memo(QuestionShortAnswer);;