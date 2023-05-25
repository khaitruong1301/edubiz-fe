import { Checkbox } from "antd";
import environment from '../../../../environments/environment'
import MuiEditor from "../../../common/editor/MuiEditor";

const replaceString = (str, charOld) => {
    let strNew = '';
    let count = 1;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === charOld) {
            strNew += `<input class="fill-input" value="(${count})" />`;
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
            arr.push('Nhập câu trả lời chỗ trống thứ ' + count);
            count++;
        }
    }
    return arr;
}

function QuestionFillWord({ question }) {

    const handleChange = () => {

    }

    const handleTextOption = (e, index) => {

    }

    const description = question.description ? replaceString(question.description, '♥') : '';
    const options = getTotalFill(question.description, '♥');

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
                    onChange={handleChange}
                    tagName="div"
                    field="description"
                    barDisable={false}
                />
            </div>
            <div className="my-2">
                <b>Đáp án:</b>
            </div>
            <div className="mobile-question-option">
                {
                    options.map((item, index) => {
                        return <div key={index} className="mobile-option-item">
                            <div className="mobile-option-item-checked">
                                <span className="mobile-option-item-span">{`${index + 1}.`}</span>
                                <div className="mobile-option-item-input">
                                    <input
                                        onChange={(e) => handleTextOption(e, index)}
                                        placeholder={item}
                                    />
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default QuestionFillWord;