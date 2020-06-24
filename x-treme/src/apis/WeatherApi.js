async function _getWeather(dateStr) {
    const WEATHER_API_KEY = 'OoF84%2BDLd4z6n6nvz3QxPhWFg5zQNSQ6OcKPcGxSBtIwSEqxJPSJhxeGKB9B6bQKSekFlN%2BbKqdNLbjOy%2FTeBA%3D%3D';
    const url = `http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${WEATHER_API_KEY}&pageNo=1&numOfRows=10&dataType=json&dataCd=ASOS&dateCd=DAY&startDt=${dateStr}&endDt=${dateStr}&stnIds=108&`;
    
    let res = await fetch(url);

    let resOk = res && res.ok;
    if(resOk) {
        return await res.json();
    }
  }
  export default _getWeather;