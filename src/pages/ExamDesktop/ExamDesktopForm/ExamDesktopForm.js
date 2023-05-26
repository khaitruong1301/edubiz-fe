import { ExamTestMobile } from "../../../mobile-template";
import { CloseOutlined } from '@ant-design/icons'
import './ExamDesktopForm.css'
function ExamDesktopForm({ handleClose }) {

    return (
        <div className="ExamDesktopForm">
            <div className="ExamDesktopFormContent" style={{ width: '50%' }}>
                <div className="ExamDesktopFormHeader">
                    <div><CloseOutlined onClick={() => handleClose(false)}/></div>
                </div>
                <ExamTestMobile closeModal={handleClose}/>
            </div>
        </div>
    )
}

export default ExamDesktopForm;