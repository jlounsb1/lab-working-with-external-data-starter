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
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const jsonData = await response.json();
  for(let i=0; i<jsonData.length; i++) {
    id = jsonData[i].id;
    name= jsonData[i].name;
    let option= document.createElement('option');
    option.setAttribute('value',id);
    option.textContent = `${name}`;
    breedSelect.appendChild(option);
    // console.log(id, name, option)
  }
  // console.log(jsonData)
}
initialLoad();

breedSelect.addEventListener('click', handleClick);
//I want to get the even listener to select just the breed id so I can get that into a variable, then request it in my api pull
 async function handleClick(event) {
 const breedId = event.target.value;
 let imgUrl = '';
//  console.log(breedId)
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`);
  const jsonData = await response.json();
  // console.log(jsonData)
  for(let i=0; i<jsonData.length; i++) {
    imgUrl = jsonData[i].url;
    let imgEl = document.createElement('img');
    let divEl = document.createElement('div');
    divEl.setAttribute('class', 'img-wrapper carousel-item')
    imgEl.setAttribute('class', 'carousel-item card')
    imgEl.setAttribute('src',imgUrl);
    divEl.appendChild(imgEl)
    carouselInner.prepend(divEl);
    
   //I could get the images to properly load, but my carousel buttons dont seem to work. I think it is something wrong with my class names. 
  }

}

breedSelect.addEventListener('click', breedInfo);

async function breedInfo(event) {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const jsonData = await response.json();
  let breedId = event.target.value;
  for (let i=0; i<jsonData.length; i++){
    if(breedId ==jsonData[i].id){
      let pEl = document.createElement('p');
      pEl.textContent = `${jsonData[i].description}`;
      infoDump.append(pEl);
     
    }
  }
  //It works, but it adds it on every selection, and doesnt overwrite anything.
}


/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

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
