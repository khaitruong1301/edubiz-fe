import { useState } from "react"
import httpServ from "../../../services/http.service";
import { useEffect } from "react";

export default function SocailStatusForm({ nguoiDung }) {
    const [isShow, setIsShow] = useState(false);
    const [content, setContent] = useState("");

    const handleOpenForm = () => {
        setIsShow(true);
    }

    const handleCloseForm = () => {
        setIsShow(false);
    }

    const handleOnChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = () => {
        const data = {
            maPhongBan: nguoiDung.maPhongBan,
            maNguoiDung: nguoiDung.id,
            noiDung: content,
            dsBinhLuan: [],
            dsLuotThich: [],
            dsDaXem: [nguoiDung.id]
        }

        httpServ.dangTrangThai(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return <>
        <div className='socailmobile-open-form'>
            <div className='socailmobile-open-form-wrapper' onClick={(handleOpenForm)}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                Đăng thông báo
            </div>
        </div>

        <div className='socailmobile-status-form' style={{ display: isShow ? 'block' : 'none' }}>
            <div className='socailmobile-status-form-wrapper'>
                <div className='socailmobile-status-form-head'>
                    <span>Đăng thông báo</span>
                    <span onClick={(handleCloseForm)}>
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                </div>
                <div className='socailmobile-status-form-body'>
                    <textarea onChange={(handleOnChange)} value={content}></textarea>
                </div>
                <div className='socailmobile-status-form-footer'>
                    <button onClick={(handleSubmit)}>
                        <span><i class="fa fa-paper-plane" aria-hidden="true"></i></span>
                        <span>Đăng</span>
                    </button>
                </div>
            </div>
        </div>
    </>
}