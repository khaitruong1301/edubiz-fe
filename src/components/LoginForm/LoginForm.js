import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfor } from "../../redux/reducer/authReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
import { removeDemoUser } from "../../utils/HocDemoUtils";
import { getCurrentDay } from "../../utils/LogOut";
import { triggerTour } from "../../utils/TriggerTourUtils";
import './LoginForm.css'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessge] = useState("");
    const dispatch = useDispatch();

    const onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value)
                break;
            default:
                break;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email.length <= 0 || password.length <= 0) return;
        httpServ.signIn({ email: email, matKhau: password })
        .then((res) => {
            if (res.data.content) {
              switch (res.data.content) {
                case 0:
                  setMessge(res.data.message);
                  break;
                case 1:
                  setMessge(res.data.message);
                  break;
                default:
                  localStorageServ.userInfor.set(res.data.content);
                  localStorageServ.timeLogin.set(getCurrentDay());
                  removeDemoUser();
                  triggerTour();
                  dispatch(setUserInfor(res.data.content));
                  window.location.href = "/dashboard";
                  break;
              }
            } else {
              setMessge(res.data.message)
            }
          })
            .catch(error => {
                console.log(error.err.response.data)
            })
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h2>ĐĂNG NHẬP</h2>
                <p>{message}</p>
                <form onSubmit={(onSubmit)}>
                    <div className="input-group">
                        <label>Tên đăng nhập</label>
                        <input type="email" required onChange={(onChangeInput)} value={email} name="email" />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu</label>
                        <input type="password" required onChange={(onChangeInput)} value={password} name="password" />
                    </div>
                    <div className="button-box">
                        <button>
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}