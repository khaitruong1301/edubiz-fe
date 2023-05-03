import DetailKhoaHoc from "../../pages/DetailKhoaHoc/DetailKhoaHoc";
import { NavBar } from "../common";

export default function CourseMobile2(props) {

    return (
        <>
            <NavBar title={props.title} isPrev={true} />
            <div className='course-mobile'>
                ABC
                <DetailKhoaHoc />
            </div>
        </>
    )
}