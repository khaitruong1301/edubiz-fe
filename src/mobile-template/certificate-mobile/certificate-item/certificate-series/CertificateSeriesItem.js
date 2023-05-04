import { useMemo } from 'react';
import './CertificateSeriesItem.css'
import { Progress } from 'antd';
import { useState } from 'react';
import CertificateReport from './certificate-report/CertificateReport';

export default function CertificateSeriesItem({ loTrinh, userInfo, onToggle, isShow = false }) {

    const [toggleReport, setToggleReport] = useState(false);

    let isDisable = false;
    let percent = Math.floor(
        (loTrinh.soLuongHoanThanh / loTrinh.soLuongBaiTap) * 100
    );

    loTrinh.danhSachKhoaHoc.map((khoaHoc) => {
        khoaHoc.danhSachBaiTap.map((item) => {
            if (!item.diem) {
                isDisable = true;
            }
        });
    });

    let diemTrungBinh = useMemo(() => {
        let tongDiem = 0;
        let slBaiTap = 0;
        loTrinh?.danhSachKhoaHoc.map((khoaHoc) => {
            let demBaiHoc = khoaHoc.danhSachBaiTap.length;

            slBaiTap += demBaiHoc;
            khoaHoc.danhSachBaiTap.map((baitap) => {
                let diem = baitap.diem ? baitap.diem * 1 : 0;
                tongDiem += diem;
            });
        });
        return (tongDiem / 10 / slBaiTap).toFixed(1);
    }, []);

    const handleToggleReport = () => {
        setToggleReport(!toggleReport);
    }


    return (
        <div className='certificateseries-item'>
            <div className='certificateseries-item_left' onClick={onToggle}>
                <div className='certificateseries-item_progress'>
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb(117, 95, 211)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb( 117, 95, 211)"}
                        trailColor={"rgba( 117, 95, 211,0.3)"}
                        type="circle"
                        className="w-16"
                        strokeWidth={8}
                        percent={percent}
                    />
                </div>
                <div className='certificateseries-item_title'>{loTrinh.tenLoTrinh}</div>
                <div className='certificateseries-item_dropdown'>
                    <div className='certificateseries-item_dropdown--child' onClick={onToggle}>
                        <i className={`fa ${isShow ? 'fa-angle-double-up' : 'fa-angle-double-down'}`} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div className='certificateseries-item_right'>
                <i className="fa fa-bars" aria-hidden="true" onClick={(handleToggleReport)}></i>
                <CertificateReport toggle={toggleReport}/>
            </div>
        </div>
    )
}