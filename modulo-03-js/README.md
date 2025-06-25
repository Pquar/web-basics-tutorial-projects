# Aprendendo JS

## Tabela verdade
| P     | Q     | P && Q | P \|\| Q | !P    |
|-------|-------|---------|----------|-------|
| True  | True  | True    | True     | False |
| True  | False | False   | True     | False |
| False | True  | False   | True     | True  |
| False | False | False   | False    | True  |

Legenda:

P: Valor da primeira expressão lógica <br>
Q: Valor da segunda expressão lógica<br>
P && Q: Resultado da operação lógica AND (E)<br>
P || Q: Resultado da operação lógica OR (OU)<br>
!P: Resultado da operação lógica NOT (NÃO)

## Funções em JavaScript

Em JavaScript, uma função é um bloco de código nomeado que pode ser definido e chamado para executar uma tarefa específica. As funções podem receber parâmetros como entrada, executar um conjunto de instruções e retornar um valor como saída.

### Definindo uma Função

A sintaxe para definir uma função em JavaScript é a seguinte:

```javascript
function nomeDaFuncao(parametro1, parametro2) {
  // Código a ser executado
  return resultado; // Opcional
}
```
`nomeDaFuncao`: É o nome que você escolhe para a função. <br>
`parametro1,parametro2`: São os parâmetros de entrada que você pode passar para a função. Eles são opcionais e você pode ter quantos parâmetros desejar.<br>

`Código a ser executado`: É o bloco de código que a função irá executar quando for chamada.<br>
`return resultado`: É opcional e é usado para retornar um valor da função.
# Chamando uma Função
Depois de definir uma função, você pode chamá-la (ou invocá-la) para executar o código dentro dela. A sintaxe para chamar uma função é a seguinte:

```javascript
nomeDaFuncao(argumento1, argumento2);
```

`nomeDaFuncao`: É o nome da função que você definiu.<br>
`argumento1,argumento2`: São os valores que você passa para a função como entrada. Eles são correspondentes aos parâmetros definidos na função.<br>
## Exemplo de Função
Exemplo simples de uma função que recebe dois números como parâmetros e retorna sua soma:

```javascript
function somar(a, b) {
  return a + b;
}
```

Para chamar essa função e exibir o resultado em um campo de texto, você pode usar o seguinte código em JavaScript:

```javascript
// Capturar o elemento de entrada de texto e o botão
var input1 = document.getElementById("numero1");
var input2 = document.getElementById("numero2");
var btn = document.getElementById("calcular");

// Adicionar um ouvinte de evento de clique ao botão
btn.addEventListener("click", function() {
  // Obter os valores dos campos de entrada de texto
  var num1 = parseInt(input1.value);
  var num2 = parseInt(input2.value);

  // Chamar a função somar e exibir o resultado no campo de texto de saída
  var resultado = somar(num1, num2);
  document.getElementById("resultado").value = resultado;
});
```
Neste exemplo, assumimos que você tem dois campos de entrada de texto com os IDs `numero1` e `numero2`, um botão com o ID `calcular` e um campo de saída de texto com o ID `resultado`. A função somar é chamada quando o botão é clicado, obtendo os valores dos campos de entrada de texto, chamando a função somar e exibindo o resultado no campo de saída de texto.

## Funções Anônimas
Em JavaScript, você pode definir uma função sem nome. Essas funções são chamadas de funções anônimas. Você pode atribuir uma função anônima a uma variável ou passá-la como um argumento para outra função.

### Atribuindo uma Função Anônima a uma Variável
A sintaxe para atribuir uma função anônima a uma variável é a seguinte:

```javascript
var nomeDaVariavel = function(parametro1, parametro2) {
  // Código a ser executado
  return resultado; // Opcional
}
```
`nomeDaVariavel`: É o nome que você escolhe para a variável.<br>
`parametro1,parametro2`: São os parâmetros de entrada que você pode passar para a função. Eles são opcionais e você pode ter quantos parâmetros desejar.<br>
`Código a ser executado`: É o bloco de código que a função irá executar quando for chamada.<br>
`return resultado`: É opcional e é usado para retornar um valor da função.

## API com javascript

Uma api funciona como um intermediário entre dois programas, permitindo que eles se comuniquem de forma padronizada. Por exemplo, quando você usa um aplicativo de mensagens, ele se comunica com a API do servidor de mensagens, que por sua vez se comunica com o servidor de mensagens do destinatário. A API do servidor de mensagens é o intermediário entre os dois aplicativos de mensagens.

