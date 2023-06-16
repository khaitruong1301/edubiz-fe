import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import environment from '../../../environments/environment';
import httpServ from '../../../services/http.service';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const ChangeAvatar = (props) => {
    const { userInfo } = props;
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [avatar, setAvatar] = useState('');

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setAvatar(info.file.response[0]);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}> Upload </div>
        </div>
    );

    const handleSubmit = () => {
        if (!avatar) return message.error('Hình đại diện chưa được upload!');

        const model = {
            maNguoiDung: userInfo.id,
            avatar: avatar
        }

        httpServ.putChangeAvatar(model)
            .then(res => {
                message.success('Cập nhật hình ảnh thành công!');
                props.handleCloseModal();
            })
            .catch(error => {
                if (error.err.response.data.content)
                    message.success(error.err.response.data.content);
            })
    }

    return (
        <div className="change-password">
            <div className="change-password-title">
                ĐỔI HÌNH ĐẠI DIỆN
            </div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${environment.baseUrl}/api/file/image`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>

            <div className="change-password-button" style={{ justifyContent: 'center' }}>
                <button onClick={(handleSubmit)}>Cập nhật</button>
            </div>
        </div>

    );
};
export default ChangeAvatar;