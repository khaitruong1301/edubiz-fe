import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons'
import environment from '../../../environments/environment';
import { jsPDF } from "jspdf";
import './CertificateMobilePDF.css'
import { useSelector } from 'react-redux';

function CertificateMobilePDF(props) {
    const { userInfor } = useSelector((state) => state.authUser);

    const { chungNhan, loTrinh } = props; 

    const [image, setImage] = useState(null);
    const [noiDung, setNoiDung] = useState([]);

    const stageRef = useRef(null);

    useEffect(() => {
        const img = new window.Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = environment.baseUrl + chungNhan.hinhChungNhan;
        img.onload = () => {
            setImage(img);
        };
        let listText = chungNhan.noiDung ? JSON.parse(chungNhan.noiDung) : [];
        listText = listText.map(item => {
            if (item.name == 'fullnameVI') return { ...item, text: userInfor.hoTen };
            else if (item.name == 'courseVI') return { ...item, text: loTrinh.tenLoTrinh };
            else if (item.name == 'monthEN') return { ...item, text: `${loTrinh.thoiGianDaoTao} month` };
            else if (item.name == 'monthVI') return { ...item, text: `${loTrinh.thoiGianDaoTao} tháng` };
            else if (item.name == 'dateVI') return { ...item, text: loTrinh.ngayCap };
        });
        setNoiDung(listText);
    }, []);

    const handleDownLoad = () => {
        try {
            const stage = stageRef.current;
            const { width, height } = stage.bufferCanvas;
            var pdf = new jsPDF('p', 'px', [width, height]);
            pdf.addImage(
                stage.toDataURL({ pixelRatio: 1 }),
                0,
                0,
                width,
                height
            );
            pdf.save('chung-nhan.pdf');
        }
        catch{
            console.log('Error crossOrigin');
        }
    }

    return (
        image ?
            <div className='certificate-pdf'>
                <div className='certificate-pdf-wrapper'>
                    <div className='certificate-pdf-header'>
                        <div className='pdf-header-item' onClick={() => handleDownLoad()}>
                            <DownloadOutlined />
                            Tải về
                        </div>
                        <div className='pdf-header-item' onClick={() => props.handleClose(false)}>
                            <CloseOutlined /> Thoát
                        </div>

                    </div>
                    <Stage width={image.naturalWidth} height={image.naturalHeight} ref={stageRef}>
                        <Layer>
                            <Image width={image.naturalWidth} height={image.naturalHeight} image={image} />
                            {
                                noiDung.map((item, index) => {
                                    let fontStyle = item.fontWeight ? `${item.fontWeight} ${item.fontStyle}` : item.fontStyle;
                                    return <Text
                                        key={index}
                                        text={item.text}
                                        fontSize={item.fontSize}
                                        fontStyle={fontStyle}
                                        fontFamily={item.fontFamily ? `${item.fontFamily},sans-serif` : 'sans-serif'}
                                        x={item.x}
                                        y={item.y}
                                        align={item.align}
                                        width={image.naturalWidth}
                                        padding={item.padding ?? 0}
                                    />
                                })
                            }

                        </Layer>
                    </Stage>
                </div>
            </div> : null
    );
}

export default CertificateMobilePDF;