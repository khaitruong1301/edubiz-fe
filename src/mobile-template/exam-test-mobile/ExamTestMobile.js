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

function ExamTestMobile(props) {

    const [model, setModel] = useState(null);

    useEffect(() => {
        httpServ.getDeThiTheoId(6)
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
            })
            .catch(err => console.log(err))
    }, []);

    const testGrading = (question) => {
        console.log(question);
        let answers = [];
        let ok = true;
        switch (question.questionType) {
            case questionTypes.MULTIPLE_CHOICE:
                answers = question.options.filter(x => x.checked);
                console.log(answers);
                console.log(question.answers);
                if(question.answers[0] == answers[0].value)
                    return 1;
                return 0;
            case questionTypes.CHECKBOXES:
                answers = question.options.filter(x => x.checked);
                if(answers.length != question.answers.length)
                    return 0;
                for (let i = 0; i < answers.length; i++) {
                    if(answers[i] != question.answers[i].value){
                        ok = false;
                        break;
                    }
                }
                return ok ? 1: 0;
            case questionTypes.DRAGGABLE:
                for (let i = 0; i < answers.length; i++) {
                    if(answers[i] != question.answers[i]){
                        ok = false;
                        break;
                    }
                }
                return ok ? 1: 0;
            case questionTypes.FILL_WORD:
                answers = question.content.answers.split(',');
                answers = answers.map(str => str.trim());
                for (let i = 0; i < answers.length; i++) {
                    if(answers[i] != question.answers[i]){
                        ok = false;
                        break;
                    }
                }
                return ok ? 1: 0;
            case questionTypes.RATING:
                return question.answers == question.content.answers ? 1 : 0;
            default:
                return 0;
        }
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

    const handleSubmit = () => {
        const listQuestionSection = model.examContent.filter(item => item.type == sectionTypes.QUESTION);
        let coin = 0;
        listQuestionSection.forEach((item, i) => {
            // console.log(`${i + 1}. `, item.content.question.content);
            // console.log("Câu trả lời: ");
            // console.log(item.answers);
            // console.log("Đáp án: ");
            // console.log(item.content.answers);
            // console.log("=====================================");
            coin = coin + testGrading(item);
        });
        console.log(coin);
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
                <div className='examtest-mobile-button' onClick={(handleSubmit)}>
                    <span>Hoàn thành</span>
                </div>
            </div>
        </>
    )
}

export default ExamTestMobile;