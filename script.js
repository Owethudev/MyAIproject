// Store reviews in local storage (key: "broker_reviews")
function addReview() {
    const broker = document.getElementById('brokerName').value.trim();
    const rating = document.getElementById('ratingInput').value.trim();
    const review = document.getElementById('reviewInput').value.trim();

    // Validate inputs
    if (!broker || !rating || !review) {
        alert("Please fill all fields");
        return;
    }

    // Create review object
    const newReview = {
        broker,
        rating: parseInt(rating),
        review,
        timestamp: new Date().toISOString()
    };

    // Save to local storage
    let reviews = JSON.parse(localStorage.getItem('broker_reviews') || '[]');
    reviews.unshift(newReview);
    localStorage.setItem('broker_reviews', JSON.stringify(reviews));

    // Clear form
    document.getElementById('brokerName').value = '';
    document.getElementById('ratingInput').value = '';
    document.getElementById('reviewInput').value = '';

    // Switch to reviews page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('reviews').classList.add('active');

    // Render updated reviews
    renderReviews();
}

// Display reviews from local storage
function renderReviews() {
    const reviewsContainer = document.getElementById('reviewList');
    const reviews = JSON.parse(localStorage.getItem('broker_reviews') || '[]');

    // Format reviews for display
    reviewsContainer.innerHTML = reviews.map(r => `
        <div class="review-card">
            <h3>${r.broker}</h3>
            <p>Rating: ${r.rating}/5</p>
            <p>${r.review}</p>
            <small>${new Date(r.timestamp).toLocaleString()}</small>
        </div>
    `).join('');
}

// Navigation handler
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
    });
});

// Load reviews on page load
document.addEventListener('DOMContentLoaded', renderReviews);