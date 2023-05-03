import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserInfor } from "../../redux/reducer/authReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
import { removeDemoUser } from "../../utils/HocDemoUtils";
import { getCurrentDay } from "../../utils/LogOut";
import { triggerTour } from "../../utils/TriggerTourUtils";
import { URL_PAGE } from "../common";
import './LoginMobile.css';

function LoginMobile() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessge] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

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
                  history.push(URL_PAGE.DASHBOARD);
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
        <div className="login-mobile-container">
            <div className="login-mobile-wrapper">
                <h2>ĐĂNG NHẬP</h2>
                <p>{message}</p>
                <form onSubmit={(onSubmit)}>
                    <div className="mobile-input-group">
                        <label>Email</label>
                        <input type="text" onChange={(onChangeInput)} value={email} name="email" />
                    </div>
                    <div className="mobile-input-group">
                        <label>Mật khẩu</label>
                        <input type="password" onChange={(onChangeInput)} value={password} name="password" />
                    </div>
                    <div className="mobile-button-box">
                        <button>
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginMobile;