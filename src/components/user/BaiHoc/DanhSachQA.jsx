import React, { Component } from 'react';
import { Select, Collapse, Tag } from 'antd';


const { Option } = Select;
const { Panel } = Collapse;
export default class DanhSachQA extends Component {

    state = {
        maQA: 0
    }

    onChange = (value) => {
        this.setState({maQA:value})
    }

    render() {
        const { dsQA } = this.props;
        const { maQA } = this.state;

        let lstQA = dsQA;
        if (maQA != 0)
            lstQA = lstQA.filter(n => n.id == maQA);

        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        let lstColor = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];


        return (
            <div className="container">
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Nhập từ để tìm kiếm"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={0}>Tất cả</Option>
                    {dsQA.map(item => {
                        return <Option value={item.id}>{item.tieuDe}</Option>

                    })}
                </Select>
                <div className="row">
                    <div className=" col-md-12 h5 font-weight-bold py-4 border-bottom">
                        <b>Tất cả câu hỏi ({lstQA.length})</b>
                    </div>

                    <div className="col-md-12 " >
                        <Collapse >
                            {lstQA.map(item => {
                                let lstTag = JSON.parse(item.tags);
                                return <Panel header={<span className="font-weight-bold h6">{item.tieuDe} <br />

                                    {lstTag.map(tag => {
                                        return <Tag color={lstColor[Math.floor(Math.random() * 11)]}>{tag}</Tag>
                                    })}
                                </span>} key={item.id}>
                                    {htmlToReactParser.parse(item.noiDung)}
                                </Panel>

                            })}

                        </Collapse>
                    </div>


                </div>
            </div>
        )
    }
}
