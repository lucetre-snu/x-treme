import React, {useEffect, useState} from 'react';
import { getPlayList } from '../apis/DataProcessor.js';

export default function Diary() {
  const [address, setAddress] = useState('');

  const fetchYouTube = (e) => {
    e.preventDefault();

    // PLUKkXeVC39Xr97P94HsAvZeWmvcm2fcJI
    console.log(address);
    getPlayList(address)
    .then((res) => {
      console.log(res);
    })
  }

  return <div id="diary">
    <h2>Diary</h2>
      <form>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
          <input type="submit" value="Fetch" onClick={fetchYouTube}/>
      </form>
  </div>;
}