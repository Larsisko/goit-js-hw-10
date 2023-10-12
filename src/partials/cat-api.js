import axios from 'axios';

const apiKey =
  'live_dQsNZ0DNtQU2fFVBQ3mGqOSNuREhMUluEfZX2n00H9RCJqh0J1ZiFFhM7B1wS72f';
axios.defaults.headers.common['x-api-key'] = apiKey;
const url = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreedsList() {
  return fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('There was a problem with the fetch operation');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  // const catInfoElement = document.querySelector('.cat-info');
  // const loaderElement = document.querySelector('.loader');
  const catInfoUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(catInfoUrl, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('There was a problem with the fetch operation');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}
