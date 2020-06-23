export default class Diary {
  constructor(diaryType='picture', title='제목', description='설명', dateTime=null, src=null) {
    this.diaryType = diaryType;
    this.title = title;
    this.description = description;

    const [date, time] = dateTime.split(' ');
    dateTime = date.split(':').join('-') + ' ' + time;
    this.dateTime = new Date(dateTime);
    this.src = src;
  }

  getInfo() {
    return [this.diaryType, this.title, this.description, this.picture]
  }

  static compare(x, y) {
    if (x.dateTime < y.dateTime)
      return -1;
    return 0;
  }
}