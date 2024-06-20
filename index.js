import * as Carousel from './Carousel.js';
import axios from 'axios';

// The breed selection input element.
const breedSelect = document.getElementById('breedSelect');
// The information section div element.
const infoDump = document.getElementById('infoDump');
// The progress bar div element.
const progressBar = document.getElementById('progressBar');
// The get favourites button element.
const getFavouritesBtn = document.getElementById('getFavouritesBtn');

const carouselInner = document.getElementById('carouselInner');

// Step 0: Store your API key here for reference and easy access.
const API_KEY = 'live_v5shdOvNFnkRtRk9QXMloW2eTzvASYlqXLpKfFQtU9WgZW58y7Dku0yJH2RCfTPh';


async function initialLoad() {
  
  let id = '';
  let name= '';
  const responseAxios = await axios.get('https://api.thecatapi.com/v1/breeds');
  // console.log(response)
  
  //const jsonData = await response.json();
  for(let i=0; i<responseAxios.data.length; i++) {
    id = responseAxios.data[i].id;
    name= responseAxios.data[i].name;
    let option= document.createElement('option');
    option.setAttribute('value',id);
    option.textContent = `${name}`;
    breedSelect.appendChild(option);
    // console.log(id, name, option)
  }
  axios.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    progressBar.style.width = `100%`;
    return request;
});

axios.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date().getTime();
        response.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
        
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;
        throw error;
});

(async () => {
    const url = 'https://api.thecatapi.com/v1/breeds';

    const { data, durationInMS } = await axios(url);
    console.log(`Request took ${durationInMS} milliseconds.`);
    progressBar.style.width='0%'
})();
}
initialLoad();



breedSelect.addEventListener('click', handleClick);

async function handleClick(event) {
  Carousel.clear();
 const breedId = event.target.value;
 let imgUrl = '';
 let imgId = ''
  const responseAxios = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`);
  for(let i=0; i<responseAxios.data.length; i++) {
    imgUrl = responseAxios.data[i].url;
    imgId = responseAxios.data[i].id
    let carouselItem = Carousel.createCarouselItem(imgUrl, breedId, imgId);
   
    carouselInner.appendChild(carouselItem);
  }
  Carousel.start()
  axios.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date().getTime();
        response.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
        progressBar.style.width = `100%`;
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;
        throw error;
});

(async () => {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`;

    const { data, durationInMS } = await axios(url);
    console.log(`Request took ${durationInMS} milliseconds.`);
    progressBar.style.width='0%'
})();

}

breedSelect.addEventListener('click', breedInfo);
const description = document.getElementById('description');

async function breedInfo(event) {
  
  const responseAxios = await axios.get('https://api.thecatapi.com/v1/breeds');
  let breedId = event.target.value;
  for (let i=0; i<responseAxios.data.length; i++){
    if(breedId ==responseAxios.data[i].id){
      description.textContent = `${responseAxios.data[i].description}`;
    }
  }
  axios.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    progressBar.style.width = `100%`;
    return request;
});

axios.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date().getTime();
        response.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;
        throw error;
});

(async () => {
    const url = 'https://api.thecatapi.com/v1/breeds';

    const { data, durationInMS } = await axios(url);
    console.log(`Request took ${durationInMS} milliseconds.`);
    progressBar.style.width='0%'
})();

}
//added axios intercepter logic to log timings. Largely copied from lesson, but api path adjusted and some logs deleted.
//I am not confident with the progress bar, but it was the best I can do.

//when i hit the favorite button it is giving me a 400 axios error(bad request). I tried to append an imgId to the images when creating the carousel but I couldn't get it to take.
export async function favourite(imgId) {

  let rawBody = JSON.stringify({
    'image_id': `${imgId}`,
    'sub_id':'user-123'
  })
  const newFavorite = await axios(
    'https://api.thecatapi.com/v1/favourites',
      {
        method:'POST',
        headers: {'x-api-key': `${API_KEY}`},
        body: rawBody
      }
  );
}

getFavouritesBtn.addEventListener('click', getFavourites);

async function getFavourites() {
  Carousel.clear();
const getFavourites = await axios('https://api.thecatapi.com/v1/favourites',
  {
    METHOD: 'GET',
    headers: {'x-api-key': `${API_KEY}`}
  }
);
console.log(getFavourites);
progressBar.style.width='0%'
}