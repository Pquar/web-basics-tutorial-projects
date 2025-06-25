function calcular() {
	var num1 = document.getElementById("num1").value;
	var num2 = document.getElementById("num2").value;
	var operacao = document.getElementById("operacao").value;
	var resultado = document.getElementById("resultado");

	if (num1 === "" || num2 === "") {
		resultado.innerHTML = "Por favor, digite dois números!";
		return;
	}

	if (operacao === "+") {
		resultado.innerHTML = parseInt(num1) + parseInt(num2);
	} else if (operacao === "-") {
		resultado.innerHTML = num1 - num2;
	} else if (operacao === "/") {
		resultado.innerHTML = num1 / num2;
	} else if (operacao === "*") {
		resultado.innerHTML = num1 * num2;
	} else {
		resultado.innerHTML = "Operação inválida!";
	}
}
