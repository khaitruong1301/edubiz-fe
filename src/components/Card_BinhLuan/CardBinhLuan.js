import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { UserOutlined } from '@ant-design/icons'
import httpServ from "../../services/http.service";
import { disableSetLoading } from '../../constants/httpServContant';
import './CardBinhLuan.css';
import { useSelector } from "react-redux";

export default function CardBinhLuan(props) {
    const { maKhoaHoc } = props;
    const userInfo = useSelector((state) => state.authUser.userInfor);

    const [dsBinhLuan, setDsBinhLuan] = useState([]);
    const [binhLuan, setBinhLuan] = useState('');
    const [traLoiBinhLuan, setTraLoiBinhLuan] = useState({ content: '', index: -1 });
    const [traLoiIndex, setTraLoiIndex] = useState(-1);

    useEffect(() => {
        layDanhSachBinhLuan();
    }, []);

    const layDanhSachBinhLuan = () => {
        httpServ
            .getBinhLuan_KhoacHoc(maKhoaHoc, disableSetLoading)
            .then((res) => {
                let dataBinhLuan = res.data.content.map(item => {
                    return { ...item, noiDung: item.noiDung ? JSON.parse(item.noiDung) : [] };
                });
                dataBinhLuan = dataBinhLuan.sort((a, b) => b.id - a.id)
                setDsBinhLuan(dataBinhLuan);
            })
            .catch((res) => {
                console.log(res);
            });
    }

    const handleSubmitBinhLuan = () => {

        if (!binhLuan) return message.error('Vui lòng nhập nội dung!')

        const noiDung = {
            hoTen: userInfo.hoTen,
            noiDungBinhLuan: binhLuan,
            danhSachTraLoi: []
        }

        const model = {
            KhoaHocId: maKhoaHoc,
            noiDung: JSON.stringify(noiDung)
        }

        httpServ
            .postBinhLuan_KhoaHoc(model, disableSetLoading)
            .then((res) => {
                layDanhSachBinhLuan();
                setBinhLuan('')
            })
            .catch((res) => {
                console.log(res);
            });
    }

    const handleSubmitTraLoiBinhLuan = () => {

        if (!traLoiBinhLuan.content) return message.error('Vui lòng nhập nội dung!');

        const binhLuanItem = dsBinhLuan.find((x, i) => i == traLoiBinhLuan.index);
        const noiDung = {
            ...binhLuanItem.noiDung,
            danhSachTraLoi: [...binhLuanItem.noiDung.danhSachTraLoi, {
                hoTen: userInfo.hoTen,
                noiDungTraLoi: traLoiBinhLuan.content
            }]
        }

        const model = {
            ...binhLuanItem,
            noiDung: JSON.stringify(noiDung)
        }

        httpServ
            .putBinhLuan_KhoaHoc(binhLuanItem.id, model, disableSetLoading)
            .then((res) => {
                layDanhSachBinhLuan();
                setTraLoiBinhLuan({ content: '', index: -1 })
                setTraLoiIndex(-1)
            })
            .catch((res) => {
                console.log(res);
            });
    }

    const renderTraLoiBinhLuan = (danhSachTraLoi) => {
        return <div className="CardBinhLuanItem_Children">
            {
                danhSachTraLoi.map((itemChildren, iChild) => {
                    return <div className="CardBinhLuanItem_Parent" key={iChild}>
                        <div className="CardBinhLuanItem_Icon"><UserOutlined /> {itemChildren.hoTen}</div>
                        <div className="CardBinhLuanItem__Text">{itemChildren.noiDungTraLoi}</div>
                    </div>
                })
            }
        </div>
    }

    return (
        <div className="CardBinhLuan CardThaoLuanQ_A w-full space-y-5 p-3 overflow-hidden">
            <div className="CardBinhLuan_Input">
                <Input 
                    value={binhLuan} 
                    onChange={(e) => setBinhLuan(e.target.value)} 
                    placeholder="Nhập nội dung thảo luận"
                />
                <Button onClick={() => handleSubmitBinhLuan()}>Gửi thảo luận</Button>
            </div>
            <p className="text-color-content">Tất cả thảo luận ({dsBinhLuan?.length})</p>
            {
                dsBinhLuan.map((item, i) => {
                    return <div key={i} className="CardBinhLuanItem">
                        <div className="CardBinhLuanItem_Parent">
                            <div className="CardBinhLuanItem_Icon"><UserOutlined /> {item.noiDung.hoTen}</div>
                            <div className="CardBinhLuanItem__Text">{item.noiDung.noiDungBinhLuan}</div>
                        </div>
                        <div className="CardBinhLuanItem_Reply">
                            <div className="CardBinhLuanItem_ReplyIcon">
                                <span style={{ marginRight: '1rem'}}>
                                    <i class="fa fa-commenting" aria-hidden="true"></i> 
                                    {item.noiDung.danhSachTraLoi?.length} Bình luận
                                </span>
                                <span onClick={() => setTraLoiIndex(traLoiIndex == -1 ? i : -1 )}>
                                    <i className="fa fa-reply-all" aria-hidden="true"></i>
                                    Trả lời
                                </span>
                            </div>
                            <div className="CardBinhLuanItem_ReplyInput CardBinhLuan_Input" style={{ display: traLoiIndex == i ? 'flex' : 'none'}}>
                                <Input 
                                    value={traLoiBinhLuan.content} 
                                    onChange={(e) => setTraLoiBinhLuan({ content: e.target.value, index: i })} 
                                    placeholder="Nhập nội dung trả lời"
                                />
                                <Button onClick={() => handleSubmitTraLoiBinhLuan()}>Gửi</Button>
                            </div>
                        </div>
                        {
                            item.noiDung.danhSachTraLoi ? renderTraLoiBinhLuan(item.noiDung.danhSachTraLoi) : null
                        }
                    </div>
                })
            }
        </div>
    );
}