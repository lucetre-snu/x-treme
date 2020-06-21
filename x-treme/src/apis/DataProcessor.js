import  _getPlayList  from './YouTubeApi.js';

async function getPlayList(plId) {
        let res;
        try {
            res = await _getPlayList(plId);
        } catch (error) {
            res = await _getPlayList(plId);
        }finally{
            if(!res) {}
            return {
                videoInfo: res['items'].map(row => ({
                    title: row['snippet']['title'],
                    desc: row['snippet']['description'],
                    img: row['snippet']['thumbnails']['high']['url'],
                    date: row['snippet']['publishedAt'].split("T", 1),
                    videoId: row['contentDetails']['videoId']
                }))
            };
        }
}

export { getPlayList }