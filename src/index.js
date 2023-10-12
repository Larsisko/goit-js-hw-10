import { fetchBreedsList, fetchCatByBreed } from './partials/cat-api';
document.querySelector('.error').style.display = 'none';
const breedSelect = document.querySelector('.breed-select');

// breedSelect.addEventListener('click', () => {
//   fetchBreedsList();
// });
const loadData = () => {
  document.querySelector('.loader').style.display = 'block';
  fetchBreedsList()
    .then(data => {
      const select = document.querySelector('.breed-select');
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });
      document.querySelector('.loader').style.display = 'none';
    })
    .catch(error => {
      const errorElement = document.querySelector('.error');
      errorElement.style.display = 'block';
      console.error('There was a problem with the fetch operation:', error);
    });
  document.querySelector('.loader').style.display = 'none';
};

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  console.log(selectedBreedId);
  document.querySelector('.loader').style.display = 'block';
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      const catData = data[0];
      const catName = selectedBreedId;
      const catDescription = catData.breeds[0].description;
      const catTemperament = catData.breeds[0].temperament;

      const catInfoElement = document.querySelector('.cat-info');
      const loaderElement = document.querySelector('.loader');
      loaderElement.style.display = 'none';
      catInfoElement.style.display = 'block';
      catInfoElement.innerHTML = `<div class='catContainer'>
        <img class="cat_img" src="${catData.url}" alt="${catName}"  />
        <h2>${catName}</h2>
        <p><strong>Description:</strong> ${catDescription}</p>
        <p><strong>Temperament:</strong> ${catTemperament}</p>
      </div>`;
    })
    .catch(error => {
      document.querySelector('.error').style.display = 'block';
      console.error('There was a problem with the fetch operation:', error);
      document.querySelector('.loader').style.display = 'none';
    });
});
document.addEventListener('DOMContentLoaded', loadData);
