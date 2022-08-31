document.addEventListener('DOMContentLoaded', runProject());

function renderProducts(movie) {
    const movieSpace = document.querySelector('#products');
    
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <img src='${movie.image}' class='product-image'/>
    <section class='card-content'>
    <article class='box1'><h3>${movie.title}</h3></article>
    <article class='box2'><h3>${movie.original_title}</h3></article>
    <article class='box3'>${movie.director}</article>
    <article class='box4'>${movie.producer}</article>
    <article class='box5'><p>${movie.description}</p></article>
    <article class='box6'>${movie.release_date}</article>
    <article class='box7'>${movie.running_time}</article>
    <article class='box8'>${movie.rt_score}</article>
    <button class='box9'>Favourites</button>
    <button class='box10'>Comment</button>
    <button class='box11'>Rent</button>     
    </section>
    `;

    movieSpace.appendChild(card);
}

function runProject() {
    const url = 'https://ghibliapi.herokuapp.com/films';    

    fetch(url)
    .then(response => response.json())
    .then(allProducts => {
        allProducts.forEach(movie => renderProducts(movie));
    })
}
