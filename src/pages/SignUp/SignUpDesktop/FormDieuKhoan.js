import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  setCurrentStep,
  setUserInfor,
} from "../../../redux/reducer/signUpReducer";
import httpServ from "../../../services/http.service";
export default function FormDieuKhoan({ handleOpenModal }) {
  const { Option } = Select;
  let { currentStep } = useSelector((state) => state.signUp);

  const { userInfor } = useSelector((state) => state.signUp);
  const onFinish = (values) => {
    let newUserInfor = JSON.parse(JSON.stringify(userInfor));

    let sdt = values.soDT;
    if (sdt.length > 0 && sdt[0] === "+") {
      sdt = sdt.split(""); // or newStr = [...str];
      sdt.splice(0, 1);

      sdt = sdt.join("");
    }
    newUserInfor.email = values.email;
    newUserInfor.hoTen = values.hoTen;
    newUserInfor.soDT = sdt;
    newUserInfor.thongTinMoRong.noiCongTacHienTai = values.noiCongTac;
    newUserInfor.maGioiThieu = values.maGioiThieu ? values.maGioiThieu : "";

    httpServ
      .getCheckGmail(values.email)
      .then((res) => {
        if (res.data.content) {
          message.error("Email đã tồn tại");
        } else {
          console.log("sdt", sdt);
          httpServ
            .getCheckSDT(sdt)
            .then((res) => {
              if (res.data.content) {
                message.error("Số điện thoại đã tồn tại");
              } else {
                dispatch(setUserInfor(newUserInfor));
                dispatch(setCurrentStep(1));
              }
            })
            .catch((err) => {
              // console.log("yes");
            });
        }
      })
      .catch((err) => {});
  };
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const [isVietNam, setIsVietNam] = useState(true);
  const handleNoiHocTap = (value) => {
    value === "vn" ? setIsVietNam(true) : setIsVietNam(false);
  };
  const handleValidateEmail = (_, value, callback) => {
    httpServ
      .getCheckGmail(value)
      .then((res) => {
        if (res.data.content) {
          message.error("Email đã tồn tại");
        }
      })
      .catch((err) => {
        httpServ
          .getCheckSDT(value)
          .then((res) => {
            if (res.data.content) {
              message.error("Số điện thoại đã tồn tại");
            }
          })
          .catch((err) => {
            // console.log("yes");
          });
      });
  };
  const handleValidateSDT = (_, value, callback) => {
    httpServ
      .getCheckSDT(value)
      .then((res) => {
        if (res.data.content) {
          callback("Số điện thoại đã tồn tại");
        }
      })
      .catch((err) => {
        callback();
      });
  };

  return (
    <div className="w-full flex justify-center flex-col items-center h-full">
      <Form
        name="basic"
        className=" w-full sm:p-3 md:p-5  lg:w-5/6  "
        labelCol={{ sm: { span: 6 }, xl: { span: 4 } }}
        wrapperCol={{ sm: { span: 20 }, lg: { span: 16 } }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Họ và tên"
          name="hoTen"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Email không đúng định dạng",
            },
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số ĐT"
          name="soDT"
          rules={[
            { required: true, message: "Trường này không được để trống" },
            // { type: "number", message: "Số điện thoại phải là chữ số" },
            () => ({
              validator(_, value) {
                if (isNaN(value)) {
                  return Promise.reject("Số điện thoại phải là chữ số");
                }

                return Promise.resolve();
              },
            }),
            {
              max: 15,
              message: "Số điện thoại phải có độ dài từ 9 - 15",
            },
            {
              min: 9,
              message: "Số điện thoại phải có độ dài từ 9 - 15",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Nơi học tập/ làm việc">
          <Input.Group compact>
            <Select
              onChange={handleNoiHocTap}
              defaultValue="Việt Nam"
              style={{ width: 120 }}
            >
              <Option value="vn">Việt Nam</Option>
              <Option value="tg">Quốc gia khác</Option>
            </Select>
            {isVietNam ? (
              <Form.Item
                name="noiCongTac"
                rules={[
                  {
                    required: true,
                    message: "Trường này không được để trống",
                  },
                ]}
              >
                <Select placeholder="Chọn nơi ở/ làm việc của bạn">
                  <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                  <Option value="Hà Nội">Hà Nội</Option>
                  <Option value="Cần Thơ">Cần Thơ</Option>
                  <Option value="Nha Trang">Nha Trang</Option>
                  <Option value="Huế">Huế </Option>
                  <Option value="Vinh">Vinh</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                name="noiCongTac"
                rules={[
                  {
                    required: true,
                    message: "Trường này không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}
          </Input.Group>
        </Form.Item>

        <Form.Item label="Mã giới thiệu/Ưu đãi" name="maGioiThieu">
          <Input defaultValue="" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ sm: { offset: 0 }, md: { offset: 4 }, span: 16 }}
          name="agreement"
          label=""
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Hãy đọc và đồng ý các điều khoản của CyberLearn",
            },
          ]}
        >
          <Checkbox>
            Tôi đồng ý với các{" "}
            <span
              onClick={() => {
                handleOpenModal();
              }}
              className="text-red-700 underline cursor-pointer"
            >
              ĐIỀU KHOẢN
            </span>{" "}
            của CyberLearn
          </Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{ sm: { offset: 0 }, md: { offset: 4 }, span: 16 }}
        >
          <div className="w-full flex justify-center space-x-3 ">
            <Button className="w-24" type="primary" htmlType="submit">
              Tiếp theo
            </Button>
          </div>
        </Form.Item>
      </Form>

      <div></div>
    </div>
  );
}
