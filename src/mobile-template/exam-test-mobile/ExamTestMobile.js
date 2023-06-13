import React, { useEffect, useState } from 'react';
import * as sectionTypes from '../../constants/sectionTypes';
import * as questionTypes from '../../constants/questionTypes';
import './ExamTestMobile.css';
import TitleSection from './title-section/TitleSection';
import ImageSection from './image-section/ImageSection';
import VideoSection from './video-section/VideoSection';
import httpServ from '../../services/http.service';
import QuestionSection from './question-section/QuestionSection';
import { NavBar } from '../common';
import { Button, Modal, Space, message } from 'antd';

function ExamTestMobile(props) {

    const { baiKiemTra } = props;
    const [model, setModel] = useState(null);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        httpServ.getDeThiTheoId(baiKiemTra.maDeThi)
            .then(res => {
                let examModel = res.data.content;
                const listSection = JSON.parse(examModel.examContent);
                examModel.examContent = listSection.map(item => {
                    return {
                        type: item.Type,
                        content: JSON.parse(item.Content),
                        answers: ''
                    }
                });
                setModel(examModel);
                setDisabled(baiKiemTra.daNopBai);
            })
            .catch(err => console.log(err));
    }, []);

    const testGrading = (question) => {
        if (!question.answers) return 0;

        const answers = question.content.answers;
        if (question.answers.length != answers.length)
            return 0

        let checked = true;
        for (let i = 0; i < answers.length; i++) {
            if (question.answers[i] != answers[i]) {
                checked = false;
                break;
            }
        }
        return checked ? 1 : 0;
    }

    const handleSetAnwers = (answer, index) => {
        setModel({
            ...model,
            examContent: model.examContent.map((item, i) => {
                if (i == index) return { ...item, answers: answer }
                return item;
            })
        })
    }

    const renderSectionItem = (section, index) => {
        switch (section.type) {
            case sectionTypes.QUESTION:
                return <QuestionSection
                    key={index}
                    itemIndex={index}
                    section={section.content}
                    handleSetAnwers={handleSetAnwers}
                />
            case sectionTypes.TITLE_AND_DESC:
                return <TitleSection key={index} section={section.content} />
            case sectionTypes.IMAGE:
                return <ImageSection key={index} section={section.content} />
            case sectionTypes.VIDEO:
                return <VideoSection key={index} section={section.content} />
            default:
                break;
        }
    }

    const handleNopBaiKiemTra = (baiNop) => {
        baiNop.baiDaNop = JSON.stringify(baiNop.baiDaNop);
        httpServ.putDeThiNguoiDung(baiNop.id, baiNop)
            .then(res => {
                message.success('Nộp bài thành công!')
                setDisabled(true);
            })
            .catch(error => {
                message.error('Nộp bài thất bại!')
                console.log(error.err.response.data)
            });
    }

    const handleSubmit = () => {
        if (!model.autoMark) {
            const listQuestionSection = model.examContent.filter(item => item.type == sectionTypes.QUESTION);
            let coin = 0;
            let count = 0;
            listQuestionSection.forEach((item, i) => {
                if (item.questionType != questionTypes.PARAGRAPH &&
                    item.questionType != questionTypes.SHORT_ANSWER) {
                    coin = coin + testGrading(item);
                    count++;
                }
            });

            Modal.success({
                title: 'Tổng điểm kết quả bài kiểm tra của bạn',
                content: <div>
                    <div className='exam-result'>
                        <b>Điểm</b>
                        <div className='exam-result-coin'>
                            <b>{Math.ceil((coin / count) * 100)}</b>
                        </div>
                        <b>Trả lời đúng {coin}/{count} câu hỏi</b>
                    </div>
                </div>,
                okText: 'Xác nhận',
                onOk: () => {
                    const baiNop = {
                        ...baiKiemTra,
                        baiDaNop: model.examContent.filter(x => x.type == sectionTypes.QUESTION),
                        daNopBai: true,
                        tongDiem: Math.ceil((coin / count) * 100)
                    };
                    handleNopBaiKiemTra(baiNop);
                }
            });
        }
        else{
            const baiNop = {
                ...baiKiemTra,
                baiDaNop: model.examContent.filter(x => x.type == sectionTypes.QUESTION),
                daNopBai: true
            };
            handleNopBaiKiemTra(baiNop);
        }
    }

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className="examtest-mobile">
                <div className="row">
                    {
                        model ? model.examContent.map((item, index) => {
                            return renderSectionItem(item, index)
                        }) : null
                    }
                </div>
                <div className='examtest-mobile-button' style={{ display: disabled ? 'none' : 'flex' }} onClick={(handleSubmit)}>
                    <span>Hoàn thành</span>
                </div>
            </div>
        </>
    )
}

export default ExamTestMobile;