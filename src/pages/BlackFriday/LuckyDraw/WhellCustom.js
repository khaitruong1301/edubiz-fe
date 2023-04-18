import { Modal } from "antd";
import React, { useState } from "react";
import httpServ from "../../../services/http.service";
import Confetti from 'react-confetti'
import './whell.css'
import localStorageServ from "../../../services/locaStorage.service";
function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React__default = _interopDefault(React);

export default function WheelComponent({ sizeBtnStart = 50, textSize, widthContainer, heightContainer, ..._ref }) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenModalResult, setIsOpenModalResult] = useState(false)

    const [valuesForm, setValuesForm] = useState({
        email: "",
    });
    const [messageErr, setMessageErr] = useState("");
    const [message, setMessage] = useState("");

    const handleGetValueForm = (event) => {
        const { name, value } = event.target;
        setValuesForm({ ...valuesForm, [name]: value });
    };

    var
        withCanvas = _ref.width,
        heightCanvas = _ref.height,
        segments = _ref.segments,
        segColors = _ref.segColors,
        winningSegment = _ref.winningSegment,
        onFinished = _ref.onFinished,
        _ref$primaryColor = _ref.primaryColor,
        primaryColor = _ref$primaryColor === void 0 ? 'black' : _ref$primaryColor,
        _ref$contrastColor = _ref.contrastColor,
        contrastColor = _ref$contrastColor === void 0 ? 'white' : _ref$contrastColor,
        _ref$buttonText = _ref.buttonText,
        buttonText = _ref$buttonText === void 0 ? 'Spin' : _ref$buttonText,
        _ref$isOnlyOnce = _ref.isOnlyOnce,
        isOnlyOnce = _ref$isOnlyOnce === void 0 ? true : _ref$isOnlyOnce,
        _ref$size = _ref.size,
        size = _ref$size,
        _ref$upDuration = _ref.upDuration,
        upDuration = _ref$upDuration === void 0 ? 100 : _ref$upDuration,
        _ref$downDuration = _ref.downDuration,
        downDuration = _ref$downDuration === void 0 ? widthContainer : _ref$downDuration,
        _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === void 0 ? 'proxima-nova' : _ref$fontFamily;
    var currentSegment = '';
    var isStarted = false;

    var _useState = React.useState(false),
        isFinished = _useState[0],
        setFinished = _useState[1];

    var timerHandle = 0;
    var timerDelay = segments.length;
    var angleCurrent = 0;
    var angleDelta = 0;
    var canvasContext = null;
    var maxSpeed = Math.PI / ("" + segments.length);
    var upTime = segments.length * upDuration;
    var downTime = segments.length * downDuration;
    var spinStart = 0;
    var frames = 0;
    var centerX = widthContainer / 2;
    var centerY = widthContainer / 2;
    React.useEffect(function () {
        wheelInit();
        setTimeout(function () {
            window.scrollTo(0, 1);
        }, 0);
    }, []);

    var wheelInit = function wheelInit() {
        initCanvas();
        wheelDraw();
    };

    var initCanvas = function initCanvas() {
        var canvas = document.getElementById('canvas');

        if (navigator.userAgent.indexOf('MSIE') !== -1) {
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', widthContainer);
            canvas.setAttribute('height', heightContainer);
            canvas.setAttribute('id', 'canvas');
            document.getElementById('wheel').appendChild(canvas);
        }

        canvas.addEventListener('click', handleOpenModal, false);

        canvasContext = canvas.getContext('2d');
    };
    var handleOpenModal = (
    ) => {
        if (localStorageServ.luckyWhellNew.get() >= 2) {
            setIsOpenModalResult(true)
            setMessage(null)
            setMessageErr("Bạn đã sử dụng hết lượt quay!")
        } else {

            setIsOpenModal(true)
        }
    }

    var spin = function spin() {
        isStarted = true;

        if (timerHandle === 0) {
            spinStart = new Date().getTime();
            maxSpeed = Math.PI / segments.length;
            frames = 0;
            timerHandle = setInterval(onTimerTick, timerDelay);
        }
    };
    const handleStartBtn = () => {
        var canvas = document.getElementById('canvas');
        setIsOpenModal(false)
        canvas.addEventListener('click', handleOpenModal, false);
        canvasContext = canvas.getContext('2d');
        spin()

    }
    var onTimerTick = function onTimerTick() {
        frames++;
        draw();
        var duration = new Date().getTime() - spinStart;
        var progress = 0;
        var finished = false;

        if (duration < upTime) {
            progress = duration / upTime;
            angleDelta = maxSpeed * Math.sin(progress * Math.PI / 2);
        } else {
            if (winningSegment) {
                if (currentSegment === winningSegment && frames > segments.length) {
                    progress = duration / upTime;
                    angleDelta = maxSpeed * Math.sin(progress * Math.PI / 2 + Math.PI / 2);
                    progress = 1;
                } else {
                    progress = duration / downTime;
                    angleDelta = maxSpeed * Math.sin(progress * Math.PI / 2 + Math.PI / 2);
                }
            } else {
                progress = duration / downTime;
                angleDelta = maxSpeed * Math.sin(progress * Math.PI / 2 + Math.PI / 2);
            }

            if (progress >= 1) finished = true;
        }

        angleCurrent += angleDelta;

        while (angleCurrent >= Math.PI * 2) {
            angleCurrent -= Math.PI * 2;
        }

        if (finished) {
            setFinished(true);
            onFinished(currentSegment);
            clearInterval(timerHandle);
            timerHandle = 0;
            angleDelta = 0;

            httpServ.postKetQuaLuckyWhell({
                email: valuesForm.email,
                noiDung: currentSegment.value
            }).then((res) => {
                if (res.data.content) {
                    let luckyWhellLocal = localStorageServ.luckyWhellNew.get()
                    if (luckyWhellLocal) {
                        localStorageServ.luckyWhellNew.set(luckyWhellLocal + 1)
                    } else {
                        localStorageServ.luckyWhellNew.set(1)
                    }
                    setMessage(currentSegment.value)
                    setMessageErr(null)
                } else {
                    setMessage(null)
                    setMessageErr("Email đã được sử dụng")
                }
                setIsOpenModalResult(true)

            })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    var wheelDraw = function wheelDraw() {
        clear();
        drawWheel();
        drawNeedle();
    };

    var draw = function draw() {
        clear();
        drawWheel();
        drawNeedle();
    };

    var drawSegment = function drawSegment(key, lastAngle, angle) {
        var ctx = canvasContext;
        var value = segments[key].label;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, size, lastAngle, angle, false);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fillStyle = segColors[key];
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((lastAngle + angle) / 2);
        ctx.fillStyle = contrastColor;
        ctx.font = `bold ${1.3 * textSize}em ` + fontFamily;
        ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
        ctx.restore();
    };

    var drawWheel = function drawWheel() {
        var ctx = canvasContext;
        var lastAngle = angleCurrent;
        var len = segments.length;
        var PI2 = Math.PI * 2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = primaryColor;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = ` ${1.3 * textSize}em ` + fontFamily;

        for (var i = 1; i <= len; i++) {
            var angle = PI2 * (i / len) + angleCurrent;
            drawSegment(i - 1, lastAngle, angle);
            lastAngle = angle;
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, sizeBtnStart, 0, PI2, false);
        ctx.closePath();
        ctx.fillStyle = "#222260";
        ctx.lineWidth = 7;
        ctx.strokeStyle = contrastColor;
        ctx.fill();
        ctx.font = `bold ${1.2 * textSize}em ` + fontFamily;
        ctx.fillStyle = contrastColor;
        ctx.textAlign = 'center';
        ctx.fillText(buttonText, centerX, centerY + 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, PI2, false);
        ctx.closePath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#222260";
        ctx.stroke();
    };

    var drawNeedle = function drawNeedle() {
        var ctx = canvasContext;
        ctx.lineWidth = 1;
        ctx.strokeStyle = contrastColor;
        ctx.fileStyle = contrastColor;
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - sizeBtnStart);
        ctx.lineTo(centerX - 20, centerY - sizeBtnStart);
        ctx.lineTo(centerX, centerY - 70);
        ctx.closePath();
        ctx.fill();
        var change = angleCurrent + Math.PI / 2;
        var i = segments.length - Math.floor(change / (Math.PI * 2) * segments.length) - 1;
        if (i < 0) i = i + segments.length;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = primaryColor;
        ctx.font = `bold ${1.4 * textSize}em ` + fontFamily;
        currentSegment = segments[i];
        // isStarted && ctx.fillText(currentSegment.value, centerX + 10, centerY + size + sizeBtnStart);
    };

    var clear = function clear() {
        var ctx = canvasContext;
        ctx.clearRect(0, 0, widthContainer, heightContainer);
    };

    return <div className="whellLeft">
        <div className="btnWhellStart button-jittery" onClick={() => {
            handleOpenModal();
        }}>Bắt đầu</div>

        <Modal
            title="Vòng quay may mắn "
            className="rounded-xl p-0 bg-transparent overflow-hidden felx flex-col items-center w-96 md:w-96 dialogItem"
            visible={isOpenModal}
            onCancel={() => {
                setIsOpenModal(false)
            }}
            footer={null}
        > <div className="w-full flex items-center justify-center  bg-transparent space-y-3 p-3 md:px-5">
                <div className="bg-white rounded px-3 md:px-8 p-3 md:p-8 mb-4 w-96 shadow-design_code">
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

                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleStartBtn}
                                className="btn-theme  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Tham gia
                            </button>
                        </div>{" "}
                    </form>
                </div>
            </div>
        </Modal>
        <Modal
            title={message ? "Chúc mừng bạn" : "Email không hợp lệ"}
            className="rounded-xl p-0 bg-transparent overflow-hidden felx flex-col items-center dialogItem"
            visible={isOpenModalResult}
            onCancel={() => {
                setIsOpenModalResult(false)
            }}
            footer={null}
        > <div className="w-full flex items-center justify-center  bg-transparent  px-3 h-max-content">
                {messageErr && <p className="text-base  md:text-lg text-red-500">{messageErr}</p>}
                {message && <div className="flex flex-col justify-center space-y-3 h-48">
                    <Confetti
                        recycle={false}
                        opacity={0.8}
                    />
                    <p className="text-base  md:text-lg text-blue-theme"> <span className="text-color-title-theme">
                        Chúc mừng bạn đã nhận được giải thưởng :</span> <span className="font-medium">{message}</span></p>
                    <p>Bạn hãy chụp màn hình kết quả này hoặc email vừa nhập và <a className="font-medium underline text-blue-theme" href="https://www.facebook.com/lophocviet" target="_blank">INBOX</a> fanpage để áp dụng đăng kí ưu đãi nhé!</p>
                </div>}
            </div>
        </Modal>
        {
            React__default.createElement("canvas", {
                id: "canvas",
                width: withCanvas,
                height: heightCanvas,
                style: {
                    pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto'
                }
            })}

    </div>
};


