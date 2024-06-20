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

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
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
  // console.log(jsonData)
// axios.interceptors.response.use((response)=>{
//   progressVal = 
//   progressBar.style.width = `${progressVal}`
//   return response
// }, 
//   (error) =>{

//     throw error
//   })

}
initialLoad();



breedSelect.addEventListener('click', handleClick);

async function handleClick(event) {
 const breedId = event.target.value;
 let imgUrl = '';
  const responseAxios = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`);
  // const jsonData = await response.json();
  // console.log(response)
  for(let i=0; i<responseAxios.data.length; i++) {
    imgUrl = responseAxios.data[i].url;
    let imgEl = document.createElement('img');
    let divEl = document.createElement('div');
    divEl.setAttribute('class', 'img-wrapper carousel-item')
    imgEl.setAttribute('class', 'carousel-item card')
    imgEl.setAttribute('src',imgUrl);
    divEl.appendChild(imgEl)
    carouselInner.prepend(divEl);
   //I could get the images to properly load, but my carousel buttons dont seem to work. I think it is something wrong with my class names. 
  }
  console.log(responseAxios)
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
  // const jsonData = await response.json();
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




/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
