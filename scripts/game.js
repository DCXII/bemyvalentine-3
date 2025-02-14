const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
let basket = { x: canvas.width / 2 - 50, y: canvas.height - 100, width: 100, height: 50 };
let meterValue = 0;
let isMeterFull = false;

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

function drawBasket() {
    const img = new Image();
    img.src = './assets/images/basket.png';
    ctx.drawImage(img, basket.x, basket.y, basket.width, basket.height);
}

function startGame() {
    const instructionsPopup = document.getElementById('instructionsPopup');
    instructionsPopup.classList.add('hidden');
    document.getElementById('bg-music').play();
    runGame();
}

function runGame() {
    setInterval(updateGame, 20);
}

/*function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
        hearts.push(new Heart());
    }

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();

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

        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
            meterValue -= 20;
            if (meterValue < 0) meterValue = 0;
            document.getElementById('meterFill').style.width = meterValue + '%';
        }
    });

    drawBasket();

    if (meterValue >= 100 && !isMeterFull) {
        isMeterFull = true;
        fadeToWhite();
    }
}

*/
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
        hearts.push(new Heart());
    }

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();

        if (
            heart.x < basket.x + basket.width &&
            heart.x + heart.width > basket.x &&
            heart.y < basket.y + basket.height &&
            heart.y + heart.height > basket.y
        ) {
            hearts.splice(index, 1);
            meterValue += 10;
            document.getElementById('meterFill').style.width = meterValue + '%';
            
            if (meterValue >= 100) {
                fadeToWhite();
            }
        }

        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
            meterValue -= 20;
            if (meterValue < 0) meterValue = 0;
            document.getElementById('meterFill').style.width = meterValue + '%';
        }
    });

    drawBasket();
}

function fadeToWhite() {
    const fadeOverlay = document.createElement('div');
    fadeOverlay.classList.add('fade-overlay');
    document.body.appendChild(fadeOverlay);

    setTimeout(() => {
        showGifWithHurray();
    }, 1000);
}

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

canvas.addEventListener('mousemove', (e) => {
    basket.x = e.clientX - basket.width / 2;
});

canvas.addEventListener('touchmove', (e) => {
    basket.x = e.touches[0].clientX - basket.width / 2;
});
