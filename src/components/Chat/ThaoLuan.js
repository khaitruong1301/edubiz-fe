import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const callback = (key) => {
  console.log(key);
};
export default function ThaoLuan() {
  return (
    <div className=" border-b-1 border-gray-300 rounded-xl ">
      <div className="w-full  py-3 flex space-x-3">
        <div className=" rounded-xl w-6 h-6 bg-blue-300 flex justify-center items-center flex-shrink-0">
          <span>S</span>{" "}
        </div>
        <div className="space-y-3">
          {/* <p className="text-gray-400">15 giờ trước</p> */}
          <p className="font-medium">
            {" "}
            <span className="font-medium text-blue-500">Quang Sĩ: </span>Thêm
            hiệu ứng vào carousel
          </p>
          <p className="font-light text-sm">
            Mình không biết cách thêm hiệu ứng vào carousel
            <p>
              I'm unable to complete this chapter (431) successfully (create a
              new post with image). I've gone through everything numerous times
              to ensure I've coded everything as explained in the video(s) but
              every time I try to create a new post I received the following
              errors in the browser console: POST http://localhost:8080/graphql
              400 (Bad Request) Error: User login failed! at Feed.js:209
            </p>
          </p>
        </div>
        {/* <div className="flex flex-col  space-y-3  flex-shrink-0 ">
          <p className="space-x-2 flex flex-shrink-0 ">
            <span>11</span> <i className="fa fa-thumbs-up  cursor-pointer"></i>
          </p>
          <p className="space-x-2  flex flex-shrink-0">
            <span>26</span>
            <i className="fa fa-comment-alt  cursor-pointer"></i>
          </p>
        </div> */}
      </div>

      <Collapse
        onChange={callback}
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        ghost
        className=""
      >
        <Panel
          header="Xem thảo luận"
          key="1"
          className="rounded-xl overflow-hidden"
        >
          <div className="space-y-2">
            <p>
              <span className="mr-2 font-medium">Admin:</span>Ý thứ 2 của bạn
              hiểu sát hơn, sau khi kiểm tra điều kiện t 0 đúng thì sẽ chạy luôn
              lệnh t = t - 1 chứ không phải abcxyz… rồi mới chạy t = t-1
            </p>
            <p>
              <span className="mr-2 font-medium">User:</span>
              Vâng rất cảm ơn bác. Vậy thì nó hơi khác chút vòng lặp for(khởi
              gián, điều kiện, cập nhật). Theo tài liệu thì khởi gián điều kiện
              xử lý trong ngoặc {} rồi mới nhảy về cập nhật . Như vậy là ông
              while này điều kiện cập nhật xử lý trong ngoặc có đúng không bác.
            </p>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
