import React from 'react';
import { Draggable } from "react-beautiful-dnd";

export default function SortableItem(props) {
    const { draggableId, index } = props;
    return (
        <Draggable draggableId={ draggableId } index={ index }>
            {   (provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? "sortable-item draging" : "sortable-item"}
                    >
                        {
                            props.children
                        }
                    </div>
                )
            }
        </Draggable>
    )
}
