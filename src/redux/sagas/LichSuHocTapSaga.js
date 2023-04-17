import { StatusCode, apiURL } from "../Config/Config";
import { put,call, take } from "redux-saga/effects";   
 
import { 
    layTatCaLichSuHocTapThanhCongAction,
    layLichSuHocTapThanhCongAction,
    capNhatLichSuHocTapThanhCongAction,
    capNhatBaiDaHocThanhCongAction
} from "../actions/LichSuHocTapAction";

import axios from 'axios';

export function* layTatCaLichSuHocTapSaga(action){
   
    const { maNguoiDung } = action.payload;
     const {data,status} = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + `/api/lichsuhoctap/${maNguoiDung}`,
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
        yield put(layTatCaLichSuHocTapThanhCongAction(data.content));
     }else {
         yield put(layTatCaLichSuHocTapThanhCongAction(null));
     }
}

export function* layLichSuHocTapSaga(action){
    const { maKhoaHoc, maNguoiDung } = action.payload;
     const {data,status} = yield call((method, api, params = "") => {
        let options = {
            method: method,
            url: apiURL + `/api/lichsuhoctap/${maKhoaHoc}/${maNguoiDung}`,
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
        yield put(layLichSuHocTapThanhCongAction(data.content));
     }else {
         yield put(layLichSuHocTapThanhCongAction(null));
     }
}

export function* capNhatLichSuHocTapSaga(action){
    let { model } = action.payload;
  
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/lichsuhoctap',
           headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
           data: model
       }
       
       return axios.request(options);
   },"POST",'');

    //push data lên store
    if(status === StatusCode.Success){
        //push action lên server
        yield put(capNhatLichSuHocTapThanhCongAction(data.content));
    }else {
        yield put(capNhatLichSuHocTapThanhCongAction(null));
    }
}

export function* capNhatBaiDaHocSaga(action){
    let { maKhoaHoc, maNguoiDung, maBaiHoc } = action.payload;
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+`/api/lichsuhoctap/${maKhoaHoc}/${maNguoiDung}/${maBaiHoc}`,
           headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        }
       }
       
       return axios.request(options);
   },"POST",'');

    //push data lên store
    if(status === StatusCode.Success){
        //push action lên server
        yield put(capNhatBaiDaHocThanhCongAction(data.content));
    }else {
        yield put(capNhatBaiDaHocThanhCongAction(null));
    }
}