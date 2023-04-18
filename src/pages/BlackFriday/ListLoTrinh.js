import React, { useEffect, useState } from 'react'
import { getTatCaLoTrinhAciton, setTypeFiltersLoTrinh } from "../../redux/reducer/loTrinhReducer";
import { useDispatch, useSelector } from "react-redux";
import TatCaLoTrinhPage from '../TatCaLoTrinhPage';
import Menu_Filter_LoTrinh from '../../components/Menu/Menu_Filter_LoTrinh';
import httpServ from '../../services/http.service';
import { icons } from '../../assets/icons';
import TatCaLoTrinh from './TatCaLoTrinhPage';

export default function ListLoTrinh() {
    const [isGridView, setIsGridView] = useState(false);

    let userInfor = useSelector((state) => state.authUser.userInfor);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getTatCaLoTrinhAciton(userInfor?.id));
        httpServ.getAllTypeLoTrinh().then((res) => {
            dispatch(setTypeFiltersLoTrinh(res.data.content));
        });
    }, [])
    return (
        <div className="flex justify-center" >
            <div className="w-full p-3 transform translate-y-2 lg:p-5  2xl:container">
                <div className=" mx-auto text-color-title card_theme_wrapper_lotrinh  2xl:w-full lg:w-full">
                    <div className="py-3 lg:py-5  w-full  transform px-5 h-full relative">
                        <Menu_Filter_LoTrinh />

                        <div className="absolute top-3 transform   right-8 flex items-center">
                            <button
                                className="w-16 text-blue-theme text-lg"
                                onClick={() => {
                                    setIsGridView(!isGridView);
                                }}
                            >
                                {isGridView ? icons.listView : icons.gridView}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-14  ">
                    <TatCaLoTrinh isBlackFridayDay={true} isGridView={isGridView} />

                </div>
            </div>
        </div>
    )
}
