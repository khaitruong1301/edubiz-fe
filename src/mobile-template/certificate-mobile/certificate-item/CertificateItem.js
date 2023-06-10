import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CertificateCourses from "./certificate-courses/CertificateCourses";
import CertificateSeriesItem from "./certificate-series/CertificateSeriesItem";
import { setCertificateItemKeyIndex } from "../../../redux/reducer/certificateReducer";
import './CertificateItem.css'


export default function CertificateItem({ loTrinh, userInfo, keyIndex }) {
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();
    const certificateItemKey = useSelector(state => state.certificate.certificateItemKeyIndex);

    useEffect(() => {
        if(keyIndex == 1){
            setIsShow(!isShow);
        }
    }, [])

    useEffect(() => {
        if(certificateItemKey.certificateItemKeyIndex != keyIndex){
            setIsShow(false);
        }
    }, [certificateItemKey.certificateItemKeyIndex])

    const onToggle = () => {
        setIsShow(!isShow);
        dispatch(setCertificateItemKeyIndex(keyIndex));
    }

    return (
        <div className="certificateitem">
            <div className="certificateitem-series">
                <CertificateSeriesItem 
                    keyIndex={keyIndex} 
                    loTrinh={loTrinh} 
                    userInfo={userInfo} 
                    isShow={isShow} 
                    onToggle={onToggle}
                />
            </div>
            <div className={`certificateitem-courses ${isShow ? 'show' : 'hide'}`}>
                {
                    loTrinh.danhSachKhoaHoc.map((khoaHoc, index) => {
                        return (
                            <CertificateCourses
                                khoaHoc={khoaHoc}
                                key={index}
                                keyIndex={index}
                            ></CertificateCourses>
                        );
                    })
                }
            </div>
        </div>
    )
}