import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, DatePicker, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import httpServ from "../../../services/http.service";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/lib/locale/vi_VN";

import UploadImg from "./UploadImg";
import Modal_MinhHoa from "./Modal_MinhHoa";
import { useHistory } from "react-router-dom";
import {
  setCurrentStep,
  setUserInfor,
} from "../../../redux/reducer/signUpReducer";
export default function FormThongTinChiTiet() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      congViecHienTai1: "SV",
      luongMongMuon: 0,
    });
  }, []);
  let { currentStep } = useSelector((state) => state.signUp);
  const [congViecHienTai, setCongViecHienTai] = useState("Sinh viên CNTT");
  const [listLoTrinh, setListLoTrinh] = useState([]);
  const [listCMND_IMG, setListCMND_IMG] = useState([]);
  const { userInfor } = useSelector((state) => state.signUp);
  useEffect(() => {
    httpServ
      .getMaVaTenLoTrinh()
      .then((res) => {
        setListLoTrinh(res.data.content);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  const hadleGetImgAfterConver = (value) => {
    setListCMND_IMG(value);
  };
  const onFinish = (values) => {
    // data từ Form
    let newUserInfor = JSON.parse(JSON.stringify(userInfor));
    newUserInfor.thongTinMoRong.namSinh = moment(values.namSinh).format(
      "MM/DD/YYYY"
    );
    newUserInfor.thongTinMoRong.hinhCmnd = JSON.stringify(listCMND_IMG);
    newUserInfor.thongTinMoRong.congViecHienTai = JSON.stringify([
      values.congViecHienTai1,
      values.congViecHienTai2,
      values.congViecHienTai3,
    ]);
    newUserInfor.thongTinMoRong.luongMongMuon = values.luongMongMuon
      ? values.luongMongMuon * 1
      : 0;
    newUserInfor.maLoTrinh = values.maLoTrinh;
    newUserInfor.thongTinMoRong.facebookUrl = values.facebookUrl;
    newUserInfor.thongTinMoRong.soCmnd = values.soCmnd;
    newUserInfor.thongTinMoRong.predictiveIndexRequire = [];
    newUserInfor.thongTinMoRong.predictiveIndex = [];
    newUserInfor.thongTinMoRong.nguonGioiThieu = values.nguonGioiThieu;
    // check user có đăng kí lộ trình java hay không
    const filteredArray = listLoTrinh.filter(
      (obj) =>
        values.maLoTrinh.includes(obj.id) &&
        obj.loTrinhMetaData === "'{\"testQuiz\":true}'"
    );
    if (filteredArray.length) {
      dispatch(setUserInfor(newUserInfor));
      // có java
      history.push("/java-quiz");
    } else {
      // console.log("Success form:", values);

      httpServ
        .postDangKyUser(newUserInfor)
        .then((res) => {
          dispatch(setCurrentStep(currentStep + 1));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="flex w-full ">
      <div className="w-full  flex-grow ">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          className="w-full "
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="wfull flex flex-col lg:flex-row">
            <div className=" w-full lg:w-1/2 pr-5">
              <Form.Item
                label="Ngày Sinh"
                name="namSinh"
                rules={[
                  {
                    type: "object",
                    required: true,
                    message: "Trường này không được để trống",
                  },
                ]}
              >
                {/* <ConfigProvider locale={locale}> */}
                <DatePicker placeholder="Nhập ngày sinh" className="w-full" />
                {/* </ConfigProvider> */}
              </Form.Item>
              <Form.Item
                label="Công việc hiện tại"
                name="congViecHienTai1"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    setCongViecHienTai(e.target.value);
                    // console.log(e.target.value);
                  }}
                  defaultValue="SV"
                >
                  <Radio value="SV">Sinh viên CNTT</Radio>
                  <Radio value="DL">CNTT đã đi làm </Radio>
                  <Radio value="TN">Trái ngành</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
                name="congViecHienTai2"
              >
                <Input
                  placeholder={
                    congViecHienTai === "SV"
                      ? "Bạn học trường nào...?"
                      : congViecHienTai === "DL"
                      ? "Bạn làm công ty nào...?"
                      : "Bạn làm ngành gì...?"
                  }
                />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
                name="congViecHienTai3"
              >
                <Input
                  placeholder={
                    congViecHienTai === "Sinh viên CNTT"
                      ? "Bạn là sinh viên năm mấy...?"
                      : congViecHienTai === "CNTT đã đi làm"
                      ? "Bao nhiêu năm kinh nghiệm...?"
                      : "Đã làm bao lâu...?"
                  }
                />
              </Form.Item>
              <Form.Item
                label="Lương mong muốn khi xin việc"
                name="luongMongMuon"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (isNaN(value)) {
                        return Promise.reject(
                          "Lương mong muốn phải là chữ số, ví dụ: 1000000"
                        );
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lộ trình muốn đăng ký"
                name="maLoTrinh"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
              >
                {/* <div className="w-full m-0 p-0  "> */}
                <Checkbox.Group
                  className=""
                  // onChange={onChange}
                >
                  {listLoTrinh.map((loTrinh) => {
                    return (
                      <div className="font-medium text-color-content">
                        <Checkbox
                          className="text-gray-800 w-full"
                          value={loTrinh.id * 1}
                        >
                          {loTrinh.tenLoTrinh}{" "}
                          <span>
                            <a
                              href={loTrinh.moTa}
                              target="_blank"
                              className="underline ml-1 text-blue-600"
                            >
                              Xem
                            </a>
                          </span>
                        </Checkbox>
                      </div>
                    );
                  })}
                </Checkbox.Group>
              </Form.Item>
            </div>
            <div className=" w-full lg:w-1/2 pr-5">
              <Form.Item
                label="Link facebook"
                name="facebookUrl"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                  () => ({
                    validator(_, value) {
                      let data =
                        value != undefined
                          ? value.toLowerCase().indexOf("facebook.com")
                          : "";
                      if (value != undefined && value != "" && data == -1) {
                        return Promise.reject("Facebook không hợp lệ");
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Bạn biết tới CyberSoft từ đâu ?"
                name="nguonGioiThieu"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    setCongViecHienTai(e.target.value);
                  }}
                >
                  <Radio value="BANBE">Bạn bè</Radio>
                  <Radio value="GOOGLE">Google </Radio>
                  <Radio value="FACEBOOK">Facebook</Radio>
                  <Radio value="KHAC">Khác</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Số CMND (Căn cước, Hộ chiếu)"
                name="soCmnd"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                  {
                    max: 12,
                    message: "Số giấy tờ tuỳ thân có độ dài 8 - 12 chữ số",
                  },
                  {
                    min: 8,
                    message: "Số giấy tờ tuỳ thân có độ dài 8 - 12 chữ số",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* 

              file
               */}
              <UploadImg hadleGetImgAfterConver={hadleGetImgAfterConver} />
              <div>
                <p>- Chỉ chấp nhận CMND, CCCD hoặc giấy phép lái xe</p>
                <p>
                  - Hình chụp phải rõ, thấy khuôn mặt nằm thẳng đứng{" "}
                  <Modal_MinhHoa />.
                </p>
                <p>
                  * Nếu bạn có vấn đề khi upload hãy liên hệ{" "}
                  <a
                    className="underline ml-1 text-blue-600 font-medium"
                    target="_blank"
                    href="https://www.facebook.com/lophocviet"
                  >
                    Link
                  </a>{" "}
                  này
                </p>
                Lưu ý: Việc cung cấp các hình ảnh trên để xác minh học viên và
                phục vụ việc cấp chứng nhận cũng như để đảm bảo việc bảo mật tài
                nguyên của CyberLearn. CyberLearn cam đoan sẽ <b> KHÔNG </b>
                cung cấp hình ảnh này cho bất kỳ bên nào khác.
              </div>
            </div>
          </div>
          <Form.Item>
            <div className="w-full flex justify-center space-x-3 ">
              <Button
                onClick={() => {
                  let prev = currentStep - 1;
                  dispatch(setCurrentStep(prev));
                }}
                // type="primary"
                htmlType="submit"
                className="w-24 rounded-sm"
              >
                Quay lại
              </Button>
              <Button
                onClick={() => {
                  // let nextStep = currentStep + 1;
                  // dispatch(setCurrentStep(nextStep));
                }}
                className="w-24"
                type="primary"
                htmlType="submit"
              >
                Hoàn thành
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
