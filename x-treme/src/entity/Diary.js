
export default class Diary {
  constructor(diaryType='picture', title='제목', description='설명', dateTime=null, src=null) {
    this.diaryType = diaryType;
    this.title = title;
    this.description = description;
    this.dateTime = dateTime;
    this.src = src;
  }

  getInfo() {
    return [this.diaryType, this.title, this.description, this.picture]
  }
}