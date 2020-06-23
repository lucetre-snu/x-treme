import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';

export default function Collection() {
  const [ collection, setCollection ] = useState([]);

  const handleCollectionChange = (diary) => {
    collection.push(diary);
    setCollection(collection.slice());
    console.log(collection);
  }

  return <div id="collection">
      <h2>Collection</h2>
      <div>
          <h1>
            Get EXIF data from an image
          </h1>
          <ImageMega collection={ collection } onCollectionChange={handleCollectionChange} />

          
          { collection.length === 0 ?
            <h4>다이어리가 존재하지 않습니다.</h4> :
            collection.map(diary => <p>
              제목: {diary.title} <br />
              설명: {diary.description} <br />
              날짜: {diary.dateTime} <br />
            </p>)
          }
      </div>
      
    </div>;
}
