import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllThongBao } from "../../redux/reducer/thongBaoReducer";
import httpServ from "../../services/http.service";
import { getIconThongBao } from "../../utils/GetIconSuKien";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router";
import { disableSetLoading } from "../../constants/httpServContant";
import { Link } from "react-router-dom";
export default function DropdowThongBao() {
  const dispatch = useDispatch();
  const { allThongBao } = useSelector((state) => state.thongBao);
  const { userInfor } = useSelector((state) => state.authUser);
  let newThongBao = allThongBao?.filter((item) => {
    return item.daXem === false;
  });
  let history = useHistory();
  const handleFetch = () => {
    httpServ
      .getAllThongBao(userInfor.id, disableSetLoading)
      .then((res) => {
        dispatch(setAllThongBao(res.data.content)); 
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleChangStatusThongBao = () => {
    httpServ
      .getChangeStatusThongBao(userInfor.id, disableSetLoading)
      .then((res) => {
        // console.log(res);
        handleFetch();
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const renderThongBao = (noiDung) => {
    const objNoiDung = JSON.parse(noiDung);
    if (objNoiDung.SuKien == 'TIENTRINH') {
      return <Link to="/lo-trinh">Bạn đã được ghi danh vào lộ trình {objNoiDung.NoiDung}</Link>
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left" on>
      {({ open }) => (
        <>
          <Menu.Button className="border-0 inline-flex justify-center w-full rounded-md    text-sm font-medium text-color-content ">
            <div
              onClick={handleChangStatusThongBao}
              className="relative w-10 h-10 flex justify-center items-center "
            >
              {/* <DropdowThongBao /> */}
              <i className="fa fa-bell text-lg relative text-color-blue-white ">
                {newThongBao.length > 0 ? (
                  <span className=" absolute -right-2 -top-1 w-4 h-4 rounded-full text-white text-xs text-center bg-red-500">
                    {newThongBao.length}
                  </span>
                ) : (
                  ""
                )}
              </i>
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className=" absolute left-0  mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex justify-end pt-2 pr-2 h-max-content">
                <button
                  onClick={() => {
                    return history.push("/thongbao-task");
                  }}
                  className="text-sm font-medium px-3 rounded-lg text-white btn-theme shadow-md transition duration-200 hover:shadow-lg"
                >
                  Xem tất cả
                </button>
              </div>
              <div className="py-1 p-3  h-96 list_khoaHoc">
                {allThongBao.length == 0 ? (
                  <p className="text-center text-color-content">
                    Không có thông báo mới
                  </p>
                ) : (
                  ""
                )}
                {allThongBao?.map((thongBao, index) => {
                  let cssText = thongBao.daXem
                    ? "text-gray-500 bg-gray-50"
                    : "text-gray-800 bg-gray-200";
                  return (
                    <div
                      className={
                        "flex justify-center my-3 space-y-0.5 text-sm  h-max-content  rounded-lg p-2" +
                        cssText
                      }
                    >
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                        {getIconThongBao(thongBao.loaiThongBao)}
                      </div>
                      <div
                        className={
                          "my-3 space-y-0.5 text-sm  h-max-content  rounded-lg p-2 " +
                          cssText
                        }
                      >
                        <p className="m-0 px-1  leading-5">
                          { 
                            thongBao.loaiThongBao == 'HOCTAP' ? renderThongBao(thongBao.noiDung) : thongBao.noiDung
                          }
                        </p>
                        <p className={"   m-0 px-1  leading-5 "}>
                          {thongBao.ngayThang}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
