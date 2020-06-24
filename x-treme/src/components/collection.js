import React, { useState, useEffect } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';
import DiaryDetail from './diary-detail';
import { getPlayList } from '../apis/DataProcessor';
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';

import Calendar from 'react-calendar';
// import sunny from "../weathers/sunny.jpg";
// import rainy from "../weathers/rainy.jpg";
// import cloudy from "../weathers/cloudy.jpg";
// import snowy from "../weathers/snowy.jpg";

import 'react-calendar/dist/Calendar.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./collection.css"; 

export default function Collection() {
  const [ address, setAddress ] = useState('');
  const [ collection, setCollection ] = useState([]);
  const [ date, setDate ] = useState([new Date()]);
  const [ weather, setWeather ] = useState('');
  const [ diaryId, setDiaryId ] = useState(0);

  useEffect(() => {
    document.title = `${weather} ${date}`;
  });

  const handleCollectionChange = (diary) => {
    collection.push(diary);
    console.log(collection);
    collection.sort(Diary.compare);
    setCollection(collection.slice());
    console.log(collection);
  }

  const fetchYouTube = (e) => {
    e.preventDefault();

    // PLUKkXeVC39Xr97P94HsAvZeWmvcm2fcJI
    console.log(address);
    getPlayList(address)
    .then((res) => {
      console.log(res);
    })
  }

  const onClickDay = date => setDate({date})

  // const weatherChange = (_weather) => {
  //   if (_weather === snowy) {setWeather(snowy)}
  //   else if (_weather === sunny) {setWeather(sunny)}
  //   else if (_weather === cloudy) {setWeather(cloudy)}
  //   else if (_weather === rainy) {setWeather(rainy)}
  // }

  const onChangeDiary = (id) => {
    setDiaryId(id);
    const diary = collection[id];
    setDate(diary.dateTime);
    setWeather(diary.weather);
  }

  return <div id="collection">
      <h2>Collection</h2>
      <div>
      
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <h1>Upload Photos</h1>
              <ImageMega collection={ collection } onCollectionChange={handleCollectionChange} />
            </Col>

            <Col>
              <h1>Fetch YouTube PlayList</h1>
              <form>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                <input type="submit" value="Fetch" onClick={fetchYouTube}/>
              </form>
            </Col>
          </Row>
        </Container>
        
        {/* <img
          className="d-block w-100"
          src={weather}  alt="weather picture"/> */}
        {diaryId}
        { collection.length === 0 ?
          <h4>다이어리가 존재하지 않습니다.</h4> :
          <Carousel onChange={onChangeDiary} selectedItem={diaryId} showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
            {collection.map((diary, index) => <DiaryDetail diary={diary} key={index} />)}
          </Carousel>
        }
      </div>
      <div><Calendar onClickDay={onClickDay}/></div>
      
    </div>;
}