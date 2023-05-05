import { NavLink } from "react-router-dom";
import './CertificateCourses.css';
import { QUIZ } from "../../../../utils/Constant";
import { useState, useEffect } from "react";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCertificateCourseKeyIndex } from "../../../../redux/reducer/certificateReducer";

export default function CertificateCourses({ khoaHoc, keyIndex }) {
    const dispatch = useDispatch();
    const certificateItemCourseKey = useSelector(state => state.certificate.certificateCourseKeyIndex);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if(certificateItemCourseKey.certificateCourseKeyIndex != keyIndex){
            setToggle(false);
        }
    }, [certificateItemCourseKey.certificateCourseKeyIndex])


    const onToggle = () => {
        setToggle(!toggle);
        dispatch(setCertificateCourseKeyIndex(keyIndex));
    }

    const renderStatus = (status) => {
        switch (status) {
            case 0:
                return <Badge color="green">Chưa làm</Badge>
            case 1:
                return <Badge color="yellow">Đã nộp</Badge>
            case 2:
                return <Badge color="red">Hết hạn</Badge>
            default:
                break;
        }
    }

    return (
        <div className="certificatecourses-item">
            <div className="certificatecourses-title" onClick={(onToggle)}>
                <span>{khoaHoc.tenKhoaHoc}</span>
                <span><i className={`fa ${toggle ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i></span>
            </div>
            <div className={`certificatecourses-info ${toggle ? 'show' : 'hide'}`}>
                {
                    khoaHoc.danhSachBaiTap.map((baiTap, index) => {
                       
                        return <div key={index} className="certificatecourses-info_item">
                            <div className="certificatecourses-info_row">
                                <span>Tên bài tập: </span>
                                <span>{baiTap.tenBaiTap}</span>
                            </div>
                            <div className="certificatecourses-info_row">
                                <span>Loại bài tập: </span>
                                <span>{baiTap.loaiBaiTap === QUIZ ? "Trắc nghiệm" : "Nộp"}</span>
                            </div>
                            <div className="certificatecourses-info_row">
                                <span>Trạng thái: </span>
                                {renderStatus(baiTap.trangThai)}
                            </div>
                            {
                                baiTap.trangThai == 1 ? <>
                                    <div className="certificatecourses-info_row">
                                        <span>Điểm: </span>
                                        <span>{baiTap.diem}</span>
                                    </div>
                                    <div className="certificatecourses-info_row">
                                        <span>Nhận xét: </span>
                                        <span>{baiTap.nhanXet}</span>
                                    </div>
                                </>:<></>
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}

