import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabDetailBaiHoc from "../TabDetailBaiHoc/TabDetailBaiHoc";
import ReactHtmlParser from "react-html-parser";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import httpServ from "../../services/http.service";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";
import { Alert, Checkbox } from "antd";
import { setCurrentLesson } from "../../redux/reducer/baiHocContentReducer";
import { setUserInfor } from "../../redux/reducer/authReducer";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

export default function ContentExcel_DetailKhoaHoc() {
    const dispatch = useDispatch();
    const userInfor = useSelector((state) => state.authUser.userInfor);
    const baiDaHoc = useSelector((state) => state.khoaHoc.danhSachBaiDaHoc);
    const khoaHocContent = useSelector((state) => state.khoaHoc.khoaHocContent);
    const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);
    const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
    const noiDungArticle = useSelector(
        (state) => state.baiHoc.currentLesson.noiDung
    );
    const { danhSachBaiDaHoc } = useSelector((state) => state.khoaHoc);

    const [cols, setCols] = useState([])
    const [rows, setRows] = useState([])
    const [excelFile, setExcelFile] = useState(null)
    const [notFound, setNotFound] = useState(null)

    useEffect(() => {
        createFile();
    }, [])

    useEffect(() => {
        if (excelFile) {
            ExcelRenderer(excelFile, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    setCols(resp.cols);
                    setRows(resp.rows);
                }
            });
        }
    }, [excelFile])

    const createFile = async () => {
        try {
            let response = await fetch(`https://backend.edubiz.vn${noiDungArticle}`);
            let data = await response.blob();
            let metadata = {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            };
            let file = new File([data], "test.jpg", metadata);
            setExcelFile(file);
        }
        catch {
            setNotFound(true)
        }
    }

    const handleNextLesson = () => {
        let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
            return item.id === currentLesson.id;
        });

        const data = {
            loTrinhId: khoaHocContent.maLoTrinh,
            baiHocId: currentLesson.id,
            khoaHocId: khoaHocContent.id,
            nguoiDungId: userInfor?.id,
        };

        !checkDemoUser() &&
            httpServ
                .postCompletedBaiHoc(data)
                .then((res) => {
                    dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));
                })
                .catch((err) => {
                    console.log(err);
                });

        if (checkDemoUser()) {
            let newInfor = { ...userInfor };
            newInfor.coin++;
            dispatch(setUserInfor(newInfor));
            let stt = tatCaBaiHoc.findIndex((lesson) => { return lesson.id == currentLesson.id })
            let newDs = [...danhSachBaiDaHoc, {
                baiHocId: currentLesson.id,
                stt
            }];
            dispatch(setdanhSachBaiDaHoc(newDs));
        }

        let nextLessonIndex = currentLessonIndex + 1;

        !checkDemoUser() &&
            dispatch(setCurrentLesson(tatCaBaiHoc[nextLessonIndex]));
    };

    let index_lesson = baiDaHoc.findIndex((item) => item === currentLesson.id);
    let isDaHoc = index_lesson !== -1 ? true : false;


    return (
        <div className="w-full h-full flex-grow flex flex-col space-y-3   ">
            <div className="w-full   card_theme flex-grow">
                <div className="w-full card_theme p-5 text-lg  article_content" style={{ overflowY: 'scroll' }} >
                    {/* {console.log(noiDungArticle)} */}
                    <div>
                        <OutTable data={rows} columns={cols} tableClassName="table table-container" />
                    </div>
                    <div className="w-full  text-sm flex-shrink-0 flex items-center justify-end">
                        {isDaHoc ? (
                            <p className="font-medium text-blue-theme">
                                <i className="fa fa-check mr-2 text-sm flex-shrink-0 text-green-600"></i>{" "}
                                Đã hoàn thành
                            </p>
                        ) : (
                            <Checkbox
                                checked={false}
                                className="font-medium text-blue-theme"
                                onChange={handleNextLesson}
                            >
                                {" "}
                                Hoàn thành
                            </Checkbox>
                        )}
                    </div>
                </div>
            </div>
            <TabDetailBaiHoc />
        </div>
    );
}
