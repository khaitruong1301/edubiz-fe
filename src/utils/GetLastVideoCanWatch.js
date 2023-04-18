import React from 'react'

let sortBaiDaHoc = (baiDaHoc) => {
    return baiDaHoc.sort((a, b) => {
        if (a.stt < b.stt)
            return -1;
        if (a.stt > b.stt)
            return 1;
        return 0;
    })
}



export default function GetLastVideoCanWatch(_baiDaHoc, _allLessons) {
    // console.log({ _baiDaHoc, _allLessons });
    let lastVideoCanWatchIndex = -1;
    if (_baiDaHoc.length == 0) {
        let lessonIndex = _allLessons.findIndex((lesson) => {
            return lesson.maLoaiBaiHoc !== "QUIZ_WRITE";
        })
        if (lessonIndex) {

            return lastVideoCanWatchIndex = lessonIndex
        }
    } else {
        let baiDaHoc = sortBaiDaHoc(_baiDaHoc)
        for (let index = baiDaHoc.length - 1; index >= 0; index--) {
            let indexLesson = baiDaHoc[index].stt
            // console.log({
            //     index, indexLesson, "less": _allLessons[indexLesson]
            // });
            if (_allLessons[indexLesson].maLoaiBaiHoc !== "QUIZ_WRITE") {
                return baiDaHoc[index].stt
            }

        }
    }
    return lastVideoCanWatchIndex
}
