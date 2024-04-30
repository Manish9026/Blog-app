
import axios from  'axios'
export const getSong=async(srhQuery,offset,limit)=>{
try {
    
    const options = {
        method: 'GET',
        url: 'https://spotify-web2.p.rapidapi.com/search/',
        params: {
          q:srhQuery,
          type: 'tracks',
          offset:offset,
          limit:limit,
          numberOfTopResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': '283888f038mshec22b2d2318bdbap13c030jsn0d4b3fa639a1',
          'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
        }
      };
  	const response = await axios.request(options);
	// console.log(response.data);
    return response.data.tracks;
} catch (error) {
	console.log(error);
    
    
}
}

export const getSongUrl=async(songId)=>{
    try {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/tracks/',
            params: {
              ids: songId
            },
            headers: {
              'X-RapidAPI-Key': '283888f038mshec22b2d2318bdbap13c030jsn0d4b3fa639a1',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };

          const response=await axios.request(options);
          return response.data.tracks[0].preview_url
        
    } catch (error) {
        
    }
}
