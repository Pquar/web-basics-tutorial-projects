let input = document.getElementById('input');

function addToInput(value) {
	input.value += value;
}

function clearInput() {
	input.value = '';
}

function calculate() {
	let result = eval(input.value);
	input.value = result;
}

/* Solução sem usar eval()
function calculate() {
	let inputString = input.value;
	let numbers = inputString.split(/\+|\-|\*|\//g);
	let operators = inputString.replace(/[0-9]|\./g, "").split("");
	let multiply = operators.indexOf("*");
	while (multiply != -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf("*");
	}
	let divide = operators.indexOf("/");
	while (divide != -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
		operators.splice(divide, 1);
		divide = operators.indexOf("/");
	}
	let add = operators.indexOf("+");
	while (add != -1) {
		numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
		operators.splice(add, 1);
		add = operators.indexOf("+");
	}
	let subtract = operators.indexOf("-");
	while (subtract != -1) {
		numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
		operators.splice(subtract, 1);
		subtract = operators.indexOf("-");
	}
	input.value = numbers[0];
} */