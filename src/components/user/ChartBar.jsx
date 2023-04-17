import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import { LAY_DANH_SACH_TIEN_TRINH_HOC ,LAY_LICH_SU_TUONG_TAC_THEO_USER} from '../../redux/types/ActionsTypes';
import { HOAN_THANH_BAI_HOC, QUESTION, COMMENT } from '../../redux/Config/LichSuDataStyle';
import { dinhDangNgay, dinhDangNgayCheck } from '../../commons/format/FormatDate';
import { Radio } from 'antd';

// color chart
const colorChart = ["#ff6384", "#FFCD57"]

//data chart main
var myChart = "";

class ChartBar extends Component {
    state = {
        labelChart: 'TUẦN',
        dataChart: [0, 0],
    }

    filData = (data, iCheck) => {

        var currDate = new Date; // get current date
        var first = "";
        var last = "";
        if (iCheck === 1) {
            //lay ngay dau va cuoi cua tuan
            first = currDate.getDate() - currDate.getDay() + (currDate.getDay() == 0 ? -6 : 1); // First day is the day of the month - the day of the week
            last = first + 6; // last day is the first day + 6
            first = new Date(currDate.setDate(first));
            last = new Date(currDate.setDate(last));

        }



        if (iCheck === 2) {
            //lay ngay dau va cuoi cua thang
            first = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
            last = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);

        }

        if (iCheck !== 0) {
            data = data.filter(function (product) {
                var datestart = Date.parse(dinhDangNgayCheck(first));
                var dateend = Date.parse(dinhDangNgayCheck(last));
                var date = Date.parse(dinhDangNgayCheck(product.ngayTao));


                if (date >= datestart && date <= dateend)
                    return product

            });
        }

        return data;
    }

    layDuLieuChart = (id, iCheck, labelChart) => {
        const { dsLichSu } = this.props;

        let data = dsLichSu;
        let dataLichSu = [];

        //loc theo id user 
        data = data.filter(n => n.nguoiDungId === id)

        data = this.filData(data, iCheck);

        //loc theo tuan, thang

        //lay so bai da hoc
        dataLichSu = data.filter(n => n.hanhDong === HOAN_THANH_BAI_HOC)

        let baiHocChart = dataLichSu.length;

        this.setState({
            labelChart: labelChart,
            dataChart: [baiHocChart, 0] // du lieu show line
        })
        let dataChart = [baiHocChart, 0] // du lieu show line

        this.createChartBar(labelChart,dataChart);
    }
    createChartBar = (labelChart,dataChart) => {
        //destroy data chart old
        if (myChart) {
            myChart.destroy();
        }

        var ctx = document.getElementById('myChartDonut');
        myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {

                labels: ['Video đã học', 'Điểm'],
                datasets: [{
                    label: labelChart,
                    barPercentage: 0.5,
                    data: dataChart,
                    backgroundColor: colorChart,

                    borderColor: 'white',
                    hoverBorderColor: 'silver',
                    hoverBorderWidth: 1,
                    borderWidth: 1
                }]

            },

            options: {
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function (tooltipItem, data) {
                            if (data['datasets'][0]['data'][tooltipItem['index']] > 99) {
                                return "99+";
                            }
                            else
                                return data['datasets'][0]['data'][tooltipItem['index']];
                        }
                    }
                }
            }

        });


    }

    changeDay = (e) => {
        const { userID } = this.props;

        if (e.target.value === "1")
            this.layDuLieuChart(userID, 1, "Tuần");
        if (e.target.value === "2")
            this.layDuLieuChart(userID, 2, "Tháng");
    }

    render() {
        return (
            <div className="p-3">
                <div className="col-md-12 text-center pb-3">
                    <Radio.Group defaultValue="1" buttonStyle="solid" onChange={(e) => this.changeDay(e)}>
                        <Radio.Button value="1" >Tuần</Radio.Button>
                        <Radio.Button value="2">Tháng</Radio.Button>
                    </Radio.Group>
                </div>

                <canvas id="myChartDonut" ></canvas>

                <div className="col-md-12 p-0 py-2 pt-3">
                    <div className="col-md-10 p-0">
                        <div className="chart_div_square" style={{ backgroundColor: colorChart[0] }}></div> Video đã học
                    </div>
                    <div className="col-md-2 p-0 text-right" style={{ color: colorChart[0] }}>
                        {this.state.dataChart[0]}
                    </div>
                </div>

                <hr style={{ clear: "both", margin: 0 }} />

                <div className="col-md-12 p-0 py-2">
                    <div className="col-md-10 p-0">
                        <div className="chart_div_square" style={{ backgroundColor: colorChart[1] }}></div> Điểm
                    </div>
                    <div className="col-md-2 p-0 text-right" style={{ color: colorChart[1] }}>
                        {this.state.dataChart[1]}
                    </div>
                </div>

                <hr style={{ clear: "both", margin: 0 }} />

            </div>
        )
    }

    componentDidMount = () => {
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC }) //lay danh sach tien trinh tu store

        const { userID } = this.props;

        setTimeout(() => {
            this.layDuLieuChart(userID, 1, "Tuần");

        }, 500);

        this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER, maNguoiDung: userID }) // lay danh sach lo trinh tu store

    }
  
}


const mapStateToProps = (state) => {

    return {
        dsTienTrinhHoc: state.KhoaHocReducer.dsTienTrinhHoc,
        dsLichSu: state.LichSuTuongTacReducer.dsLichSu,
    }

}

export default connect(mapStateToProps)(ChartBar)