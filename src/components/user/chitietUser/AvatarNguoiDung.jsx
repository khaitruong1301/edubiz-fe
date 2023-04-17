import React, { Component } from 'react';
import { Upload, message } from 'antd';
import Loading from '../../loading/Loading';
import linkAvatar from '../../../assets/none.png';
import { uploadAvatar } from '../../../commons/user/UserServices';
import { apiURL } from '../../../redux/Config/Config';

export default class AvatarNguoiDung extends Component {

    state = {
        urlAvartar: "",
        avatarStyle: [],
        nguoiDungId: ""
    }

    static getDerivedStateFromProps(props, state) {

        const { nguoiDung } = props;
        let avatar = apiURL + nguoiDung.avatar;

        if (nguoiDung.id != state.nguoiDungId) {

            if (nguoiDung.avatar == "nul" || nguoiDung.avatar == undefined) {
                return {
                    urlAvartar: linkAvatar, avatarStyle: { opacity: 0.2 }, nguoiDungId: nguoiDung.id
                }
            } else {
                return {
                    urlAvartar: avatar, avatarStyle: { opacity: 1 }, nguoiDungId: nguoiDung.id
                }
            }

        }





    }

    componentWillMount = () => {

        // Promise.all([
        //     faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        //     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        //     faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        // ]).then(res => console.log(res));

    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Hãy chọn hình ảnh !');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Ảnh quá lớn < 10 MB !');
        }
        return isJpgOrPng && isLt2M;
    }

    //update avatar
    handleChange = info => {
        const { nguoiDung } = this.props;
        if (info.file.status == "done") {
            var div_loading = document.getElementsByClassName("div_loading");
            div_loading[0].removeAttribute("hidden", "");

            uploadAvatar(nguoiDung.id, info.file.originFileObj)
                .then(res => {

                    this.setState({
                        urlAvartar: apiURL + res.data.content,
                        avatarStyle: { opacity: 1 }
                    })


                    div_loading[0].setAttribute("hidden", "");
                })
                .catch(err => {
                    div_loading[0].setAttribute("hidden", "");
                    console.log("Lỗi!", "Upload tệp tin thất bại!", err);
                });


        }

    }

    xuatDuLieu = () => {
        const { checkUser } = this.props;
        if (checkUser) {
            return (
                <Upload
                    customRequest={({ file, onSuccess }) => {
                        setTimeout(() => {
                            onSuccess("ok");

                        }, 0);
                    }}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    <img src={this.state.urlAvartar} style={this.state.avatarStyle} alt="avatar" width={"100%"} height={150} />
                    <div className="overlay">
                        <i className="icon fa fa-camera"></i>
                        <div className="iconContent">Update</div>
                    </div>


                </Upload >
            )
        } else {
            return <img src={this.state.urlAvartar} style={this.state.avatarStyle} alt="avatar" width={"100%"} height={150} />
        }

    }

    render() {

        return (
            <div className="div_ctnd_avatar">
                {this.xuatDuLieu()}
                <Loading />
            </div>
        )
    }
}
