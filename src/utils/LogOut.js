import moment from "moment";
import localStorageServ from "../services/locaStorage.service";

export const getCurrentDay = () => {
  return moment(new Date()).format("DD/MM/YYYY");
};

export const handleLogoutAction = () => {
  const userInfor = localStorageServ.userInfor;
  const userDemo = localStorageServ.userDemo;
  userInfor && userInfor.remove();
  userDemo && userDemo.remove();
  window.location.href = "/lms";
};
