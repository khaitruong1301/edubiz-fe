import React, { useEffect, useState } from "react";
import { khaoSat1Tag } from "../../../utils/KhaoSatSigup";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  setUserInfor,
} from "../../../redux/reducer/signUpReducer";

import {
  Form,
  Button,
  Checkbox,
} from "antd";
export default function KhaoSat1() {
  const dispatch = useDispatch();

  let { currentStep } = useSelector((state) => state.signUp);
  const { userInfor } = useSelector((state) => state.signUp);

  const [options, setOptions] = useState([
    {
      label: "tag",
      value: "tag",
    },
  ]);
  const [valueArr, setValueArr] = useState([]);
  useEffect(() => {
    let _options = khaoSat1Tag.map((tag) => {
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
    newUserInfor.thongTinMoRong.predictiveIndexRequire = values.predictiveIndexRequire;
    dispatch(setUserInfor(newUserInfor));
    let nextStep = currentStep + 1;
    dispatch(setCurrentStep(nextStep));
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full overflow-hidden p-3 lg:p-5 flex flex-col items-center space-y-5">
      <p className="uppercase text-base md:text-lg lg:text-xl">
        CyberLearn sẽ tạo cho bạn một CV miễn phí và sẽ có thệ thống AI để đề
        xuất công việc tốt nhất và mức lương tốt nhất cho bạn. Nhờ bạn chọn thêm
        các thông tin dưới đây
      </p>
      <div className="w-full h-px bg-gray-400" />
      <p className="uppercase  text-base md:text-lg lg:text-xl">
        CHỈ DẪN: Hãy đọc các chữ trong bản dưới đây và đánh dấu những chữ mà bạn
        thấy diễn tả được các điều mà người ta mong bạn hành động như vậy.
      </p>
      <div className="w-full h-px bg-gray-400" />
      <div className="w-4/5 m-0 p-0  mx-auto  ">
        <Form
          layout="vertical"
          name="basic"
          className=" w-full sm:p-3 md:p-5  lg:w-5/6 mx-auto  "
          // labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // label="Ngày Sinh"
            name="predictiveIndexRequire"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Checkbox.Group
              className="grid gap-3 sm:grid-cols-1 sm:gap-3 md:grid-cols-2 lg:grid-cols-4  lg:gap-5   w-full m-0 p-0 justify-center "
              onChange={onChange}
            >
              {khaoSat1Tag.map((tag) => {
                return (
                  <div className="flex w-full justify-center">
                    <div className="rounded-lg card_theme shadow-lg border-2 p-3  w-52 self-center hover:shadow-xl transition duration-200 ">
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
                onClick={() => {
                  // let nextStep = currentStep + 1;
                  // dispatch(setCurrentStep(nextStep));
                }}
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
    </div>
  );
}
