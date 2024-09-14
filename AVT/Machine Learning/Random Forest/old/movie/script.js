// script.js

// Sample movie data (normally you would fetch this from an API or database)
const movies = [
    { title: "Action Movie 1", genre: "action", rating: 8, suitableFor: { age: 18, gender: "male" } },
    { title: "Romantic Comedy", genre: "romance", rating: 7, suitableFor: { age: 25, gender: "female" } },
    { title: "Horror Thriller", genre: "horror", rating: 9, suitableFor: { age: 30, gender: "male" } },
    { title: "Drama Film", genre: "drama", rating: 6, suitableFor: { age: 35, gender: "female" } },
    // Add more movie data as needed
];

// Function to draw the recommendation visualization
function drawRecommender(age, gender, genre, minRating) {
    const canvas = document.getElementById('recommenderCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Filter movies based on user input
    const recommendedMovies = movies.filter(movie =>
        movie.genre === genre &&
        movie.rating >= minRating &&
        movie.suitableFor.age <= age &&
        movie.suitableFor.gender === gender
    );

    // Draw movies on canvas
    recommendedMovies.forEach((movie, index) => {
        drawMovieRecommendation(ctx, 100 + index * 300, 100, movie.title, movie.genre, movie.rating);
    });
}

// Function to draw a single movie recommendation
function drawMovieRecommendation(ctx, x, y, title, genre, rating) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 200, 100);

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Title: ${title}`, x + 10, y + 30);
    ctx.fillText(`Genre: ${genre}`, x + 10, y + 50);
    ctx.fillText(`Rating: ${rating}`, x + 10, y + 70);
}

// Event listener for the visualize button
document.getElementById('visualizeBtn').addEventListener('click', () => {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const genre = document.getElementById('genre').value;
    const rating = parseInt(document.getElementById('rating').value);
    drawRecommender(age, gender, genre, rating);
});

// Initial visualization
drawRecommender(25, 'male', 'action', 5);
