import { useEffect, useState } from 'react';
import './ExamDesktop.css'
import ExamDesktopForm from './ExamDesktopForm/ExamDesktopForm';
import httpServ from '../../services/http.service';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const checkDate = (date) => {
    const dateNow = new Date(Date.now());
    const dateEnd = new Date(date);
    if (dateNow.getFullYear() != dateEnd.getFullYear())
        return false;
    else if (dateNow.getMonth() != dateEnd.getMonth())
        return false;
    else if (dateNow.getDate() < dateEnd.getDate() || dateNow.getDate() > dateEnd.getDate() + 3)
        return false;
    return true;
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
                const data = res.data.content.map(item => {
                    
                    return {
                        ...item,
                        // ngayKichHoat: new Date(item.ngayKichHoat).toLocaleDateString("en-IN"),
                        kichHoat: item.daNopBai ? true : checkDate(item.ngayKichHoat)
                        // kichHoat: true
                    }
                })
                setDanhSachDeThi(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleDoWork = (deThi) => {
        if (deThi.daNopBai) return message.error('Bài kiểm tra đã hoàn thành và đã nộp!');
        if (!deThi.kichHoat) return message.error('Bài kiểm tra chưa kích hoạt do chưa đến thời gian thực hiện!');

        setVisibled(true);
        setBaiKiemTra(deThi);
    }

    return (
        <div className="ExamDesktop">
            {
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
                                <button className={item.kichHoat ? 'btn-info' : ''} onClick={() => handleDoWork(item)}>Làm bài</button>
                            </div>
                        </div>
                    </div>
                })
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