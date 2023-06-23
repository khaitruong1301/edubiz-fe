import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from '../common';
import httpServ from '../../services/http.service';
import { getLoTrinhDaDangKiAciton } from '../../redux/reducer/loTrinhReducer';
import { setDanhSachLoTrinh } from '../../redux/reducer/diemAndChungNhanReducer';
import lotrinhLottie1 from "../../assets/lottie_json/chungNhanLottie.json";
import './CertificateMobile.css'
import CertificateItem from './certificate-item/CertificateItem';

function CertificateMobile(props) {
    const dispatch = useDispatch();
    const { danhSachLoTrinh } = useSelector((state) => state.diemChungNhan);
    const { userInfor } = useSelector((state) => state.authUser);

    useEffect(() => {
        dispatch(getLoTrinhDaDangKiAciton(userInfor?.id));

        httpServ
            .getAllDiemBaiTapUser(userInfor.id)
            .then((res) => {
                dispatch(setDanhSachLoTrinh(res.data.content));
                // console.log("res chung nhan page ", res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const dsLoTrinh = danhSachLoTrinh.filter(x => x.daHoanThanh);
    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='certificate'>
                <div className='certificate-banner'>
                    <div className='certificate-banner_slogan'>
                        <b>Điều kiện in chứng nhận và bảng điểm:</b>
                        <p>- Hãy hoàn thành tất cả các bài tập của lộ trình.</p>
                        <p>- Điểm trung bình lộ trình trên 7 (đối với chứng nhận).</p>
                        <p>- Mỗi lộ trình bạn sẽ được in chứng nhận và bảng điểm riêng.</p>
                    </div>
                    <div className='certificate-banner_image'>
                        <Lottie
                            loop={false}
                            animationData={lotrinhLottie1}
                            style={{ width: "45%", height: "100%" }}
                        />
                    </div>
                </div>
                <div>
                    {
                        dsLoTrinh.map((loTrinh, index) => {
                            return <CertificateItem key={index} loTrinh={loTrinh} keyIndex={index + 1} />;
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CertificateMobile;