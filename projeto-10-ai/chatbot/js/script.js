//const apiKey = '';

const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function appendMessage(content, role) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', role);
  messageDiv.textContent = content;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = userInput.value.trim();
  if (!prompt) return;

  appendMessage(prompt, 'user');
  userInput.value = '';

  appendMessage('Carregando...', 'bot');
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Remove "Carregando..." antes de mostrar a resposta real
    const loadingElem = messagesDiv.querySelector('.message.bot:last-child');
    if (loadingElem && loadingElem.textContent === 'Carregando...') {
      messagesDiv.removeChild(loadingElem);
    }

    appendMessage(botMessage, 'bot');
  } catch (error) {
    console.error('Erro:', error);
    const errorElem = messagesDiv.querySelector('.message.bot:last-child');
    if (errorElem && errorElem.textContent === 'Carregando...') {
      errorElem.textContent = 'Ocorreu um erro. Tente novamente.';
    } else {
      appendMessage('Ocorreu um erro. Tente novamente.', 'bot');
    }
  }
});
