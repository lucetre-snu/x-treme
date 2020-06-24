import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Carousel from 'react-bootstrap/Carousel';
import sunny from "../weathers/sunny.jpg";
import rainy from "../weathers/rainy.jpg";
import cloudy from "../weathers/cloudy.jpg";
import snowy from "../weathers/snowy.jpg";

export default function Collection() {
  const [ collection, setCollection ] = useState([]);
  const [ date, setDate] = useState([new Date()]);
  const [weather, setWeather] = useState(sunny);

  const handleCollectionChange = (diary) => {
    collection.push(diary);
    collection.sort(Diary.compare);
    setCollection(collection.slice());
    console.log(collection);
  }

  const onClickDay = date => setDate({date})

  const weatherChange = (_weather) => {
    if(_weather === snowy) {setWeather(snowy)}
    else if (_weather === sunny) {setWeather(sunny)}
    else if (_weather === cloudy) {setWeather(cloudy)}
    else if (_weather === rainy) {setWeather(rainy)}
  }

  return <div id="collection">
      <h2>Collection</h2>
      <div style={{ border: '1px solid black'}}>
        <Carousel>
        <Carousel.Item>
    <img
      className="d-block w-100"
      src={weather}  alt="weather picture"/>
      <Carousel.Caption>
          <h1>
            Get EXIF data from an image
          </h1>
          <p>
          <ImageMega collection={ collection } onCollectionChange={handleCollectionChange} />
          { collection.length === 0 ?
            <h4>다이어리가 존재하지 않습니다.</h4> :
            collection.map((diary, index) => <div key={index}>
              제목: {diary.title} <br />
              설명: {diary.description} <br />
              날짜: {diary.dateTime.toString()} <br />
              <img width="200px" src={diary.src} alt="">
              </img>
            </div>)
          }
          </p>
          </Carousel.Caption>
          </Carousel.Item>
          </Carousel>
      </div>
      <div><Calendar onClickDay={onClickDay}/></div>
      
    </div>;
}
