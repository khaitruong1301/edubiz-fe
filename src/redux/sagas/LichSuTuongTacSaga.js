
import { StatusCode, apiURL } from "../Config/Config";
import { put,call, take } from "redux-saga/effects";    
import { layLichSuTuongTacAction, layLichSuTuongTacTheoNguoiDungAction } from "../actions/LichSuTuongTacAction";
import axios from 'axios';

export function* layLichSuTuongTacSaga(action){
     const {data,status} = yield call((method,api,params = "") => {
        let options = {
            method: method,
            url: apiURL+'/api/lichsutuongtac',
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
        yield put(layLichSuTuongTacAction(data.content));
     }else {
         yield put(layLichSuTuongTacAction([]));
     }
}

export function* layLichSuTuongTacTheoNguoiDungSaga(action){
    const {data,status} = yield call((method,api,params = "") => {
       let options = {
           method: method,
           url: apiURL+'/api/lichsutuongtac/danh-sach-theo-user/'+action.maNguoiDung,
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
       yield put(layLichSuTuongTacTheoNguoiDungAction(data.content));
    }else {
        yield put(layLichSuTuongTacTheoNguoiDungAction([]));
    }
}
