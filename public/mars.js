const baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=';

let url;



const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const pageCounter = document.querySelector('.pageCount');

let pageCount = 1;

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
    while (marsGalleryContainer.firstChild) {
        marsGalleryContainer.removeChild(marsGalleryContainer.firstChild);
    }
    while (pageCounter.firstChild) {
        pageCounter.removeChild(pageCounter.firstChild);
    }
    let currentCount = document.createElement('p');
    currentCount.textContent = `page ${pageCount} of 35`;
    pageCounter.appendChild(currentCount);
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

    });
}

function nextPage(e) {
    if(pageCount < 35){
        pageCount++;
    }else{
        return;
    }
    fetchMarsRover();
};

function prevPage(e) {
    if(pageCount > 1) { 
      pageCount--; 
    } else {
        return; 
    }
    fetchMarsRover();
  };