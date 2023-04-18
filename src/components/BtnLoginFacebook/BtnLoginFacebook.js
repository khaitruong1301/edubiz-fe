import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { settings } from "../../configs/settings";
import { setUserInfor } from "../../redux/reducer/authReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
import { removeDemoUser } from "../../utils/HocDemoUtils";
import { getCurrentDay } from "../../utils/LogOut";
import { triggerTour } from "../../utils/TriggerTourUtils";
import { Modal } from 'antd';

const publicIp = require("public-ip");

export default function BtnLoginFacebook() {
  const versionLocalStorage = localStorage.getItem('version')
  if (!versionLocalStorage) {
    localStorage.setItem('version', '1');
    window.location.reload();
  }
  useEffect(() => {
    if (localStorageServ.userInfor.get()) {
      window.location.href = "/dashboard";
    }
  }, []);
  const [message, setMessge] = useState("");
  const [thongTinUser, setThongTinUser] = useState({ facebookId: "", email: "", avatar: "", diachiIp: "" });
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const responseFacebook = (res) => {
    let login = async () => {
      let ipUser = await publicIp.v4();
      let userInfor = {
        facebookId: res.id,
        email: "",
        avatar: `https://graph.facebook.com/${res.id}/picture?type=large`,
        diachiIp: ipUser,
      };
      httpServ
        .login(userInfor)
        .then((res) => {
          if (res.data.content) {

            switch (res.data.content) {
              case 1:
                setThongTinUser(userInfor);
                setIsLogin(true);
                break;
              case 0:
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
            setMessge(res.data.message);
          }
        })
        .catch((er) => { });
    };
    login();
  };

  // Đăng nhập sử dụng tài khoản facebook
  const onDangNhap = () => {
    httpServ
      .login(thongTinUser)
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
      .catch((er) => {

      });
  }

  return (
    <div className="w-max h-max-content rounded overflow-hidden">
      
      <FacebookLogin
        appId="130543658347826"
        autoLoad={false}
        textButton="Đăng nhập với Facebook"
        fields="name,email,picture"
        callback={responseFacebook}
        icon={
          <i className="fab fa-facebook-f text-xl mr-2 wtext-white font-extralight" />
        }
      ></FacebookLogin>
      {message ? (
        <p className="w-96 mt-4 text-red-500 transform duration-300">
          {message}
        </p>
      ) : (
        ""
      )}

      <Modal
        title="Kiểm tra thông tin"
        visible={isLogin}
        width={500}
        closable={false}
        cancelButtonProps={{ hidden: true }}
        onOk={() => onDangNhap()}
      >

        <p>Nhập email: <input onChange={(e) => setThongTinUser({ ...thongTinUser, email: e.target.value })} class="border rounded-lg w-full hover:shadow-xl p-2 px-3" />
          <p className="w-96 mt-4 text-red-500 transform duration-300">
            {message}
          </p>
        </p>
      </Modal>
    </div>
  );
}
