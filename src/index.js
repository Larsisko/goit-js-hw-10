import { fetchBreedsList, fetchCatByBreed } from './partials/cat-api';

const breedSelect = document.querySelector('.breed-select');

breedSelect.addEventListener('click', () => {
  fetchBreedsList();
});
document.querySelector('.loader').style.display = 'none';
document.querySelector('.error').style.display = 'none';

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  console.log(selectedBreedId);
  fetchCatByBreed(selectedBreedId);
});
