import axios from 'axios';
const API_KEY = '38825211-dba5e3ee1b1336e1f9cd9ebac';
const URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, per_page, page) {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
      },
    });
    const { hits, totalHits, total } = response.data;
    return { hits: hits, totalHits: totalHits, total: total };
  } catch (err) {
    console.log('FETCH ERROR: ' + err);
  }
}
