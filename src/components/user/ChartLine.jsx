import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { LAY_DANH_SACH_TIEN_TRINH_HOC, LAY_DANH_SACH_NGUOI_DUNG, LAY_LICH_SU_TUONG_TAC_THEO_USER } from '../../redux/types/ActionsTypes';
import { HOAN_THANH_BAI_HOC, QUESTION, COMMENT } from '../../redux/Config/LichSuDataStyle';
import { dinhDangTheoNgay, dinhDangNgayCheck } from '../../commons/format/FormatDate';
import { DatePicker, Select, Tag, Avatar, Badge, Table } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

// color chart
const colorChart = ["#ff6384", "#91da72", "#84e0de", "#9361dc", "#FB9E39", "#3AA2FF"];
const colorTOP = ["green", "cyan", "purple", "orange", "blue"]

//data chart main
var myChart = "";

// khoi tao du lieu chart
var dateStart = "";
var dateEnd = "";
var listUser = [];
var hanhDong = "0";

var checkSelectTOP = false;

class ChartLine extends Component {
    state = {
        //khoi tao label header chart
        headerContentChart: "Tổng video đã học",
        headerDateChart: "(Trong tuần)",

        //khoi tao du lieu table 
        tableData: [],
    }

    // draw chart line
    createChartLine = (labelChart, dataChart) => {
        //destroy data chart old
        if (myChart) {
            myChart.destroy();
        }
        var ctx = document.getElementById('myChartLine');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelChart,
                datasets: dataChart
            },
        });

    }

    // lay danh sach date trong khoang date1 - date2
    getDSNgay = (dStart, dEnd) => {

        var listDate = [];
        var startDate = new Date(dStart);
        var endDate = new Date(dEnd);

        while (startDate <= endDate) {

            listDate.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        };

        return listDate;
    }


    //xu lieu du lieu chart
    layDuLieuChart = () => {

        //list luu data hien thi chi tiet
        var listData = [];

        //list data chinh
        let data = [];

        //khoi tao data chart
        var listlabelChart = [];
        var dataChart = []



        //lay du lieu tu csdl
        const { dsLichSu } = this.props;
        const { dsNguoiDung } = this.props;

        let listDate = this.getDSNgay(dateStart, dateEnd);

        listDate.map(dateList => { listlabelChart.push(dinhDangTheoNgay(dateList)); });


        for (var i = 0; i < listUser.length; i++) {

            listData = [];
            data = dsLichSu.filter(n => n.nguoiDungId == listUser[i]);

            //filter theo hanh dong 0: HOAN_THANH_BAI_HOC, 1: QUESTION, COMMENT 
            switch (hanhDong) {
                case "0":
                    data = data.filter(n => n.hanhDong == HOAN_THANH_BAI_HOC);
                    break;
                case "1":
                    data = data.filter(n => n.loaiSuKien === QUESTION || n.loaiSuKien === COMMENT);
                    break;
            }

            listDate.map(dateList => {
                let dataCheck = data.filter(function (product) {
                    var dStart = Date.parse(dinhDangNgayCheck(dateList));
                    var dData = Date.parse(dinhDangNgayCheck(product.ngayTao));

                    if (dData == dStart)
                        return product

                });

                if (dataCheck != undefined)
                    listData.push(dataCheck.length);
                else
                    listData.push(0);
            })

            //tao bien label hien thi chart
            let labelName = "Bạn";
            if (i > 0) {
                //lay du lieu nguoi dung
                let dataUser = dsNguoiDung.find(n => n.id == listUser[i]);

                if (dataUser != undefined) {

                    labelName = dataUser.hoTen;
                }
            }

            dataChart = [...dataChart, {
                label: labelName,
                borderColor: colorChart[i],
                data: listData,
                backgroundColor: 'transparent',
                lineTension: 0.1
            }];
        }


        this.createChartLine(listlabelChart, dataChart);


    }

    // filter theo ngay
    searchNgayTao = (datestring) => {

        //check null thi gan lai gia tri ban dau
        if (datestring != "") {
            //gan du lieu filter theo ngay bat - ngay ket thuc
            dateStart = datestring[0];
            dateEnd = datestring[1];
            this.setState({ headerDateChart: `(${dinhDangTheoNgay(datestring[0])} - ${dinhDangTheoNgay(datestring[1])})` })
        } else {
            this.ganDuLieuDefault();
            this.setState({ headerDateChart: "(Trong tuần)" });
        }

        //callback du lieu table
        this.layDuLieuTable();
        //callback du lieu va draw chart
        this.layDuLieuChart();
    }

    //gan du lieu ban dau (week)
    ganDuLieuDefault = () => {

        var currDate = new Date; // get current date
        var first = "";
        var last = "";
        //lay ngay dau va cuoi cua tuan
        first = currDate.getDate() - currDate.getDay() + (currDate.getDay() == 0 ? -6 : 1); // First day is the day of the month - the day of the week
        last = first + 6; // last day is the first day + 6
        dateStart = currDate.setDate(first);
        dateEnd = currDate.setDate(last);
    }

    // xu ly filter select hanh dong
    xuatDSHanhDong = () => {

        return (
            <Select defaultValue="0" style={{ width: 150 }} onSelect={(value) => this.filterHanhDong(value)}>
                <Option value="0">Video đã học</Option>
                {/* <Option value="1">Số bài thảo luận</Option> */}

            </Select>
        )
    }

    //filter theo hanh dong 0: HOAN_THANH_BAI_HOC, 1: QUESTION, COMMENT 
    filterHanhDong = (value) => {

        hanhDong = value;

        //set lai label header chart
        switch (value) {
            case "0":
                this.setState({ headerContentChart: "Tổng video đã học" })
                break;
            case "1":
                this.setState({ headerContentChart: "Tổng số bài thảo luận" })
                break;
        }

        //callback tao lai du lieu va draw chart
        this.layDuLieuChart();
    }

    //xu ly filter user TOP
    selectLocUserTOP = () => {

        return (
            <Select defaultValue="0" style={{ width: 150, paddingLeft: 10 }} onSelect={(value) => this.filterLocUserTOP(value)}>
                <Option value="0">Chỉ mình bạn</Option>
                {/* <Option value="1">Học viên TOP đầu</Option>
                <Option value="2">Học viên cùng level</Option> */}

            </Select>
        )
    }

    //filter theo hanh dong 0: only you , 1: TOP , 2: same lvl
    filterLocUserTOP = (value) => {

        const { userID } = this.props;

        //lay du lieu 5 nguoi top dau va cung hang
        let dataTOP = [userID, "0c6760e7-fd8e-4934-b4ea-bca614f465e7", "8a15dad9-01b4-4f3d-8b1d-6bf17b43d971", "f97097e6-0932-4e64-804d-7b3eadaae33a", "0162ac2e-08a3-4319-a437-248a23a18609", "0c242348-c01b-491a-95b3-2002203f4cd6"];

        let dataSameTOP = [];


        //lay element div top
        var elementDivTOP = document.getElementsByClassName("div_chart_top");

        switch (value) {
            case "0":
                elementDivTOP[0].setAttribute("hidden", ""); // an div top
                listUser = [userID];
                break;
            case "1":
                elementDivTOP[0].removeAttribute("hidden"); // hien thi div top 
                listUser = dataTOP;
                checkSelectTOP = true;
                break;
            case "2":
                checkSelectTOP = false;
                break;

        }

        //callback du lieu table
        this.layDuLieuTable();

        //callback tao lai du lieu va draw chart
        this.layDuLieuChart();
    }

    // xuat cac div tag nguoi dung TOP dau
    xuatDSNguoiDungTOP = () => {
        let dataTOP = ["0c6760e7-fd8e-4934-b4ea-bca614f465e7", "8a15dad9-01b4-4f3d-8b1d-6bf17b43d971", "f97097e6-0932-4e64-804d-7b3eadaae33a", "0162ac2e-08a3-4319-a437-248a23a18609", "0c242348-c01b-491a-95b3-2002203f4cd6"];

        let dataUser = [];
        const { dsNguoiDung } = this.props;

        let listContent = [];

        for (let i = 0; i < dataTOP.length; i++) {

            //lay thong tin user
            dataUser = dsNguoiDung.find(n => n.id == dataTOP[i]);

            if (dataUser != undefined) {

                //kiem tra xu ly top 1
                if (i == 0) {
                    listContent.push(
                        <Tag color="green" style={{ height: 35, marginRight: 25 }}>
                            <Badge count={"TOP 1"} >
                                <Avatar size="small"
                                    src={dataUser.avatar}
                                    style={{ margin: 5 }}
                                />
                                {dataUser.hoTen}
                            </Badge>

                        </Tag>)

                }
                else {
                    let top = i + 1;
                    listContent.push(<Tag color={colorTOP[i]} style={{ height: 35, marginRight: 25 }}>
                        <Badge count={top} style={{ backgroundColor: "#52c41a" }}>
                            <Avatar src={dataUser.avatar} size="small" style={{ margin: 5 }} />
                            {dataUser.hoTen}
                        </Badge>
                    </Tag>)

                }
            }
        }
        return listContent;
    }


    //xu ly du lieu table duoi chart
    layDuLieuTable = () => {

        //lay du lieu tu csdl
        const { dsLichSu } = this.props;
        const { dsNguoiDung } = this.props;

        // du lieu chinh 
        let data = []

        //du lieu luu tam
        let dataTam = [];


        //khoi tao bien de lay du lieu chi tiet
        var dataVideos = [];
        var dataScores = [];

        for (var i = 0; i < listUser.length; i++) {


            // loc theo id user
            dataTam = dsLichSu.filter(n => n.nguoiDungId == listUser[i]);

            //loc theo date 
            dataTam = dataTam.filter(function (product) {
                var dstart = Date.parse(dinhDangNgayCheck(new Date(dateStart)));
                var dend = Date.parse(dinhDangNgayCheck(new Date(dateEnd)));
                var ddate = Date.parse(dinhDangNgayCheck(product.ngayTao));


                if (ddate >= dstart && ddate <= dend)
                    return product

            });



            //lay du lieu chi tiet 

            dataVideos = dataTam.filter(n => n.hanhDong == HOAN_THANH_BAI_HOC);

       
            //tao bien label hien thi chart
            let labelName = <b>Bạn</b>;
            let labelTOP = "";

            if (i > 0) {
                //lay du lieu nguoi dung
                let dataUser = dsNguoiDung.find(n => n.id == listUser[i]);

                if (dataUser != undefined) {

                    labelName = (
                        <div>
                            <Avatar src={dataUser.avatar} style={{ margin: 5 }} />
                            <b>{dataUser.hoTen}</b>
                        </div>
                    )

                    //kiem tra xem co chon top khong neu co them label top
                    if (checkSelectTOP) {
                        //kiem tra top 1
                        if (i == 1) {
                            labelTOP = <Tag color="#F6454F" >TOP 1</Tag>;
                        } else {
                            labelTOP = <Tag color="#52c41a"> {i} </Tag>;
                        }
                    }


                }

            }

            // if (i > 0) {
               
            //     let data2 =10 * (Math.floor(Math.random() * 11) + 1)+ (Math.floor(( Math.random() * 11) + 1)*i);
            //     let data3 =5*( Math.floor(Math.random() * 11) + 1)+ ((Math.floor(Math.random() * 11) + 1)*i);

            //     data = [...data, {
            //         top: labelTOP,
            //         name: labelName,
            //         videos: dataVideos.length ,
            //         comments: data2,
            //         scores: data3,
            //     }];
            // }else
            // {
            //     data = [...data, {
            //     top:labelTOP,
            //     name: labelName,
            //     videos: dataVideos.length,
            //     comments: dataComments.length,
            //     scores: dataScores.length,
            // }];
            // }


            data = [...data, {
                top:labelTOP,
                name: labelName,
                videos: dataVideos.length,
                scores: dataScores.length,
            }];
        }


        //set lai state voi du lieu
        this.setState({
            tableData: data,
        })
    }



    render() {

        //khoi tao header table
        const tableColumns = [
            {
                title: '',
                width: 20,
                align: 'center',
                dataIndex: 'top',

            },
            {
                title: 'Họ tên',
                dataIndex: 'name',

            },
            {
                title: 'Video đã học',
                dataIndex: 'videos',
                align: 'center',

            },
            {
                title: 'Điểm',
                dataIndex: 'scores',
                align: 'center',

            }
        ];



        return (
            <div className="py-4 row div_chartLine_main">

                <div className="col-md-8">
                    {this.xuatDSHanhDong()}
                    {this.selectLocUserTOP()}
                </div>

                <div className="col-md-4">
                    <RangePicker ranges={{
                        'Trong tuần': [moment().startOf('week'), moment().endOf('week')],
                        'Trong tháng': [moment().startOf('month'), moment().endOf('month')],
                    }}

                        format="DD/MM/YYYY"
                        onChange={(datestring) => this.searchNgayTao(datestring)} />
                </div>
                <div className="col-md-12">

                    <div hidden className="div_chart_top">
                        {this.xuatDSNguoiDungTOP()}
                    </div>

                    <hr />

                    <p className="h5 text-center">{this.state.headerContentChart} {this.state.headerDateChart}</p>
                    <canvas id="myChartLine" height={120} />
                    <hr />

                    <Table columns={tableColumns} dataSource={this.state.tableData} size="middle" pagination={false} />

                </div>
            </div>
        )
    }

    componentDidMount = () => {
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC }) //lay danh sach tien trinh tu store
        this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER, maNguoiDung: this.props.userID }) // lay danh sach lo trinh tu store

        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG })

        //khoi tao du lieu ban dau (week)
        setTimeout(() => {
            listUser = [this.props.userID];
            this.ganDuLieuDefault();
            this.layDuLieuChart();
            this.layDuLieuTable();
        }, 500);

    }

}


const mapStateToProps = (state) => {

    return {
        dsTienTrinhHoc: state.KhoaHocReducer.dsTienTrinhHoc,
        dsLichSu: state.LichSuTuongTacReducer.dsLichSu,
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
    }

}

export default connect(mapStateToProps)(ChartLine)