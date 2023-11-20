import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

const clientId = 'ec14769e2b854873b9bb4331c5f2ce29'
const clientSecret = 'a2a74d843cfe449a98a9d3c02deb1310'

const __getToken =async () => {
    
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const __getGenres = async (token: string) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items;
}

const __getTracks = async (token: string, id: string) => {

    const result = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'GET', 
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.items;
}

const __getTrack = async (token: string, trackEndPoint:string) => {

    const result = await fetch(`${trackEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data;
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const token = await __getToken();
    const tracks = await __getTracks(token, '5GEfF7uYfIy9S2I39FZj4P');

    const audiobooks = await Promise.all(tracks.map(async (track: any) => {
      const trackDetails = await __getTrack(token, track.track.href);

      return {
        name: trackDetails.name,
        image: trackDetails.album.images[0]?.url || null,
        artist: trackDetails.artists[0]?.name || null,
        songurl: trackDetails.external_urls.spotify || null,
      };
    }));

    res.json({ audiobooks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;