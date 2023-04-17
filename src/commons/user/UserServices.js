import axios from 'axios';
import { apiURL } from '../../redux/Config/Config';

export const layThongTinCongViec = (dataCV) => {
    try {
        dataCV = JSON.parse(dataCV);
        let dataCVnew = "";
        if (dataCV[0] === "SV") {
            dataCVnew = `Sinh Viên CNTT năm ${dataCV[2]}, học tại trường ${dataCV[1]}.`;
        }
        if (dataCV[0] === "DL") {
            dataCVnew = `Chuyên ngành CNTT, công ty ${dataCV[1]}, kinh nghiệm ${dataCV[2]}`;
        }
        if (dataCV[0] === "TN") {
            dataCVnew = `${dataCV[1]}, kinh nghiệm ${dataCV[2]}`;
        }
        return dataCVnew;
    }
    catch {
        return "";
    }
}

export const themLichSu = (model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/lichsutuongtac',
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}

export const suaLichSu = (id, model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/lichsutuongtac/' + id,
        method: 'PUT',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}

export const luuNopBai = (model) => {

    return axios({
        baseURL: apiURL,
        url: '/api/nopbai',
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}
export const SuaNopBai = (id, model) => {

    return axios({
        baseURL: apiURL,
        url: '/api/nopbai/' + id,
        method: 'PUT',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })
}

export const GetTimeLamLai = (id) => {
    return axios({
        baseURL: apiURL,
        url: '/api/nopbai/thoi-gian-lam-lai/' + id,
        method: 'GET',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
    })
}

export const uploadAvatar = (id, image) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', image);

    return axios({
        baseURL: apiURL,
        url: '/api/nguoidung/avatar/' + id,
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        data: bodyFormData,
        headers: {
            'Content-Type': 'multipart/form-data',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        }
    })

}


export const updatesUser = (id, model) => {
    return axios({
        baseURL: apiURL,
        url: '/api/nguoidung/' + id,
        method: 'PUT',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: JSON.stringify(model)

    })

}

export const checkCodeDemo = (code, email) => {
    return axios({
        baseURL: apiURL,
        url: '/api/nguoidung/checkcode/' + code + "/" + email,
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: ""

    })

}


export const GetTimeDemo = (code) => {
    return axios({
        baseURL: apiURL,
        url: '/api/nguoidung/laythoigiandemo/' + code,
        method: 'GET',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        }
    })
}



export const getCodeDemo = (code) => {
    return axios({
        baseURL: apiURL,
        url: '/api/nguoidung/getbycode/' + code,
        method: 'POST',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        },
        // timeout: 1000,
        data: ""

    })
}


export const checkNguoiDung = (id) => {
    return axios({
        baseURL: apiURL,
        url: '/api/nguoidung/' + id,
        method: 'GET',
        responseType: 'json',
        responseEncoding: 'utf8',
        headers: {
            // 'Authorization': '',
            'Content-Type': 'application/json',
            apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS'
        }

    })

}