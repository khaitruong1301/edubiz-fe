export class SingleChoice_Answer {
  constructor(id, cauTraLoi, luaChon) {
    this.id = id;
    this.cauTraLoi = cauTraLoi;
    this.luaChon = luaChon;
  }
}
export class Quiz_Question {
  constructor(id, noiDung) {
    this.id = id;
    this.noiDung = noiDung;
    this.isCorrect = false;
  }
}
