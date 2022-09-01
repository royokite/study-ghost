document.addEventListener('DOMContentLoaded', runProject());

function renderProducts(movie) {
    const movieSpace = document.querySelector('#products')

      
    let card = document.createElement('li');
    card.className = 'card'
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
        <button class='box9 button'>${notLiked}</button><p class='likes'>50<span> Likes</span></p>
        <button class='box11 button'>Rent</button>  
    </section>
    `

    movieSpace.appendChild(card);
}

const liked = '❤️';
const notLiked = '🖤';
let addMovie = false;

function runProject() {
    const url = 'https://ghibliapi.herokuapp.com/films';    

    fetch(url)
    .then(response => response.json())
    .then(allProducts => {
        allProducts.forEach(movie => renderProducts(movie));

        const likeButtons = document.querySelectorAll('.box9');
        // const CommentButton = document.querySelector('.box10');
        const rentButtons = document.querySelectorAll('.box11');
        const toggleGreenBanner = document.querySelector('.alert-green')
        const toggleRedBanner = document.querySelector('.alert-red')
        const toggleBlueBanner = document.querySelector('.alert-blue')
        
        likeButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                if (btn.textContent===notLiked) {
                    btn.textContent = liked
                    toggleBlueBanner.style.display = 'block'
                    setTimeout(() => toggleBlueBanner.style.display = 'none', 3000);
                    (function upCounter() {
                        let likeCount = parseInt(e.target.parentNode.querySelector('.likes').textContent, 10)
                        likeCount += 1
                        e.target.parentNode.querySelector('.likes').textContent = `${likeCount} Likes`
                    })()
                } else {
                    btn.textContent = notLiked
                    toggleRedBanner.style.display = 'block'
                    setTimeout(() => toggleRedBanner.style.display = 'none', 3000);
                    (function downCounter() {
                        let likeCount = parseInt(e.target.parentNode.querySelector('.likes').textContent, 10)
                        likeCount -= 1
                        e.target.parentNode.querySelector('.likes').textContent = `${likeCount} Likes`
                    })()
                }                
            })
        });

        // CommentButton.addEventListener('click', () => {
        //         alert('Add a comment bud!')
        //     });

        rentButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                toggleGreenBanner.style.display = 'block'
                btn.textContent = '+🛒'
                btn.style.background = '#4CAF50'
                setTimeout(() => toggleGreenBanner.style.display = 'none', 3000)
            })
        })
    })    
    const addMovieBtn = document.getElementById('new-movie-btn');
    const formContainer = document.getElementById('add-item');
    addMovieBtn.addEventListener('click', () => {
        addMovie = !addMovie
        if(addMovie) {
            formContainer.style.display = 'block'
            addMovieBtn.textContent = 'HIDE FORM'
        } else {
            formContainer.style.display = 'none'
            addMovieBtn.textContent = 'SHARE A MOVIE'
        }
    });

    const commentsForm = document.querySelector('#post-comment');
    const movieForm = document.querySelector('#movie-form');
    const postedComments = document.querySelector('#posted-comments');


    const togglePurpleBanner = document.querySelector('.alert-purple');

    commentsForm.addEventListener('submit', e => {
        e.preventDefault()
        const userComment = document.querySelector('.comment-space').value
        const commentBody = document.createElement('article')
        commentBody.className = 'comment-body'
        commentBody.innerHTML = `
            <mark class='tip tip-up'></mark>
            <article class='message'>
                <mark class='comment-text'>${userComment}</mark>
            </article>
        `
        postedComments.appendChild(commentBody)
        commentsForm.reset()        
    })

    movieForm.addEventListener('submit', e => {
        e.preventDefault()
        togglePurpleBanner.style.display = 'block'
        setTimeout(() => togglePurpleBanner.style.display = 'none', 3000)

        movieForm.reset()
    })


}
