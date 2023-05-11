export default function SocialStatus() {


    
    return <>
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
    </>
}