import React, { Component } from 'react';
import bground from "../../../assets/chung_nhan.jpg";
import "./ChungNhan.css";

export default class LayOutIn extends Component {
    render() {
        const { chungNhan } = this.props;
        return (

            <div className="bg-certificate print container position-relative flex-container text-center">

                <img src={bground} className="imgCertificate" />
                <div className="position-absolute divFullName ">
                    <h3 className="fullName">{chungNhan.tenKH}</h3>
                </div>
                <div className="position-absolute divClassName ">
                    <h3 className="ClassName">{chungNhan.tenLop}</h3>
                </div>
                <div className="position-absolute divDuration">
                    <h3 className="Duration">{chungNhan.thoiGianDaoTao} months</h3>
                </div>
                <div className="position-absolute divTimeTraining">
                    <h3 className="TimeTraining">{chungNhan.thoiGianDaoTao} tháng</h3>
                </div>
               
                <div className="position-absolute divSoChungNhan">
                    <h3 className="SoChungNhan">{chungNhan.soChungNhan}    </h3>
                </div>
                <div className="position-absolute divCapNgay ">
                    <h3 className="CapNgay">{chungNhan.ngayCap}</h3>
                </div>

            </div>

        )
    }
}
