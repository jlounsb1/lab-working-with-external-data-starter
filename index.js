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
Carousel.clear();
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
const description = document.getElementById('description');

async function breedInfo(event) {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const jsonData = await response.json();
  let breedId = event.target.value;
  for (let i=0; i<jsonData.length; i++){
    if(breedId ==jsonData[i].id){
      description.textContent = `${jsonData[i].description}`;
    }
  }
  //It works, but it adds it on every selection, and doesnt overwrite anything.
}


export async function favourite(imgId) {
  // your code here
}
