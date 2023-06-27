import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLesson, setIsRedoQuizz, setIsTotalRedoQuizz, setListQuestion, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import { initalAnwerUser } from "../../utils/ConvertLesson";
import { Portal } from "react-portal";
import Navigate_Footer_ViewAnsers from "../Navigate_Footer_ViewAnsers/Navigate_Footer_ViewAnsers";
import { Checkbox, message } from 'antd';
import httpServ from "../../services/http.service";

const replaceString = (str, charOld) => {
  let strNew = '';
  let count = 1;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === charOld) {
      strNew += `-----`;
      count++;
    }
    else
      strNew += str[i];

  }
  return strNew;
}

export default function ContentQuizz_ViewAnsers({ stateQuizz }) {
  let dispatch = useDispatch();
  let listQuestionState = useSelector((state) => state.baiHoc.listQuestion);
  const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
  let totalRedoQuizz = useSelector((state) => state.baiHoc.totalRedoQuizz);
  const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);
  const { userInfor } = useSelector((state) => state.authUser);

  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    setAllQuestions(listQuestionState)
  }, [listQuestionState]);

  const answerChecked = (items) => {
    if (!items) return null;
    return items.map((item, index) => {
      return <div key={index} className="QuizzViewAnswerItem_Answer">
        <Checkbox checked={item.checked}>{item.value}</Checkbox>
      </div>
    })
  }

  const answerSorting = (items) => {
    if (!items) return null;
    return items.map((item, index) => {
      return <div key={index} className="QuizzViewAnswerItem_Answer">
        {item.value}
      </div>
    })
  }

  const answerFillWord = (description, userAnswers) => {
    if (!description) return null;
    const desc = description ? replaceString(description, '♥') : '';
    return <div className="QuizzViewAnswerItem_Desc">
      <div dangerouslySetInnerHTML={{ __html: desc }} className="QuizzViewAnswerItem_DescQuestion"></div>
      {
        userAnswers ? userAnswers.map((item, index) => {
          return <div key={index} className="QuizzViewAnswerItem_Answer">
            {`${index + 1}. ${item}`}
          </div>
        }) : null
      }
    </div>
  }

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'SINGLE':
        return answerChecked(question.items);
      case 'TRUEORFALSE':
        return answerChecked(question.items);
      case 'SINGLE', 'TRUEORFALSE', 'MULTIPLE':
        return answerChecked(question.items);
      case 'SORTING':
        return answerSorting(question.items);
      case 'FILLWORD':
        return answerFillWord(question.description, question.userAnswers);
      default:
        break;
    }

  }

  const handleConfirmRedoQuizz = () => {
    httpServ.getLamLaiTracNghiem(userInfor.id, currentLesson.id).then((res) => {
      httpServ
        .getTrangThaiQuizz(userInfor?.id, currentLesson.id)
        .then((res) => {
          dispatch(setTrangThaiQuizz(res.data.content));
          dispatch(setIsRedoQuizz(true));
          dispatch(setIsTotalRedoQuizz(totalRedoQuizz + 1));
        })
        .catch((err) => {
        });
    })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleNextLesson = () => {
    let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
      return item.id === currentLesson.id;
    });
    dispatch(setCurrentLesson(tatCaBaiHoc[currentLessonIndex + 1]));
  };

  let diemQuizz = 0;
  if (allQuestions.length > 0) {
    let countCorrected = 0;
    for (let index = 0; index < allQuestions.length; index++) {
      const question = allQuestions[index];
      question.isCorrect && countCorrected++;
    }
    diemQuizz = (countCorrected / allQuestions.length) * 100;
  }

  return (
    <div className="QuizzViewAnswer">
      <div className="QuizzViewAnswer_Title">Kết quả bài kiểm tra</div>
      {
        allQuestions.map((item, i) => {
          return <div className="QuizzViewAnswerItem">
            <div className="QuizzViewAnswerItem_Title">
              <b style={{ color: item.isCorrect ? 'green' : 'red' }}>{item.isCorrect ? 'ĐÚNG' : 'SAI'} - </b>
              <b>{item.question}</b>
            </div>
            {renderQuestion(item)}
            {
              item.feedback ? <div className="QuizzViewAnswerItem_FeedBack">
                <b>Phản hồi: </b> {'  '} {item.feedback}
              </div> : null
            }
          </div>
        })
      }
      <div className="QuizzViewAnswer_Button">
        <button onClick={() => handleConfirmRedoQuizz()}>
          Làm lại
          <i className="fa fa-redo-alt"></i>
        </button>
        {
          diemQuizz > 70 ? <button onClick={() => handleNextLesson()}>
            Bài tiếp theo
            <i className="fa fa-chevron-circle-right"></i>
          </button> : null
        }
      </div>
    </div>
  )
}
