document.addEventListener('DOMContentLoaded', runProject());

function renderProducts(movie) {
    const movieSpace = document.querySelector('#products');

      
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <img src='${movie.image}' class='product-image'/>
    <section class='card-content'>
        <article class='box1'><h2>${movie.title}</h2></article>
        <article class='box2'><h3>${movie.original_title}</h3></article>
        <article class='box3'>Director: ${movie.director}</article>
        <article class='box4'>Producer: ${movie.producer}</article>
        <article class='box5'><p>${movie.description}</p></article>
        <article class='box6'>Released: ${movie.release_date}</article>
        <article class='box7'>Run Time: ${movie.running_time}mins</article>
        <article class='box8'>Rating: ${movie.rt_score}</article>
        <button class='box9 button'>${notLiked}</button>
        <button class='box10 button'>Comment</button>
        <button class='box11 button'>Rent</button>  
    </section>
    `;

    movieSpace.appendChild(card);
}

const liked = '❤️';
const notLiked = '🖤';

function runProject() {
    const url = 'https://ghibliapi.herokuapp.com/films';    

    fetch(url)
    .then(response => response.json())
    .then(allProducts => {
        allProducts.forEach(movie => renderProducts(movie));

        const likeButtons = document.querySelectorAll('.box9');
        const CommentButtons = document.querySelectorAll('.box10');
        const rentButtons = document.querySelectorAll('.box11');
        
        likeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.textContent===notLiked) {
                    btn.textContent = liked
                    alert('Add movie to favourites?')
                } else {
                    btn.textContent = notLiked
                    alert('Remove from favourites?')
                }                
            })
        });
        CommentButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                alert('Add a comment bud!')
            })
        });
        rentButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                alert('Rent the ting!')
            })
        })



    })    

}
