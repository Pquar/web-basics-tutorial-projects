    // Função para fazer uma requisição à API e exibir os dados na página
    function getQuote() {
      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
          document.getElementById('quote').textContent = data.content;
          document.getElementById('author').textContent = "- " + data.author;
        })
        .catch(error => {
          console.log('Ocorreu um erro:', error);
        });
    }

    // Chama a função getQuote() assim que a página carrega
    window.onload = getQuote;