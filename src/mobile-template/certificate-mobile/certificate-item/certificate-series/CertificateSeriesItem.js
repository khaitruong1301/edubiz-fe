import { useMemo } from 'react';
import './CertificateSeriesItem.css'
import { Progress, message } from 'antd';
import { useState, useEffect } from 'react';
import CertificateReport from './certificate-report/CertificateReport';
import { setCertificateReportKeyIndex } from '../../../../redux/reducer/certificateReducer';
import { } from "../../../../";
import { useDispatch, useSelector } from 'react-redux';
import CertificateMobilePDF from '../../certificate-mobile-pdf/CertificateMobilePDF';

export default function CertificateSeriesItem({ loTrinh, onToggle, isShow = false, keyIndex }) {
    const dispatch = useDispatch();
    const certificateItemReportKey = useSelector(state => state.certificate.certificateReportKeyIndex);
    const [toggleReport, setToggleReport] = useState(false);
    const [visiblePDF, setVisiblePDF] = useState(false);

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
        dispatch(setCertificateReportKeyIndex(keyIndex));
    }

    useEffect(() => {
        if (certificateItemReportKey.certificateReportKeyIndex != keyIndex) {
            setToggleReport(false);
        }
    }, [certificateItemReportKey.certificateReportKeyIndex])

    const handleDownloadChungNhan = () => {
        if (!loTrinh.daHoanThanh)
            return message.warning('Bạn chưa được cấp chứng nhận do chưa hoàn thành tất cả khóa học!');

        if (diemTrungBinh < 7)
            return message.warning('Bạn chưa được cấp chứng nhận do điểm trung bình chưa đạt 7.0 !');

        setVisiblePDF(true)
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
                <CertificateReport
                    toggle={toggleReport}
                    handleDownloadChungNhan={handleDownloadChungNhan}
                />
            </div>
            {
                visiblePDF ?
                    <CertificateMobilePDF
                        chungNhan={loTrinh.chungNhan}
                        handleClose={setVisiblePDF}
                        loTrinh={loTrinh}
                    />
                    : null
            }
        </div>
    )
}