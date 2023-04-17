
import { StatusCode, apiURL } from "../Config/Config";
import { put,call, take } from "redux-saga/effects";    
import { layDanhSachDanhGiaKhoaHocAction, layDanhSachDanhGiaMentorAction } from "../actions/DanhGiaAction";
import axios from 'axios';

export function* layDanhSachDanhGiaKhoaHocSaga(action){
     const {data,status} = yield call((method,api,params = "") => {
        let options = {
            method: method,
            url: apiURL+'/api/danhgiakhoahoc',
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
        yield put(layDanhSachDanhGiaKhoaHocAction(data.content));
     }else {
         yield put(layDanhSachDanhGiaKhoaHocAction([]));
     }
}

export function* layDanhSachDanhGiaMentorSaga(action){
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/danhgiamentor',
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
       yield put(layDanhSachDanhGiaMentorAction(data.content));
    }else {
        yield put(layDanhSachDanhGiaMentorAction([]));
    }
}
