const dataset = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
    // Add more items as needed
];

const users = ['User 1', 'User 2', 'User 3'];

let currentRound = dataset;
let roundResults = [];
let currentUserIndex = 0;

window.onload = function() {
    loadUsers();
    loadCards();
}

function loadUsers() {
    const userSelect = document.getElementById('users');
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.innerText = user;
        userSelect.appendChild(option);
    });
}

function loadCards() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    currentRound.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = item.id;

        const title = document.createElement('h2');
        title.innerText = item.name;
        card.appendChild(title);

        const desc = document.createElement('p');
        desc.innerText = item.description;
        card.appendChild(desc);

        cardContainer.appendChild(card);

        // Add swipe functionality
        card.addEventListener('touchstart', handleTouchStart, false);
        card.addEventListener('touchmove', handleTouchMove, false);
        card.addEventListener('touchend', handleTouchEnd, false);
    });
}

let startX;

function handleTouchStart(evt) {
    startX = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    const card = evt.target;
    const touch = evt.touches[0];
    const change = touch.clientX - startX;

    card.style.transform = `translateX(${change}px)`;
    card.style.opacity = 1 - Math.abs(change) / cardContainer.offsetWidth;
}

function handleTouchEnd(evt) {
    const card = evt.target;
    const change = evt.changedTouches[0].clientX - startX;

    if (change < -100) {
        // Swipe left: remove
        card.style.transform = 'translateX(-100%)';
        card.style.opacity = 0;
        removeCard(card.dataset.id);
    } else if (change > 100) {
        // Swipe right: retain
        card.style.transform = 'translateX(100%)';
        card.style.opacity = 0;
        retainCard(card.dataset.id);
    } else {
        // Reset
        card.style.transform = 'translateX(0)';
        card.style.opacity = 1;
    }
}

function buttonRemove() {
    const card = document.querySelector('.card');
    if (card) {
        card.style.transform = 'translateX(-100%)';
        card.style.opacity = 0;
        removeCard(card.dataset.id);
    }
}

function buttonRetain() {
    const card = document.querySelector('.card');
    if (card) {
        card.style.transform = 'translateX(100%)';
        card.style.opacity = 0;
        retainCard(card.dataset.id);
    }
}

function removeCard(id) {
    currentRound = currentRound.filter(item => item.id != id);
    checkRoundCompletion();
}

function retainCard(id) {
    roundResults.push(currentRound.find(item => item.id == id));
    checkRoundCompletion();
}

function checkRoundCompletion() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (currentRound.length == 0) {
        if (roundResults.length > 1) {
            currentRound = roundResults;
            roundResults = [];
            currentUserIndex = (currentUserIndex + 1) % users.length;
            loadCards();
        } else {
            document.getElementById('next-round').style.display = 'block';
        }
    } else {
        loadCards();
    }
}

function startRound() {
    document.getElementById('user-selection').style.display = 'none';
    loadCards();
}

function nextRound() {
    if (roundResults.length == 1) {
        alert('Final selected item: ' + roundResults[0].name);
    } else {
        currentRound = roundResults;
        roundResults = [];
        currentUserIndex = (currentUserIndex + 1) % users.length;
        loadCards();
    }
}
