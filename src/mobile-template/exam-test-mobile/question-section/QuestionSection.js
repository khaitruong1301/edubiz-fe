import React, { useEffect, useState } from "react";
import './QuestionSection.css';
import * as questionTypes from '../../../constants/questionTypes';
import QuestionChecbox from "./question-checkbox/QuestionCheckbox";
import QuestionRadio from "./question-radio/QuestionRadio";
import QuestionParagrah from "./question-paragraph/QuestionParagrah";
import QuestionShortAnswer from "./question-short-answer/QuestionShortAnswer";
import QuestionFillWord from "./question-fill-word/QuestionFillWord";
import QuestionRating from "./question-rating/QuestionRating";
import QuestionDraggable from "./question-draggable/QuestionDraggable";

function QuestionSection({ section, handleSetAnwers, itemIndex }) {

    const [model, setModel] = useState(section);

    useEffect(() => {
        setModel({
            ...model,
            items: model.options.map(item => {
                return { value: item.value, label: item.label, checked: false};
            })
        })
    }, []);

    const handleDapAn = (items, value) => {
        setModel({
            ...model,
            dapAn: value,
            items: items
        });
        handleSetAnwers(value, itemIndex)
    }

    const renderQuestion = () => {
        switch (section.questionType) {
            case questionTypes.MULTIPLE_CHOICE:
                return <QuestionRadio question={model} handleDapAn={handleDapAn}/>
            case questionTypes.CHECKBOXES:
                return <QuestionChecbox question={model} handleDapAn={handleDapAn}/>
            case questionTypes.SHORT_ANSWER:
                return <QuestionShortAnswer question={model} handleDapAn={handleDapAn}/>
            case questionTypes.PARAGRAPH:
                return <QuestionParagrah question={model} handleDapAn={handleDapAn}/>
            case questionTypes.FILL_WORD:
                return <QuestionFillWord question={model} handleDapAn={handleDapAn}/>
            case questionTypes.RATING:
                return <QuestionRating question={model} handleDapAn={handleDapAn}/>
            case questionTypes.DRAGGABLE:
                return <QuestionDraggable question={model} handleDapAn={handleDapAn}/>
            default:
                break;
        }
    }

    return (
        <div className="col-12 mobile-section">
            {
                renderQuestion()
            }
        </div>
    )
}

export default QuestionSection;