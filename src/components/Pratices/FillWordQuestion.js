import { Checkbox } from "antd";
import MuiEditor from "../../mobile-template/common/editor/MuiEditor";
import { useEffect, useState } from "react";

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

const getFillItem = (str, charOld) => {
    let arr = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i] === charOld) {
            arr.push('')
        }

    }
    return arr;
}

function FillWordQuestion({ question, handleUserAnswers, itemIndex }) {

    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions(getFillItem(question.description, '♥'));
    }, []);

    useEffect(() => {
        setOptions(getFillItem(question.description, '♥'));
    }, [question.description]);

    const handleTextOption = (e, index) => {
        const arr = options.map((item, i) => {
            if(i == index) 
                return e.target.value 
            return item;
        });
        setOptions(arr)
        handleUserAnswers(arr, arr, itemIndex);
    }

    const description = question.description ? replaceString(question.description, '♥') : '';

    return (
        <div className="mobile-question">
            <div className="mobile-question-text">
                <b>{question.question}</b>
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
                    options ? options.map((item, index) => {
                        return <div key={index} className="mobile-option-item">
                            <div className="mobile-option-item-checked">
                                <span className="mobile-option-item-span">{`${index + 1}.`}</span>
                                <div className="mobile-option-item-input">
                                    <input
                                        onChange={(e) => handleTextOption(e, index)}
                                        placeholder={`Nhập câu trả lời cho chỗ trống thứ ${index + 1}`}
                                        value={item}
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

export default FillWordQuestion;