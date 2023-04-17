import React, { Component } from 'react'
import { Form, Input, Checkbox, Select, Button, InputNumber, Upload, Icon, message, Radio, DatePicker } from 'antd';
import { Steps, Modal } from 'antd';
import DieuKhoan from '../dangky/DieuKhoan';
import { connect } from 'react-redux';
import {
    LAY_DANH_SACH_LO_TRINH,
    THEM_NGUOI_DUNG, LAY_NGUOI_DUNG_EMAIL,
    LAY_NGUOI_DUNG_SO_DT, UPLOAD_CMND,
} from '../../redux/types/ActionsTypes';
import { dinhDangTien } from '../../commons/format/FormatNumber';
import { dataKhaoSat } from '../../commons/data/khaosathanhdong';
import { UploadCheckFace } from '../../commons/user/UserServices';
import Loading from '../loading/Loading';
import * as faceapi from 'face-api.js';
import { urlMainPage, urlFanPage } from '../../redux/Config/Config';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import MinhHoaCMND from './MinhHoaCMND';

const { Option } = Select;
const InputGroup = Input.Group;
let stepCircle = 1;

let listMaLoTrinh = [];
let lamBaiTest = false;

//khoi tao dropdown noi cong tac
const creSelect_NoiCT =
    (
        <Select mode="default" style={{ width: '80%' }} >
            <Option value="Hồ Chí Minh" label="Hồ Chí Minh"> Hồ Chí Minh </Option>
            <Option value="Hà Nội" label="Hà Nội"> Hà Nội </Option>
            <Option value="Đà Nẵng" label="Đà Nẵng"> Đà Nẵng</Option>
            <Option value="Cần Thơ" label="Cần Thơ"> Cần Thơ </Option>
            <Option value="Nha Trang" label="Nha Trang"> Nha Trang </Option>
            <Option value="Huế" label="Huế"> Huế </Option>
            <Option value="Vinh" label="Vinh"> Vinh </Option>
            <Option value="Khác" label="Khác"> Khác </Option>
        </Select>
    )

class DangKy extends Component {

    state = {
        changeNoiLam: creSelect_NoiCT, // khoi tao select noi lam viec
        changeCVOne: <Input placeholder="Bạn học trường nào...?" />,
        changeCVTwo: <Input placeholder="Bạn là sinh viên năm mấy...?" />,
        current: 0, //khoi tao step
        visible: false, //khoi tao cho modal popup dieu khoan
        visibleCMND: false, //khoi tao model popup anh cmnd minh hoa
        visibleLoTrinh: false, //khoi tao model popup thu tu lo trinh
        listData: { congViecChinh: "SV" }, //khoi tao data luu nguoi dung
        listCMND: [], // khoi tao data xu ly anh cmnd

        //khoi tao upload hinh
        previewVisible: false,
        previewImage: '',
        fileList: [],
        labelUpload: "Mặt trước",

        //khoi tao step circle
        stepCirStyle: ["label", "label", "label", "label"],
        stepCirContent: <div className="pt-3"><div>Bước 1</div> <div className="h4">Thông tin chính</div></div>,
    };

    //xu ly modal popup dieu khoan
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModalCMND = () => {
        this.setState({
            visibleCMND: true,
        });
    };

    showModalCheckLoTrinh = () => {
        this.setState({
            visibleLoTrinh: true,
        });
    };


    closeModal = () => {
        this.setState({
            visible: false,
            visibleCMND: false,
            visibleLoTrinh: false
        });
    };

    //xu ly step cirle
    nextStepCircle = () => {

        switch (stepCircle) {
            case 1: this.setState({
                stepCirStyle: ["label", "label", "label", "label"],
                stepCirContent: <div className="pt-3"><div>Bước 1</div> <div className="h4">Thông tin chính</div></div>,
            })
                break;
            case 2: this.setState({
                stepCirStyle: ["labeldone", "label", "label", "label"],
                stepCirContent: <div className="pt-3"><div>Bước 2</div> <div className="h4">Thông tin chi tiết</div></div>,
            })
                break;
            case 3: this.setState({
                stepCirStyle: ["labeldone", "labeldone", "label", "label"],
                stepCirContent: <div className="pt-3"><div>Bước 3</div> <div className="h4">Khảo sát 1</div></div>,
            })
                break;
            case 4: this.setState({
                stepCirStyle: ["labeldone", "labeldone", "labeldone", "label"],
                stepCirContent: <div className="pt-3"><div>Bước 4</div> <div className="h4">Khảo sát 2</div></div>,
            })
                break;
            case 5: this.setState({
                stepCirStyle: ["labeldone", "labeldone", "labeldone", "labeldone"],
                stepCirContent: <div className="pt-3"><div>Bước 5</div>  <div className="h4">Hoàn thành</div></div>,
            })
                break;
        }

    }


    // xu ly step
    next() {
        stepCircle++;
        this.nextStepCircle();
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {

        stepCircle--;
        this.nextStepCircle();
        const current = this.state.current - 1;
        this.setState({ current });
    }

    //kiem tra ky tu dac biet
    validateCheckSpecialial = (rule, value, callback) => {
        if (value != undefined && value != "") {
            var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (format.test(value)) {
                callback('Có ký tự đặc biệt, mời nhập lại');
            }
            else {
                callback();
            }
        }
        else {
            callback();
        }

    }

    //kiem tra dinh dang phone
    validatePhone = (rule, value, callback) => {
        const { form } = this.props;
        const reg = /^-?[0-9]*(\.[0-9]*)?$/;
        if ((isNaN(value) && !reg.test(value)) || value.length < 9 || value.length > 15) {
            callback('Số điện thoại phải là số. Có độ dài từ 9 - 15');
        }
        else {
            callback();
        }

    };

    //kiem tra upload cmnd
    validateUploadCMND = (rule, value, callback) => {

        const { listCMND } = this.state;

        if (listCMND !== undefined) {
            if (listCMND.length !== 2) {
                callback('Hãy chọn đầy đủ ảnh');
            }
            else {
                callback();

                // var div_loading = document.getElementsByClassName("div_loading");
                // div_loading[0].removeAttribute("hidden", "");

                // listCMND.map(ds => {
                //     //kiem tra fake id
                //     faceapi.bufferToImage(ds.file)

                //         .then(image => faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors())
                //         .then(arr => {

                //             if (arr.length === 0) {
                //                 let checkFake = listCMND.find(n => n.checkFake == 1);
                //                 //console.log("Ko hop le")
                //                 if (checkFake == undefined) // check 1 lan 
                //                     callback('Ảnh CMND không hợp lệ');
                //                 else
                //                     callback();
                //             }
                //             else {
                //                 //console.log("OK")
                //                 ds.checkFake = 1;

                //                 callback();
                //             }

                //             div_loading[0].setAttribute("hidden", "");
                //         })
                //         .catch(err => {
                //             return console.log("Lỗi!", "Upload tệp tin thất bại!", err);
                //         });


                // })

            }
        }

    };

    //kiem tra dinh dang CMND
    validateCMND = (rule, value, callback) => {

        if ((value != undefined && value != "") && (value.length < 8 || value.length > 12)) {

            callback('Số giấy tờ tuỳ thân có độ dài 8 - 12 chữ số');
        }
        else {
            callback();
        }

    };

    //kiem tra facebookurl
    validateFacebookUrl = (rule, value, callback) => {

        let data = value != undefined ? value.toLowerCase().indexOf("facebook.com") : "";

        if ((value != undefined && value != "") && data == -1) {
            callback('Facebook không hợp lệ');
        }
        else {
            callback();
        }

    };

    // xu ly form dang ky chinh

    handleSubmit = e => {
        //this.next();
        e.preventDefault();
        this.props.form.validateFields(['hoTen', 'email', 'soDT', 'noiCongTacHienTai', 'maGioiThieu', 'agreement'], (err, values) => {

            if (!err) {
                const promiseDT = new Promise((resolve) => {
                    this.props.dispatch({ type: LAY_NGUOI_DUNG_SO_DT, soDT: values.soDT, callback: resolve });
                });
                promiseDT.then(dataDT => {
                    if (dataDT !== null) {
                        message.error("Số điện thoại này đã được đăng ký !");

                    }
                    else {
                        const promise = new Promise((resolve) => {
                            this.props.dispatch({ type: LAY_NGUOI_DUNG_EMAIL, email: values.email, callback: resolve });
                        });

                        promise.then(data => {
                            //kiem tra ton tai
                            if (data === 0) {

                                let data = this.state.listData;
                                //xu ly them nguoi dung vao state tam
                                this.state.listData = { ...data, thongtinchinh: values };
                                this.next();
                            }
                            else {
                                message.error("Email này đã được đăng ký !");
                            }
                        });
                    }

                });


            }
        });
    };


    //xu ly form dang ky chi tiet
    handleSubmitChiTiet = e => {

        //this.next();
        e.preventDefault();
        this.props.form.validateFields(['namSinh', 'soCmnd', 'facebookUrl', 'noiLam', 'soNamLam', 'luongMongMuon', 'maLoTrinh', 'hinhCmnd'], (err, values) => {
            
            if (!err) {

                let data = this.state.listData;
                this.state.listData = { ...data, maLoTrinh: values.maLoTrinh, thongTinMoRong: values };
                if (this.checkThuTuLoTrinh()) {
                    lamBaiTest = false;
                    this.next();
                } else {
                    this.showModalCheckLoTrinh();
                }

            }
        });
    };


    //xu ly form nguoi khac muon ban
    handleSubmitKhaoSat = e => {

        //this.next();
        e.preventDefault();
        this.props.form.validateFields(['khaoSat'], (err, values) => {
            if (!err) {
                let data = this.state.listData;
                this.state.listData = { ...data, thongTinMoRong: { ...data.thongTinMoRong, predictiveIndex: values.khaoSat } };

                //post nguoi dung csdl
                window.scroll(0, 0);
                this.next();
            }
        });
    };

    //xu ly form ban muon
    handleSubmitBanMuon = e => {
        //this.next();
        e.preventDefault();
        this.props.form.validateFields(['khaoSatBanMuon'], (err, values) => {
            if (!err) {
                var div_loading = document.getElementsByClassName("div_loading");
                div_loading[0].removeAttribute("hidden", "");

                let dataCMND = [];//tao bien lay duogn dan khi luu hinh

                //luu hinh 1
                const promiseDT = new Promise((resolve) => {
                    this.props.dispatch({ type: UPLOAD_CMND, fileCMND: this.state.listCMND[0].file, callback: resolve });
                });
                promiseDT.then(dataDT => {

                    dataCMND = [dataDT];

                    //luu hinh 2
                    const promiseDT2 = new Promise((resolve) => {
                        this.props.dispatch({ type: UPLOAD_CMND, fileCMND: this.state.listCMND[1].file, callback: resolve });
                    });

                    promiseDT2.then(dataDT => {
                        dataCMND = [...dataCMND, dataDT];
                        let linkNopBai = lamBaiTest ? "" : "0";

                        //post nguoi dung csdl
                        let data = this.state.listData;
                        this.state.listData = { ...data, linkNopBai: linkNopBai, thongTinMoRong: { ...data.thongTinMoRong, predictiveIndexRequire: values.khaoSatBanMuon, hinhCmnd: JSON.stringify(dataCMND) } };

                        // them user dang ky
                        this.props.dispatch({ type: THEM_NGUOI_DUNG, nguoiDung: this.state.listData })

                        div_loading[0].setAttribute("hidden", "");

                        this.next();

                    });
                });

            }
        });
    };

    //xu ly kiem tra thu tu lo trinh duoc check 
    checkThuTuLoTrinh = () => {

        let bCheck = true;

        let data = this.state.listData.maLoTrinh;

        //sap xep va lay gia tri max
        data = data.sort(function (a, b) { return b - a });
        let maxValu = data[0];

        //lay vi tri va duyet theo vi tri xem da chon nhung lo trinh truoc chua
        let index = listMaLoTrinh.findIndex(n => n == maxValu);
        for (let i = 0; i <= index; i++) {
            if (data.find(n => n == listMaLoTrinh[i]) == undefined) {
                bCheck = false;
                break;
            }

        }

        return bCheck;
    }

    //khoi tao dropdown lo trinh
    creSelect_LoTrinh = () => {
        const { Option } = Select;
        let data = this.props.dsLoTrinh;   // danh sach lo trinh

        if (data !== undefined) {

            //select option

            // return (
            //     <Select mode="multiple" style={{ width: '100%' }} optionFilterProp="label">
            //         {
            //             data.map(element => {
            //                 return <Option value={element.id} label={element.tenLoTrinh}> {element.tenLoTrinh} </Option>
            //             })
            //         }
            //     </Select>
            // )

            //checkbox
            return <Checkbox.Group>
                {
                    data.map(ds => {

                        //them id lotrinh vao list de kiem tra bai test dau vao
                        if (listMaLoTrinh.find(n => n == ds.id) == undefined)
                            listMaLoTrinh.push(ds.id);

                        return (<div className="col-md-12 pb-2 div_checkbox_lotrinh"><Checkbox value={ds.id}> {ds.tenLoTrinh}
                            <a className="text-primary" href={ds.moTa} target="_blank"> <u>Xem</u></a>
                        </Checkbox>
                        </div>)
                    })
                }
            </Checkbox.Group>

        }
    }


    //khoi tao dropdown nam sinh
    creSelect_NamSinh = () => {
        const { Option } = Select;
        let dataYearEnd = new Date().getFullYear() - 15; //lay nam chay cuoi (15 tuoi)
        let dataYearStart = dataYearEnd - 26; // lay nam chay dau 41 tuoi

        var elements = [];
        for (let i = dataYearStart; i <= dataYearEnd; i++) {
            elements.push(<Option key="1" value={i} > {i} </Option>);
        }

        return (
            <Select showSearch mode="default" style={{ width: '100%' }} >
                {elements}
            </Select>
        )

    }

    //khoi tao checkbox khao sat
    creCheck_HanhDong = () => {

        return dataKhaoSat.map(element => {
            return <div className="col-md-3"><Checkbox value={element.value}> {element.label} </Checkbox></div>
        })

    }

    //xu ly chuyen doi textbox va select noi lam viec
    hanldeNoiLam = (value, event) => {
        this.setState({
            changeNoiLam: value ? creSelect_NoiCT : <Input style={{ width: '80%' }} />
        });
        this.props.form.resetFields('noiCongTacHienTai');
        if (this.state.listData.thongtinchinh != undefined)
            this.state.listData.thongtinchinh.noiCongTacHienTai = ""
    }

    //xu ly chuyen doi textbox va select cong viec
    hanldeCongViec = (value, event) => {

        //clear value 
        this.props.form.resetFields('noiLam');
        this.props.form.resetFields('soNamLam');
        if (this.state.listData.thongTinMoRong != undefined) {
            this.state.listData.thongTinMoRong.noiLam = "";
            this.state.listData.thongTinMoRong.soNamLam = "";
        }

        //get value
        let data = this.state.listData;

        //construc value
        let dataCongViec = "SV";
        let divHtml1 = <Input placeholder="Bạn học trường nào...?" />;
        let divHtml2 = <Input placeholder="Bạn là sinh viên năm mấy...?" />

        if (value.target.value === "DL") {
            divHtml1 = <Input placeholder="Bạn làm công ty nào...?" />;
            divHtml2 = <Input placeholder="Bao nhiêu năm kinh nghiệm...?" />
            dataCongViec = "DL";
        }

        if (value.target.value === "TN") {
            divHtml1 = <Input placeholder="Bạn làm ngành gì...?" />;
            divHtml2 = <Input placeholder="Đã làm bao lâu...?" />;
            dataCongViec = "TN";
        }

        this.setState({
            changeCVOne: divHtml1,
            changeCVTwo: divHtml2,
            listData: { ...data, congViecChinh: dataCongViec }

        });

    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    //kiem tra upload la hinh
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Hãy chọn hình ảnh !');
        }

        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isLt2M) {
            message.error('Ảnh quá lớn < 10MB !');
        }


        return isJpgOrPng && isLt2M;
    }

    //xu ly upload 
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };


    handleChange = ({ file, fileList, event }) => {

        let checkTT = this.state.listCMND.find(n => n.Name === file.name);

        if (file.status === "uploading") {
            if (checkTT === undefined) {
                if (this.beforeUpload(file)) {

                    this.setState({ fileList });

                    this.setState({
                        listCMND: [...this.state.listCMND, { Name: file.name, file: file.originFileObj, checkFake: 0 }]
                    });

                }
            } else {
                message.error('Ảnh đã bị trùng hãy thử lại !');
            }
        }

        if (file.status === "done") {
            this.setState({
                labelUpload: "Mặt sau",
            });

        }

        if (file.status === "removed") {
            this.setState({ fileList });

            if (fileList.length == 0) {
                this.setState({
                    labelUpload: "Mặt trước",
                });
            }

            let listCMND = this.state.listCMND.filter(n => n.Name !== file.name);

            this.setState({
                listCMND: listCMND,
            });
        }

    }

    xuatNoiDungHoanThanh = () => {
        return (
            <div className="container text-center">
                <h1 className=" pt-5">ĐĂNG KÝ THÀNH CÔNG</h1>

                {lamBaiTest ? <h2 className="text-center">Mời bạn <a class="text-primary" href="/test" target="_blank" >click vào đây</a> để làm bài test.</h2> : ""}

                <h2 className="text-center">Cảm ơn bạn đã đăng ký! CyberLearn sẽ xét duyệt hồ sơ và liên hệ sớm nhất đến các hồ sơ đạt yêu cầu! Các hồ sơ đạt yêu cầu sẽ được gởi email và liên lạc qua điện thoại/zalo để hướng dẫn trực tiếp cho bạn!</h2>
                <button className="btn btn-success mt-5" onClick={() => { window.location = urlMainPage }}>Về trang chủ</button>
            </div>
        )
    }

    render() {
        //khoi step
        const { current } = this.state;

        //khoi tao form
        const { getFieldDecorator } = this.props.form;

        //khoi tao upload
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">{this.state.labelUpload}</div>
            </div>
        );


        //khoi tao thoc tinh width cho form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },

            },
        };

        //khoi tao step
        const { Step } = Steps;

        //lay thong tin mo rong tu state
        const { thongTinMoRong } = this.state.listData;

        const steps = [
            {
                // form dang ky thong tin chinh
                title: 'Thông tin chính',
                content: (
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                        <div className="row">
                            <h2 className="col-md-12 h2_step_title text-center">ĐĂNG KÝ THÔNG TIN CHÍNH</h2>
                            <div className="col-md-12 text-info h6" style={{ lineHeight: 1.5 }}>
                                * Lưu ý:
                            <br />
                                - Vui lòng đọc <a href="#" className="text-danger" onClick={this.showModal}><u>ĐIỀU KHOẢN</u></a> trước khi đăng ký. Vui lòng cung cấp đầy đủ các thông tin để CyberLearn xét duyệt. CyberLearn chỉ cung cấp khóa học cho các tài khoản thật và có nhu cầu học thật sự.
                            <br />
                                -  Hệ thống đăng nhập bằng facebook, nên email bạn đăng ký phải là email facebook của bạn.
                            </div>
                            <div className="col-md-10 pt-4">
                                <Form.Item label="Họ và tên" >
                                    {getFieldDecorator('hoTen', {
                                        initialValue: this.state.listData.thongtinchinh != undefined ? this.state.listData.thongtinchinh.hoTen : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Trường này không được trống',
                                            },
                                            {
                                                validator: this.validateCheckSpecialial,
                                            },
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                            </div>
                            <div className="col-md-10">
                                <Form.Item label="Email" >
                                    {getFieldDecorator('email', {
                                        initialValue: this.state.listData.thongtinchinh != undefined ? this.state.listData.thongtinchinh.email : "",
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'Email không hợp lệ!',
                                            },
                                            {
                                                required: true,
                                                message: 'Trường này không được trống',
                                            },
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                            </div>
                            <div className="col-md-10">
                                <Form.Item label="Số ĐT" >
                                    {getFieldDecorator('soDT', {
                                        initialValue: this.state.listData.thongtinchinh != undefined ? this.state.listData.thongtinchinh.soDT : "",
                                        rules: [
                                            {
                                                required: true,
                                                message: ' ',
                                            },
                                            {
                                                validator: this.validatePhone,
                                            },
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                            </div>
                            <div className="col-md-10">
                                <Form.Item label="Nơi học tập/làm việc">
                                    <InputGroup compact>
                                        <Select style={{ width: '20%' }} defaultValue="Việt Nam" onSelect={(value, event) => this.hanldeNoiLam(value, event)}>
                                            <Option value={true}>Việt Nam</Option>
                                            <Option value={false}>Quốc gia khác</Option>
                                        </Select>
                                        {getFieldDecorator('noiCongTacHienTai', {
                                            initialValue: this.state.listData.thongtinchinh != undefined ? this.state.listData.thongtinchinh.noiCongTacHienTai : "",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Trường này không được trống',
                                                },
                                                {
                                                    validator: this.validateCheckSpecialial,
                                                },
                                            ],
                                        })(this.state.changeNoiLam)}
                                    </InputGroup>
                                </Form.Item>
                            </div>
                            <div className="col-md-10">
                                <Form.Item label="Mã giới thiệu/Ưu đãi">
                                    {getFieldDecorator('maGioiThieu', {
                                        initialValue: this.state.listData.thongtinchinh != undefined ? this.state.listData.thongtinchinh.maGioiThieu : "",

                                    })(<Input />)}
                                </Form.Item>
                            </div>
                            <div className="col-md-10">
                                <Form.Item {...tailFormItemLayout}  >
                                    {getFieldDecorator('agreement', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Hãy đọc và đồng ý các điều khoản của CyberLearn',
                                            }
                                        ]

                                    })(
                                        <Checkbox onChange={e => !e.target.checked ? e.target.checked = undefined : ""}>
                                            Tôi đồng ý với các <a href="#" className="text-danger" onClick={this.showModal}> <u> ĐIỀU KHOẢN</u></a>  của CyberLearn
                                        </Checkbox>,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-md-10">
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">Tiếp theo</Button>
                                </Form.Item>
                            </div>
                        </div >
                    </Form >
                ),
            },
            {
                //form dang ky thong tin chi tiet
                title: 'Thông tin chi tiết',
                content: (
                    <div className="div_dangkychitiet" >

                        <Form {...formItemLayout} onSubmit={this.handleSubmitChiTiet} labelAlign="left" >
                            <div className="row">
                                <h2 className="col-md-12 pb-3 h2_step_title text-center">ĐĂNG KÝ THÔNG TIN CHI TIẾT</h2>
                                <div className="col-md-6">
                                    <div className="col-md-12 pb-2">
                                        <Form.Item label="Ngày Sinh" >
                                            {getFieldDecorator('namSinh', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.namSinh : "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    },
                                                ],
                                            })(<DatePicker style={{ width: '100%' }} />
                                                //this.creSelect_NamSinh()
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-12 pb-2">
                                        <Form.Item label="Công việc hiện tại">
                                            <Radio.Group value={this.state.listData.congViecChinh} onChange={(value, event) => this.hanldeCongViec(value, event)}>
                                                <Radio value="SV">Sinh viên CNTT</Radio>
                                                <Radio value="DL">CNTT đã đi làm</Radio>
                                                <Radio value="TN">Trái ngành</Radio>
                                            </Radio.Group>
                                            {getFieldDecorator('noiLam', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.noiLam : "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    },
                                                    {
                                                        validator: this.validateCheckSpecialial,
                                                    },
                                                ],
                                            })(this.state.changeCVOne)}
                                        </Form.Item>
                                        < Form.Item>
                                            {getFieldDecorator('soNamLam', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.soNamLam : "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    },
                                                    {
                                                        validator: this.validateCheckSpecialial,
                                                    },
                                                ],
                                            })(this.state.changeCVTwo)}
                                        </Form.Item>
                                    </div>

                                    <div className="col-md-12 pb-2" >
                                        <Form.Item label="Lương mong muốn khi xin việc" >
                                            {getFieldDecorator('luongMongMuon', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.luongMongMuon : "0",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    }
                                                ],
                                            })(<InputNumber
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            />)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-12 pb-2" >
                                        <Form.Item label="Lộ trình muốn đăng ký" >
                                            {getFieldDecorator('maLoTrinh', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.maLoTrinh : "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    },
                                                ],
                                            })(this.creSelect_LoTrinh())}
                                        </Form.Item>
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    <div className="col-md-12 pb-2">
                                        <Form.Item label="Link facebook" >
                                            {getFieldDecorator('facebookUrl', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.facebookUrl : "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    },
                                                    {
                                                        validator: this.validateFacebookUrl
                                                    },
                                                ],
                                            })(<Input />)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-12 pb-2">
                                        <Form.Item label="Số CMND (Căn cước, Hộ chiếu)" >
                                            {getFieldDecorator('soCmnd', {
                                                initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.soCmnd : "",
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Trường này không được trống',
                                                    },
                                                    {
                                                        validator: this.validateCMND,
                                                    },
                                                ],
                                            })(<Input />)}
                                        </Form.Item>
                                    </div>

                                    <div className="col-md-12 pb-2">
                                        <Form.Item label="Ảnh mặt trước, mặt sau CMND (Căn cước, giấy phép lái xe)" >
                                            {getFieldDecorator('hinhCmnd', {
                                                rules: [
                                                    {
                                                        validator: this.validateUploadCMND,
                                                    },
                                                ],
                                            })(<Upload
                                                customRequest={({ file, onSuccess }) => {
                                                    setTimeout(() => {
                                                        onSuccess("ok");

                                                    }, 0);
                                                }}
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                                showUploadList={{ showDownloadIcon: false }}
                                            >
                                                {fileList.length == 2 ? null : uploadButton}
                                            </Upload>
                                            )}
                                        </Form.Item>
                                        <div >
                                            - Chỉ chấp nhận CMND, CCCD hoặc giấy phép lái xe<br />
                                            - Hình chụp phải rõ, thấy khuôn mặt nằm thẳng đứng (<a className="text-primary" onClick={() => this.showModalCMND()}>Ảnh minh hoạ</a>).
                                            <br />
                                            * Nếu bạn có vấn đề khi upload hãy liên hệ <a className="text-primary" href={urlFanPage} target="_blank" > Link </a> này
                                         <br />
                                            <i><u>Lưu ý</u>: Việc cung cấp ảnh chứng minh thư là để đảm bảo việc bảo mật tài nguyên của CyberLearn. Bên CyberLearn cam đoan sẽ <b>KHÔNG</b> cung cấp hình ảnh này cho bất kỳ bên nào khác.</i>
                                        </div>
                                    </div>

                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>

                                </div>

                                {/* <div className="col-md-12 text-center">
                                    <Form.Item >
                                        {getFieldDecorator('dongYHoTroTimViec', {
                                            valuePropName: thongTinMoRong != undefined && thongTinMoRong.dongYHoTroTimViec ? "checked" : "nul",
                                            initialValue: thongTinMoRong != undefined && thongTinMoRong.dongYHoTroTimViec ? true : false,
                                        })(
                                            <Checkbox >
                                                Đồng ý CyberLearn hỗ trợ tìm việc làm cho bạn
                                    </Checkbox>,
                                        )}
                                    </Form.Item>
                                </div> */}
                                <div className="col-md-12 text-center">

                                    <Form.Item >
                                        <Button type="default" onClick={() => this.prev()} style={{ marginRight: 10 }}>Quay lại</Button>
                                        <Button type="primary" htmlType="submit">Tiếp theo</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form >
                    </div >
                ),
            },
            {
                title: 'Khảo sát 1',
                content: (
                    <div className="container div_hanhdong">
                        <h2 className="text-center">CyberLearn sẽ tạo cho bạn một CV miễn phí và sẽ có thệ thống AI để đề xuất công việc tốt nhất và mức lương tốt nhất cho bạn. Nhờ bạn chọn thêm các thông tin dưới đây</h2>
                        <hr />
                        <h4 >CHỈ DẪN: Hãy đọc các chữ trong bản dưới đây và đánh dấu những chữ mà bạn thấy diễn tả được các điều mà người ta mong bạn hành động như vậy.</h4>
                        <hr />
                        <Form {...formItemLayout} onSubmit={this.handleSubmitKhaoSat} >
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Item >
                                        {getFieldDecorator('khaoSat', {
                                            initialValue: this.state.listData.thongTinMoRong != undefined ? this.state.listData.thongTinMoRong.predictiveIndex : "",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Hãy chọn ít nhất 1 từ diễn tả',
                                                },
                                            ],
                                        })(<Checkbox.Group>{this.creCheck_HanhDong()}</Checkbox.Group>)}
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 text-right">

                                    <Form.Item >
                                        <Button type="default" onClick={() => this.prev()} style={{ marginRight: 10 }}>Quay lại</Button>
                                        <Button type="primary" htmlType="submit">Tiếp theo</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>

                    </div>
                ),
            },
            {
                title: 'Khảo sát 2',
                content: (
                    <div className="container div_hanhdong">

                        <h4 className="mt-4">CHỈ DẪN: Hãy đọc các chữ trong bản dưới đây và đánh dấu những chữ mà bạn thấy diễn tả được các điều mà bạn muốn hành động.</h4>
                        <hr />
                        <Form {...formItemLayout} onSubmit={this.handleSubmitBanMuon} >
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Item >
                                        {getFieldDecorator('khaoSatBanMuon', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Hãy chọn ít nhất 1 từ diễn tả',
                                                },
                                            ],
                                        })(<Checkbox.Group>{this.creCheck_HanhDong()}</Checkbox.Group>)}
                                    </Form.Item>
                                </div>
                                <div className="col-md-12 text-right">
                                    <Form.Item >
                                        <Button type="default" onClick={() => this.prev()} style={{ marginRight: 10 }}>Quay lại</Button>
                                        <Button type="primary" htmlType="submit">Hoàn thành</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>

                    </div>
                ),
            },
            {
                title: 'Hoàn thành',
                content: (this.xuatNoiDungHoanThanh()),
            },

        ];


        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'fixed', width: '100%' }} ></div>

                <div className="container dangky_div_main">
                    <div className="div_dangky_stepcircle ">

                        {this.state.stepCirContent}
                        <div className="div_dangky_stepicon">
                            <div className={"pie-wrapper pie-wrapper--solid progress-step " + this.state.stepCir}>
                                <span className="labeldone"><i className="fa fa-pencil"></i></span>
                            </div>

                            <div className={"pie-wrapper pie-wrapper--solid progress-step " + this.state.stepCir}>
                                <span className={this.state.stepCirStyle[0]}><i className="fa fa-id-card"></i></span>
                            </div>

                            <div className={"pie-wrapper pie-wrapper--solid progress-step " + this.state.stepCir}>
                                <span className={this.state.stepCirStyle[1]}><i className="fa fa-list"></i></span>
                            </div>

                            <div className={"pie-wrapper pie-wrapper--solid progress-step " + this.state.stepCir}>
                                <span className={this.state.stepCirStyle[2]}><i className="fa fa-braille"></i></span>
                            </div>

                            <div className={"pie-wrapper pie-wrapper--solid progress-step " + this.state.stepCir}>
                                <span className={this.state.stepCirStyle[3]}><i className="fa fa-check"></i></span>
                            </div>
                        </div>
                    </div>
                    <Steps current={current} className="div_dangky_step">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    {/* popup dieu khoan voi dang ky */}
                    <Modal title="Quy Định Học Tập" visible={this.state.visible} onCancel={this.closeModal} width={1000} closable={false} footer={<button onClick={this.closeModal} className="btn btn-primary">Đồng Ý</button>}>
                        <DieuKhoan />
                    </Modal>
                    {/* popup anh cmnd minh hoa */}
                    <Modal visible={this.state.visibleCMND} width={700} onCancel={this.closeModal} footer={null}>
                        <MinhHoaCMND btnnext={this.next} />
                    </Modal>
                    {/* popup kiem tra lo trinh  */}
                    <Modal title="Thông báo" onOk={() => { lamBaiTest = true; this.next(); this.closeModal(); }} visible={this.state.visibleLoTrinh} onCancel={this.closeModal} cancelText="Chọn lại" okText="Đồng ý">
                        Bạn đang chọn các combo có yêu cầu đầu vào, bạn vui lòng nhấn <u class="text-primary">Xem</u> kế combo để xem các yêu cầu hoặc bạn sẽ làm bài <b>Test</b> sau khi hoàn thành đăng ký. CyberLearn sẽ tư vấn sau khi bạn hoàn thành xong bài test.
                </Modal>
                    {/* loading kiem tra anh */}
                    <Loading />
                    {/* google recapcha */}
                    <GoogleReCaptchaProvider
                        reCaptchaKey="6Ldb3eEUAAAAAHRKJkJeU7QDppMGw4rtwmkXi1qU"
                        language="vi"
                    />

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


        //  this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG }) // lay danh sach nguoi dung tu store
        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }); // lay danh sach lo trinh tu store


        // Promise.all([
        //     faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        //     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        //     faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        // ]).then(res => console.log(res));

    }
}

DangKy = Form.create({ name: 'register' })(DangKy);

//lay du lieu tu store
const mapStateToProps = (state) => {

    return {
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh
    }

}

export default connect(mapStateToProps)(DangKy)