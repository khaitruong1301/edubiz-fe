/* eslint-disable no-useless-constructor */
class LocalStorageKey {
  ACCESS_TOKEN = "ACCESS_TOKEN";
  USER_INFOR = "USER_INFOR";
  USER_DEMO = "USER_DEMO";
  USER_TOUR = "USER_TOUR";
  TIME_DEMO = "TIME_DEMO";
  CODE_DEMO = "CODE_DEMO";
  TIME_LOGIN = "TIME_LOGIN";
  NUOCNGOAI_DEMO = "NUOCNGOAI_DEMO";
  LUCKY_WHEEL = "LUCKY_WHEEL";
  LUCKY_WHEEL_NEW = "LUCKY_WHEEL_NEW"; 
  MODE_THEME = "MODE_THEME";
}

class BaseStorage {
  key;

  constructor(_key) {
    this.key = _key;
  }

  set = (value) => {
    const dataString = JSON.stringify(value);
    localStorage.setItem(this.key, dataString);
  };

  get = () => {
    const dataString = localStorage.getItem(this.key);
    return !dataString ? null : JSON.parse(dataString);
  };

  remove = () => {
    localStorage.removeItem(this.key);
  };
}

class LocalStorageService extends LocalStorageKey {
  constructor() {
    super();
  }

  clearLocalStorage = () => {
    localStorage.clear();
  };
  /**
   * access token storage
   */

  accessToken = new BaseStorage(this.ACCESS_TOKEN);

  /**
   * user info
   */

  userInfor = new BaseStorage(this.USER_INFOR);
  userDemo = new BaseStorage(this.USER_DEMO);
  userTour = new BaseStorage(this.USER_TOUR);
  timeDemo = new BaseStorage(this.TIME_DEMO);
  codeDemo = new BaseStorage(this.CODE_DEMO);
  timeLogin = new BaseStorage(this.TIME_LOGIN);
  nuocngoaiDemo = new BaseStorage(this.NUOCNGOAI_DEMO);
  luckyWhell = new BaseStorage(this.LUCKY_WHEEL);
  luckyWhellNew = new BaseStorage(this.LUCKY_WHEEL_NEW);
  modeTheme = new BaseStorage(this.MODE_THEME);
}

const localStorageServ = new LocalStorageService();

export default localStorageServ;
