
import { StatusCode, apiURL } from "../Config/Config";
import { put,call, take } from "redux-saga/effects";    
import { layDanhSachLoTrinhAction } from "../actions/LoTrinhAction";
import axios from 'axios';
import {LAY_DANH_SACH_LO_TRINH} from "../types/ActionsTypes";

export function* layDanhSachLoTrinhSaga(action){
     const {data,status} = yield call((method,api,params = "") => {
        let options = {
            method: method,
            url: apiURL+'/api/lotrinh',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }
        
        return axios.request(options);
    },"GET",'');

     //push data lên store
     if(status === StatusCode.Success){
         //push action lên server
        yield put(layDanhSachLoTrinhAction(data.content));
     }else {
         yield put(layDanhSachLoTrinhAction([]));
     }
}


export function* layThoiLuongKhoaHocSaga(action){
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/khoahoc/tong-thoi-luong/'+action.idKhoaHoc,
           headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        }
       }
       
       return axios.request(options);
   },"GET",'');


    if(status === StatusCode.Success){
        //call data de xu ly tiep theo
        if (action.callback) {
            action.callback(data.content);
        }
    }else {
        //call data de xu ly tiep theo
        if (action.callback) {
            action.callback(0);
        }
    }
}

export function* layThemLoTrinhSaga(action){
    let { loTrinh } = action;
    action = {
        tenLoTrinh: loTrinh.tenLoTrinh,
        moTa: loTrinh.moTa,
        ngonNgu: loTrinh.ngonNgu,
        danhSachKhoaHoc: loTrinh.danhSachKhoaHoc,
        gia: loTrinh.gia,
        tongThoiLuong: loTrinh.tongThoiLuong,
   
    }

    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/lotrinh',
           headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
           data: action
       }
       
       return axios.request(options);
   },"POST",'');

    //push data lên store
    if(status === StatusCode.Success){
        //push action lên server
        yield call(layDanhSachLoTrinhSaga, { type: LAY_DANH_SACH_LO_TRINH });
    }else {
        yield put(layDanhSachLoTrinhAction([]));
    }
}