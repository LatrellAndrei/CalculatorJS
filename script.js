class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    // Initialize the calculator with empty values.
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;

    }
    
    // Delete the last character in the current operand.
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
        // Append a number or a decimal point to the current operand.

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
     // Set the chosen operation and perform a computation if a previous operand exists.
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
    }
    // Perform the computation based on the chosen operation.

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
             case '*':
                computation = prev * current
                break
             case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }
// Format and display numbers in a user-friendly way.
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
       if(isNaN(integerDigits)){
        integerDisplay = ''
       } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
       }
       if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
       } else {
        return integerDisplay
       }
    }
    // Update the display with the current and previous operands and the operation.

    updateDisplay(){
            this.currentOperandTextElement.innerText = this.getDisplayNumber
                (this.currentOperand)
            if(this.operation != null) {
                 this.previousOperandTextElement.innerText =
                    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            } else {
                this.previousOperandTextElement.innerText = ''
            }
 
    }
}
// Selecting DOM elements and setting up event listeners.

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Creating an instance of the Calculator class.

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Adding event listeners for number buttons.

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
// Adding event listeners for operation buttons.

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
// Adding an event listener for the equals button to perform the computation.

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
// Adding an event listener for the "AC" (all clear) button to clear the calculator.

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
// Adding an event listener for the delete button to remove the last character.

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})