
import _getWeather from '../apis/WeatherApi';

export default class Diary {
  constructor(diaryType='picture', title='제목', description='설명', dateTime=null, src=null, weather='') {
    this.diaryType = diaryType;
    this.title = title;
    this.description = description;
    this.weather = weather;

    const [date, time] = dateTime.split(' ');
    dateTime = date.split(':').join('-') + ' ' + (time ? time : '');
    this.dateTime = new Date(dateTime);
    this.src = src;

    const dateStr = dateTime.split('-').join('').substring(0, 8);
    _getWeather(dateStr).then(res => {
      if (!res || !res.response || !res.response.body || !res.response.body.items) {
        console.log('error while fetching data');
        return;
      }
      const data = res.response.body.items.item[0];
      const weather = {
        sumRn: data.sumRn,    // 일 강수량 (>0: rainy)
        ddMes: data.ddMes,    // 일 최심적설 (>0: snowy)
        avgTca: data.avgTca,  // 평균 전운량 (>8: cloudy)
        maxWs: data.maxWs,    // 최대 풍속
        avgTs: data.avgTs     // 평균 지면온도
      }
      if (weather.sumRn > 0)
        this.weather = 'rainy';
      else if (weather.ddMes > 0)
        this.weather = 'snowy';
      else if (weather.avgTca > 8)
        this.weather = 'cloudy';
      else
        this.weather = 'sunny';
    });
  }

  getInfo() {
    return [this.diaryType, this.title, this.description, this.picture, this.weather];
  }

  static compare(x, y) {
    if (x.dateTime < y.dateTime)
      return -1;
    return 1;
  }
}