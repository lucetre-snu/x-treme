import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';
import DiaryDetail from './diary-detail';
import { getPlayList } from '../apis/DataProcessor';
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./collection.css"; 

export default function Collection() {
  const [ collection, setCollection ] = useState([]);
  const [ address, setAddress ] = useState('');

  const fetchYouTube = (e) => {
    e.preventDefault();
    // PLUKkXeVC39Xr97P94HsAvZeWmvcm2fcJI
    console.log(address);
    getPlayList(address)
    .then((res) => {
      console.log(res);
    })
  }

  const handleCollectionChange = (diary) => {
    collection.push(diary);
    collection.sort(Diary.compare);
    setCollection(collection.slice());
    console.log(collection);
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
          <Carousel showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
            {collection.map((diary, index) => <DiaryDetail diary={diary} key={index} />)}
          </Carousel>
        }
        

      </div>
      
    </div>;
}
