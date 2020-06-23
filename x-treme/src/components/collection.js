import React, { useState } from 'react';
import Diary from "../entity/Diary"
import ImageMega from '../apis/ImageMega';

export default function Collection() {
  const [ collection, setCollection ] = useState([]);

  const handleCollectionChange = (c) => {
    console.log('handleCollectionChange', collection);
  }

  return <div id="collection">
      <h2>Collection</h2>
      <div>
          <h1>
            Get EXIF data from an image
          </h1>
          <ImageMega collection={ collection } onCollectionChange={c => handleCollectionChange(c)} />
      </div>
      
    </div>;
}
