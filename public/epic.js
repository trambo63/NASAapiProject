const key = 'r2jRbdbVKRy6mnkRnkRP8YgBfg1DKYgZq9n5vIoz';
const epicURL = `https://api.nasa.gov/EPIC/api/natural/?api_key=${key}`;
const innerCarousel = document.querySelector('#main-carousel');
const marsGalleryContainer = document.querySelector('.marsGalleryContainer');

fetchEpic();

function fetchEpic(){
    fetch(epicURL)
    .then(result => {
        return result.json();
    })
    .then(json =>{
        console.log(json);
        displayMain(json);
    });
}

function displayMain(json){
    if(json.length == 0){
        alert("No Images Found!");
    }
    console.log('in displayMain');
    json.forEach(function(json){
        
        let mainImg = json.image;
        let date = json.date;
        let imgDateTime = date.split(" ");
        let imgDate = imgDateTime[0].split('-');
        let imgYear = imgDate[0];
        let imgMonth = imgDate[1];
        let imgDay = imgDate[2];
        let imgURL = `https://api.nasa.gov/EPIC/archive/natural/${imgYear}/${imgMonth}/${imgDay}/png/${mainImg}.png?api_key=${key}`
        console.log(imgURL);
        
        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        let carouselImg = document.createElement('img');
        carouselImg.classList.add('d-block');
        carouselImg.classList.add('w-100');
        carouselImg.src = imgURL;

        let dateCaption = document.createElement('p');
        dateCaption.textContent = json.date;
        
        let caption = document.createElement('p');
        caption.textContent = json.caption;

        innerCarousel.appendChild(carouselItem);
        carouselItem.appendChild(dateCaption);
        carouselItem.appendChild(carouselImg);
        carouselItem.appendChild(caption);

        if(carouselItem == innerCarousel.firstElementChild){
            carouselItem.classList.add('active');
        }

    });
}

// Image Search
const searchByDate = document.querySelector('form');
const searchInnerCarousel = document.querySelector('#search-carousel');

searchByDate.addEventListener('submit', fetchImgByDate);

function fetchImgByDate(e){
    e.preventDefault();
    
    console.log('in fetch');
    let dateSearchURL = `https://api.nasa.gov/EPIC/api/natural/date/${date.value}?api_key=${key}`;
    console.log(dateSearchURL);
    
    fetch(dateSearchURL) 
    .then(function(result) {    
    return result.json(); 
    }).then(function(json) {
        console.log(json);
        displayImgByDate(json);
    }).catch(function(){
        alert("No Images for this Date")
    });
}

function displayImgByDate(json){
    while (searchInnerCarousel.firstChild) {
        searchInnerCarousel.removeChild(searchInnerCarousel.firstChild); 
    }
    if(json.length == 0){
        alert("No Images Found!");
    }
    console.log('in display function');
    json.forEach(function(json){
        let mainImg = json.image;
        let date = json.date;
        let imgDateTime = date.split(" ");
        let imgDate = imgDateTime[0].split('-');
        let imgYear = imgDate[0];
        let imgMonth = imgDate[1];
        let imgDay = imgDate[2];
        let imgURL = `https://api.nasa.gov/EPIC/archive/natural/${imgYear}/${imgMonth}/${imgDay}/png/${mainImg}.png?api_key=${key}`
        console.log(imgURL);
        
        
        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        //carouselItem.classList.add('active');
        let carouselImg = document.createElement('img');
        carouselImg.classList.add('d-block');
        carouselImg.classList.add('w-100');
        carouselImg.src = imgURL;

        let dateCaption = document.createElement('p');
        dateCaption.textContent = json.date;
        
        let caption = document.createElement('p');
        caption.textContent = json.caption;

        searchInnerCarousel.appendChild(carouselItem);
        carouselItem.appendChild(dateCaption);
        carouselItem.appendChild(carouselImg);
        carouselItem.appendChild(caption);

        if(carouselItem == searchInnerCarousel.firstElementChild){
            carouselItem.classList.add('active');
        }
    });
}



