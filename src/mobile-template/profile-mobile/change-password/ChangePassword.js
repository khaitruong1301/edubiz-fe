import { useEffect, useState } from "react"
import httpServ from "../../../services/http.service";
import { message } from "antd";

export default function ChangePassword(props) {

    const [model, setModel] = useState({ email: '', password: '' });
    const [confirm, setConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
        setConfirm('');
        setModel({ email: '', password: '' })
    }, [])

    const handleSubmit = () => {
        setErrorMessage('');

        if (!model.email)
            return setErrorMessage('Vui lòng nhập email!');
        if (!model.password)
            return setErrorMessage('Vui lòng nhập mật khẩu!');
        if (confirm != model.password)
            return setErrorMessage('Mật khẩu nhập lại không khớp!');

        httpServ.putChangePassword(model)
        .then(res => {
            message.success('Cập nhật mật khẩu thành công!');
            props.handleCloseModal();
        })
        .catch(error => {
            if(error.err.response.data.content)
                setErrorMessage(error.err.response.data.content);
        })
    }

    return <div className="change-password">
        <div className="change-password-title">
            ĐỔI MẬT KHẨU
        </div>
        {errorMessage ? <div className="change-password-message">{errorMessage}</div> : null}
        <div className="change-password-input">
            <label>Email</label>
            <input type="email" value={model.email} onChange={(e) => setModel({ ...model, email: e.target.value })} />
        </div>
        <div className="change-password-input">
            <label>Mật khẩu mới</label>
            <input type="password" value={model.password} onChange={(e) => setModel({ ...model, password: e.target.value })} />
        </div>
        <div className="change-password-input">
            <label>Nhập lại mật khẩu</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <div className="change-password-button">
            <button onClick={(handleSubmit)}>Cập nhật</button>
        </div>
    </div>
}