const apocURL = `https://api.nasa.gov/planetary/apod?api_key=r2jRbdbVKRy6mnkRnkRP8YgBfg1DKYgZq9n5vIoz&count=1`;
const imgContainer = document.querySelector('.image-container');
const jumboAPOD = document.querySelector('.jumboAPOD-content');

fetchApod();

function fetchApod(){
    fetch(apocURL)
    .then(result => {
        return result.json();
    })
    .then(json =>{
        console.log(json);
        displayApod(json);
    });
}

function displayApod(json){
    let imgURLHD = json[0].hdurl;
    console.log(imgURLHD);
    let imgURL = json[0].url;
    console.log(imgURL);

    let apodImg = document.createElement('img');
    apodImg.classList.add('img-fluid');
    apodImg.src = imgURLHD;
    apodImg.alt = imgURL;

    let title = document.createElement('h3');
    title.textContent = json[0].title;

    let explanation = document.createElement('p');
    explanation.textContent = json[0].explanation;

    let dateAPOD = document.createElement('p');
    dateAPOD.textContent = json[0].date;

    let copyrightAPOD = document.createElement('p');
    copyrightAPOD.textContent = json[0].copyright;

    let mediaType = json[0].media_type;
    console.log(mediaType);
    if(mediaType == 'video'){
        let iframe = document.createElement('iframe');
        iframe.src = json[0].url;
        imgContainer.appendChild(iframe);
        jumboAPOD.appendChild(title);
        jumboAPOD.appendChild(explanation);
        jumboAPOD.appendChild(dateAPOD);
        jumboAPOD.appendChild(copyrightAPOD);
    } else {
        imgContainer.appendChild(apodImg);
        jumboAPOD.appendChild(title);
        jumboAPOD.appendChild(explanation);
        jumboAPOD.appendChild(dateAPOD);
        jumboAPOD.appendChild(copyrightAPOD);
    }
}