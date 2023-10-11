import axios from 'axios';

const apiKey =
  'live_dQsNZ0DNtQU2fFVBQ3mGqOSNuREhMUluEfZX2n00H9RCJqh0J1ZiFFhM7B1wS72f';
axios.defaults.headers.common['x-api-key'] = apiKey;
const url = 'https://api.thecatapi.com/v1/breeds';
function fetchBreedsList() {
  document.querySelector('.loader').style.display = 'block';

  fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        document.querySelector('.error').style.display = 'block';
      }
      document.querySelector('.loader').style.display = 'none';
      return response.json();
    })
    .then(data => {
      const select = document.querySelector('.breed-select');
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });
    })
    .catch(error => {
      document.querySelector('.loader').style.display = 'none';

      console.error('There was a problem with the fetch operation:', error);
    });
}

function fetchCatByBreed(breedId) {
  const catInfoElement = document.querySelector('.cat-info');
  const loaderElement = document.querySelector('.loader');
  const catInfoUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  catInfoElement.style.display = 'none';
  loaderElement.style.display = 'block';

  return fetch(catInfoUrl, {
    method: 'GET',
    headers: {
      'x-api-key':
        'live_dQsNZ0DNtQU2fFVBQ3mGqOSNuREhMUluEfZX2n00H9RCJqh0J1ZiFFhM7B1wS72f',
    },
  })
    .then(response => {
      if (!response.ok) {
        document.querySelector('.error').style.display = 'block';
      }
      return response.json();
    })
    .then(data => {
      loaderElement.style.display = 'none';
      catInfoElement.style.display = 'block';

      const catData = data[0];
      const catName = breedId;
      const catDescription = catData.breeds[0].description;
      const catTemperament = catData.breeds[0].temperament;

      catInfoElement.innerHTML = `<div class='catContainer'>
        <img clas ="cat_img" src="${catData.url}" alt="${catName}"  />
        <h2>${catName}</h2>
        <p><strong>Description:</strong> ${catDescription}</p>
        <p><strong>Temperament:</strong> ${catTemperament}</p>
      </div>`;
    })

    .catch(error => {
      document.querySelector('.error').style.display = 'block';
      console.error('There was a problem with the fetch operation:', error);
    });
}

export { fetchBreedsList, fetchCatByBreed };
