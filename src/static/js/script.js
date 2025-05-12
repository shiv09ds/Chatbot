const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');

// Main function triggered on sending a message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  addMessage('You', message, 'static/images/user.png');
  messageInput.value = '';

  showTypingIndicator();

  try {
    const response = await fetchData(message);
    setTimeout(() => {
      removeTypingIndicator();
      addMessage('Peko', formatMessage(response), 'static/images/bot.png');
    }, 1500);
  } catch (error) {
    removeTypingIndicator();
    addMessage('Peko', "I'm having trouble understanding the message", 'static/images/bot.png');
    console.error('Fetch failed:', error);
  }
}

// Fetch data from server
async function fetchData(userMessage) {
  const res = await fetch(`/getData?mes=${encodeURIComponent(userMessage)}`);
  const data = await res.json();
  return data.cnt;
}

// Add a message to the chat
function addMessage(username, text, avatarUrl) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  messageElement.innerHTML = `
    <img class="avatar" src="${avatarUrl}" alt="${username} Avatar">
    <div>
      <span class="message-username">${username}</span>
      <span class="timestamp"> • ${getCurrentTime()}</span>
      <div class="message-content">${text}</div>
    </div>
  `;
  chatBox.insertBefore(messageElement, chatBox.firstChild);
}

// Show typing animation
function showTypingIndicator() {
  const typingElement = document.createElement('div');
  typingElement.classList.add('message');
  typingElement.id = 'typingIndicator';

  typingElement.innerHTML = `
    <img class="avatar" src="static/images/bot.png" alt="Bot Avatar">
    <div>
      <span class="message-username">Peko</span>
      <span class="timestamp"> • typing...</span>
      <div class="message-content"><em>Peko is typing...</em></div>
    </div>
  `;

  chatBox.insertBefore(typingElement, chatBox.firstChild);
}

// Remove typing animation
function removeTypingIndicator() {
  const typingElement = document.getElementById('typingIndicator');
  if (typingElement) {
    chatBox.removeChild(typingElement);
  }
}

// Get formatted time
function getCurrentTime() {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// Format **bold**, *italic*, and `code`
function formatMessage(message) {
  message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
  message = message.replace(/`(.*?)`/g, '<code>$1</code>');
  return message;
}
