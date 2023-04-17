import axios from 'axios';
import { apiURL } from '../../redux/Config/Config';

export const themDanhGia = (model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/danhgiakhoahoc',
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}

export const suaDanhGia = (id,model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/danhgiakhoahoc/'+id,
        method: 'PUT',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}

//men tor
export const themDanhGiaMentor = (model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/danhgiamentor',
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}

export const suaDanhGiaMentor = (id,model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/danhgiamentor/'+id,
        method: 'PUT',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey:'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}