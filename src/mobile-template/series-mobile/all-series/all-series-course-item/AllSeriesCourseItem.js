export default function AllSeriesCourseItem({ khoaHoc }) {
    return (
        <div className="allseriescourseitem">
            <div className="allseriescourseitem-title">{khoaHoc.tenKhoaHoc}</div>
            <div className="allseriescourseitem-info">
                <div className="allseriescourseitem-info_item">
                    <i className='fab fa-leanpub' aria-hidden="true"></i>
                    <span>{khoaHoc.tongBaiHoc} bài học</span>
                </div>
                <div className="allseriescourseitem-info_item">
                    <i className='fa fa-clock' aria-hidden="true"></i>
                    <span>{khoaHoc.tongSoPhut} phút</span>
                </div>
                <div className="allseriescourseitem-info_item">
                    <i className='fa fa-book-reader' aria-hidden="true"></i>
                    <span>{khoaHoc.tongBaiTap} bài tập</span>
                </div>
            </div>
        </div>
    )
}