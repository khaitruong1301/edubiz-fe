import { Checkbox } from "antd";
import { DragSortable, SortableItem } from "../Draggable";
import { useEffect } from "react";

function SorttingQuestion({ question, handleUserAnswers, itemIndex }) {

    useEffect(() => {
        handleUserAnswers(question.options.map((item, i) => {return {...item, index: i + 1}}), [], itemIndex);
    }, []);

    const onDragEnd = (items) => {
        handleUserAnswers(items, items.map((item) => `${item.index}`), itemIndex);
    };

    return (
        <div className="mobile-question">
            <div className="mobile-question-text">
                <b>{question.question}</b>
            </div>
            <div className="mobile-question-desc">
                <i>{question.description}</i>
            </div>
            <div className="mobile-question-option">
            { question.items ?<DragSortable items={question.items} onDragEnd={onDragEnd} droppableId="droppable">
                    {
                        question.items.map((item, index) => (
                            <SortableItem key={index} draggableId={`item-${index}`} index={index}>
                                <div key={index} className="mobile-option-item">
                                    <div className='mobile-option-item-drag'>
                                        <div className="mobile-option-item-text">
                                            <span>{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            </SortableItem>
                        ))
                    }
                </DragSortable> : null }
            </div>
        </div>
    )
}

export default SorttingQuestion;