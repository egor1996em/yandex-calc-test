
document.addEventListener('DOMContentLoaded', function () {
    alert(calc('1 1 1 1 1 1 * + - + *'));
});

function calc(expression) {

    validateExpression(expression);

    var arr = expression.split(' ');

    var currentElementIndex = 0;

    while (currentElementIndex < arr.length) {

        if (arr[currentElementIndex].search(/[-|\+|\*|\/]/) != -1) {
            var firstNum = arr[currentElementIndex - 1];
            var secondNum = arr[currentElementIndex - 2];

            arr.splice(currentElementIndex - 2, 3, String(calculate(firstNum, secondNum, arr[currentElementIndex])));
            currentElementIndex = 0;
        }

        currentElementIndex++;
    }

    return arr[0];
}

function validateExpression(expression) {

    try {
        var hasError = false;

        var countNumbers = expression.match(/[0-9]/g).length;
        var countMathOperators = expression.match(/[-|\+|\*|\/]/g).length;

        if (countMathOperators + 1 != countNumbers) {
            hasError = true;
        }
    } catch (err) {
        hasError = true;
    } finally {
        if (hasError) {
            throw Error('Invalid expression');
        }
    }
}

function calculate(firstNum, secondNum, operator) {

    var result;

    var firstNumber = Number(firstNum);

    var secondNumber = Number(secondNum);

    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        default:
            result = null;
    }

    return result;
}