import HtmlParser from "react-html-parser";
import { CustomButton, MenuTab, ShowAllBox } from "../../../common";
import AllSeriesCourseItem from "../all-series-course-item/AllSeriesCourseItem";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeriesAllKeyIndex } from "../../../../redux/reducer/certificateReducer";
import httpServ from "../../../../services/http.service";
import { setCapNhatDanhSachLoTrinh } from "../../../../redux/reducer/loTrinhReducer";
import { useAlert } from 'react-alert'

export default function AllSeriesItem({ loTrinh, userInfo, keyIndex }) {
    const dispatch = useDispatch();
    const seriesAlCourseKey = useSelector(state => state.certificate.seriesAllKeyIndex);
    const { tatCaLoTrinh, loTrinhDaDangKi } = useSelector((state) => state.loTrinh);
    const [selectItem, setSelectItem] = useState('courses');
    const [toggle, setToggle] = useState(false);
    const alert = useAlert()
    
    useEffect(() => {
        
        if (seriesAlCourseKey.seriesAllKeyIndex != keyIndex) {
            setToggle(false);
        }
    }, [seriesAlCourseKey.seriesAllKeyIndex])

    const handleSeleted = (value) => {
        setSelectItem(value);
    }

    const handleToggle = () => {
        setToggle(!toggle);
        dispatch(setSeriesAllKeyIndex(keyIndex));
    }

    const handleRegister = () => {
        let ngayBatDau = new Date();
        let ngayKetThuc = new Date();
        ngayKetThuc.setMonth(ngayBatDau.getMonth() + loTrinh.thoiHan);

        const model = {
            maNguoiDung: userInfo.id,
            maLoTrinh: loTrinh.id,
            ngayBatDau: ngayBatDau,
            ngayKetThuc: ngayKetThuc
        }
        const dsTatCaLoTrinh = tatCaLoTrinh.filter(x => x.id != loTrinh.id);
        httpServ.ghiDanhLoTrinh(model)
        .then(res => {
            dispatch(setCapNhatDanhSachLoTrinh({ tatCaLoTrinh: dsTatCaLoTrinh }));
            alert.show('Ghi danh thành công, vui lòng chờ duyệt!')
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="allseriesitem">
            <div className="allseriesitem-head">
                <div className="allseriesitem-head_left" onClick={(handleToggle)}>
                    <div className="allseriesitem-title">{loTrinh.tenLoTrinh}</div>
                </div>
                <div className="allseriesitem-head_right" onClick={(handleToggle)}>
                    <i className={`${toggle ? 'fa fa-angle-up' : 'fa fa-angle-down'}`} aria-hidden="true"></i>
                </div>
                <div className="allseriesitem-button">
                    <CustomButton onClick={(handleRegister)} className="ml-2 mt-2 mb-2">Ghi danh</CustomButton>
                </div>
            </div>

            <div className={`allseriesitem-body ${toggle ? 'show' : ''}`}>
                <div className="allseriesitem-tab">
                    <div className="allseriesitem-tab_head">
                        <div className={`allseriesitem-tab_head--item ${selectItem == 'courses' ? 'active' : ''}`} onClick={() => handleSeleted('courses')}>Khóa học</div>
                        <div className={`allseriesitem-tab_head--item ${selectItem == 'details' ? 'active' : ''}`} onClick={() => handleSeleted('details')}>Giới thiệu</div>
                    </div>
                    <div className="allseriesitem-tab_body">
                        <div className="allseriesitem-courses" style={{ display: selectItem == 'courses' ? 'block' : 'none' }}>
                            {loTrinh.danhSachKhoaHoc.map((item, index) => {
                                return <AllSeriesCourseItem key={index} khoaHoc={item} />
                            })}
                        </div>
                        <div className="allseriesitem-details" style={{ display: selectItem == 'details' ? 'block' : 'none' }}>
                            <ShowAllBox>{loTrinh.moTa ? HtmlParser(loTrinh.moTa) : ""}</ShowAllBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}