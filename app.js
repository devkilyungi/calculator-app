const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationTextElement = document.querySelector('[data-current-operation]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement, operationTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.operationTextElement = operationTextElement;
    this.clear();
  }

  clear(){
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete(){
    this.currentOperand = this.currentOperand.slice(0,-1);
  }

  appendNumber(number){
    this.currentOperand += number;
    this.updateDisplay();
  }

  handleOperationDisplay(operation){ 
    this.operation = operation;

    if(this.prevOperand !== "") { //if it has a number then calculate
      this.calculate();
      this.prevOperand = this.currentOperand;
      this.currentOperand = "";
      this.updateDisplay();
    } else { //else handle previous operand display
      this.prevOperand = this.currentOperand;
      this.currentOperand = "";
      this.updateDisplay();
    }
  }

  calculate(){
    let operationResult;
    switch(this.operation){
      case '+':
        operationResult = parseFloat(this.prevOperand) + parseFloat(this.currentOperand);
        break;
      case '-':
        operationResult = parseFloat(this.prevOperand) - parseFloat(this.currentOperand);
        break;
      case 'x':
        operationResult = parseFloat(this.prevOperand) * parseFloat(this.currentOperand);
        break;
      case '÷':
        operationResult = parseFloat(this.prevOperand) / parseFloat(this.currentOperand);
        break;
      default:
        this.error();
  }
    this.currentOperand = operationResult.toString();
    this.prevOperand = "";
  }

  error(){
    this.currentOperand = "Error";
    this.prevOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }


  updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.prevOperand;
    this.operationTextElement = this.operation;
  }
}

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement,operationTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.handleOperationDisplay(button.innerText);
  })
})

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})