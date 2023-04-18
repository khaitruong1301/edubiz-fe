import React, { useState } from "react";
import Lottie from "lottie-react";
import { Popconfirm } from "antd";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setDialogItem,
  setYourItem,
} from "../../redux/reducer/dashboardReducer";
import coin_lottie from "../../assets/lottie_json/18089-gold-coin.json";
import httpServ from "../../services/http.service";
import { getUpdateUserInforAciton } from "../../redux/reducer/authReducer";
import { getHinhAnh } from "../../utils/GetHinhanh";
import { checkDouble } from "../../utils/CheckDoubleItem";
import "./Dialog.css";
export default function Dialog_Item({ }) {
  const dispatch = useDispatch();
  const { dialogItem, yourItems } = useSelector((state) => state.dashboard);
  const { userInfor } = useSelector((state) => state.authUser);
  const [message, setMessage] = useState("");
  const item = dialogItem.dataItem;
  const handleBuyItem = () => {
    httpServ
      .getMuaItem(userInfor.id, dialogItem.dataItem.id)
      .then((res) => {
        // console.log(res);
        setMessage(res.data.message);

        if (res.data.content == 1) {
          dispatch(getUpdateUserInforAciton(userInfor.id));
          httpServ
            .getYoursItems(userInfor?.id)
            .then((res) => {
              dispatch(setYourItem(res.data.content));
            })
            .catch((err) => {
              // console.log(err);
            });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <Modal
        title="Thông tin vật phẩm"
        className="rounded-xl p-0 overflow-hidden felx flex-col items-center dialogItem"
        visible={dialogItem.isShow}
        onCancel={() => {
          let newDiaglog = { ...dialogItem };
          newDiaglog.isShow = false;
          dispatch(setDialogItem(newDiaglog));
          setMessage("");
        }}
        footer={null}
      >
        <div className="w-full flex  items-center justify-center  space-x-10 px-5">
          <div className=" flex flex-col justify-center space-x-3 items-end">
            <img
              src={getHinhAnh(item.hinhAnh)}
              className="w-24 h-24 object-contain inline-block  m-0 "
              alt=""
            />
            {dialogItem.canBuyItem ? (
              <div className="flex items-center justify-center transform scale-150  ">
                {!item.loaiChiPhi ? (
                  <>
                    <Lottie
                      animationData={coin_lottie}
                      style={{ width: 50, height: 50 }}
                      className="transform -translate-x-3"
                    />
                    <span
                      className="font-bold transform -translate-x-4"
                      style={{ color: "#794b00" }}
                    >
                      {item.chiPhi}
                    </span>
                  </>
                ) : (
                  <>
                    <i className="fa fa-dollar-sign text-green-theme"></i>
                    <span className="font-bold " style={{ color: "#794b00" }}>
                      {item.chiPhi}
                    </span>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="font-medium text-base  flex-grow-0 space-y-3">
            <p>Công dụng: {item.tenVatPham}</p>
            <div className="space-y-2">
              <p className="font-normal">{item.moTa}</p>
              {dialogItem.canBuyItem ? (
                <p className="font-normal text-gray-600">
                  Thời hạn sử dụng: {item.hanSuDung} ngày
                </p>
              ) : (
                ""
              )}
              <p className="font-normal text-sm text-red-500">
                Lưu ý: Vật phẩm sẽ được sự dụng tự động sau khi mua
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-1">
          {!dialogItem.canBuyItem ? (
            <p>Ngày hết hạn: {item.ngayHetHan}</p>
          ) : userInfor.capDo < item.capDoDung ? (
            <p className=" cursor-pointer  p-3 font-medium text-base  border-none ">
              Bạn cần đạt trên{" "}
              <span className="text-blue-theme">level {item.capDoDung}</span> để
              mua được vật phẩm này
            </p>
          ) : message ? (
            <p className="text-red-400 font-medium ">{message}</p>
          ) : checkDouble(yourItems, item) ? (
            <Popconfirm
              okText="Tiếp tục mua"
              cancelText="Huỷ"
              onConfirm={handleBuyItem}
              title={
                <div className="w-60">
                  <p>
                    Lưu ý bạn đã có vật phẩm này và chưa sử dụng, nếu bạn mua
                    tiếp chúng tôi sẽ tăng thời hạn sử dụng vật phẩm và không
                    được cộng dồn.
                  </p>
                </div>
              }
            // icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <button className=" cursor-pointer card_theme p-3 font-medium text-base text-blue-theme border-none shadow-design_code">
                Mua ngay
              </button>
            </Popconfirm>
          ) : (
            <button
              onClick={handleBuyItem}
              className=" cursor-pointer card_theme p-3 font-medium text-base text-blue-theme border-none shadow-design_code"
            >
              Mua ngay
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
