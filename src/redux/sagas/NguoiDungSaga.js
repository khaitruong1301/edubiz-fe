
import { StatusCode, apiURL } from "../Config/Config";
import { put, call, take } from "redux-saga/effects";
import { layDanhSachNguoiDungAction, layNguoiDungEmailAction, layNguoiDungIDAction,layDanhSachHopThuAction } from "../actions/NguoiDungAction";
import axios from 'axios';
import { LAY_DANH_SACH_NGUOI_DUNG } from '../types/ActionsTypes'


export function* layDanhSachHopThuSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/hopthu',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');
    //push data lên store
    if (status === StatusCode.Success) {
        //push action lên server
        yield put(layDanhSachHopThuAction(data.content));
    } else {
        yield put(layDanhSachHopThuAction([]));
    }
}

export function* layDanhSachNguoiDungSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/nguoidung/all',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');
    //push data lên store
    if (status === StatusCode.Success) {
        //push action lên server
        yield put(layDanhSachNguoiDungAction(data.content));
    } else {
        yield put(layDanhSachNguoiDungAction([]));
    }
}

export function* layNguoiDungEmailSaga(action) {

    try {
        const { data, status } = yield call((method, api, params = "") => {
            let options = {
                method: method,
                url: apiURL + '/api/nguoidung/email/' + action.email,
                headers: {
                    // 'Authorization': '',
                    'Content-Type': 'application/json',
                    apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
                }
            }

            return axios.request(options);
        }, "GET", '');

        //call data de xu ly tiep theo
        if (action.callback) {
            action.callback(data.content);
        }
        //push data lên store
        if (status === StatusCode.Success) {

            yield put(layNguoiDungEmailAction(data.content));
        } else {
            yield put(layNguoiDungEmailAction([]));
        }
    } catch (err) {

        action.callback(0);
        yield put(layNguoiDungEmailAction([]));
    }
}

export function* themNguoiDungSaga(action) {
    try {
    let { nguoiDung } = action;
  
    action = {
        email: nguoiDung.thongtinchinh.email,
        hoTen: nguoiDung.thongtinchinh.hoTen,
        soDT: nguoiDung.thongtinchinh.soDT,
        maLoTrinh: nguoiDung.maLoTrinh,
        avatar: "nul",
        urls: "nul",
        thongTinMoRong: { ...nguoiDung.thongTinMoRong, nguonGioiThieu: 'nul', noiCongTacHienTai: nguoiDung.thongtinchinh.noiCongTacHienTai, congViecHienTai: JSON.stringify([nguoiDung.congViecChinh, nguoiDung.thongTinMoRong.noiLam, nguoiDung.thongTinMoRong.soNamLam]) },
        maGioiThieu:nguoiDung.thongtinchinh.maGioiThieu==""?"":nguoiDung.thongtinchinh.maGioiThieu,
        linkNopBai:nguoiDung.linkNopBai,
    }

    //them thong tin chinh
    const promise = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/nguoidung/dang-ky-nguoi-dung',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
            },
            data: action
        }
        return axios.request(options);
    }, "POST", '');

    if (promise.status === 201) {

        yield call(layDanhSachNguoiDungSaga, { type: LAY_DANH_SACH_NGUOI_DUNG });
    } else {
        yield put(layDanhSachNguoiDungAction([]));
    }
}
catch (err) {

    console.log("error:",err)
}
}

export function* layNguoiDungSoDTSaga(action) {

    try {
        const { data, status } = yield call((method, api, params = "") => {
            let options = {
                method: method,
                url: apiURL + '/api/nguoidung/so-dien-thoai/' + action.soDT,
                headers: {
                    // 'Authorization': '',
                    'Content-Type': 'application/json',
                    apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
                }
            }

            return axios.request(options);
        }, "GET", '');

        //call data de xu ly tiep theo
        if (action.callback) {
            action.callback(data.content);
        }

    } catch (err) {

        action.callback(err);
    }
}

export function* layNguoiDungIDSaga(action) {

    try {
        const { data, status } = yield call((method, api, params = "") => {
            let options = {
                method: method,
                url: apiURL + '/api/nguoidung/' + action.userID,
                headers: {
                    // 'Authorization': '',
                    'Content-Type': 'application/json',
                    apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
                }
            }

            return axios.request(options);
        }, "GET", '');

        //call data de xu ly tiep theo
        if (action.callback) {
            action.callback(data.content);
        }

        if (status === StatusCode.Success) {

            yield put(layNguoiDungIDAction(data.content));
        } else {
            yield put(layNguoiDungIDAction([]));
        }

    } catch (err) {

        action.callback(err);
    }
}

export function* uploadCMNDSaga(action) {

    try {
        var bodyFormData = new FormData();
        bodyFormData.append('file', action.fileCMND);
        const { data, status } = yield call((method, api, params = "") => {
            let options = {
                method: method,
                url: apiURL + '/api/file/cmnd',
                data:  bodyFormData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
                }
                
            }

            return axios.request(options);
        }, "POST", '');

        //call data de xu ly tiep theo
        if (action.callback) {
            action.callback(data);
        }

    } catch (err) {
        console.log(err)
        action.callback(err);
    }
}


export function* nopBaiTestUser(action) {
    try {
        let { value } = action;
        action = {
            email: value.email,
            linkNopBai:value.linkTest,
        }

        //them thong tin chinh
        const promise = yield call((method, api, params = "") => {
            let options = {
                method: method,
                url: apiURL + '/api/nguoidung/nopbaitest',
                headers: {
                    // 'Authorization': '',
                    'Content-Type': 'application/json',
                    apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
                },
                data: action
            }
            return axios.request(options);
        }, "PUT", '');
        if (promise.status == StatusCode.Success) {

            yield call(layDanhSachNguoiDungSaga, { type: LAY_DANH_SACH_NGUOI_DUNG });
        } else {
            yield put(layDanhSachNguoiDungAction([]));
        }
    }
    catch (err) {
    
        console.log("error:",err)
    }
}