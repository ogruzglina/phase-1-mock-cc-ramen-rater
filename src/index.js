document.addEventListener('DOMContentLoaded', () => {
    getFetchResponse('http://localhost:3000/ramens')
        .then(data => {
            addImgToTheTop(data);
            addNewItemToMenu(data);
        });
});

function getFetchResponse(url) {
    return fetch(url).then(response => response.json())
}

function addImgToTheTop(ramens) {
    const div = document.getElementById('ramen-menu'); 

    ramens.forEach(ramen => {
        console.log(createImgTag(ramen));
        div.appendChild(createImgTag(ramen));
    });
}

function createImgTag(ramen) {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.id = ramen.id;
    img.addEventListener('click', e => showImgDetails(e));
    return img;
}

function showImgDetails(image) {
    const detailImgId = image.target.id;
    console.log(detailImgId);
    getFetchResponse(`http://localhost:3000/ramens/${detailImgId}`)
        .then(data => {
            fillOutDetails(data);
        });
}

function fillOutDetails(imgInfo) {
    const img = document.querySelector('#ramen-detail .detail-image');
    const name = document.querySelector('#ramen-detail .name');
    const restaurant = document.querySelector('#ramen-detail .restaurant');
    const rating = document.getElementById('rating-display');
    const comment = document.getElementById('comment-display');

    img.src = imgInfo.image;
    name.textContent = imgInfo.name;
    restaurant.textContent = imgInfo.restaurant;
    rating.textContent = imgInfo.rating;
    comment.textContent = imgInfo.comment;
}

function addNewItemToMenu(data) {
    const form = document.querySelector('#new-ramen');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newRamenObj = {};
        newRamenObj.name = e.target.name.value; //look what tag do you need from target put the name attribute of that field and then value
        newRamenObj.img = e.target.image.value;
        newRamenObj.rating = e.target.rating.value;
        newRamenObj.restaurant = e.target.restaurant.value;
        newRamenObj.comment = e.target['new-comment'].value;
        newRamenObj.id = data.length + 1;
        
        const div = document.getElementById('ramen-menu'); 
        div.appendChild(createImgTag(newRamenObj));
        
        form.reset();
    });
}