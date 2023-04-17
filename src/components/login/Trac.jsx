import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LAY_BAI_TAP } from '../../redux/types/ActionsTypes';



class Trac extends Component {

    state = {
        flag: -1,
        dapAn: [],
        next: 5,
        thongBao: ""
    }

    chonDapAn = (tracNghiem, maChon) => {
        let { dapAn, flag } = this.state;

        switch (tracNghiem.loaiBaiTap) {

            case 1: {
                let dapAnDung = JSON.parse(tracNghiem.dapAn);
                let cauTraLoi = JSON.parse(tracNghiem.cauTraLoi);
                let layTraLoi = cauTraLoi.find(n => n.ma == maChon);

                let dapAnTam = dapAn;
                let flagTam = flag;
                flagTam++;

                if (flagTam > dapAnDung.length - 1)
                    flagTam = 0;


                dapAnTam[flagTam] = ({ ma: layTraLoi.ma, noiDung: layTraLoi.noiDung });

                this.setState({ dapAn: dapAnTam, flag: flagTam });

            }
                break;
            case 2: {
                let dapAnDung = JSON.parse(tracNghiem.dapAn);
                let cauTraLoi = JSON.parse(tracNghiem.cauTraLoi);
                let layTraLoi = cauTraLoi.find(n => n.ma == maChon);

                let dapAnTam = dapAn;
                let flagTam = flag;
                flagTam++;

                if (flagTam > dapAnDung.length - 1)
                    flagTam = 0;


                dapAnTam[flagTam] = ({ ma: layTraLoi.ma, noiDung: layTraLoi.noiDung });

                this.setState({ dapAn: dapAnTam, flag: flagTam });

            }
                break;
        }

    }

    checkDapAn = (tracNghiem) => {
        let { dapAn } = this.state;

        switch (tracNghiem.loaiBaiTap) {
            case 1: {
                let dapAnDung = JSON.parse(tracNghiem.dapAn);

                let kiemTra = true;
                for (let i = 0; i < dapAn.length; i++) {
                    if (parseInt(dapAnDung[i]) != parseInt(dapAn[i].ma)) {
                        kiemTra = false;
                    }
                }
                if (kiemTra)
                    this.setState({ thongBao: <span className="text-primary h3">Đúng</span> })
                else
                    this.setState({ thongBao: <span className="text-danger h3">Sai</span> })
            }
                break;
            case 2: {
                let dapAnDung = JSON.parse(tracNghiem.dapAn);

                let kiemTra = true;
                for (let i = 0; i < dapAn.length; i++) {
                    if (parseInt(dapAnDung[i]) != parseInt(dapAn[i].ma)) {
                        kiemTra = false;
                    }
                }
                if (kiemTra)
                    this.setState({ thongBao: <span className="text-primary h3">Đúng</span> })
                else
                    this.setState({ thongBao: <span className="text-danger h3">Sai</span> })
            }
                break;
            case 3: {
                let kiemTra = document.getElementById("txt-traloi").value.trim();
                let dapAnDung = JSON.parse(tracNghiem.dapAn);

                if (dapAnDung.find(n => n == kiemTra))
                    this.setState({ thongBao: <span className="text-primary h3">Đúng</span> })
                else
                    this.setState({ thongBao: <span className="text-danger h3">Sai</span> })
            }
                break;
            case 4: {
                let dapAnDung = JSON.parse(tracNghiem.dapAn);

                if (parseInt(dapAnDung[0]) == parseInt(dapAn))
                    this.setState({ thongBao: <span className="text-primary h3">Đúng</span> })
                else
                    this.setState({ thongBao: <span className="text-danger h3">Sai</span> })
            }
                break;
            case 5: {
                let dapAnDung = JSON.parse(tracNghiem.dapAn);

                let kiemTra = true;
                dapAn.map(item => {
                    if (!dapAnDung.find(n => n == item)) {
                        kiemTra = false;
                        return
                    }

                })

                if (dapAnDung.length == dapAn.length && kiemTra)
                    this.setState({ thongBao: <span className="text-primary h3">Đúng</span> })
                else
                    this.setState({ thongBao: <span className="text-danger h3">Sai</span> })
            }
                break;
        }
    }

    loadCauHoi = (tracNghiem) => {
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();
        let { dapAn } = this.state;



        switch (tracNghiem.loaiBaiTap) {
            case 1: {
                let cauTraLoi = JSON.parse(tracNghiem.cauTraLoi);

                let changeNoiDung = tracNghiem.noiDung;


                for (let i = 0; i < cauTraLoi.length; i++) {
                    if (dapAn[i])
                        changeNoiDung = changeNoiDung.replace('♥', dapAn[i].noiDung)
                    else
                        changeNoiDung = changeNoiDung.replace('♥', '<span style="border: 2px dotted black; padding: 0 10px; border-radius: 5px;  ">?</span>')
                }

                return <div className="row p-5">
                    <div className="col-md-12 font-weight-bold h3 p-2">
                        {tracNghiem.tieuDe}
                    </div>
                    <div className="col-md-12 p-2 mb-3" style={{ background: 'rgb(229, 225, 218)' }}>
                        <pre>{htmlToReactParser.parse(changeNoiDung)}</pre>
                    </div>
                    <div className="col-md-12 text-white p-2 mb-2" style={{ background: ' rgb(5, 25, 45)' }}>
                        <pre className="text-white">{htmlToReactParser.parse(tracNghiem.outPut)}</pre>
                    </div>
                    <div className="col-md-12 p-2 mb-2">
                        {cauTraLoi.map(item => {
                            return <span onClick={() => { this.chonDapAn(tracNghiem, item.ma) }} className="px-3 py-2 border bg-white mr-2" id={item.ma}>{item.noiDung}</span>
                        })}
                    </div>
                    <button className="btn btn-success" onClick={() => this.checkDapAn(tracNghiem)}> Check</button>
                </div>

            }

            case 2: {

                let cauTraLoi = JSON.parse(tracNghiem.cauTraLoi);

                let changeNoiDung = `
                    <div class="col-md-6">
                    <pre> ${tracNghiem.noiDung}</pre>

                    </div>
                    <div class="col-md-6" style= "background: cornsilk">
                    <pre>   ${tracNghiem.noiDungCss}  </pre>

                    </div>`



                for (let i = 0; i < cauTraLoi.length; i++) {
                    if (dapAn[i])
                        changeNoiDung = changeNoiDung.replace('♥', dapAn[i].noiDung)
                    else
                        changeNoiDung = changeNoiDung.replace('♥', '<span style="border: 2px dotted black; padding: 0 10px; border-radius: 5px;  ">?</span>')

                }

                return <div className="row p-5">
                    <div className="col-md-12 font-weight-bold h3 p-2">
                        {tracNghiem.tieuDe}
                    </div>
                    <div className="col-md-12 p-2 mb-3" style={{ background: 'rgb(229, 225, 218)' }}>
                        {htmlToReactParser.parse(changeNoiDung)}

                    </div>
                    <div className="col-md-12 text-white p-2 mb-2" style={{ background: ' rgb(5, 25, 45)' }}>
                        <pre className="text-white">{htmlToReactParser.parse(tracNghiem.outPut)}</pre>
                    </div>
                    <div className="col-md-12 p-2 mb-2">
                        {cauTraLoi.map(item => {
                            return <span onClick={() => { this.chonDapAn(tracNghiem, item.ma) }} className="px-3 py-2 border bg-white mr-2" id={item.ma}>{item.noiDung}</span>
                        })}
                    </div>
                    <button className="btn btn-success" onClick={() => this.checkDapAn(tracNghiem)}>Check</button>
                </div>

            }
            case 3: {
                let changeNoiDung = tracNghiem.noiDung.replace('♥', '<input style="width: 100px;" id="txt-traloi" />')

                return <div className="row p-5">
                    <div className="col-md-12 font-weight-bold h3 p-2">
                        {tracNghiem.tieuDe}
                    </div>
                    <div className="col-md-12 p-2 mb-3" style={{ background: 'rgb(229, 225, 218)' }}>

                        <pre>{htmlToReactParser.parse(changeNoiDung)}</pre>


                    </div>
                    <div className="col-md-12 text-white p-2 mb-2" style={{ background: ' rgb(5, 25, 45)' }}>
                        <pre className="text-white">{htmlToReactParser.parse(tracNghiem.outPut)}</pre>
                    </div>
                    <button className="btn btn-success" onClick={() => { this.checkDapAn(tracNghiem) }} >Check</button>
                </div>

            }
            case 4: {
                let cauTraLoi = JSON.parse(tracNghiem.cauTraLoi);
                return <div className="row p-5">
                    <div className="col-md-12 font-weight-bold h3 p-2">
                        {tracNghiem.tieuDe}
                    </div>
                    <div className="col-md-12 p-2 mb-3" style={{ background: 'rgb(229, 225, 218)' }}>

                        <pre>{htmlToReactParser.parse(tracNghiem.noiDung)}</pre>


                    </div>
                    <div className="col-md-12 text-white p-2 mb-2" style={{ background: ' rgb(5, 25, 45)' }}>
                        <pre className="text-white">{htmlToReactParser.parse(tracNghiem.outPut)}</pre>
                    </div>
                    <div className="col-md-12 p-2 mb-2">
                        {cauTraLoi.map(item => {
                            return <pre className="px-3 py-2 border bg-white" >
                                <input type="radio" id={item.ma} name="fav_language" onClick={() => {
                                    this.setState({ dapAn: item.ma })
                                }} />{item.noiDung}
                            </pre>

                        })}
                    </div>
                    <button className="btn btn-success" onClick={() => { this.checkDapAn(tracNghiem) }}>Check</button>
                </div>

            }

            case 5: {
                let cauTraLoi = JSON.parse(tracNghiem.cauTraLoi);
                return <div className="row p-5">
                    <div className="col-md-12 font-weight-bold h3 p-2">
                        {tracNghiem.tieuDe}
                    </div>
                    <div className="col-md-12 p-2 mb-3" style={{ background: 'rgb(229, 225, 218)' }}>

                        <pre>{htmlToReactParser.parse(tracNghiem.noiDung)}</pre>


                    </div>
                    <div className="col-md-12 text-white p-2 mb-2" style={{ background: ' rgb(5, 25, 45)' }}>
                        <pre className="text-white">{htmlToReactParser.parse(tracNghiem.outPut)}</pre>
                    </div>
                    <div className="col-md-12 p-2 mb-2">
                        {cauTraLoi.map(item => {
                            return <pre className="px-3 py-2 border bg-white" >
                                <input type="checkbox" id={item.ma} onClick={() => {
                                    var checkBox = document.getElementById(item.ma).checked;

                                    let dapAnCheck = dapAn;

                                    if (checkBox == true) {
                                        dapAnCheck.push(item.ma)
                                    } else {
                                        dapAnCheck = dapAnCheck.filter(n => n != item.ma);
                                    }


                                    this.setState({ dapAn: dapAnCheck })
                                }} />{item.noiDung}
                            </pre>

                        })}
                    </div>
                    <button className="btn btn-success" onClick={() => { this.checkDapAn(tracNghiem) }}>Check</button>
                </div>

            }

        }
    }
    xuatNoiDung = () => {

        const { dsBaiTap } = this.props;
        let { next } = this.state;

        return dsBaiTap.map(item => {
            if (item.id == next)
                return this.loadCauHoi(item);
        })
    }
    render() {

        let { next, thongBao } = this.state;

        if (next == 6)
            this.setState({ next: 1 })

        return (
            <div className="container" style={{ background: 'rgb(247, 243, 235)' }}>

                {this.xuatNoiDung()}
                <button onClick={() => this.setState({ next: next + 1, flag: -1, dapAn: [] })}>Tiếp</button>

                {thongBao}

            </div>
        )
    }
    componentDidMount = () => {

        this.props.dispatch({ type: LAY_BAI_TAP })

    }
}
const mapStateToProps = (state) => {

    return {
        dsBaiTap: state.BaiHocReducer.dsBaiTap,
    }


}


export default connect(mapStateToProps)(Trac)