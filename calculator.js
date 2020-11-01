//creates an object to keep track of values 
const calculator = {
    //this displays 0 on the screen
    Display_Value: '0',
    //this will hold the first operand for any expressions, we set it to null
    First_Operand: null,
    //this checks weather or no the second operand has been input
    Wait_Second_Operand: false,
    //this will hold the operator, we set it to null 
    operator: null,
};
//this modifies the values each time a button is clicked 
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = calculator;
    //we are checking to see if wait second operand is ture and set 
    //display value to the key that was clicked 
    if (Wait_Second_Operand === true) {
        calculator.Display_Value = digit;
        calculator.Wait_Second_Operand = false;
    } else {
            //this overrites display value if the current value is 0 
            //other wise it adds to it 
            calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
        }
    }
    //this section hamdles decimal points 
    function Input_Decimal(dot) {
        //this ensures that accidental clicking of the decimal point 
        //dosent cause bugs in your operating 
        if (calculator.Wait_Second_Operand === true) return;
        if (!calculator.Display_Value.includes(dot)) {
            //we are saying that if the display value dose not contain a decimal point
            //we want to add a decimal point 
            calculator.Display_Value += dot;
        }
    }
    //this section handles operators 
    function Handle_Operator(Next_Operator) {
        const { First_Operand, Display_Value, operator } = calculator
        //when an operaor key is pressed we convert the current number
        //displayed on the screen to a number and then store the result in
        //calculator.first.operand if it dosent already exist 
        const Value_of_Input = parseFloat(Display_Value);
        //checks if an operator already exists and if wait second operand is true,
        //then updates the operator and exits from the function
        if (operator && calculator.Wait_Second_Operator) {
            calculator.operator = Next_Operator;
            return;
        }
        if (First_Operand == null) {
            calculator.First_Operand = Value_of_Input;
        } else if (operator) {
            const Value_Now = First_Operand || 0;
            let result = Perform_Calculation[operator](Value_Now, Value_of_Input);
            //here we add a fixed amoount of numbers after the decimal 
            result = Number(result).toFixed(9)
            //this will remove any trailing 0s
            result - (result * 1).toString()
            calculator.Display_Value = parseFloat(result);
            calculator.First_Operand = parseFloat(result);
        }
        calculator.Wait_Second_Operand = true;
        calculator.operator = Next_Operator;
    }
    const Perform_Calculation = {
        '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
        '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
        '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
        '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
        '=': (First_Operand, Second_Operand) => Second_Operand
        
    };
    function calculator_Reset() {
        calculator.Display_Value = '0';
        calculator.First_Operand = null;
        calculator.Wait_Second_Operand = false;
        calculator.operator = null;
    }
    //this function updates the screen with contents of display value 
    function Update_Display() {
        const display = document.querySelector('.calculator-screen');
        display.value = calculator.Display_Value;
    }
    Update_Display();
    //this section monitors button clicks 
    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        //the target variable is an object that represents the element 
        //that was clicked 
        const { target } = event;
        //if the element that was clicked on is not a button, exit the function
        if (!target.matches('button')) {
            return;
        }
        if (target.classList.contains('operator')) {
            Handle_Operator(target.value);
            Update_Display();
            return;
        }
        if (target.classList.contains('decimal')) {
            Input_Decimal(target.value);
            Update_Display();
            return;
        }
        //ensures that AC clears the numbers from the calculator
        if (target.classList.contains('all-clear')) {
            calculator_Reset();
            Update_Display();
            return;
        }
        Input_Digit(target.value);
        Update_Display();
    })
