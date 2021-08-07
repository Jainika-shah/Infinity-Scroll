// Initialization
let photosArray=[];
let pageReady = false;
let imagesLoaded = 0;
let totalImages = 0;

//  unsplash api code
const accessKey = 'XDQmpQBebUXICN9su47TbAWcVz0bNnFxNrxjEm67TaY';
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&orientation=landscape&count=${count}`;

// html elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


function mySetAttribute(element, attributes){   // - helper functions
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
     
    }
}


function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        pageReady = true;
        loader.hidden = true;
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((element) => {
        
        console.log('display next 30 images');
        const item = document.createElement('a');
        mySetAttribute(item, {
            href : element.links.html,
            target : '_blank'
        });
        const img = document.createElement('img');
        mySetAttribute(img, {
            src : element.urls.regular,
            alt : element.alt_description,
            title : element.alt_description
        });
        
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

    });

}



async function getPhotos(){
    try{
        const apiResponse = await fetch(apiUrl);
        photosArray = await apiResponse.json();
        displayPhotos();
       
    }catch(err){
        alert('Error: '+err);
    }
}

window.addEventListener('scroll',() =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && pageReady){
        pageReady = false;
        getPhotos();
    }
});

getPhotos();






