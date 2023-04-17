import React, { Component } from 'react';
import { Checkbox, Divider } from 'antd';

export default class MutipleChoose extends Component {

    state = {
        dsViTri: []
    }

    onChange = (e, index) => {
        const { checked } = e.target;
        const { baiTap } = this.props;
        const { dsViTri } = this.state;

        let danhSachViTri = [...dsViTri];
        if (checked) {
            danhSachViTri.push(index);
        }
        else {
            danhSachViTri = danhSachViTri.filter(x => x !== index);
        }
        console.log(danhSachViTri)
        let ketQua = true;
        for (let i = 0; i < danhSachViTri.length; i++) {
            if (!baiTap.dapAn[danhSachViTri[i]].luaChon) {
                ketQua = false;
                break;
            }
        }

        this.props.onChange(ketQua);
        this.setState({ dsViTri: danhSachViTri });

    };

    render() {
        const { baiTap } = this.props;

        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();
        return (
            <div className="mutiple-choose pl-5">
                <div style={{ overflow: "auto", height: "300px" }}>

                    <h6>{htmlToReactParser.parse(baiTap.tieuDe)}</h6>
                </div>
                <div className="row">
                    <div className="text-center col-md-12">
                        <Divider>ĐÁP ÁN</Divider>
                    </div>

                    {
                        baiTap.dapAn.map((dapAn, index) => {
                            let cauDung = dapAn.luaChon ? "answer" : "";
                            return <div className="col-md-6"><Checkbox key={index} className={cauDung}>
                                {dapAn.cauTraLoi}
                            </Checkbox></div>
                        })
                    }
                </div>
            </div>
        )
    }
}
