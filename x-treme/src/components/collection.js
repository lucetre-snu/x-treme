import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';
import DiaryDetail from './diary-detail';
import { getPlayList } from '../apis/DataProcessor';
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import Calendar from 'react-calendar';
import moment from "moment";
import logo from '../logo.svg';

import 'react-calendar/dist/Calendar.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./collection.css";
import "./calendar.css";

export default function Collection() {
  const [ address, setAddress ] = useState('https://www.youtube.com/playlist?list=PLUKkXeVC39XoNJSe94lJiuinJ3diYhUZQ');
  const [ collection, setCollection ] = useState([]);
  const [ mark, setMark ] = useState([]);
  // const [ date, setDate ] = useState([new Date()]);
  // const [ weather, setWeather ] = useState('');
  const [ diaryId, setDiaryId ] = useState(0);

  const handleCollectionChange = (diary) => {
    collection.push(diary);
    collection.sort(Diary.compare);
    setCollection(collection.slice());

    console.log(collection);
    
    for (let i = 0; i < collection.length; i++) {
      const dateTime = collection[i].dateTime;
      mark.push(moment(dateTime).format("DD-MM-YYYY"));
      setMark(mark.slice());
    }
  }

  const createDiaryList = (videoList) => {
    try {
      const info = videoList.videoInfo;
      for(let i = 0; i < info.length; i++) {
        const title = info[i].title;
        const description = info[i].desc;
        const dateTime = info[i].date[0];
        // const src = info[i].img;
        const src = info[i].videoId;
        const diary = new Diary('video', title, description, dateTime, src);
        handleCollectionChange(diary);
      }
    } catch (error) {
      console.log(error);
    }
    //console.log('filename: ' + filename);
    //console.log('description: ' + description);
    //console.log('dateTime: ' + dateTime);
    //const diary = new Diary('image', filename, description, dateTime, src);
  }

  const fetchYouTube = (e) => {
    e.preventDefault();
    // https://www.youtube.com/playlist?list=PLUKkXeVC39XoNJSe94lJiuinJ3diYhUZQ
    const addressPieces = address.split('=');
    const link = addressPieces[addressPieces.length-1];

    console.log(link);
    getPlayList(link)
    .then((res) => {
      res = createDiaryList(res);
      console.log(res);
    })
  }

  const getClosestDiaryId = (date) => {
    let closestDiaryId = 0;
    for (let i = 1; i < collection.length; i++) {
      console.log(Math.abs(collection[i].dateTime - date))
      if (Math.abs(collection[i].dateTime - date) <
        Math.abs(collection[closestDiaryId].dateTime - date)) {
        closestDiaryId = i;
      }
    }
    return closestDiaryId;
  }

  const onSelectDate = (date) => {
    date.setHours(12);
    // setDate({date})
    if(collection.length === 0)
      return;
    const diaryId = getClosestDiaryId(date);
    // const dateTime = collection[diaryId].dateTime;
    setDiaryId(diaryId);
    // setDate({date: dateTime});
  }

  const onChangeDiary = (id) => {
    setDiaryId(id);
    // const diary = collection[id];
    // setDate(diary.dateTime);
    // setWeather(diary.weather);
  }

  return <div id="collection">
      <div>
        <Container style={{maxWidth: '100%'}}>
          <Row className="justify-content-md-center">
            <Col lg="4" style={{padding: '0'}}>
              <div style={{display:'table', height:'100%'}} onClick={() => window.location.reload(false)}>
                <img style={{width: '100px', height: '100px'}} src={logo} className="App-logo" alt="logo" />
                <h1 style={{ display:'table-cell', verticalAlign: 'middle' }}>Weather Last</h1>
              </div>
            </Col>
            <Col lg="3">
              <div style={{display:'table', height:'100%'}}>
                <div style={{ display:'table-cell', verticalAlign: 'middle' }}>
                  <h3>Upload Photos</h3>
                  <ImageMega collection={ collection } onCollectionChange={handleCollectionChange} />
                </div>
              </div>
            </Col>

            <Col lg="5">
              <div style={{display:'table', height:'100%', width:'100%'}}>
                <div style={{ display:'table-cell', verticalAlign: 'middle' }}>
                  <h3>Fetch YouTube PlayList</h3>
                  <form>
                    <Row className="justify-content-md-center">
                      <Col>
                        <input type="text" style={{width: '70%'}} value={address} onChange={e => setAddress(e.target.value)}/>
                        &nbsp;
                        <input type="submit" va lue="Fetch" onClick={fetchYouTube}/>  
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        
        { collection.length === 0 ?
          <h4 style={{ textAlign:'center' }}><hr />현재 기록된 다이어리가 없습니다. 추가해주세요.</h4> :
          <Carousel onChange={onChangeDiary} selectedItem={diaryId} showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
            {collection.map((diary, index) => <DiaryDetail diary={diary} key={index} />)}
          </Carousel>
        }
      </div>
      <div>
        <Calendar onClickDay={onSelectDate} tileClassName={({ date, view }) => {
          if (mark.find(x => x===moment(date).format("DD-MM-YYYY"))){
            return 'highlight'
          }
        }} className="react-calendar"/>
      </div>
    </div>;
}