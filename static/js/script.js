const messagesList = document.querySelector('.messages-list');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const messagesBox = document.querySelector('.messages-box');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message.length === 0) {
      return;
    }
    // Add user message to the UI
    const userMessageItem = document.createElement('li');
    userMessageItem.classList.add('message', 'sent');
    userMessageItem.innerHTML = `
      <div class='message-text'>
        <div class='message-sender'><b>You</b></div>
        <div class='message-content'>${message}</div>
      </div>`;
    messagesList.appendChild(userMessageItem);
    messageInput.value = '';  // Clear the input

    // Scroll to the bottom of the chat box
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Send the message via Fetch to the backend
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'message': message
      })
    })
    .then(response => response.json())
    .then(data => {
      const botResponse = data.response;

      // Add bot response to the UI
      const botMessageItem = document.createElement('li');
      botMessageItem.classList.add('message', 'received');
      botMessageItem.innerHTML = `
        <div class='message-text'>
          <div class='message-sender'><b>AI Chatbot</b></div>
          <div class='message-content'>${botResponse}</div>
        </div>`;
      messagesList.appendChild(botMessageItem);

      // Scroll to the bottom of the chat box
      messagesBox.scrollTop = messagesBox.scrollHeight;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });