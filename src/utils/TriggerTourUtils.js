import localStorageServ from "../services/locaStorage.service";

export const triggerTour = () => {
  if (!localStorageServ.userTour.get())
    localStorageServ.userTour.set({
      isShowDashboard: true,
      isShowDetail: true,
      isShowLoTrinh: true,
      isShowLoTrinhCuaBan: true,
    });
};
