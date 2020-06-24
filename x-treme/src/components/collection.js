import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';
import DiaryDetail from './diary-detail';
import { getPlayList } from '../apis/DataProcessor';
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import Calendar from 'react-calendar';
import moment from "moment";

import 'react-calendar/dist/Calendar.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./collection.css";
import "./calendar.css";

export default function Collection() {
  const [ address, setAddress ] = useState('youtube.com/playlist?list=PLUKkXeVC39XoNJSe94lJiuinJ3diYhUZQ');
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
    const info = videoList.videoInfo;
    for(let i = 0; i < info.length; i++) {
      const title = info[i].title;
      const description = info[i].desc;
      const dateTime = info[i].date[0];
      const src = info[i].img;
      const diary = new Diary('video', title, description, dateTime, src);
      handleCollectionChange(diary);
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
        
        { collection.length === 0 ?
          <h4>다이어리가 존재하지 않습니다.</h4> :
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