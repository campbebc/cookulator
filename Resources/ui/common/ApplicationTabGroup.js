/* Author: Benjamin Campbell
* 
* Description: This is a calculator app that has
* the most basic
* operations: addition, subtraction,
* multiplication and division. 
* 
* Devices: iPhone and Android (only)
* 
* Buttons:
* Clear - clears the textbox and resets all variables
* Divide - indicates the division operation
* Multiply - indicates the multiplication operation
* Minus - indicates the subtraction operation
* Plus - indicates the addition operation
* 
* Numbers from 0-9 - enables the user to type a number
* Decimal - enables the user to add a decimal point
* 
* Equals - indicates to do the operation of the previously
* chosen operation.
* 
*/

function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var win1 = new Window(L('Calculator')),
		win2 = new Window(L('Conversion'));
		win3 = new Window(L('Notes'));

if(isAndroid){	
	var tab1 = Ti.UI.createTab({
		title: L('Calculator'),
		icon: '/images/androidcalculator.png',
		window: win1,
		layout:'vertical'
	});
}
else{
	var tab1 = Ti.UI.createTab({
		title: L('Calculator'),
		icon: '/images/calculator.png',
		window: win1,
		layout: 'vertical'
	});
}	

var view1 = Ti.UI.createView({
    width:'100%',
    height:'100%',
    backgroundColor: '#FFFFFF',
});

win1.add(view1);

/*** Global variables. ***/
/* Indicates that the user wants to type a whole new nuumber
  and eliminates the concatenation of the most recently
  pressed number button. Initialized to true when the app
  launches so that the first number button pressed does not
  concatenate to the '0' in the textbox. */
var renew = true;
/* Stores the next operation to execute. Initialized to null
  so that the first chosen operation will be stored in 
  memory. */
var nextOperator = '';

/* Indicates that there is already a decimal point. But 
  during the intial launch, there should be no 
  expression so this is initialized to false. */
var decimalPointConcatenated = false;

var isAndroid = false;
if(Titanium.Platform.name == 'android'){
    isAndroid = true;
}

/*** The one and only textfield ***/
/* This textfield displays a response to the user's work.
  As all textfields, it takes in strings. So all numbers
  entered will be concatenations of numbers pressed. 
  When a calculation occurs, its current value gets parsed
  to a float value and converted back to a string. This
  textbox also responds to all the buttons displayed and
  not to its corresponding OS' keyboard. */
 
if(isAndroid){
	var textbox = Titanium.UI.createTextField({
		color: '#FFFFFF',
		backgroundColor: '#000000',
		top: "0%",
		left: "0%",
		width: '100%',
		height: "20%",
		enabled: false, // disables OS keyboard to launch
		textAlign: 'right',
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'},
		value: '0' // Display on initial launches
	});
			
	/*** The Buttons ***/
	/* The Clear button resets everything. This enables the user
	  to indicate that they will start a whole new calculation and
	  disregarding the previous calculation. */
	var clearButton = Titanium.UI.createButton({
		title: 'AC',
		color:'#000000',
		backgroundColor: '#BDC3C7',
		borderColor: '#000000',
		top: "20%",
		left: "25%",
		width: "50%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	var sendButton = Titanium.UI.createButton({
		title: 'SEND',
		color:'#000000',
		backgroundColor: '#BDC3C7',
		borderColor: '#000000',
		top: "20%",
		left: "0%",
		width: "25%",
		height: "16%",
		font:{fontSize:"20%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Seven Button enables the user to produce a 
	  character of '7' to be concatenated to the
	  current value of the textbox. */
	var sevenButton = Titanium.UI.createButton({
		title: '7',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "36%",
		left: "0%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Eight Button enables the user to produce a 
	  character of '8' to be concatenated to the
	  current value of the textbox. */
	var eightButton = Titanium.UI.createButton({
		title: '8',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "36%",
		left: "25%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Nine Button enables the user to produce a 
	  character of '9' to be concatenated to the
	  current value of the textbox. */
	var nineButton = Titanium.UI.createButton({
		title: '9',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "36%",
		left: "50%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Four Button enables the user to produce a 
	  character of '4' to be concatenated to the
	  current value of the textbox. */
	var fourButton = Titanium.UI.createButton({
		title: '4',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "52%",
		left: "0%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Five Button enables the user to produce a 
	  character of '5' to be concatenated to the
	  current value of the textbox. */
	var fiveButton = Titanium.UI.createButton({
		title: '5',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "52%",
		left: "25%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Six Button enables the user to produce a 
	  character of '6' to be concatenated to the
	  current value of the textbox. */
	var sixButton = Titanium.UI.createButton({
		title: '6',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "52%",
		left: "50%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The One Button enables the user to produce a 
	  character of '1' to be concatenated to the
	  current value of the textbox. */
	var oneButton = Titanium.UI.createButton({
		title: '1',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "68%",
		left: "0%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Two Button enables the user to produce a 
	  character of '2' to be concatenated to the
	  current value of the textbox. */
	var twoButton = Titanium.UI.createButton({
		title: '2',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "68%",
		left: "25%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Three Button enables the user to produce a 
	  character of '3' to be concatenated to the
	  current value of the textbox. */
	var threeButton = Titanium.UI.createButton({
		title: '3',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "68%",
		left: "50%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Zero Button enables the user to produce a 
	  character of '0' to be concatenated to the
	  current value of the textbox. */
	var bigWideZeroButton = Titanium.UI.createButton({
		title: '0',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "84%",
		left: "0%",
		width: "50%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Decimal Point Button enables the user to produce a 
	  character, '.' to be concatenated to the
	  current value of the textbox. */
	var decimalPointButton = Titanium.UI.createButton({
		title: '.',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "84%",
		left: "50%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Minus button enables the user to indicate that
	  subtraction is the next operation to execute. */
	var minusButton = Titanium.UI.createButton({
		title: '-',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "52%",
		left: "75%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Plus button enables the user to indicate that 
	  addition is the next operation to execute. */
	var plusButton = Titanium.UI.createButton({
		title: '+',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "68%",
		left: "75%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Equals button enables the user to indicate the
	  previously chosen operation should be executed and
	  display a result to the textbox. */
	var equalsButton = Titanium.UI.createButton({
		title: '=',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "84%",
		left: "75%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Divide button enables the user to indicate that
	  division is the next operation to execute. */
	var divideButton = Titanium.UI.createButton({
		title: '/',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "20%",
		left: "75%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	/* The Multiply button enables the user to indicate that
	  multiplication is the next operation to execute. */
	var multiplyButton = Titanium.UI.createButton({
		title: 'x',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "36%",
		left: "75%",
		width: "25%",
		height: "16%",
		font:{fontSize:"50%",fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
}
else{	 
	var textbox = Titanium.UI.createTextField({
		color: '#FFFFFF',
		backgroundColor: '#000000',
		top: "6%",
		left: "0%",
		width: '100%',
		height: "19%",
		enabled: false, // disables OS keyboard to launch
		textAlign: 'right',
		font:{fontSize:"60%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
		value: '0' // Display on initial launches
	});
	
	/*** The Buttons ***/
	/* The Clear button resets everything. This enables the user
	  to indicate that they will start a whole new calculation and
	  disregarding the previous calculation. */
	var clearButton = Titanium.UI.createButton({
		title: 'AC',
		color:'#000000',
		backgroundColor: '#BDC3C7',
		borderColor: '#000000',
		top: "25%",
		left: "25%",
		width: "50%",
		height: "15%",
		font:{fontSize:"50%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	var sendButton = Titanium.UI.createButton({
		title: 'SEND',
		color:'#000000',
		backgroundColor: '#BDC3C7',
		borderColor: '#000000',
		top: "25%",
		left: "0%",
		width: "25%",
		height: "15%",
		font:{fontSize:"25%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Seven Button enables the user to produce a 
	  character of '7' to be concatenated to the
	  current value of the textbox. */
	var sevenButton = Titanium.UI.createButton({
		title: '7',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "40%",
		left: "0%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Eight Button enables the user to produce a 
	  character of '8' to be concatenated to the
	  current value of the textbox. */
	var eightButton = Titanium.UI.createButton({
		title: '8',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "40%",
		left: "25%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Nine Button enables the user to produce a 
	  character of '9' to be concatenated to the
	  current value of the textbox. */
	var nineButton = Titanium.UI.createButton({
		title: '9',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "40%",
		left: "50%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Four Button enables the user to produce a 
	  character of '4' to be concatenated to the
	  current value of the textbox. */
	var fourButton = Titanium.UI.createButton({
		title: '4',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "55%",
		left: "0%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Five Button enables the user to produce a 
	  character of '5' to be concatenated to the
	  current value of the textbox. */
	var fiveButton = Titanium.UI.createButton({
		title: '5',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "55%",
		left: "25%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Six Button enables the user to produce a 
	  character of '6' to be concatenated to the
	  current value of the textbox. */
	var sixButton = Titanium.UI.createButton({
		title: '6',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "55%",
		left: "50%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The One Button enables the user to produce a 
	  character of '1' to be concatenated to the
	  current value of the textbox. */
	var oneButton = Titanium.UI.createButton({
		title: '1',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "70%",
		left: "0%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Two Button enables the user to produce a 
	  character of '2' to be concatenated to the
	  current value of the textbox. */
	var twoButton = Titanium.UI.createButton({
		title: '2',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "70%",
		left: "25%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Three Button enables the user to produce a 
	  character of '3' to be concatenated to the
	  current value of the textbox. */
	var threeButton = Titanium.UI.createButton({
		title: '3',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "70%",
		left: "50%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Zero Button enables the user to produce a 
	  character of '0' to be concatenated to the
	  current value of the textbox. */
	var bigWideZeroButton = Titanium.UI.createButton({
		title: '0',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "85%",
		left: "0%",
		width: "50%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Decimal Point Button enables the user to produce a 
	  character, '.' to be concatenated to the
	  current value of the textbox. */
	var decimalPointButton = Titanium.UI.createButton({
		title: '.',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "85%",
		left: "50%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Minus button enables the user to indicate that
	  subtraction is the next operation to execute. */
	var minusButton = Titanium.UI.createButton({
		title: '-',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "55%",
		left: "75%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Plus button enables the user to indicate that 
	  addition is the next operation to execute. */
	var plusButton = Titanium.UI.createButton({
		title: '+',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "70%",
		left: "75%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Equals button enables the user to indicate the
	  previously chosen operation should be executed and
	  display a result to the textbox. */
	var equalsButton = Titanium.UI.createButton({
		title: '=',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "85%",
		left: "75%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Divide button enables the user to indicate that
	  division is the next operation to execute. */
	var divideButton = Titanium.UI.createButton({
		title: '/',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "25%",
		left: "75%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	/* The Multiply button enables the user to indicate that
	  multiplication is the next operation to execute. */
	var multiplyButton = Titanium.UI.createButton({
		title: 'x',
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		top: "40%",
		left: "75%",
		width: "25%",
		height: "15%",
		font:{fontSize:"55%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
}

/*** Listeners ***/
textbox.addEventListener('change', function(e){
	    if(e.value.length > 9) {
	        textbox.value = e.value.substr(0,9);
	    }
	});

clearButton.addEventListener('click', function(e) {
/* This is the listener for the Clear Button. */

textbox.value = '0'; // Resets the textbox to '0'
renew = true; // Indicate that a new expression should be made
nextOperator = '';   // Resets so that there was no previous operation to do
decimalPointConcatenated = false; // Indicate that a decimal point can now be added
});

bigWideZeroButton.addEventListener('click', function(e) {
/* This is the listener for the Zero Button */

// If the value of the textbox does not equal to the
// initiliaze '0' value, then concatenate the '0' 
// character to the textbox by calling the 
// buttonFunction(expression);
if ( textbox.value.length > 0 && textbox.value != '0' )
buttonFunction('0');	
});

oneButton.addEventListener('click', function(e) {
/* This is the listener for One Button */

// Call the buttonFunction(expression); 
// concatenate '1' to the textbox value
buttonFunction('1');
});

twoButton.addEventListener('click', function(e) {
/* This is the listener for Two Button */

// Call the buttonFunction(expression); 
// concatenate '2' to the textbox value
buttonFunction('2');
});

threeButton.addEventListener('click', function(e) {
/* This is the listener for Three Button */

// Call the buttonFunction(expression); 
// concatenate '3' to the textbox value
buttonFunction('3');
});

fourButton.addEventListener('click', function(e) {
/* This is the listener for Four Button */

// Call the buttonFunction(expression); 
// concatenate '4' to the textbox value
buttonFunction('4');
});

fiveButton.addEventListener('click', function(e) {
/* This is the listener for Five Button */

// Call the buttonFunction(expression); 
// concatenate '5' to the textbox value
buttonFunction('5');
});

sixButton.addEventListener('click', function(e) {
/* This is the listener for Six Button */

// Call the buttonFunction(expression); 
// concatenate '6' to the textbox value
buttonFunction('6');
});

sevenButton.addEventListener('click', function(e) {
/* This is the listener for Seven Button */

// Call the buttonFunction(expression); 
// concatenate '7' to the textbox value
buttonFunction('7');
});

eightButton.addEventListener('click', function(e) {
/* This is the listener for Eight Button */

// Call the buttonFunction(expression); 
// concatenate '8' to the textbox value
buttonFunction('8');
});

nineButton.addEventListener('click', function(e) {
/* This is the listener for Nine Button */

// Call the buttonFunction(expression); 
// concatenate '9' to the textbox value
buttonFunction('9');
});

decimalPointButton.addEventListener('click', function(e) {
/* This is the listener for Decimal Point Button */

// If there is already a decimal point, there is no 
// need to add another one. Therefore, this listener
// will not do anything.
if ( decimalPointConcatenated ) ;
// But if there is no decimal point concatenated to 
// the current expression and the user desires to 
// add one, then indicate that there is a decimal
// point already concated and call the 
// buttonFunction(expression); to concatenate the 
// '.' to the textbox value.
else 
{
// There must be a global indication that 
// one decimal point has been included to
// the current expression so that there
// should not be more than one decimal
decimalPointConcatenated = true;
// Concatenate the '.'
buttonFunction('.');
}
});

//Send textbox value to the notes tab
sendButton.addEventListener('click', function(e) {
	Titanium.API.info ('in event listener ' + e);
    notesText.value = notesText.value + '\n' + textbox.value; 
});

minusButton.addEventListener('click', function(e) {
/* This is the listener to the Minus Button */

// The user has indicated the subtraction operation
// so the app must enable user to type the next
// expression to be evaluated with this operation.
// So, we reset renew to true and call the
// doOperation(operator, current); function and
// pass this operator along with the current
// value of the textbox.
renew = true;
doOperation('-', textbox.value);
});

plusButton.addEventListener('click', function(e) {
/* This is the listener to the Plus Button */

// The user has indicated the addition operation
// so the app must enable user to type the next
// expression to be evaluated with this operation.
// So, we reset renew to true and call the
// doOperation(operator, current); function and
// pass this operator along with the current
// value of the textbox.
renew = true;
doOperation('+', textbox.value);
});

multiplyButton.addEventListener('click', function(e) {
/* This is the listener to the Multiply Button */

// The user has indicated the multiplication operation
// so the app must enable user to type the next
// expression to be evaluated with this operation.
// So, we reset renew to true and call the
// doOperation(operator, current); function and
// pass this operator along with the current
// value of the textbox.
renew = true;
doOperation('x', textbox.value);
});

divideButton.addEventListener('click', function(e) {
/* This is the listener to the Divide Button */

// The user has indicated the division operation
// so the app must enable user to type the next
// expression to be evaluated with this operation.
// So, we reset renew to true and call the
// doOperation(operator, current); function and
// pass this operator along with the current
// value of the textbox.
renew = true;
doOperation('/', textbox.value);
});

equalsButton.addEventListener('click', function(e) {
/* This is the listener to the Equals Button */

// The user has indicated to execute the most
// recently chosen operation. But we reset
// renew to true so that the user can type-in
// a new expression to be evaluated. Then, we
// call doOperation(operator, current); function
// and pass the equal character along with the 
// current value of the textbox.
renew = true;
doOperation('=', textbox.value);
});

function buttonFunction(expression)
{
/* This function displays a value in the textbox
* after variable expression is concatenated to 
* the current value of the textbox.
*/

// Check if renew is true. If so, the user 
// desired to type-in a new expression to 
// be evaluated with a most recently chosen
// operation. Variable renew is then reset to
// false so that the user can concatenate more
// characters if more digits are desired before
// indicating another operation. The textbox
// value remains the same.
if ( renew )
{
renew = false;
textbox.value = expression;
}
// If variable renew is false, the user desires to 
// add more digits to the current expression. So,
// we update the textbox value by concatenating
// the most recent character right after the 
// current textbox value. 
else textbox.value = textbox.value + expression;
}

function doOperation(operator, current)
{
/* This function executes the indicated operation. It takes
  in the new operation to be executed and the current 
  expression appearing in the textbox. */

/* Since variable current equals to the current textbox value, it is 
  a string. So it must be converted into a floating point
  value in order to be mathematically used. */
current = parseFloat(current);

/* If variable nextOperator is empty, this means that user 
  wants to start a whole new calculation not involving any
  previous calculation or that the app has just started and
  there was no previously indicated operator. So this
  variable stores the newly indicated operator to be evaluated
  after a second operand has been passed to the variable
  current. The variable answer gets a copy of variable current.
*/
if ( nextOperator.length == 0 ) 
{
nextOperator = operator;
answer = current;
}
/* If variable nextOperator is NOT empty, this means that there
  is a previously indicated operation that must now be 
  executed. For this app, there are only four operations 
  including the equal sign expression. */
else
{
switch ( nextOperator )
{
case '+': answer = answer + current; break;
case '-': answer = answer - current; break;
case 'x': answer = answer * current; break;
case '/': answer = answer / current; break;
case '=': answer = current; break;
}
}

/* By this time, the answer has been calculated. But it is 
  still a floating point value. So, it must be converted
  to a string and display it to the textbox informing the
  user of the result. */
textbox.value = answer.toString();

/* Variable nextOperator gets the newly indicated operator to be
  used to evaluate the next expression. */
nextOperator = operator;

/* Indicate that decimal point can now be added. */
decimalPointConcatenated = false;

}

//Add all buttons to first tab
view1.add(textbox);
view1.add(clearButton);
view1.add(sevenButton);
view1.add(eightButton);
view1.add(nineButton);
view1.add(fourButton);
view1.add(fiveButton);
view1.add(sixButton);
view1.add(oneButton);
view1.add(twoButton);
view1.add(threeButton);
view1.add(bigWideZeroButton);
view1.add(decimalPointButton);
view1.add(minusButton);
view1.add(plusButton);
view1.add(equalsButton);
view1.add(sendButton);
view1.add(divideButton);
view1.add(multiplyButton);

// Tab 2 that displays following 
Titanium.UI.setBackgroundColor('#000');

if(isAndroid){
	var tab2 = Ti.UI.createTab({
		title: L('Conversion'),
		icon: '/images/androidconversion.png',
		window: win2,
		layout:'vertical'
	});
}
else{
	var tab2 = Ti.UI.createTab({
		title: L('Conversion'),
		icon: '/images/conversion.png',
		window: win2,
		layout:'vertical'
	});
}
	
	
var view2 = Ti.UI.createView({
    width:'100%',
    height:'100%',
    backgroundColor: '#FFFFFF',
});

win2.add(view2);	

//If device detected is an Android device then ....
if(isAndroid){
	//Distance button opens distance measurement tables
	var distanceButton = Titanium.UI.createButton({
		title: 'Distance',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		borderWidth: ".5%",
		top: "2%",
		left: "0%",
		width: "33.33%",
		height: "7%",
		font:{fontSize:'18%',fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	//Weight button opens weight measurement tables
	var weightButton = Titanium.UI.createButton({
		title: 'Weight',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "2%",
		left: "33.33%",
		width: "33.33%",
		height: "7%",
		font:{fontSize:'18%',fontFamily:'Roboto-Light', fontWeight:'bold'}
	});
	
	//Cooking Button opens common cooking measurement tables	
	var cookingButton = Titanium.UI.createButton({
		title: 'Cooking',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		top: "2%",
		left: "66.66%",
		width: "33.33%",
		height: "7%",
		font:{fontSize:'18%',fontFamily:'Roboto-Light', fontWeight:'bold'}
	});	
	
	//Text field for user to enter initial value to be converted
	var entry = Titanium.UI.createTextField({
		color: '#000000',
		backgroundColor: '#FFFFFF',
		keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
		top: "9%",
		left: "1%",
		width: "49%",
		height: "12%",
		textAlign: 'left',
		font:{fontSize:"20%",fontFamily:'Roboto-Light', fontWeight:'bold'},
		hintText: 'Enter value'
	});

	var answerBox = Titanium.UI.createTextField({
		color: '#000000',
		backgroundColor: '#FFFFFF',
		top: "9%",
		left: "50%",
		width: "49%",
		height: "12%",
		enabled: false, // disables OS keyboard to launch
		textAlign: 'left',
		font:{fontSize:"20%",fontFamily:'Roboto-Light', fontWeight:'bold'},
		hintText: ' ='
	});
	
	var picker = Ti.UI.createPicker({
		top:"21%",
		useSpinner: true
	});
		
	//Will send result in "answerBox" to the notes tab
	var sendButtonTwo = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'30%', fontWeight:'bold', fontFamily:'Roboto-Light' },
		title: 'SEND TO NOTES',
		textAlign: 'center',
		top: "57%",
		height: "10%",
		width: "50%"
	});
	
	//Will send result in "answerBox" to the notes tab
	var clearButton = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'30%', fontWeight:'bold', fontFamily:'Roboto-Light' },
		title: 'SEND TO NOTES',
		textAlign: 'center',
		top: "57%",
		left: "50%",
		height: "10%",
		width: "50%"
	});
}

//If iphone or other device then....
else{
	//Distance button opens distance measurement tables
	var distanceButton = Titanium.UI.createButton({
		title: 'Distance',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		borderWidth: 2,
		top: "6%",
		left: "0%",
		width: "33.33%",
		height: "7%",
		font:{fontSize:'18%',fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	//Weight button opens weight measurement tables
	var weightButton = Titanium.UI.createButton({
		title: 'Weight',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		borderWidth: 2,
		top: "6%",
		left: "33.33%",
		width: "33.33%",
		height: "7%",
		font:{fontSize:'18%',fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});
	
	//Cooking Button opens common cooking measurement tables	
	var cookingButton = Titanium.UI.createButton({
		title: 'Cooking',
		color:'#000000',
		backgroundColor: '#FFFFFF',
		borderColor: '#000000',
		borderWidth: 2,
		top: "6%",
		left: "66.66%",
		width: "33.33%",
		height: "7%",
		font:{fontSize:'18%',fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
	});	
	
	
	var doneButton = Ti.UI.createButton({
	    systemButton:Ti.UI.iPhone.SystemButton.DONE,
	    right:0
	});
	 
	view2.add(doneButton);
 
	//Text field for user to enter initial value to be converted
	var entry = Titanium.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		borderWidth: 1,
		color: '#000000',
		backgroundColor: '#FFFFFF',
		keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
		keyboardToolbar: [doneButton],
		top: "13%",
		left: "0%",
		width: "50%",
		height: "12%",
		textAlign: 'left',
		font:{fontSize:"25%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
		hintText: 'Enter value'
	});

	var answerBox = Titanium.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		borderWidth: 1,
		color: '#000000',
		backgroundColor: '#FFFFFF',
		top: "13%",
		left: "50%",
		width: "50%",
		height: "12%",
		enabled: false, // disables OS keyboard to launch
		textAlign: 'left',
		font:{fontSize:"30%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
		hintText: ' ='
	});
	
	var picker = Ti.UI.createPicker({
		top:"25%",
		useSpinner: true
	});
		
	//Will send result in "answerBox" to the notes tab
	var sendButtonTwo = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'35%', fontWeight:'bold', fontFamily:'HelveticaNeue-Light' },
		title: 'SEND',
		textAlign: 'center',
		top: "67%",
		left: "0%",
		height: "10%",
		width: "50%"
	});
	
	//Will clear both fields
	var clearButton = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'35%', fontWeight:'bold', fontFamily:'HelveticaNeue-Light' },
		title: 'CLEAR',
		textAlign: 'center',
		top: "67%",
		left: "50%",
		height: "10%",
		width: "50%"
	});
	
	function AddKeyboardToolbar(entry)
{
  // Add a toolbar on top of the keyboard that includes a Done
  //   button to blur focus (uses iOS buttons)
  var flexSpace = Ti.UI.createButton({
      systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
      right:0
  });
  var doneButton = Ti.UI.createButton({
      systemButton:Ti.UI.iPhone.SystemButton.DONE,
      right:0
  });
 
  entry.keyboardToolbar = [flexSpace, doneButton];
  entry.addEventListener('focus', function(e) {
      TheEdit.keyboardToolbar = [flexSpace, doneButton];
      doneButton.activeFld = entry;
      });
  doneButton.addEventListener('click', function(e) {
      e.source.activeFld.blur();
      });
};

	//Blur keyboard upon click
	doneButton.addEventListener("click", function(e){
	entry.blur();
});
}
	

distanceButton.addEventListener('click', function() {
    dataLoad(distance1,firstColumn);
    dataLoad(distance1,secondColumn);
    picker.reloadColumn(firstColumn);
    picker.reloadColumn(secondColumn);
});

weightButton.addEventListener('click', function() {
    dataLoad(weight1,firstColumn);
    dataLoad(weight1,secondColumn);
    picker.reloadColumn(firstColumn);
    picker.reloadColumn(secondColumn); 
});

cookingButton.addEventListener('click', function() {
    dataLoad(cooking1,firstColumn);
    dataLoad(cooking1,secondColumn);
    picker.reloadColumn(firstColumn);
    picker.reloadColumn(secondColumn); 
});	

//Add all buttons and fields to second tab
view2.add(distanceButton);
view2.add(weightButton);
view2.add(cookingButton);
view2.add(entry);
view2.add(answerBox);
view2.add(sendButtonTwo);
view2.add(clearButton);

sendButtonTwo.addEventListener('click', function(e) {
	Titanium.API.info ('in event listener ' + e);
    notesText.value = notesText.value + '\n' + entry.value + " " + Ti.App.oneColumn + " = " + answerBox.value + " " + Ti.App.twoColumn; 
});

clearButton.addEventListener('click', function(e){
	entry.value = '';
	answerBox.value = '';
});

Ti.Gesture.addEventListener("shake", function(e){
	entry.value = '';
	answerBox.value = '';
});

//Set a maximum of 9 characters for text field entry
entry.addEventListener('change', function(e){
    e.source.value = e.source.value.slice(0,9);
});


	 
var distance1 = [
    {title: "Millimeter", val:"mm"},
    {title: "Centimeter", val:"cm"},
    {title: "Meter", val:"m"},
    {title: "Kilometer", val:"km"},
    {title: "Inch", val:"in"},
    {title: "Feet", val:"ft"},
    {title: "Yard", val:"yd"},
    {title: "Mile", val:"mi"}
];
  
var weight1 = [
    {title: "Carat", val:"ct"}, 
    {title: "Gram", val:"g"},
    {title: "Kilogram", val:"kg"},
    {title: "Short Ton", val:"US t"},
    {title: "Long Ton", val:"UK t"},
    {title: "Ounce", val:"oz"},
    {title: "Pound", val:"lb"},
    {title: "Metric Ton", val:"t"}
];

var cooking1 = [
    {title: "Milliliter", val:"ml"},   
    {title: "Liter", val:"L"},
    {title: "Fluid Ounce", val:"fl oz"},
    {title: "Shot", val:"shot"},
    {title: "Cup", val:"c"},
    {title: "Pint", val:"pt"},
    {title: "Quart", val:"qt"},
    {title: "Gallon", val:"gal"},
    {title: "Teaspoon", val:"tsp"},
    {title: "Tablespoon", val:"tbsp"}
];
 
var firstColumn = Ti.UI.createPickerColumn({
    width: 160
});
 
for (var x = 0; x < cooking1.length; x++)
{
    firstColumn.addRow(Ti.UI.createPickerRow({
        title:cooking1[x].title, 
        val:cooking1[x].val
    }));
}
 
var secondColumn = Ti.UI.createPickerColumn({
    width: 160,
    textAlign: 'right'
}); 
 
for (var x = 0; x < cooking1.length; x++){
    secondColumn.addRow(Ti.UI.createPickerRow({
        title:cooking1[x].title, 
        val:cooking1[x].val
    }));
}
 
picker.selectionIndicator = true;
picker.add([firstColumn,secondColumn]);
 
view2.add(picker);

//Set starting selections for picker
picker.setSelectedRow(0, 3, false); 
picker.setSelectedRow(1, 4, false); 
 
function dataLoad(data,column)
{
    var dataLth=data.length;
    var columnLth=column.rowCount;
    Ti.API.info('Data : '+dataLth+'   column  : '+columnLth);
    if(dataLth>columnLth)
    {
        for (var i=0; i <column.rowCount; i++) {
          column.rows[i].title=data[i].title, 
          column.rows[i].val=data[i].val
        }
        for (var x = columnLth; x < dataLth; x++)
        {
            column.addRow(Ti.UI.createPickerRow({
                title:data[x].title, 
                val:data[x].val
            }));
        }
    }
    else
    {
        for (var i=0; i <data.length; i++) {
          column.rows[i].title=data[i].title, 
          column.rows[i].val=data[i].val
        }
        for (var x = columnLth-1; x >= dataLth; x--)
        {
            column.removeRow(column.rows[x]);
        }
    }
 
}

Ti.App.oneColumn = 'Null';
Ti.App.twoColumn = 'Null';


//Convert event runs when picker columns or entry field is changed
entry.addEventListener('change',function(e){
	convertEvent(e);
});
picker.addEventListener('change',function(e){
	convertEvent(e);
});
		
var convertEvent = function(e){	
	
	Ti.App.oneColumn = picker.getSelectedRow(0).val;
	Ti.App.twoColumn = picker.getSelectedRow(1).val;
	
	//If both picker columns are the same then the answer is simply the entry	
	if (Ti.App.oneColumn == Ti.App.twoColumn){
		answerBox.value = entry.value;
	}
	//Millimeter conversions
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 0.1);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.01);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * .000001);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 0.0393701);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 0.00328084);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.00109361);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * .00000062137);
	}
	
	//Centimeter conversions
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 10);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.1);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * .00001);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 0.393701);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 0.0328084);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.0109361);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * .0000062137);
	}
	
	//Meter conversions
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 100);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 10);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 0.001);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 39.3701);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 3.28084);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 1.09361);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.000621371);
	}
	
	//Kilometer conversions
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 1000000);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 100000);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 1000);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 39370.1);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 3280.84);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 1093.61);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.621371);
	}
	
	//Inch conversions
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 25.4);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 2.54);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.0254);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * .0000254);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 0.0833333);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.0277778);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * .0000015783);
	}
	
	//Foot conversions
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 304.8);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 30.48);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.3048);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 0.0003048);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 12);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.333333);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.000189394);
	}
	
	//Yard conversions
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 914.4);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 91.44);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.9144);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 0.0009144);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 36);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 3);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.000568182);
	}
	
	//Mile conversions
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 1609340);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 160934);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 1609.34);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 1.60934);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 63360);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 5280);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 1760);
	}
	
	//Carat conversions
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 0.2);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.0002);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * .000000220462262 );
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * .000000196841306);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 0.00705479239);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 0.000440924524);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * .0000002);
	}
	
	//Gram conversions
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.001);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * .0000011023);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * .00000098421);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 0.035274);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 0.00220462);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * .000001);
	}
	
	//Kilogram conversions
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5000);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 1000);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 0.00110231);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.000984207);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 35.274);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2.20462);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 0.001);
	}
	
	//Short Ton conversions
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 4535923.7);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 907185);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 907.185);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.892857);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 32000);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2000);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 0.907185);
	}
	
	//Long Ton conversions
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5080234.54);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 1016050);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 1016.05);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 1.12);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 35840);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2240);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 1.01605);
	}
	
	//Ounce conversions
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 141.747616);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 28.3495);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.0283495);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * .00003125);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * .000027902);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 0.0625);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * .00002835);
	}
	
	//Pound conversions
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 453.592);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.453592);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 0.0005);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.000446429);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 16);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 0.000453592);
	}
	
	//Metric Ton conversions
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 2267.96185);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2267.96185);
	}
	
	//Milliliter conversions
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'L'){
		answerBox.value = (entry.value * 0.001);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 0.033814);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.02254268);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.00422675);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.00211338);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.00105669);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.000264172);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 0.168936);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 0.0563121);
	}
	
	//Liter conversions
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 1000);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 33.814);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 22.5426667);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 4.22675);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 2.11338);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 1.05669);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.264172);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 168.936);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 56.3121);
	}
	
	//Fluid Ounce conversions
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 29.5735);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'L'){
		answerBox.value = (entry.value * 0.0295735);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.666667);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.125);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.0625);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.03125);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.0078125);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 4.99604);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 1.66535);
	}
	
	//Shot conversions
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 44.3603);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'L'){
		answerBox.value = (entry.value * 0.0443603);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 1.5);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.1875);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.09375);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.046875);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.0117187);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 7.49406);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 2.49802);
	}

	//Cup conversions
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 236.588);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.236588);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 8);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 5.333333);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.5);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.25);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.0625);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 39.9683);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 13.3228);
	}	
	
	//Pint conversions
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 473.176);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.473176);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 16);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 10.66666);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 2);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.5);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.125);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 79.9367);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 26.6456);
	}
	
	//Quart conversions
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 946.353);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.946353);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 32);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 21.33333);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 4);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 2);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.25);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 159.873);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 53.2911);
	}
	
	//Gallon conversions
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 3785.41);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 3.78541);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 128);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 85.3333);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 16);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 8);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 4);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 639.494);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 213.165);
	}
	
	//Teaspoon conversions
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 5.91939);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.00591939);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 0.200158);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.13343867);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.0250198);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.0125099);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.00625495);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.00156374);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 0.333333);
	}
	
	//Tablespoon conversions
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 17.7582);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.0177582);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 0.600475);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.40031667);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.0750594);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.0375297);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.0187649);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.00469121);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 3);
	}
	
};


if(isAndroid){
	var tab3 = Ti.UI.createTab({
		title: L('Notes'),
		icon: '/images/androidnotes.png',		
		window: win3
	});
}
else{
	var tab3 = Ti.UI.createTab({
		title: L('Notes'),
		icon: '/images/notes.png',		
		window: win3
	});
}	
	
var view3 = Ti.UI.createView({
    width:'100%',
    height:'100%',
    backgroundColor: '#FFFFFF',
});

win3.add(view3);	

//If device detected is an Android device then ....
if(isAndroid){
    //Create label to alert user that a text area is below
	var label1 = Ti.UI.createLabel({
		color: '#F27935',
		fontSize:'10%',
		fontFamily: 'Roboto-Light',
		text: 'Tap below to add notes',
		textAlign: 'left',
		top: "2%",
		height: "7%",
		width: Ti.UI.SIZE, 
		height: Ti.UI.SIZE
	});

	//Create cancel button that can be added to keyboard toolbar
	var cancel = Ti.UI.createButton({
    	systemButton : Ti.UI.iPhone.SystemButton.CANCEL
	});

	//Create text area that allows use of keyboard with toolbar
	var notesText = Titanium.UI.createTextArea({
		color: '#000000',
		backgroundColor: '#FFFFFF',
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        keyboardType:Titanium.UI.KEYBOARD_ASCII,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
		enabled: true,
		scrollable: true,
		showVerticalScrollIndicator: true,
		top: "9%",
		left: "1%",
		width: "98%",
		height: "95%",
		textAlign: 'left',
		font:{fontSize:"20",fontFamily:'Roboto-Light', fontWeight:'bold'},
		enableReturnKey: true,
		suppressReturn : false,
	});
}
//If iphone or other device then....
else{
    //Create label to alert user that a text area is below
	var label1 = Ti.UI.createLabel({
		color: '#F27935',
		font: { fontSize:'15%' },
		text: 'Tap below to add notes',
		textAlign: 'left',
		top: "6%",
		height: "5%",
		width: Ti.UI.SIZE, 
		height: Ti.UI.SIZE
	});

	//Create cancel button that can be added to keyboard toolbar
	var done = Ti.UI.createButton({
    	systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	//Create text area that allows use of keyboard with toolbar
	var notesText = Titanium.UI.createTextArea({
		color: '#000000',
		backgroundColor: '#FFFFFF',
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		returnKeyType: Ti.UI.RETURNKEY_RETURN,
		keyboardToolbar : [done],
		scrollable: true,
		showVerticalScrollIndicator: true,
		top: "11%",
		left: "1%",
		width: "98%",
		height: "80%",
		enabled: true, // enables OS keyboard to launch
		textAlign: 'left',
		font:{fontSize:"20",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
		enableReturnKey: true,
		suppressReturn : false,
	});
	
	view3.add(done);
	
	//Blur keyboard upon click
	done.addEventListener("click", function(e){
		notesText.blur();
	});
}



//Add components to window
view3.add(label1);
view3.add(notesText);


	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);

	return self;
};

module.exports = ApplicationTabGroup;
