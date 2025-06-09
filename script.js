// Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
    });
});

// Floating Words
const floatWords = ["SOCIAL", "CONNECT", "SHARE", "EVENTS", "PROFILE"];
let currentWordIndex = 0;

function createFloatingWord() {
    const word = document.createElement('div');
    word.className = 'float-word';
    word.textContent = floatWords[currentWordIndex];
    document.body.appendChild(word);
    
    word.style.left = Math.random() * 100 + 'vw';
    word.style.top = Math.random() * 100 + 'vh';
    word.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
    word.style.animationDuration = (8 + Math.random() * 4) + 's';
    
    currentWordIndex = (currentWordIndex + 1) % floatWords.length;
    
    setTimeout(() => word.remove(), 10000);
}

// Shooting Stars
function createShootingStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '2px';
    star.style.height = '10px';
    star.style.background = 'linear-gradient(to right, transparent, var(--star-color), transparent)';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = '110vw';
    star.style.animation = `shoot 1s linear forwards`;
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), 1000);
}

setInterval(createFloatingWord, 3000);
setInterval(createShootingStar, 500);

// Posts
function addPost() {
    const input = document.getElementById('postInput');
    const text = input.value.trim();
    if (!text) return;

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `<p>${text}</p>`;
    document.getElementById('posts').appendChild(post);
    input.value = '';
    localStorage.setItem('posts', JSON.stringify([...(JSON.parse(localStorage.getItem('posts') || '[]')), text]));
}

// Events
function addEvent() {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const desc = document.getElementById('eventDesc').value.trim();
    
    if (!name || !date || !time) return;

    const eventEl = document.createElement('div');
    eventEl.className = 'event';
    eventEl.innerHTML = `
        <h4>${name}</h4>
        <p><strong>Date:</strong> ${date} • <strong>Time:</strong> ${time}</p>
        <p>${desc}</p>
        <button onclick="deleteEvent(this)">Delete</button>
    `;
    document.getElementById('eventList').appendChild(eventEl);
    
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push({ name, date, time, desc });
    localStorage.setItem('events', JSON.stringify(events));
    
    // Reset form
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventDesc').value = '';
}

function deleteEvent(button) {
    button.parentElement.remove();
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    localStorage.setItem('events', JSON.stringify(events.filter(e => 
        !button.parentElement.querySelector('h4').textContent.includes(e.name)
    )));
}

// Profile
function editProfile() {
    const name = prompt("Enter your name:", document.getElementById('profileName').textContent);
    const bio = prompt("Enter your bio:", document.getElementById('profileBio').textContent);
    
    if (name) document.getElementById('profileName').textContent = name;
    if (bio) document.getElementById('profileBio').textContent = bio;
    
    localStorage.setItem('profile', JSON.stringify({ name, bio }));
}

// Load saved data
window.onload = () => {
    // Load posts
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.forEach(text => {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `<p>${text}</p>`;
        document.getElementById('posts').appendChild(post);
    });

    // Load events
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.forEach(e => {
        const eventEl = document.createElement('div');
        eventEl.className = 'event';
        eventEl.innerHTML = `
            <h4>${e.name}</h4>
            <p><strong>Date:</strong> ${e.date} • <strong>Time:</strong> ${e.time}</p>
            <p>${e.desc}</p>
            <button onclick="deleteEvent(this)">Delete</button>
        `;
        document.getElementById('eventList').appendChild(eventEl);
    });

    // Load profile
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    if (profile.name) document.getElementById('profileName').textContent = profile.name;
    if (profile.bio) document.getElementById('profileBio').textContent = profile.bio;
};