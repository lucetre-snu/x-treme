import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';
import DiaryDetail from './diary-detail';
import { getPlayList } from '../apis/DataProcessor';
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import moment from "moment";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Calendar from 'react-calendar';
import sunny from "../weathers/sunny.jpg";
import rainy from "../weathers/rainy.jpg";
import cloudy from "../weathers/cloudy.jpg";
import snowy from "../weathers/snowy.jpg";

import 'react-calendar/dist/Calendar.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./collection.css";
import "./Calendar.css";

export default function Collection() {
  const [ address, setAddress ] = useState('');
  const [ collection, setCollection ] = useState([]);
  const [ date, setDate ] = useState([new Date()]);
  const [ weather, setWeather ] = useState(sunny);

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


  const checkDateDiary = (date) => {
    for(var i=0; i<collection.length; i++)
    {if(String(date).slice(0,16) === String(collection[i].dateTime).slice(0,16))
      {return collection[i]; break;}}
  }

  const checkDiaryDate = () => {
    for(var i=0; i<collection.length; i++)
    {if(String(date).slice(0,16) === String(collection[i].dateTime).slice(0,16))
      {}}
  } 

  const mark=[]

  for(var i=0; i<collection.length; i++)
  {mark.push(moment(String(collection[i].dateTime).slice(0,15)).format("DD-MM-YYYY"));}

  const onClickDay = (date) => {
    setDate({date});
    const selectedDiary = checkDateDiary(date);
}


    for(var i=0; i<collection.length; i++)
    {console.log(collection[i].dateTime)
      }
      
    const useStyles = makeStyles((theme) => ({
      root: {
      bottom: 30,
      right: 30,
      position: 'fixed',
    }}));

    const classes = useStyles();

  const weatherChange = (_weather) => {
    if(_weather === snowy) {setWeather(snowy)}
    else if (_weather === sunny) {setWeather(sunny)}
    else if (_weather === cloudy) {setWeather(cloudy)}
    else if (_weather === rainy) {setWeather(rainy)}
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

        { collection.length === 0 ?
          <h4>다이어리가 존재하지 않습니다.</h4> :
          <Carousel showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
            {collection.map((diary, index) => <DiaryDetail diary={diary} key={index} />)}
          </Carousel>
        }
      </div>
      <div><Calendar onClickDay={onClickDay} //onChange={this.onChange}//
    /*value={this.state.date}*/ tileClassName={({ date, view }) => {
      if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
       return 'highlight'
      }
    }} className="react-calendar"/></div>
      <Fab color="secondary" aria-label="add" className={classes.root}>
    <AddIcon />
  </Fab>
    </div>;
}
