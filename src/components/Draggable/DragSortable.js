import React from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const reorder = (list, oldIndex, newIndex) => {
    // Tạo một bản sao chép từ danh sách cũ
    const temps = [...list];
    // Xóa phần tử ở vị trí cũ => trả về mảng phần tử đã xóa
    const [removed] = temps.splice(oldIndex, 1);
    // Thêm phần tử đã xóa khỏi vị trí cũ vào vị trí mới
    temps.splice(newIndex, 0, removed);

    return temps;
};

export default function DragSortable(props) {

    const {items, onDragEnd, droppableId, data} = props;

    const onDragEndHandle = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const temps = reorder(
            items, // Danh sách các phần tử
            result.source.index, // Vị trí cũ
            result.destination.index // Vị trí mới
        );

        const value = data || null;
        onDragEnd(temps, value);
    };

    return (
        <DragDropContext onDragEnd={onDragEndHandle}>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={snapshot.isDraggingOver ? "drag-sortable draging-over" : "drag-sortable"}
                    >
                        {
                            props.children
                        }
                        {
                            provided.placeholder
                        }
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
