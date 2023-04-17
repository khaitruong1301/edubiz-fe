
import { StatusCode, apiURL } from "../Config/Config";
import { put,call, take } from "redux-saga/effects";    
import { layDanhSachBaiHocAction, layDanhSachNopBaiAction,layBaiTapAction } from "../actions/BaiHocAction";
import axios from 'axios';

export function* layDanhSachBaiHocSaga(action){
     const {data,status} = yield call((method,api,params = "") => {
        let options = {
            method: method,
            url: apiURL+'/api/baihoc',
            headers: {
                // 'Authorization': '',
                'Content-Type': 'application/json',
                apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
            }
        }
        
        return axios.request(options);
    },"GET",'');
    
    if (action.callback) {
        action.callback(data.content);
    }
     //push data lên store
     if(status === StatusCode.Success){
         
         //push action lên server
        yield put(layDanhSachBaiHocAction(data.content));
     }else {
         yield put(layDanhSachBaiHocAction([]));
     }
}

export function* layDanhSachNopBaiSaga(action){
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/nopbai',
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
       yield put(layDanhSachNopBaiAction(data.content));
    }else {
        yield put(layDanhSachNopBaiAction([]));
    }
}


export function* layBaiTapSaga(action){
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/baitap',
           headers: {
               // 'Authorization': '',
               'Content-Type': 'application/json',
               apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
           }
       }
       
       return axios.request(options);
   },"GET",'');
   
   if (action.callback) {
       action.callback(data.content);
   }
    //push data lên store
    if(status === StatusCode.Success){
        
        //push action lên server
       yield put(layBaiTapAction(data.content));
    }else {
        yield put(layBaiTapAction([]));
    }
}

