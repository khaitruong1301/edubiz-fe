
import { StatusCode, apiURL } from "../Config/Config";
import { put, call, take } from "redux-saga/effects";

import {
    layDanhSachKhoaHocAction,
    layDanhSachTienTrinhHocAction,
    layChiTietKhoaHocAction,
    layDanhSachThaoLuanAction,
    layDanhSachChuongAction,
    layDanhSachLoaiKhoaHocAction,
    layDanhSachQAAction
} from "../actions/KhoaHocAction";

import axios from 'axios';


export function* layDanhSachQASaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/CauHoiThaoLuan/lay-theo-lo-trinh/' + action.loTrinhId,
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {
        //push action lên server
        yield put(layDanhSachQAAction(data.content));
    } else {
        yield put(layDanhSachQAAction([]));
    }
}

export function* layDanhSachLoaiKhoaHocSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/loaikhoahoc',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {

        //push action lên server
        yield put(layDanhSachLoaiKhoaHocAction(data.content));
    } else {
        yield put(layDanhSachLoaiKhoaHocAction([]));
    }
}


export function* layDanhSachKhoaHocSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/khoahoc',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {

        //push action lên server
        yield put(layDanhSachKhoaHocAction(data.content));
    } else {
        yield put(layDanhSachKhoaHocAction([]));
    }
}

export function* layDanhSachTienTrinhHocSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/tientrinhhoc',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {

        //push action lên server
        yield put(layDanhSachTienTrinhHocAction(data.content));
    } else {
        yield put(layDanhSachTienTrinhHocAction([]));
    }
}

export function* layChiTietKhoaHocSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/khoahoc/info/' + action.idKhoaHoc,
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {
        //push action lên server
        yield put(layChiTietKhoaHocAction(data.content));
    } else {
        yield put(layChiTietKhoaHocAction([]));
    }
}


export function* layDanhSachThaoLuanSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/cauhoithaoluan',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {
        //push action lên server
        yield put(layDanhSachThaoLuanAction(data.content));
    } else {
        yield put(layDanhSachThaoLuanAction([]));
    }
}

export function* layDanhSachChuongSaga(action) {
    const { data, status } = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + '/api/chuonghoc',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }

        return axios.request(options);
    }, "GET", '');

    //push data lên store
    if (status === StatusCode.Success) {

        //push action lên server
        yield put(layDanhSachChuongAction(data.content));
    } else {
        yield put(layDanhSachChuongAction([]));
    }
}