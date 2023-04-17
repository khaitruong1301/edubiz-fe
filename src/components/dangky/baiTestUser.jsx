import React, { Component } from 'react';
import logocyber from "../../templates/login/images/cyberlogo.png";
import { LAY_NGUOI_DUNG_EMAIL, LAY_DANH_SACH_NGUOI_DUNG, NOP_BAI_TEST_USER } from '../../redux/types/ActionsTypes';
import { connect } from 'react-redux';
import { message, Input, Form, Button } from 'antd';
import { urlMainPage, urlBaiTest } from '../../redux/Config/Config';

class baiTestUser extends Component {


    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields(['email', 'linkTest'], (err, values) => {

            if (!err) {

                const promise = new Promise((resolve) => {
                    this.props.dispatch({ type: LAY_NGUOI_DUNG_EMAIL, email: values.email, callback: resolve });
                });

                promise.then(data => {
                    //kiem tra ton tai
                    if (data == 0) {
                        message.error("Email này chưa được đăng ký !");

                    } else {
                        const { dsNguoiDung } = this.props;
                        //kiem tra da nop bai chua
                        let data = dsNguoiDung.find(n => n.email == values.email);
                        if (data != undefined && data.linkNopBai == "") {
                            this.props.dispatch({ type: NOP_BAI_TEST_USER, value: values });
                            this.showHoanThanh();
                        }
                        else
                            message.error("Bạn đã nộp bài rồi, không thể nộp bài nữa !");
                    }

                });

            }
        });
    };

    showHoanThanh = () => {

        var div_test_content = document.getElementsByClassName("div_test_content");
        div_test_content[0].setAttribute("hidden", "");

        var div_hoanthanh = document.getElementsByClassName("div_hoanthanh");
        div_hoanthanh[0].removeAttribute("hidden", "");
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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

        return (
            <div style={{height:'100%'}}>
               <div style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'fixed', width: '100%'}} ></div>

                <div className="container baitest_div_main">
                    <div className="div_test_content">
                        <h2 className="col-md-12 h2_step_title text-center">BÀI TẬP ĐẦU VÀO CYBERLEARN</h2>
                        <div className="col-md-12 text-center pt-4">
                            <a href={urlBaiTest} target="_blank"><button className="btn btn-success">Click vào đây để nhận bài test</button></a>
                        </div>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                            <div className="row">

                                <div className="col-md-12 text-info h6 text-center pt-4" >
                                    * Lưu ý: Sau khi làm xong bài test, các bạn vui lòng up bài của mình lên Google Drive và nộp link drive
                            </div>
                                <div className="col-md-10">
                                    <Form.Item label="Email" >
                                        {getFieldDecorator('email', {
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
                                        })(<Input placeholder="Email bạn đã đăng ký" />)}
                                    </Form.Item>
                                </div>
                                <div className="col-md-10">
                                    <Form.Item label="Link drive" >
                                        {getFieldDecorator('linkTest', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Trường này không được trống',
                                                },
                                            ],
                                        })(<Input placeholder="Nộp link bài làm của bạn đã up trên drive" />)}
                                    </Form.Item>
                                </div>
                                <div className="col-md-10">
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">Nộp bài</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div hidden className="text-center div_hoanthanh">
                        <h1 className=" pt-5">NỘP BÀI THÀNH CÔNG</h1>
                        <h2 className="text-center">Cảm ơn bạn đã đăng ký! CyberLearn sẽ xét duyệt hồ sơ và liên hệ sớm nhất đến các hồ sơ đạt yêu cầu! Các hồ sơ đạt yêu cầu sẽ được gởi email và liên lạc qua điện thoại/zalo để hướng dẫn trực tiếp cho bạn!</h2>
                        <button className="btn btn-success mt-5" onClick={() => { window.location = urlMainPage }}>Về trang chủ</button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {

        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG }) // lay danh sach nguoi dung tu store

    }

}

baiTestUser = Form.create({ name: 'register' })(baiTestUser);

const mapStateToProps = (state) => {

    return {
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
    }


}


export default connect(mapStateToProps)(baiTestUser)