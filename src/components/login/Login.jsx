import React, { Component } from 'react'
import '../../templates/login/css/style.css'
import logocyber from "../../templates/login/images/cyberlogo.png";
import { LAY_NGUOI_DUNG_EMAIL } from '../../redux/types/ActionsTypes'
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { message } from 'antd';
import { idFacebook } from '../../redux/Config/Config';
import { updatesUser } from '../../commons/user/UserServices';



class Login extends Component {

    move = () => {
        this.props.history.push('/user');
    }

    linkDangKy = () => {
        this.props.history.push('/');
    }

    responseFacebook = (response) => {
        const promise = new Promise((resolve) => {
            this.props.dispatch({ type: LAY_NGUOI_DUNG_EMAIL, email: response.email, callback: resolve });
        });

        promise.then(data => {
            //kiem tra ton tai
            if (data === 0) {
                message.error("Email facebook này chưa được đăng ký !");
                this.props.history.push('/lms');
                return;
            }
            if (!data.duocHocOffline) {

                message.error("Email facebook này chưa được kích hoạt !");
                this.props.history.push('/lms');
                return;
            }

            //save ip
            const publicIp = require('public-ip');

            (async () => {

                let ipV4 = await publicIp.v4().catch(err => { });

                if (data.iPaddress != "") {
                    let lstIP = JSON.parse(data.iPaddress);
                    if (!lstIP.find(n => n == ipV4)) {
                        lstIP.push(ipV4);
                        data.iPaddress = JSON.stringify(lstIP);

                    }
                } else {
                    data.iPaddress = JSON.stringify([ipV4]);
                }

                updatesUser(data.id, data).then().catch();

            })();

            //xoa store demo
            localStorage.removeItem("demoCode");

            //them thong tin nguoi dang nhap vao localstorage (session)
            localStorage.setItem('checkLogin', JSON.stringify(data));
             this.props.history.push('/user');
        });
    }

    onLogin = () => {
        let email = "tuanphan@gmail.com";
        const promise = new Promise((resolve) => {
            this.props.dispatch({ type: LAY_NGUOI_DUNG_EMAIL, email: email, callback: resolve });
        });

        promise.then(data => {
            //kiem tra ton tai
            if (data === 0) {
                message.error("Email facebook này chưa được đăng ký !");
                this.props.history.push('/lms');
                return;
            }
            if (!data.duocHocOffline) {

                message.error("Email facebook này chưa được xác nhận !");
                this.props.history.push('/lms');
                return;
            }

            //them thong tin nguoi dang nhap vao localstorage (session)
            localStorage.setItem('checkLogin', JSON.stringify(data));
            this.props.history.push('/user');
        });
    }

    renderButtonFacebook = () => {

        return (<FacebookLogin
            appId={idFacebook}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            render={renderProps => (
                <input type="submit" onClick={renderProps.onClick} className="submitface" value="Đăng Nhập Facebook" />
            )}
        />)
    }



    render() {
        return (

            <div>

                <div className="div_login_label_top" >Hê thông hoc tâp CyberLearn</div>
                <div className="agile-its">
                    <div className="w3layouts">
                        <div className="photos-upload-view">

                            <div className="wthree-text">
                                <div className="div_login_label">
                                    Vui lòng click Đăng nhập Facebook để học tập
                                </div>
                                <div className="wthreesubmitaits">

                                    {this.renderButtonFacebook()}
                                    <input className="d-none" type="submit" name="submit" value="Đăng Ký Thông Tin" onClick={this.linkDangKy} />
                                </div>
                            </div>

                        </div>
                        <div className="clear" />
                    </div>
                </div>
                <div className="footer">

                </div>

            </div>

        )
    }

    //xu ly khi component load
    componentDidMount = () => {

        //change https url
        let urlLogin = window.location.href;
        if (urlLogin.indexOf("http:") != -1) {
            let index = urlLogin.indexOf("http:")
            window.location = "https://" + window.location.host + window.location.pathname;
        }
    }
}

const mapStateToProps = (state) => {

    return {
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
    }


}


export default connect(mapStateToProps)(Login)