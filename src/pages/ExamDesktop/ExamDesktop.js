import { useEffect, useState } from 'react';
import './ExamDesktop.css'
import ExamDesktopForm from './ExamDesktopForm/ExamDesktopForm';
import httpServ from '../../services/http.service';
import { useSelector } from 'react-redux';
import { message } from 'antd';

function checkTimeAgainstCurrentDate(targetDate) {
    // Lấy ngày hiện tại
    const currentDate = new Date();
    // Chuyển đổi targetDate thành đối tượng Date (nếu nó không phải là đối tượng Date)
    if (!(targetDate instanceof Date)) {
        targetDate = new Date(targetDate);
    }
    // So sánh ngày và giờ
    if (targetDate > currentDate) {
        // "targetDate nằm trong tương lai.";
        return -1;
    } else if (targetDate < currentDate) {
        // "targetDate nằm trong quá khứ.";
        return 1;
    } else {
        // "targetDate là ngày hiện tại!";
        return 0;
    }
}

const dateToString = (ngayKichHoat) => {
    const date = new Date(ngayKichHoat);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function ExamDesktop(props) {
    let userInfo = useSelector((state) => state.authUser.userInfor);

    const [visibled, setVisibled] = useState(false);
    const [baiKiemTra, setBaiKiemTra] = useState(null);
    const [danhSachDeThi, setDanhSachDeThi] = useState([]);

    useEffect(() => {
        httpServ.getDeThiTheoNguoiDung(userInfo.id)
            .then(res => {
                const data = res.data.content;
                setDanhSachDeThi(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleDoWork = (deThi) => {
        if (!deThi.kichHoat) return message.error('Bài kiểm tra chưa kích hoạt do chưa đến thời gian thực hiện!');

        setVisibled(true);
        setBaiKiemTra(deThi);
    }

    const renderButton = (record) => {
        const ketQua = checkTimeAgainstCurrentDate(record.ngayKichHoat);
        if (record.daNopBai)
            return <button className="btn-success"> Đã nộp bài </button>;
        else if (record.kichHoat)
            return <button className="btn-info" onClick={() => handleDoWork(record)}>Làm bài</button>
        else if (ketQua == -1)
            return <button className="btn-dark">Chưa kích hoạt</button>
        else if (ketQua == 1)
            return <button className="btn-danger">Đã quá hạn</button>
    }

    return (
        <div className="ExamDesktop">
            {
                danhSachDeThi && danhSachDeThi.length > 0 ?
                    danhSachDeThi.map((item, i) => {
                        return <div className='ExamDesktopItem' key={i}>
                            <div className='ExamDesktopItem-Title'>
                                {item.tenDeThi}
                            </div>
                            <div className='ExamDesktopItem-Info'>
                                <div className='ExamDesktopItem-InfoTime'>
                                    <span>Ngày thực hiện: {dateToString(item.ngayKichHoat)}</span>
                                    <span>Thời gian làm bài: 45 phút</span>
                                </div>
                                <div className='ExamDesktopItem-Button'>
                                    {
                                        renderButton(item)
                                    }
                                </div>
                            </div>
                        </div>
                    }) : <div>CHƯA CÓ BÀI KIỂM TRA ĐÁNH GIÁ!</div>
            }
            {
                visibled ? <ExamDesktopForm
                    baiKiemTra={baiKiemTra}
                    handleClose={setVisibled}
                /> : null
            }

        </div>
    )
}

export default ExamDesktop;