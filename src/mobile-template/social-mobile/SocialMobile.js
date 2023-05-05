import { NavBar } from '../common';
import './SocialMobile.css'
function SocialMobile(props) {

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='socailmobile'>
                <div className='socailmobile-wrapper'>
                    <div className='socailmobile-item'>
                        <div className='socailmobile-status'>
                            <div className='socailmobile-statusinfo'>
                                <div className='socailmobile-statusinfo_icon'>
                                    <div className='socailmobile-statusinfo_icon--image'>
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className='socailmobile-statusinfo_profile'>
                                    <b>Đinh Văn Nơi</b>
                                    <span>Quản lý</span>
                                </div>
                                <div className='socailmobile-statusinfo_more'>
                                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className='socailmobile-statuscontent'>
                                Hi mọi người, em mới tập bán hàng chưa rành các loại phí trên shopee. Nên nhờ mọi người xem giúp e bán giá này đc ko ạ:
                                Giá nhập 197k (đã tính bao bì), giá bán 280k
                                Có đk freeship extra
                                Kt gói hàng là 51 x 71x 3cm, nặng 2,3 kg
                                Cám ơn mn ạ 🤗
                            </div>
                        </div>
                        <div className='socailmobile-action'>
                            <div className='socailmobile-action_like socailmobile-action_item'>
                                <span>5</span>
                                <span>
                                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                                    Thích
                                </span>
                            </div>
                            <div className='socailmobile-action_comment socailmobile-action_item'>
                                <span>10</span>
                                <span>
                                    <i class="fa fa-comment" aria-hidden="true"></i>
                                    Bình luận
                                </span>
                            </div>
                        </div>
                        <div className='socailmobile-comments'>
                            <div className='socailmobile-commentitem'>
                                <div className='socailmobile-commentitem_icon'>
                                    <div className='socailmobile-commentitem_icon--image'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div className='socailmobile-commentitem_icon--profile'>
                                        <b>Trấn Thành</b>
                                        <span>Marketing</span>
                                    </div>
                                </div>
                                <div className='socailmobile-commentitem_content'>
                                    <div className='socailmobile-commentitem_content--wrapper'>
                                        12% phí + 10% quảng cáo, lợi nhuận khoảng 21k. hơi mỏng nếu bán sll thì ok. còn ko thì nên tìm thêm nhiều sp khác
                                    </div>
                                </div>
                            </div>

                            <div className='socailmobile-commentitem'>
                                <div className='socailmobile-commentitem_icon'>
                                    <div className='socailmobile-commentitem_icon--image'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div className='socailmobile-commentitem_icon--profile'>
                                        <b>Hoài Linh</b>
                                        <span>Seller</span>
                                    </div>
                                </div>
                                <div className='socailmobile-commentitem_content'>
                                    <div className='socailmobile-commentitem_content--wrapper'>
                                        Cứ nhân đôi giá lên may ra có lãi nha bạn, nếu không thì phải chi li cắt giảm các chi phí
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='socailmobile-item'>
                        <div className='socailmobile-status'>
                            <div className='socailmobile-statusinfo'>
                                <div className='socailmobile-statusinfo_icon'>
                                    <div className='socailmobile-statusinfo_icon--image'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className='socailmobile-statusinfo_profile'>
                                    <b>Đinh Văn Nơi</b>
                                    <span>Quản lý</span>
                                </div>
                                <div className='socailmobile-statusinfo_more'>
                                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className='socailmobile-statuscontent'>
                                100 đơn / tháng nhìn các shop 100 đơn /ngày mà thèm các bác ạ .Em chỉ kéo khách từ fan page facebook qua chứ ít khi chạy quảng cáo ,các bác biết cách nào tăng đơn hay cho em tham khảo với
                            </div>
                        </div>
                        <div className='socailmobile-action'>
                            <div className='socailmobile-action_like socailmobile-action_item'>
                                <span>5</span>
                                <span>
                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    Thích
                                </span>
                            </div>
                            <div className='socailmobile-action_comment socailmobile-action_item'>
                                <span>10</span>
                                <span>
                                    <i className="fa fa-comment" aria-hidden="true"></i>
                                    Bình luận
                                </span>
                            </div>
                        </div>
                        <div className='socailmobile-comments'>
                            <div className='socailmobile-commentitem'>
                                <div className='socailmobile-commentitem_icon'>
                                    <div className='socailmobile-commentitem_icon--image'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div className='socailmobile-commentitem_icon--profile'>
                                        <b>Trấn Thành</b>
                                        <span>Marketing</span>
                                    </div>
                                </div>
                                <div className='socailmobile-commentitem_content'>
                                    <div className='socailmobile-commentitem_content--wrapper'>
                                        Toàn thấy chê bán thế lãi thấp vs hòa vốn nè
                                    </div>
                                </div>
                            </div>

                            <div className='socailmobile-commentitem'>
                                <div className='socailmobile-commentitem_icon'>
                                    <div className='socailmobile-commentitem_icon--image'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                    <div className='socailmobile-commentitem_icon--profile'>
                                        <b>Hoài Linh</b>
                                        <span>Seller</span>
                                    </div>
                                </div>
                                <div className='socailmobile-commentitem_content'>
                                    <div className='socailmobile-commentitem_content--wrapper'>
                                        12% phí + 10% quảng cáo, lợi nhuận khoảng 21k. hơi mỏng nếu bán sll thì ok. còn ko thì nên tìm thêm nhiều sp khác
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialMobile;