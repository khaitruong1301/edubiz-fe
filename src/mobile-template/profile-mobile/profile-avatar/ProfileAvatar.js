import React from "react";
import { Progress } from "antd";
import './ProfileAvatar.css'
import environment from "../../../environments/environment";

function ProfileAvatar({ userInfo }) {

    const percentTichCuc = (userInfo?.tichCuc / userInfo?.tichCucToiDa) * 100;
    const percentKinhNghiem = (userInfo?.kinhNghiem / userInfo?.kinhNghiemToiDa) * 100;

    return (
        <div className="profile-avatar">
            <div className="profile-avatar_left">
                {
                    userInfo && userInfo.avatar ?
                        <img
                            src={`${environment.baseUrl}${userInfo?.avatar}`}
                            className="profile-image"
                            alt=""
                        /> :
                        <img
                            src="https://www.emmegi.co.uk/wp-content/uploads/2019/01/User-Icon.jpg"
                            className="profile-image"
                            alt=""
                        />
                }

                <Progress
                    type="circle"
                    strokeWidth={7}
                    strokeColor={{
                        "0%": "#fb8085",
                        "100%": "#f53844",
                    }}
                    percent={percentTichCuc}
                    showInfo={false}
                    className="profile-progress_1"
                    trailColor={"rgba(68, 66, 178, 0.1)"}
                />
                <Progress
                    type="circle"
                    strokeWidth={7}
                    strokeColor={{
                        "0%": "#5B86E5",
                        "100%": "#36D1DC",
                    }}
                    percent={percentKinhNghiem}
                    showInfo={false}
                    className="profile-progress_2"
                    trailColor={"rgba(68, 66, 178, 0.1)"}
                />
                <div className="profile-stylized">
                    <b>{userInfo?.danhHieu}</b>
                </div>
            </div>

        </div>
    )
}

export default React.memo(ProfileAvatar);