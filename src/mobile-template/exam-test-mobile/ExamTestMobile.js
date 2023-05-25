import React, { useEffect, useState } from 'react';
import * as sectionTypes from '../../constants/sectionTypes';
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


    const handleSetAnwers = (answer, index) => {
        setModel({
            ...model,
            examContent: model.examContent.map((item, i) => {
                if(i == index) return { ...item, answers: answer }
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

    console.log(model);

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
            </div>
        </>
    )
}

export default ExamTestMobile;