// Função para fazer uma requisição à API e exibir a piada na página
function getJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("joke").textContent = data.value;
    })
    .catch((error) => {
      console.log("Ocorreu um erro:", error);
    });
}
