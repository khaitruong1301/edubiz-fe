import React, { Component } from 'react';
import { DragSortable, SortableItem } from '../drag-drop';
import {Divider} from 'antd'

export default class SortingQuiz extends Component {

    state = {
        dsDapAn: [],
        baiTap: {}
    }

    componentDidMount = () => {
        const { baiTap } = this.props;
        this.setState({
            dsDapAn: baiTap.dapAn,
            baiTap
        })
    }

    onSapXepDapAn = (dsDapAn, data) => {
        const { baiTap } = this.props;
        let ketQua = true;
        for (let i = 0; i < dsDapAn.length; i++) {
            if (parseInt(dsDapAn[i].viTri) !== (i + 1)) {
                ketQua = false;
                break;
            }
        }
        this.setState({ dsDapAn });
        this.props.onChange(ketQua);
    }

    render() {
        const { baiTap, dsDapAn } = this.state;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        return (
            <div className="sorting-quiz pl-5">
                <div style={{ overflow: "auto", height: "215px" }}>

                    <h6>{htmlToReactParser.parse(baiTap.tieuDe)}</h6>
                </div>
                <div className="row">
                    <div className="text-center col-md-12">
                        <Divider>CÂU TRẢ LỜI</Divider>
                    </div>

                    <DragSortable items={dsDapAn} onDragEnd={this.onSapXepDapAn} droppableId="droppable">
                        {
                            dsDapAn.map((dapAn, index) => {
                                return <SortableItem key={index} draggableId={`item-${index}`} index={index}>
                                    <div className="sorting-quiz-item">
                                        <span>{dapAn.cauTraLoi}</span>
                                    </div>
                                </SortableItem>
                            })
                        }
                    </DragSortable>
                </div>
            </div>
        )
    }
}
