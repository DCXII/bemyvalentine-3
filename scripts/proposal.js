let yesButtonSize = 1;

function acceptProposal() {
    window.location.href = "message.html";
}

function moveNoButton(button) {
    const container = document.querySelector('.button-container');
const containerRect = container.getBoundingClientRect();
const buttonRect = button.getBoundingClientRect();

// Calculate max boundaries considering padding and border
const maxLeft = Math.max(0, container.clientWidth - buttonRect.width);
const maxTop = Math.max(0, container.clientHeight - buttonRect.height);

// Generate random positions within the container bounds
const randomLeft = Math.random() * maxLeft;
const randomTop = Math.random() * maxTop;

button.style.position = 'absolute';
button.style.left = randomLeft + 'px';
button.style.top = randomTop + 'px';

    /*button.style.position = 'absolute';
    button.style.top = Math.random() * 80 + 'vh';
    button.style.left = Math.random() * 80 + 'vw';
    button.style.transition = 'top 0.3s ease, left 0.3s ease';
    button.style.transform = 'scale(1.1)';*/

    growYesButton();
}

function growYesButton() {
    yesButtonSize += .1;
    const yesButton = document.querySelector('.yes-button');
    yesButton.style.transform = `scale(${yesButtonSize})`;
}
