# O Tags HTML
Exemplo de tags HTML:
## Tema: Documento html
- ```<!DOCTYPE html>```: Indica que este é um documento HTML5.
- ```<html>```: Define o elemento raiz do documento HTML.
- ```<head>```: Contém informações sobre a página, como título, meta-dados e scripts.
- ```<body>```: Contém o conteúdo da página visível para o usuário.
- ```<header>```: Define um cabeçalho para a página.
- ```<title>```: Define o título da página exibido na aba do navegador.
## Tema: Texto
- ```<h1>```: Define um título principal para a página. (h1, h2, h3, h4, h5, h6)
- ```<p>```: Define um parágrafo de texto.
- ```<b>```: Define um texto em negrito.
- ```<i>```: Define um texto em itálico.
- ```<u>```: Define um texto sublinhado.
- ```<strong>```: Define um texto importante.

## Tema: Listas
- ```<ul>```: Define uma lista não-ordenada.
- ```<ol>```: Define uma lista ordenada.
- ```<li>```: Define um item da lista.
- ```<dl>```: Define uma lista de definições.
- ```<dt>```: Define um termo da lista de definições.
- ```<dd>```: Define uma definição do termo da lista de definições.
## Tema: Tabelas
- ```<table>```: Define uma tabela.
- ```<tr>```: Define uma linha da tabela.
- ```<th>```: Define uma célula de cabeçalho da tabela.
- ```<td>```: Define uma célula da tabela.
- ```<caption>```: Define o titulo da tabela; Para o titulo aparecer em baixo da tabela ``style="caption-side:bottom" ``
> obs: celulas da tabela podem ocupa mais de um espaço exemplo: 

```html
<th rowspan="3"; colspan="2"; bgcolor="white"></th>
<!-- neste caso falamos que tem 3 linha 2 colunas e a cor de fundo e branca -->
```

## Tema: Links
- ```<a>```: Define um link.
    - ```<a href>```: Define o destino do link.

## Tema: Organização do conteúdo da página
- ```<section>```: Define uma seção da página.
- ```<main>```: Define o conteúdo principal da página.
- ```<footer>```: Define um rodapé para a página. 
- ```<div>```: Define uma divisão ou seção da página.
- ```<span>```: Define um conteúdo em linha.
- ```<br>```: Define uma quebra de linha.
- ```<hr>```: Define uma linha horizontal.
## Tema: Imagens
- ```<img>```: Define uma imagem.
    - ``` <img src=""> ```: Define o caminho da imagem.
    - ```<img alt="">```: Define uma descrição alternativa para a imagem (usada por leitores de tela).
    - ```<img width="">```: Define a largura da imagem.
    - ```<img height="">```: Define a altura da imagem.

- ```<figure="">```: Define uma figura.

    - ```<img="">```: Define a imagem.
    - ```<figcaption="">```: Define uma legenda para a figura.
- ```<picture>```: Permite definir múltiplas fontes para uma imagem, dependendo das condições de exibição.
    - ```<source="">```: Define uma fonte alternativa para a imagem, dependendo das condições de exibição.
- ```<map>```: Define uma imagem com áreas clicáveis.

    - ```<map area="">```: Define uma área clicável.
- ```<svg>```: Define uma imagem vetorial.

    - ```<path="">```: Define um caminho vetorial.
## Tema: Vídeos

- ```<video>```: Define um elemento de vídeo.

    - ```<source>```: Define uma fonte de vídeo alternativa.
    - ```<track>```: Define legendas, descrições de áudio ou outros dados associados ao vídeo.
- ```<audio>```: Define um elemento de áudio.

    - ```<source>```: Define uma fonte de áudio alternativa.
    - ```<track>```: Define legendas, descrições de áudio ou outros dados associados ao áudio.

## Tema: Formulários
- ```<form>```: Define um formulário.
- ```<input>```: Define um campo de entrada.
    - ```<input type="">```: Define o tipo de campo de entrada (texto, senha, email, etc.).
    - ```<input name="">```: Define um nome para o campo de entrada.
    - ```<input value="">```: Define um valor padrão para o campo de entrada.
    - ```<input placeholder="">```: Define um texto de exemplo para o campo de entrada.
    - ```<input required="">```: Define que o campo de entrada é obrigatório.
    - ```<input disabled="">```: Define que o campo de entrada está desabilitado.

- ```<textarea>```: Define uma área de texto.
- ```<button>```: Define um botão.
- ```<select>```: Define uma lista de opções.
- ```<option>```: Define uma opção na lista de opções.
- ```<label>```: Define uma etiqueta para um campo de entrada.
- ```<fieldset>```: Agrupa campos de entrada relacionados.
- ```<legend>```: Define uma legenda para o agrupamento de campos.
## Tema: Outros

- ```<iframe>```: Define uma área que exibe um documento incorporado.
    - ```<iframe src="">```: Define a fonte do documento incorporado.
    - ```<iframe width="">```: Define a largura da área de exibição.
    - ```<iframe height="">```: Define a altura da área de exibição.
- ```<canvas>```: Define uma área de desenho para gráficos em JavaScript.
- ```<script>```: Define um script em JavaScript para ser executado no navegador.
- ```<style>```: Define um bloco de estilos CSS para ser aplicado na página.
- ```<meta>```: Define meta-informações sobre a página, como autor, descrição e palavras-chave.
- ```<!-- seu_texto_123 -->```: Deixa comentários que são usados para descrever o propósito de cada elemento ou para deixar notas para outros desenvolvedores.
