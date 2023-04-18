import React, { useState } from 'react'
import Countdown from "react-countdown";
import bgCount from '../../assets/img/bg-countdown.webp'
import httpServ from '../../services/http.service';
import { message } from 'antd';
import BtnGoogleCapcha from '../../components/BtnGoogleCapcha/BtnGoogleCapcha'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function FormDangKIBlackFiday({ inputRef }) {
    const success = () => {
        message.success('Đăng kí nhận ưu đãi thành công');
    };
    const error = () => {
        message.error('Email không hợp lệ');
    };
    const [valuesForm, setValuesForm] = useState({
        email: "",
        noiDungL: ""
    });
    const handleGetValueForm = (event) => {
        const { name, value } = event.target;
        setValuesForm({ ...valuesForm, [name]: value });
    };
    const handleSubmit = () => {
        if (!validateEmail(valuesForm.email)) {
            error()
            return
        }
        httpServ.postNhaUuDai(valuesForm).then((res) => {
            success()
        }).catch((err) => {
        });
    }
    const rendererTimer = ({ days, hours, minutes, seconds }) => {
        return (
            <div className="flex space-x-2">
                <p style={{ backgroundImage: `url(${bgCount})` }} className=" bg-no-repeat  h-10 leading-10 bg-center  bg-cover w-20 md:w-32 lg:w-40  text-white text-center transform -skew-x-12 uppercase text-base "> <span className="font-medium text-xl">
                    {days}
                </span> ngày</p>
                <p style={{ backgroundImage: `url(${bgCount})` }} className=" bg-no-repeat  h-10 leading-10 bg-center  bg-cover w-20 md:w-32 lg:w-40  text-white text-center transform -skew-x-12 uppercase text-base ">
                    <span className="font-medium text-xl">
                        {hours}
                    </span> giờ</p>
                <p style={{ backgroundImage: `url(${bgCount})` }} className=" bg-no-repeat  h-10 leading-10 bg-center  bg-cover w-20 md:w-32 lg:w-40  text-white text-center transform -skew-x-12 uppercase text-base "><span className="font-medium text-xl">
                    {minutes}
                </span> phút</p>
                <p style={{ backgroundImage: `url(${bgCount})` }} className=" bg-no-repeat  h-10 leading-10 bg-center  bg-cover w-20 md:w-32 lg:w-40  text-white text-center transform -skew-x-12 uppercase text-base "><span className="font-medium text-xl">
                    {seconds}
                </span> giây</p>

            </div>
        );
    };
    return (
        <div className="p-3 w-full space-y-3 ">
            <BtnGoogleCapcha />

            <div className=" font-medium md:text-base xl:text-lg flex flex-col md:flex-row justify-center  items-center   space-x-3 space-y-2 md:space-y-0  mx-auto  ">
                <p style={{ backgroundImage: `url(${bgCount})` }} className=" bg-no-repeat w-24 h-10 leading-10 md:w-36 lg:w-40 bg-cover text-white text-center transform  uppercase bg-center -skew-x-12">Bắt đầu sau</p>
                <Countdown
                    date={1637539200000}
                    renderer={rendererTimer}
                />
            </div > {" "}
            <div div className=" w-full md:w-96 card_theme mx-auto flex flex-col items-center p-3  space-y-3" >

                <p className="text-xl">NHẬN TIN BLACK FRIDAY 2021
                </p>
                <form className="form w-full">
                    <div className="form__div">
                        <input
                            ref={inputRef}
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

                    <div className="flex items-center justify-center ">
                        <button
                            onClick={handleSubmit}
                            className="btn-theme  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Đăng kí nhận tin
                        </button>
                    </div>{" "}
                </form>
            </div>
        </div>
    )
}
