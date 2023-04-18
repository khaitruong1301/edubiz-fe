import React, { useEffect, useState } from "react";
import { KhaoSat2Tag } from "../../../utils/KhaoSatSigup";
import {
  Form,
  Button,
  Checkbox,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  setLoadingSigup,
  setUserInfor,
} from "../../../redux/reducer/signUpReducer";
import httpServ from "../../../services/http.service";
export default function KhaoSat2() {
  const dispatch = useDispatch();

  let { currentStep } = useSelector((state) => state.signUp);
  const { userInfor } = useSelector((state) => state.signUp);
  const [options, setOptions] = useState([
    {
      label: "tag",
      value: "tag",
    },
  ]);
  useEffect(() => {
    let _options = KhaoSat2Tag.map((tag) => {
      return {
        label: tag,
        value: tag,
      };
    });
    setOptions(_options);
  }, []);
  function onChange(checkedValues) {
    // console.log("checked = ", checkedValues);
    // setValueArr
  }
  const onFinish = (values) => {
    // console.log("Success form:", values);
    let newUserInfor = JSON.parse(JSON.stringify(userInfor));
    newUserInfor.thongTinMoRong.predictiveIndex = values.predictiveIndex;
    dispatch(setUserInfor(newUserInfor));
    let nextStep = currentStep + 1;
    dispatch(setCurrentStep(nextStep));
    dispatch(setLoadingSigup(true));
    httpServ.postDangKyUser(newUserInfor).then((res) => {
      dispatch(setLoadingSigup(false));

    })
      .catch((err) => {
        console.log(err);
      });

  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full overflow-hidden p-3 lg:p-5 flex flex-col items-center space-y-5">
      <p className="uppercase  text-base md:text-lg lg:text-xl">
        CHỈ DẪN: Hãy đọc các chữ trong bản dưới đây và đánh dấu những chữ mà bạn
        thấy diễn tả được các điều mà bạn muốn hành động.
      </p>
      <div className="w-full h-px bg-gray-400" />

      <div className="w-4/5 m-0 p-0  ">
        <Form
          layout="vertical"
          name="basic"
          className=" w-full sm:p-3 md:p-5  lg:w-5/6 mx-auto  "
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // label="Ngày Sinh"
            name="predictiveIndex"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Checkbox.Group
              className="grid sm:grid-cols-1 gap-3 sm:gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-5   w-full m-0 p-0 "

              onChange={onChange}
            >
              {KhaoSat2Tag.map((tag) => {
                return (
                  <div className="flex min-w-full justify-center">
                    <div className="rounded-lg card_theme shadow-lg border-2 p-3 w-52 self-center hover:shadow-xl transition duration-200 ">
                      <Checkbox className="text-gray-800 text-base lg:text-lg" value={tag}>
                        {tag}
                      </Checkbox>
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </Form.Item>
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
                onClick={() => { }}
                className="w-24"
                type="primary"
                htmlType="submit"
              >
                Tiếp theo
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <br />
    </div>
  );
}
