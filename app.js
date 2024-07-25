document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const loginError = document.getElementById('login-error');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messages = document.getElementById('messages');

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value;
        if (username) {
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loginContainer.style.display = 'none';
                    chatContainer.style.display = 'block';
                } else {
                    loginError.textContent = data.message;
                }
            });
        }
    });

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message) {
            socket.send(message);
            messageInput.value = '';
        }
    });

    socket.on('message', msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg;
        messages.appendChild(messageElement);
    });
});
