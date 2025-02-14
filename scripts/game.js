// Game Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
let basket = { x: canvas.width / 2 - 50, y: canvas.height - 100, width: 100, height: 50 };
let meterValue = 0;

// Heart Class for Falling Hearts
class Heart {
    constructor() {
        this.x = Math.random() * (canvas.width - 50);
        this.y = -50;
        this.width = 50;
        this.height = 50;
        this.speed = 2 + Math.random() * 3;
    }

    draw() {
        const img = new Image();
        img.src = './assets/images/heart.png';
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}

// Draw Basket Function
function drawBasket() {
    const img = new Image();
    img.src = './assets/images/basket.png';
    ctx.drawImage(img, basket.x, basket.y, basket.width, basket.height);
}

// Start Game Function
function startGame() {
    const instructionsPopup = document.getElementById('instructionsPopup');
    instructionsPopup.classList.add('hidden');
    document.getElementById('bg-music').play();
    runGame();
}

// Game Loop Function
function runGame() {
    setInterval(updateGame, 20);
}

// Update Game Function
   let isMeterFull = false;

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create Falling Hearts
    if (Math.random() < 0.02) {
        hearts.push(new Heart());
    }

    // Update Hearts and Check for Collision
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();

        // Check for Collision with Basket
        if (
            heart.x < basket.x + basket.width &&
            heart.x + heart.width > basket.x &&
            heart.y < basket.y + basket.height &&
            heart.y + heart.height > basket.y
        ) {
            hearts.splice(index, 1);
            meterValue += 10;
            document.getElementById('meterFill').style.width = meterValue + '%';
        }

        // Check if Heart is Missed
        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
            meterValue -= 20;
            if (meterValue < 0) meterValue = 0;
            document.getElementById('meterFill').style.width = meterValue + '%';
        }
    });

    // Draw Basket
    drawBasket();

    // Check if Meter is Full and Trigger Fade
    if (meterValue >= 100 && !isMeterFull) {
        isMeterFull = true;
        fadeToWhite();
    }
}

// Fade to White Function
function fadeToWhite() {
    const fadeOverlay = document.createElement('div');
    fadeOverlay.classList.add('fade-overlay');
    document.body.appendChild(fadeOverlay);

    setTimeout(() => {
        showGifWithHurray();
    }, 1000);
}

// Show GIF with Hurray! Function
function showGifWithHurray() {
    const gifContainer = document.createElement('div');
    gifContainer.classList.add('gif-container');

    const hurrayText = document.createElement('h1');
    hurrayText.textContent = "Hurray!";
    hurrayText.classList.add('hurray-text');

    const gif = document.createElement('img');
    gif.src = './assets/images/gi.webp';
    gif.classList.add('celebration-gif');
    
    gifContainer.appendChild(hurrayText);
    gifContainer.appendChild(gif);
    document.body.appendChild(gifContainer);

    setTimeout(() => {
        window.location.href = "proposal.html";
    }, 4000);
}

// Mouse and Touch Event Listeners for Basket Movement
canvas.addEventListener('mousemove', (e) => {
    basket.x = e.clientX - basket.width / 2;
});

canvas.addEventListener('touchmove', (e) => {
    basket.x = e.touches[0].clientX - basket.width / 2;
});

// Start Game on Load
window.onload = () => {
    document.getElementById('bg-music').pause();
};
