import { useState } from 'react';
import './ExamDesktop.css'
import ExamDesktopForm from './ExamDesktopForm/ExamDesktopForm';
function ExamDesktop() {

    const [visibled, setVisibled] = useState(false);

    const handleDoWork = () => {
        setVisibled(true);
    }

    return (
        <div className="ExamDesktop">
            <div className='ExamDesktopItem'>
                <div className='ExamDesktopItem-Title'>
                    Bài kiểm tra đánh giá tự động nghiệp vụ sau 02 tháng thử việc
                </div>
                <div className='ExamDesktopItem-Info'>
                    <div className='ExamDesktopItem-InfoTime'>
                        <span>Ngày thực hiện: 22/06/2023</span>
                        <span>Thời gian làm bài: 45 phút</span>
                    </div>
                    <div className='ExamDesktopItem-Button'>
                        <button onClick={(handleDoWork)}>Làm bài</button>
                    </div>
                </div>
            </div>
            {
                visibled ? <ExamDesktopForm handleClose={setVisibled}/> : null
            }
            
        </div>
    )
}

export default ExamDesktop;