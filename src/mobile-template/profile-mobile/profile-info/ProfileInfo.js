import { Progress, Tooltip } from "antd";
import Lottie from "lottie-react";
import { iconTichCuc, iconXp } from "../../../assets/icons";
import coin_lottie from "../../../assets/lottie_json/18089-gold-coin.json";
import './ProfileInfo.css'

export default function ProfileInfo({ userInfo }) {
    const percentTichCuc = (userInfo.tichCuc / userInfo.tichCucToiDa) * 100;
    const percentKinhNghiem = (userInfo.kinhNghiem / userInfo.kinhNghiemToiDa) * 100;

    return (
        userInfo ? <div className='profileinfo'>
            <div className='profileinfo-name'>
                <b>{userInfo.hoTen}</b>
            </div>
            <div className='profileinfo-level'>
                <b>Level {userInfo.capDo}</b>
                <div className="profileinfo-level_coin">
                    <Lottie
                        loop={true}
                        animationData={coin_lottie}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                    />{userInfo.coin}
                </div>
            </div>
            <div className='profileinfo-positive'>
                <b>Tích cực</b>
                <div className="profileinfo-progress">
                    {iconTichCuc}
                    <div className="profileinfo-progress_item">
                        <Progress
                            strokeLinecap="square"
                            trailColor={"rgba(68, 66, 178, 0.1)"}
                            strokeWidth={10}
                            strokeColor={{
                                "0%": "#fb8085",
                                "100%": "#f53844",
                            }}
                            percent={percentTichCuc}
                            className="w-40"
                            showInfo={false}
                        />
                        <span className="profileinfo_span">
                            {userInfo.tichCuc}/{userInfo.tichCucToiDa} HP{" "}
                        </span>
                    </div>
                </div>
            </div>
            <div className='profileinfo-experience'>
                <b>Kinh nghiệm</b>
                <div className="profileinfo-progress">
                    {iconXp}
                    <div className="profileinfo-progress_item">
                        <Progress
                            strokeLinecap="square"
                            trailColor={"rgba(68, 66, 178, 0.1)"}
                            strokeWidth={10}
                            strokeColor={{
                                "0%": "#5B86E5",
                                "100%": "#36D1DC",
                            }}
                            percent={percentKinhNghiem}
                            className="w-40"
                            showInfo={false}
                        />
                        <span className="profileinfo_span">
                            {userInfo.kinhNghiem}/{userInfo.kinhNghiemToiDa} XP{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div> : <></>
    )
}