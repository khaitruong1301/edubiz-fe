import {combineReducers} from 'redux';
import {NguoiDungReducer} from './NguoiDungReducer';
import {LoTrinhReducer} from './LoTrinhReducer';
import {KhoaHocReducer} from './KhoaHocReducer';
import {LichSuTuongTacReducer} from './LichSuTuongTacRecuder';
import {BaiHocReducer} from './BaiHocReducer';
import {LichSuHocTapReducer} from './LichSuHocTapReducer';
import {DanhGiaReducer} from './DanhGiaReducer';

export const RootReducer = combineReducers({
    NguoiDungReducer, 
    LoTrinhReducer, 
    KhoaHocReducer, 
    LichSuTuongTacReducer, 
    BaiHocReducer,
    LichSuHocTapReducer,
    DanhGiaReducer
})