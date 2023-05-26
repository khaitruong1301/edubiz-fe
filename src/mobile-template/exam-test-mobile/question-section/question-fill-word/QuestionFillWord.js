import { Checkbox } from "antd";
import environment from '../../../../environments/environment'
import MuiEditor from "../../../common/editor/MuiEditor";
import { useEffect } from "react";

const replaceString = (str, charOld) => {
    let strNew = '';
    let count = 1;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === charOld) {
            strNew += `<input class="fill-input" readonly value="(${count})" />`;
            count++;
        }
        else
            strNew += str[i];

    }
    return strNew;
}

const getTotalFill = (str, charOld) => {
    let arr = [];
    let count = 1;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === charOld) {
            arr.push({ value: '', label: 'Nhập câu trả lời chỗ trống thứ ' + count });
            count++;
        }
    }
    return arr;
}

function QuestionFillWord({ question, handleDapAn }) {

    useEffect(() => {
        const options = getTotalFill(question.description, '♥');
        handleDapAn(options, []);
    }, []);

    const handleTextOption = (e, index) => {
        const options = question.items.map((item, i) => {
            if(i == index) 
                return { ...item, value: e.target.value }
            return item;
        });
        handleDapAn(options, options.map(item => item.value));
    }

    const description = question.description ? replaceString(question.description, '♥') : '';
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
                <MuiEditor
                    html={description}
                    tagName="div"
                    field="description"
                    barDisable={false}
                    onChange={() => ({})}
                    disabled
                />
            </div>
            <div className="my-4">
                <b>Đáp án:</b>
            </div>
            <div className="mobile-question-option">
                {
                    question.items ? question.items.map((item, index) => {
                        return <div key={index} className="mobile-option-item">
                            <div className="mobile-option-item-checked">
                                <span className="mobile-option-item-span">{`${index + 1}.`}</span>
                                <div className="mobile-option-item-input">
                                    <input
                                        onChange={(e) => handleTextOption(e, index)}
                                        placeholder={item.label}
                                        value={item.value}
                                    />
                                </div>
                            </div>
                        </div>
                    }) : null
                }
            </div>
        </div>
    )
}

export default QuestionFillWord;