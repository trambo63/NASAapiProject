const key = 'r2jRbdbVKRy6mnkRnkRP8YgBfg1DKYgZq9n5vIoz';
const epicURL = `https://api.nasa.gov/EPIC/api/natural/?api_key=${key}`;

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
const innerCarousel = document.querySelector('.carousel-inner');
// let first = innerCarousel.firstElementChild;
// first.classList.add('active');

function displayMain(json){
    
    console.log('in fuction')
    console.log(json)
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

        innerCarousel.appendChild(carouselItem);
        carouselItem.appendChild(dateCaption);
        carouselItem.appendChild(carouselImg);
        carouselItem.appendChild(caption);
    });
}