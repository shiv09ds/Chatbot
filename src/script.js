const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');

function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  addMessage('You', message, 'images/user.png');
  messageInput.value = '';

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    addMessage('Peko', 'ok', 'images/bot.png');
  }, 1500); // Delay before bot replies
}

function addMessage(username, text, avatarUrl) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  messageElement.innerHTML = `
    <img class="avatar" src="${avatarUrl}" alt="${username} Avatar">
    <div>
      <span class="message-username">${username}</span>
      <span class="timestamp"> • ${getCurrentTime()}</span>
      <div class="message-content">${formatMessage(text)}</div>
    </div>
  `;

  chatBox.insertBefore(messageElement, chatBox.firstChild);
}

function showTypingIndicator() {
  const typingElement = document.createElement('div');
  typingElement.classList.add('message');
  typingElement.id = 'typingIndicator';

  typingElement.innerHTML = `
    <img class="avatar" src="images/bot.png" alt="Bot Avatar">
    <div>
      <span class="message-username">Peko</span>
      <span class="timestamp"> • typing...</span>
      <div class="message-content"><em>Peko is typing...</em></div>
    </div>
  `;

  chatBox.insertBefore(typingElement, chatBox.firstChild);
}

function removeTypingIndicator() {
  const typingElement = document.getElementById('typingIndicator');
  if (typingElement) {
    chatBox.removeChild(typingElement);
  }
}

function getCurrentTime() {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function formatMessage(message) {
  message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
  message = message.replace(/`(.*?)`/g, '<code>$1</code>');
  return message;
}