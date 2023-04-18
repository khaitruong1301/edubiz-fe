export const convertLesson = (lesson) => {
  if (lesson.maLoaiBaiHoc === "QUIZ") {
    lesson.noiDung = JSON.parse(lesson.noiDung);
  }
};
export const initalAnwerUser = (question) => {
  switch (question.maLoaiBaiTap) {
    case "SINGLE":
      return [];
    case "fill_inblank":
      return [];
    case "fill_inblank_css":
      return [];

    default:
      return "";
  }
};

export const resetAnswerUser = (questionList) => {
  for (let index = 0; index < questionList.length; index++) {
    questionList[index].noiDung.userAnsers = [];
  }
};
