import React, { Component } from 'react';
import { Radio, Divider } from 'antd';

let resetRadio = true;
export default class SingleChoose extends Component {

    state = {
        radioValue: "",
    }

    onChange = (e) => {
        const { value } = e.target;
        const { baiTap } = this.props;
        const dapAn = baiTap.dapAn[value];
        if (dapAn.luaChon) {
            this.props.onChange(true);
        }
        else {
            this.props.onChange(false);
        }
        resetRadio = false;
        this.setState({
            radioValue: value
        })
    };
    static getDerivedStateFromProps(props, state) {

        if (resetRadio) {

            return { radioValue: "" };
        } else {
            resetRadio = true;
        }
    }

    render() {
        const { baiTap } = this.props;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        return (
            <div className="single-choose pl-5 single-choose-answer">
                <div style={{ overflow: "auto", height: "300px" }}>
                    <h6>{htmlToReactParser.parse(baiTap.tieuDe)}</h6>
                </div>
                <div className="row">
                    <div className="text-center col-md-12">
                        <Divider >ĐÁP ÁN</Divider>
                    </div>

                    <Radio.Group >
                        {
                            baiTap.dapAn.map((dapAn, index) => {
                                let cauDung = dapAn.luaChon ? "answer" : "";
                                return <div className="col-md-6"><Radio className={cauDung} key={index} value={index}>{dapAn.cauTraLoi}</Radio></div>;
                            })
                        }
                    </Radio.Group>
                </div>
            </div>
        )
    }
}
