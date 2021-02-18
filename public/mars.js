const baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=';

let url;



const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let pageCount = 1;
//let marsRoverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${pageCount}&api_key=${key}`;

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage); 

fetchMarsRover();
function fetchMarsRover(){
    url = baseURL + pageCount + "&api_key=" + key;
    console.log(url);
    fetch(url)
    .then(result => {
        return result.json();
    })
    .then(json =>{
        console.log(json);
        displayMarsPhotos(json);
    });
}


function displayMarsPhotos(json) {
    //console.log(marsRoverURL);
    while (marsGalleryContainer.firstChild) {
        marsGalleryContainer.removeChild(marsGalleryContainer.firstChild);
    }
    let photos = json.photos;
    console.log(photos);
    photos.forEach(function(json){
        console.log(json.img_src);
        let imgSrc = json.img_src;
        
        let marsImgContainer = document.createElement('div');
        marsImgContainer.classList.add('marsImgContainer');
        let marsImg = document.createElement('img');
        marsImg.classList.add('image-fluid');
        marsImg.src = imgSrc;

        let dateCaption = document.createElement('p');
        dateCaption.textContent = json.earth_date;
        
        let caption = document.createElement('p');
        caption.textContent = json.camera.full_name;

        marsGalleryContainer.appendChild(marsImgContainer);
        marsImgContainer.appendChild(dateCaption);
        marsImgContainer.appendChild(caption);
        marsImgContainer.appendChild(marsImg);

        // if(carouselItem == innerCarouselMars.firstElementChild){
        //     carouselItem.classList.add('active');
        // }

    });
}

function nextPage(e) {
    pageCount++;
    fetchMarsRover();
};

function prevPage(e) {
    if(pageCount > 0) { 
      pageCount--; 
    } else {
      return; 
    }
    fetchMarsRover();
  };