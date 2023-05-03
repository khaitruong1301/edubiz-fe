import React, { useState } from 'react'
import './ShowAllBox.css'

export default function ShowAllBox({ children, style, className, maxHeight = '20rem' }) {
    const [show, setShow] = useState(false);

    const handleShowAll = () => {
        setShow(!show);
    }


    return (
        <div className={`showallbox ${className ?? ''}`} style={style}>
            <div className='showallbox-wrapper' style={{ maxHeight: show ? 'unset' : maxHeight }}>
                {
                    children
                }
            </div>
            {
                <b className='showallbox-button' onClick={(handleShowAll)}>{show ? 'Rút gọn' : 'Xem thêm'}</b>
            }
        </div>
    )
}