import React, { Component } from "react";
import { Form, Modal, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import environment from "../../../environments/environment";
import axios from "axios";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export default class UploadImg extends Component {
    state = {
        previewVisible: false,
        previewImage: "",
        previewTitle: "",
        fileList: [

        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file) => {
        console.log(file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
    };

    handleChange = ({ file, fileList, event }) => {
        // console.log("list", fileList);
        this.setState({ fileList });

        if (file.status === "uploading") {

            let listImg = []
            if (this.beforeUpload(file)) {
                // kiem tra
                //  call api luu anh
                if (fileList.length == 2) {
                    let bodyFormData1 = new FormData();
                    let bodyFormData2 = new FormData();
                    bodyFormData1.append("file", fileList[0].originFileObj);
                    bodyFormData2.append("file", fileList[1].originFileObj);
                    axios({
                        method: "POST",
                        url: environment.baseUrl + "/api/file/cmnd",
                        data: bodyFormData1,
                        headers: {
                            "Content-Type": "multipart/form-data",
                            apiKey: "UPD124yRTWF124QJFweUaCYSECETBERS",
                        },
                    })
                        .then((res) => {
                            // console.log('res1', res);
                            listImg.push(res.data)
                            axios({
                                method: "POST",
                                url: environment.baseUrl + "/api/file/cmnd",
                                data: bodyFormData2,
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    apiKey: "UPD124yRTWF124QJFweUaCYSECETBERS",
                                },
                            }).then((res) => {
                                listImg.push(res.data)
                                this.props.hadleGetImgAfterConver(listImg)

                            });
                        })
                        .catch((err) => {

                            console.log(err);
                        });
                }
            }
        }

        if (file.status === "done") {
            // up anh xong
            // console.log("done");
        }

        if (file.status === "removed") {
            //xoa anh xong

            if (fileList.length == 0) {
            }
        }
    };
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/heic";
        if (!isJpgOrPng) {
            message.error("Hãy chọn hình ảnh !");
        }

        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isLt2M) {
            message.error("Ảnh quá lớn < 10MB !");
        }

        return isJpgOrPng && isLt2M;
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                    {" "}
                    {fileList.length === 0 ? "Mặt trước" : "Mặt sau"}{" "}
                </div>
            </div>
        );
        const getFile = (e) => {
            // console.log("Upload event:", e);

            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };

        return (
            <Form.Item
                getValueFromEvent={getFile}
                label="Ảnh mặt trước, mặt sau CMND (Căn cước, giấy phép lái xe)"
                name="anhcmmS"
                rules={[
                    {
                        validateTrigger: "onSubmit",
                        required: fileList.length !== 2,
                        message: "Hãy chọn đầy đủ ảnh",
                    },
                ]}
            >
                <Upload
                    customRequest={({ file, onSuccess }) => {
                        setTimeout(() => {
                            onSuccess("ok");
                        }, 0);
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 2 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </Form.Item>
        );
    }
}
