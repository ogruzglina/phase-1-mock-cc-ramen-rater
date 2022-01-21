// write your code here
let menu = [];

document.addEventListener('DOMContentLoaded', () => {
    getImages();
    addNewMenuItem();
});

function getFetchResponse (url) {
    return fetch(url)
        .then((response) => response.json());
}

function getImages () {
    const url = 'http://localhost:3000/ramens';

    getFetchResponse(url)
        .then(data => {
            menu = data;
            addImgTag (data);
        });
}

function addImgTag (data) {
    const div = document.getElementById('ramen-menu');

    data.forEach (element => {
        const img = document.createElement('img');

        img.src = element.image;
        img.alt = element.name;
        img.id = element.id;
        img.addEventListener('click', showImageDetails);

        div.appendChild(img);
    });
}

function showImageDetails (e) {
    const imgId = e.target.id;
    const url = `http://localhost:3000/ramens/${imgId}`;

    const img = document.querySelector('#ramen-detail .detail-image');
    const name = document.querySelector('#ramen-detail .name');
    const restaurant = document.querySelector('#ramen-detail .restaurant');
    const rating = document.getElementById('rating-display');
    const comment = document.getElementById('comment-display');

    getFetchResponse(url)
        .then(data => {
            img.src = data.image;
            name.textContent = data.name;
            restaurant.textContent = data.restaurant;
            rating.textContent = data.rating;
            comment.textContent = data.comment;
        });
}

function addNewMenuItem () {
    const form = document.getElementById('new-ramen');
    const name = document.getElementById('new-name');
    const restaurant = document.querySelector('#new-restaurant');
    const img = document.getElementById('new-image');
    const rating = document.getElementById('new-rating');
    const comment = document.getElementById('new-comment');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newMenuItem = {};
        newMenuItem.name = name.value;
        newMenuItem.restaurant= restaurant.value,
        newMenuItem.img = img.value,
        newMenuItem.rating = rating.value; 
        newMenuItem.comment = comment.value;
        newMenuItem.id = menu.length + 1;
        //also we can check if any of the input are empty show a msg that you need to fill in all fields before create

        clearImages();
        menu.push(newMenuItem);
        // also we need to post this new item to the db.json and then we can click on the page and get details
        form.reset();
        addImgTag (menu);
    });
}

function clearImages () {
    let menuImgs = document.getElementById('ramen-menu');
    //now we nned to delete all images from this div, yeah we can do this in better(right) way
    //menuImgs.innerHTML = "";
//or
    while (menuImgs.firstChild) {
        menuImgs.removeChild(menuImgs.lastChild);
      }
}

