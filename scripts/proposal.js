function acceptProposal() {
    window.location.href = "message.html";
}

function moveNoButton(button) {
    button.style.position = 'absolute';
    button.style.top = Math.random() * 80 + 'vh';
    button.style.left = Math.random() * 80 + 'vw';
    button.style.transition = 'top 0.3s ease, left 0.3s ease';
    button.style.transform = 'scale(1.1)';
}
