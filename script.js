let url = 'https://jsonplaceholder.typicode.com'
let catalogList = document.querySelector('.catalog-list');
let photosList = document.querySelector('.photos-list');

async function getCatalog() {
    let response = await fetch(`${url}/albums`)

    if (response.ok) {
        return await response.json()
    } else {
        console.error('Error')
    }
}

async function getPhotos(id) {
    let responsePhotos = await fetch(`${url}/photos?albumId=${id}`);

    if (responsePhotos.ok) {
        return await responsePhotos.json();
    } else {
        console.error('Error');
    }
}

function renderCatalog(data) {
    let lis = '';
    for (let el of data) {
        if (!el) {
            return;
        }
        lis += `<li class="item-catalog" data-id="${el.id}">${el.title}</li>`;
    }
    catalogList.innerHTML = lis;
}

function renderPhoto(data) {
    let photo = '';
    for (let el of data) {
        if (!el) {
            return;
        }
        photo += `<img class="item-picture" src="${el.thumbnailUrl}" alt="${el.title}">`;
    }
    photosList.innerHTML = photo;
}

console.log(getCatalog()
    .then((catalogList) => renderCatalog(catalogList)))
getPhotos(1)
    .then((photosList) => renderPhoto(photosList));

catalogList.addEventListener('click', (e) => {
    let id = e.target.dataset.id
    getPhotos(id)
        .then((dataPhoto) => renderPhoto(dataPhoto))
})