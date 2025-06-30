let apiKey = localStorage.getItem('gemini-api-key') || "";

const messagesDiv = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const apiKeyInput = document.getElementById("api-key-input");
const saveApiKeyBtn = document.getElementById("save-api-key");
const apiKeySection = document.getElementById("api-key-section");

// Verifica se já tem uma API key salva
if (apiKey) {
  enableChat();
  apiKeySection.style.display = 'none';
} else {
  disableChat();
}

function enableChat() {
  userInput.disabled = false;
  chatForm.querySelector('button[type="submit"]').disabled = false;
  userInput.placeholder = "Digite sua mensagem...";
}

function disableChat() {
  userInput.disabled = true;
  chatForm.querySelector('button[type="submit"]').disabled = true;
  userInput.placeholder = "Configure sua chave da API primeiro...";
}

saveApiKeyBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    alert("Por favor, insira uma chave da API válida.");
    return;
  }
  
  apiKey = key;
  localStorage.setItem('gemini-api-key', apiKey);
  apiKeySection.style.display = 'none';
  enableChat();
  appendMessage("Chave da API configurada com sucesso! Você pode começar a conversar.", "bot");
});

apiKeyInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    saveApiKeyBtn.click();
  }
});

// Adicionar botão para reconfigurar API key
function showApiKeySection() {
  apiKeySection.style.display = 'flex';
  apiKeyInput.value = '';
  disableChat();
}

// Adicionar um botão pequeno para reconfigurar (opcional)
const reconfigBtn = document.createElement('button');
reconfigBtn.textContent = '⚙️ API';
reconfigBtn.className = 'config-btn';
reconfigBtn.onclick = showApiKeySection;
document.body.appendChild(reconfigBtn);

function appendMessage(content, role) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);
  messageDiv.textContent = content;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = userInput.value.trim();
  if (!prompt) return;
  
  if (!apiKey) {
    alert("Por favor, configure sua chave da API primeiro.");
    showApiKeySection();
    return;
  }

  appendMessage(prompt, "user");
  userInput.value = "";

  appendMessage("Carregando...", "bot");
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro na API');
    }
    
    const botMessage = data.candidates[0].content.parts[0].text;

    // Remove "Carregando..." antes de mostrar a resposta real
    const loadingElem = messagesDiv.querySelector(".message.bot:last-child");
    if (loadingElem && loadingElem.textContent === "Carregando...") {
      messagesDiv.removeChild(loadingElem);
    }

    appendMessage(botMessage, "bot");
  } catch (error) {
    console.error("Erro:", error);
    const errorElem = messagesDiv.querySelector(".message.bot:last-child");
    if (errorElem && errorElem.textContent === "Carregando...") {
      errorElem.textContent = "Ocorreu um erro. Tente novamente.";
    } else {
      appendMessage("Ocorreu um erro. Tente novamente.", "bot");
    }
  }
});
