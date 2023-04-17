import React, { Component, Fragment } from 'react';
import { Tag, Divider } from 'antd';

export default class EnteringQuiz extends Component {

    state = {
        dsDapAn: [],
        baiTap: {},
        dsLuaChon: []
    }

    componentDidMount = () => {
        const { baiTap } = this.props;
        this.setState({
            dsDapAn: baiTap.dapAn,
            baiTap
        })
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            baiTap: props.baiTap,
            dsDapAn: props.baiTap.dapAn
        };
    }

    onChange = (dapAn) => {
        const { dsLuaChon, dsDapAn } = this.state;
        if (dsLuaChon.length < dsDapAn.length) {
            dsLuaChon.push(dapAn);
        }

        if (dsLuaChon.length < 4) {
            this.props.onChange(false);
        }
        else {
            let ketQua = true;
            for (let i = 0; i < dsLuaChon.length; i++) {
                if (dsLuaChon[i] !== dsDapAn[i]) {
                    ketQua = false;
                    break;
                }
            }
            this.props.onChange(ketQua);
        }
        this.setState({ dsLuaChon, viTri: -1 });
    };

    onRefresh = () => {
        this.setState({ dsLuaChon: [] });
    }

    // Hàm thay thế các ký tự trong câu hỏi
    _replaceCharactor = (strQuiz) => {
        // Thay thế thẻ <br> bằng \n
        strQuiz = strQuiz.trim().replace(/(<br>|<\/br>)/g, '\n');
        // Cắt chuỗi câu hỏi (Gặp chuỗi ký tự dang [[1}} thì sẽ cắt)
        return strQuiz.split(/\[[[1-9]*}}/g);
    }

    _renderQuiz = (baiTap, dsLuaChon) => {
        const arrQuiz = this._replaceCharactor(baiTap.tieuDe);
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        let stringValue = "";
        // return arrQuiz.map((item, index) => {
        //     if (index < arrQuiz.length - 1) {
        //         return <Fragment>
        //             {htmlToReactParser.parse(item.trim())}
        //             <span><input
        //                 size="5"
        //                 defaultValue={dsLuaChon[index] ? dsLuaChon[index] : ''}
        //                 readOnly={true}
        //             /></span>
        //         </Fragment>
        //     }
        //     return htmlToReactParser.parse(item.trim())
        // })
        arrQuiz.map((item, index) => {
            if (index < arrQuiz.length - 1) {
                stringValue += item.trim();
                if (dsLuaChon[index]) stringValue += "<span><input size = '5' value = '" + dsLuaChon[index] + "' readOnly = 'true' /></span>"; else stringValue += "<span><input size = '5' readOnly = 'true' value=' ' /></span>";
            } else
                stringValue += item.trim();
        })
        return htmlToReactParser.parse(stringValue)
    }

    render() {
        const { baiTap, dsDapAn, dsLuaChon } = this.state;
        return (
            <div className="enter-quiz pl-5">
                <div style={{ overflow: "auto", height: "240px" }}>

                    {baiTap.tieuDe ? this._renderQuiz(baiTap, dsLuaChon) : null}
                </div>
               
            </div>
        )
    }
}
