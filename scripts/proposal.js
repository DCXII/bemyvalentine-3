let yesButtonSize = 1;

function acceptProposal() {
    window.location.href = "message.html";
}

function moveNoButton(button) {
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxLeft = containerRect.width - buttonRect.width;
    const maxTop = containerRect.height - buttonRect.height;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    button.style.position = 'absolute';
    button.style.left = randomLeft + 'px';
    button.style.top = randomTop + 'px';

    growYesButton();
}

function growYesButton() {
    yesButtonSize += 1;
    const yesButton = document.querySelector('.yes-button');
    yesButton.style.transform = `scale(${yesButtonSize})`;
}
