import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { getLoTrinhDaDangKiAciton } from "../../redux/reducer/loTrinhReducer";
import { NavLink } from "react-router-dom";
export default function Modal_Course_Outline() {
  const { maLoTrinh } = useSelector((state) => state.khoaHoc.khoaHocContent);
  const { loTrinhDaDangKi } = useSelector((state) => state.loTrinh);
  let userInfor = useSelector((state) => state.authUser.userInfor);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoTrinhDaDangKiAciton(userInfor?.id));
  }, []);
  const filterLoTrinh = () => {
    return loTrinhDaDangKi.find((item) => {
      return item.id === maLoTrinh;
    });
  };
  let loTrinh = useMemo(
    () => filterLoTrinh(),
    [maLoTrinh, loTrinhDaDangKi.length]
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <button className=" text-color-blue-white  p-1  block" onClick={showModal}>
        <i class="fa fa-bars"></i> <span>Course Outline</span>
      </button>
      <Modal
        title="Danh sách khoá học"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="rounded"
      >
        <div className="space-y-3">
          {loTrinh?.danhSachKhoaHoc.map((item) => {
            return (
              <div className="">
                <NavLink
                  onClick={() => {
                    handleCancel();
                  }}
                  className="cursor-pointer hover:text-white  hover:bg-blue-theme hover:bg-opacity-70 hover:border-opacity-0 duration-200 hover:btn-theme font-medium border-blue-theme border-1  block p-2 rounded-lg bg-opacity-40"
                  to={`/detail-khoa-hoc/${item.id}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  {item.tenKhoaHoc}
                </NavLink>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
