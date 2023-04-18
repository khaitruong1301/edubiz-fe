import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setInforLoginDemo } from "../../redux/reducer/authReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
import { removeRealUser } from "../../utils/HocDemoUtils";
import { triggerTour } from "../../utils/TriggerTourUtils";
import BtnGoogleCapcha from "../BtnGoogleCapcha/BtnGoogleCapcha";
import "./form_login_demo.css";
export default function Form_Login_Demo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [valuesForm, setValuesForm] = useState({
    email: "",
    code: "",
  });
  const [message, setMessage] = useState("");

  // console.log(valuesForm);
  const handleGetValueForm = (event) => {
    const { name, value } = event.target;
    setValuesForm({ ...valuesForm, [name]: value });
  };
  const handleRemoveUser = () => {
    var regex = /\S+@\S+\.\S+/;
    if (
      !valuesForm.code ||
      !valuesForm.email ||
      !regex.test(valuesForm.email.trim())
    ) {
      setMessage("Mã học thử hoặc email không hợp lệ");
      return;
    }

    // console.log(valuesForm.code.trim(), valuesForm.email.trim());
    httpServ
      .postCheckUserDemoLogin(valuesForm.code.trim(), valuesForm.email.trim())
      .then((res) => {
        if (res.data.content) {
          dispatch(setInforLoginDemo(valuesForm));
          let result = res.data.content.split("-");
          localStorageServ.timeDemo.set(result[0]);
          localStorageServ.nuocngoaiDemo.set(result[1]);
          localStorageServ.codeDemo.set(valuesForm.code);
          removeRealUser();
          triggerTour();
          // console.log("result demo", res, result);
          window.location.href = "lo-trinh";
        } else {
          setMessage("Mã học thử không hợp lệ hoặc đã được sử dụng");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 w-96">
      <form action className="form">
        <div className="form__div">
          <input
            onChange={handleGetValueForm}
            type="text"
            className="form__input"
            placeholder=" "
            name="email"
          />
          <label htmlFor className="form__label">
            Tài khoản gmail của bạn
          </label>
        </div>
        <div className="form__div">
          {/* <input type="password" className="form__input" placeholder=" " /> */}
          <input
            onChange={handleGetValueForm}
            type=""
            name="code"
            className="form__input"
            placeholder=" "
          />
          <label htmlFor className="form__label ">
            Mã học thử
          </label>
        </div>
        {message ? <p className="text-red-400 -mt-4 my-1">{message}</p> : ""}
        <div className="flex items-center justify-between">
          <button
            onClick={handleRemoveUser}
            className="btn-hocthu  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Học thử
          </button>
        </div>{" "}
      </form>
      <BtnGoogleCapcha />
    </div>
  );
}
