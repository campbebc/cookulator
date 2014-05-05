/* Author: Benjamin Campbell
* 
* Description: This is a calculator app that has
* the most basic
* operations: addition, subtraction,
* multiplication and division as well as a conversion
* function and a note taking page. 
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

//Tab 1 - Calculator
if(isAndroid){	
	var tab1 = Ti.UI.createTab({
		title: L('Calculator'),
		icon: '/images/androidcalculator.png',
		window: win1,
		layout:'vertical'
	});
}
//If iOS device then...
else{
	var tab1 = Ti.UI.createTab({
		title: L('Calculator'),
		icon: '/images/calculator.png',
		window: win1,
		layout: 'vertical'
	});
}	

//Create view that is the full screen size of the device		
var view1 = Ti.UI.createView({
    width:'100%',
    height:'100%',
    backgroundColor: '#FFFFFF',
});

//Add view to the window
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


//Determines the type of device that the application is being built on
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

//If device detected is an Android device then .... 
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

//If iOS device then...
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
		top: "54.9%",
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
		top: "54.9%",
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
		top: "54.9%",
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
		top: "69.8%",
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
		top: "69.8%",
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
		top: "69.8%",
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
		top: "84.8%",
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
		top: "84.8%",
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
		top: "54.9%",
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
		top: "69.8%",
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
		top: "84.8%",
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

/* This is the listener for the Clear Button. */
clearButton.addEventListener('click', function(e) {
	textbox.value = '0'; // Resets the textbox to '0'
	renew = true; // Indicate that a new expression should be made
	nextOperator = '';   // Resets so that there was no previous operation to do
	decimalPointConcatenated = false; // Indicate that a decimal point can now be added
});

/* This is the listener for the Zero Button */
bigWideZeroButton.addEventListener('click', function(e) {
// If the value of the textbox does not equal to the
// initiliaze '0' value, then concatenate the '0' 
// character to the textbox by calling the 
// buttonFunction(expression);
	if ( textbox.value.length > 0 && textbox.value != '0' )
		buttonFunction('0');	
});

/* This is the listener for One Button */
oneButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '1' to the textbox value
	buttonFunction('1');
});

/* This is the listener for Two Button */
twoButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '2' to the textbox value
	buttonFunction('2');
});

/* This is the listener for Three Button */
threeButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '3' to the textbox value
	buttonFunction('3');
});

/* This is the listener for Four Button */
fourButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '4' to the textbox value
	buttonFunction('4');
});

/* This is the listener for Five Button */
fiveButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '5' to the textbox value
	buttonFunction('5');
});

/* This is the listener for Six Button */
sixButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '6' to the textbox value
	buttonFunction('6');
});

/* This is the listener for Seven Button */
sevenButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '7' to the textbox value
	buttonFunction('7');
});

/* This is the listener for Eight Button */
eightButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '8' to the textbox value
	buttonFunction('8');
});

/* This is the listener for Nine Button */
nineButton.addEventListener('click', function(e) {
// Call the buttonFunction(expression); 
// concatenate '9' to the textbox value
	buttonFunction('9');
});

/* This is the listener for Decimal Point Button */
decimalPointButton.addEventListener('click', function(e) {
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

/* This is the listener to the Minus Button */
minusButton.addEventListener('click', function(e) {
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

/* This is the listener to the Plus Button */
plusButton.addEventListener('click', function(e) {
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

/* This is the listener to the Multiply Button */
multiplyButton.addEventListener('click', function(e) {
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

/* This is the listener to the Divide Button */
divideButton.addEventListener('click', function(e) {
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

/* This is the listener to the Equals Button */
equalsButton.addEventListener('click', function(e) {
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

//Add all buttons and objects to first view
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

// Tab 2 - Conversion 
Titanium.UI.setBackgroundColor('#000');

//If device detected is an Android device then ....
if(isAndroid){
	var tab2 = Ti.UI.createTab({
		title: L('Conversion'),
		icon: '/images/androidconversion.png',
		window: win2,
		layout:'vertical'
	});
}
//If iOS device then...
else{
	var tab2 = Ti.UI.createTab({
		title: L('Conversion'),
		icon: '/images/conversion.png',
		window: win2,
		layout:'vertical'
	});
}
	
//Create view that is the full screen size of the device		
var view2 = Ti.UI.createView({
    width:'100%',
    height:'100%',
    backgroundColor: '#FFFFFF',
});

//Add view to the window
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
	
	//Text field for user to enter initial value to be converted.
	//Currently experiencing issues with this keyboard.
	var entry = Titanium.UI.createTextField({
		color: '#000000',
		backgroundColor: '#FFFFFF',
		keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
		top: "9%",
		left: "1%",
		width: "49%",
		height: "10%",
		textAlign: 'left',
		font:{fontSize:"20%",fontFamily:'Roboto-Light', fontWeight:'bold'},
		hintText: 'Enter value'
	});

	//Event listener to blur keyboard when done button is pressed	
	entry.addEventListener('done', function()
	{
    	entry.blur();
	});

	//Text field where converted answer will appear
	var answerBox = Titanium.UI.createTextField({
		color: '#000000',
		backgroundColor: '#FFFFFF',
		top: "9%",
		left: "50%",
		width: "49%",
		height: "10%",
		enabled: false, // disables OS keyboard to launch
		textAlign: 'left',
		font:{fontSize:"20%",fontFamily:'Roboto-Light', fontWeight:'bold'},
		hintText: ' ='
	});

	//Label for the picker columns 	
	var label = Ti.UI.createLabel({
		color: '#F27935',
		font: { fontSize:'15%' },
		text: 'Multiplier | Convert | Convert',
		textAlign: 'center',
		top: "19%",
		height: "5%",
		width: Ti.UI.SIZE, 
		height: Ti.UI.SIZE
	});	
	
	//Create picker object that uses default spinner	
	var picker = Ti.UI.createPicker({
		top:"24%",
		useSpinner: true
	});
			
	//Clear button
	var clearButton2 = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'30%', fontWeight:'bold', fontFamily:'Roboto-Light' },
		title: 'CLEAR',
		textAlign: 'center',
		top: "60%",
		left: "50%",
		height: "10%",
		width: "100%"
	});
	
	view2.add(clearButton2);
	
	//Event listener that will clear entry and answerBox on click	
	clearButton2.addEventListener('click', function(e){
		entry.value = '';
		answerBox.value = '';
	});
	
	//Send to notes button
	var sendButtonTwo = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'30%', fontWeight:'bold', fontFamily:'Roboto-Light' },
		title: 'SEND TO NOTES',
		textAlign: 'center',
		top: "70%",
		height: "10%",
		width: "100%"
	});
	
	//Send to calculator button
	var sendButtonThree = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'30%', fontWeight:'bold', fontFamily:'Roboto-Light' },
		title: 'SEND TO CALCULATOR',
		textAlign: 'center',
		top: "80%",
		height: "10%",
		width: "100%"
	});
}

//If iOS device then...
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
	
	//Create done button for iOS keyboard
	var doneButton = Ti.UI.createButton({
	    systemButton:Ti.UI.iPhone.SystemButton.DONE,
	    right:0
	});
	 
	//Add doneButton to the view 
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
		height: "10%",
		textAlign: 'left',
		font:{fontSize:"25%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
		hintText: 'Enter value'
	});

	//Text field where converted answer will appear
	var answerBox = Titanium.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		borderWidth: 1,
		color: '#000000',
		backgroundColor: '#FFFFFF',
		top: "13%",
		left: "50%",
		width: "50%",
		height: "10%",
		enabled: false, // disables OS keyboard to launch
		textAlign: 'left',
		font:{fontSize:"30%",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
		hintText: ' ='
	});
	
	//Label for the picker columns 		
	var label = Ti.UI.createLabel({
		color: '#F27935',
		font: { fontSize:'15%' },
		text: 'Multiplier | Convert | Convert',
		textAlign: 'center',
		top: "23%",
		height: "5%",
		width: Ti.UI.SIZE, 
		height: Ti.UI.SIZE
	});	
	
	//Create picker object that uses default spinner		
	var picker = Ti.UI.createPicker({
		top:"29%",
		useSpinner: true
	});
		
	
	//Send to notes button
	var sendButtonTwo = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'25%', fontWeight:'bold', fontFamily:'HelveticaNeue-Light' },
		title: 'SEND TO NOTES',
		textAlign: 'center',
		top: "72%",
		left: "0%",
		height: "10%",
		width: "100%"
	});
	
	//Send to calculator button
	var sendButtonThree = Titanium.UI.createButton({
		color:'#FFFFFF',
		backgroundColor: '#F27935',
		borderColor: '#000000',
		font: { fontSize:'25%', fontWeight:'bold', fontFamily:'HelveticaNeue-Light' },
		title: 'SEND TO CALCULATOR',
		textAlign: 'center',
		top: "82%",
		left: "0%",
		height: "10%",
		width: "100%"
	});
	
	function AddKeyboardToolbar(entry)
{
  	//Add a toolbar on top of the keyboard that includes a Done
  	//button to blur focus (uses iOS buttons)
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
	
//Populates picker with distances on click
distanceButton.addEventListener('click', function() {
    dataLoad(distance1,firstColumn);
    dataLoad(distance1,secondColumn);
    picker.reloadColumn(firstColumn);
    picker.reloadColumn(secondColumn);
});

//Populates picker with weights on click
weightButton.addEventListener('click', function() {
    dataLoad(weight1,firstColumn);
    dataLoad(weight1,secondColumn);
    picker.reloadColumn(firstColumn);
    picker.reloadColumn(secondColumn); 
});

//Populates picker with cooking measurements on click
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
view2.add(label);
view2.add(sendButtonTwo);
view2.add(sendButtonThree);

//Properly formats text to be sent to the notes page with unit labels
sendButtonTwo.addEventListener('click', function(e) {
	Titanium.API.info ('in event listener ' + e);
    notesText.value = notesText.value + '\n' + entry.value + " " + Ti.App.oneColumn +  " x " + Ti.App.zeroColumn + " = " + answerBox.value + " " + Ti.App.twoColumn; 
});

//Sets conversion result to the current value of the calculator answerBox
sendButtonThree.addEventListener('click', function(e) {
	textbox.value = answerBox.value; 
});

//Device shake gesture clears the entry and answerBox fields
Ti.Gesture.addEventListener("shake", function(e){
	entry.value = '';
	answerBox.value = '';
});

//Set a maximum of 9 characters for text field entry
entry.addEventListener('change', function(e){
    e.source.value = e.source.value.slice(0,9);
});
 
//Distances used for pickers 
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
//Weights used for pickers 
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
//Cooking measurments used for pickers 
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
//Standard multiplier integers used for pickers
var multiplier = [
	{title: "1", val: "1"},
	{title: "2", val: "2"},
	{title: "3", val: "3"},
	{title: "4", val: "4"},
	{title: "5", val: "5"},
	{title: "6", val: "6"},
	{title: "7", val: "7"},
	{title: "8", val: "8"},
	{title: "9", val: "9"},
	{title: "10", val: "10"},
];

//Create picker column for multiplier array
var zeroColumn = Ti.UI.createPickerColumn({
    width: 50
});
 
for (var x = 0; x < multiplier.length; x++)
{
    zeroColumn.addRow(Ti.UI.createPickerRow({
        title:multiplier[x].title, 
        val:multiplier[x].val
    }));
}

//Create picker column for "convert from" 
var firstColumn = Ti.UI.createPickerColumn({
    width: 140
});
 
for (var x = 0; x < cooking1.length; x++)
{
    firstColumn.addRow(Ti.UI.createPickerRow({
        title:cooking1[x].title, 
        val:cooking1[x].val
    }));
}

//Create picker column for "convert to"  
var secondColumn = Ti.UI.createPickerColumn({
    width: 140,
    textAlign: 'right'
}); 
 
for (var x = 0; x < cooking1.length; x++){
    secondColumn.addRow(Ti.UI.createPickerRow({
        title:cooking1[x].title, 
        val:cooking1[x].val
    }));
}

//Shows the selected item 
picker.selectionIndicator = true;

//Add the three columns to the picker
picker.add([zeroColumn,firstColumn,secondColumn]);
 
//Add the picker to the view 
view2.add(picker);

//Set starting selections for picker
picker.setSelectedRow(0, 0, false); 
picker.setSelectedRow(1, 3, false); 
picker.setSelectedRow(2, 5, false);
 
//Loads the data into the picker by determining number of rows needed based on size of the array 
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

//Declare both "convert" picker columns to be intially null
Ti.App.oneColumn = 'Null';
Ti.App.twoColumn = 'Null';


//Convert event runs when picker columns or entry field is changed
entry.addEventListener('change',function(e){
	convertEvent(e);
});
picker.addEventListener('change',function(e){
	convertEvent(e);
});

//Runs the conversion based off of the entry, zeroColumn, oneColumn, and twoColumn values		
var convertEvent = function(e){	
	
	Ti.App.zeroColumn = picker.getSelectedRow(0).val;
	Ti.App.oneColumn = picker.getSelectedRow(1).val;
	Ti.App.twoColumn = picker.getSelectedRow(2).val;
	
	//If both picker columns are the same then the answer is simply the entry times the multiplier	
	if (Ti.App.oneColumn == Ti.App.twoColumn){
		answerBox.value = (entry.value * Ti.App.zeroColumn);
	}
	//Millimeter conversions
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 0.1 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.01 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * .000001 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 0.0393701 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 0.00328084 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.00109361 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mm' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * .00000062137 * Ti.App.zeroColumn);
	}
	
	//Centimeter conversions
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 10 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.1 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * .00001 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 0.393701 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 0.0328084 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.0109361 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'cm' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * .0000062137 * Ti.App.zeroColumn);
	}
	
	//Meter conversions
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 100 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 10 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 0.001 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 39.3701 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 3.28084 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 1.09361 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'm' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.000621371 * Ti.App.zeroColumn);
	}
	
	//Kilometer conversions
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 1000000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 100000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 1000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 39370.1 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 3280.84 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 1093.61 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'km' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.621371 * Ti.App.zeroColumn);
	}
	
	//Inch conversions
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 25.4 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 2.54 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.0254 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * .0000254 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 0.0833333 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.0277778 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'in' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * .0000015783 * Ti.App.zeroColumn);
	}
	
	//Foot conversions
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 304.8 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 30.48 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.3048 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 0.0003048 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 12 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 0.333333 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ft' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.000189394 * Ti.App.zeroColumn);
	}
	
	//Yard conversions
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 914.4 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 91.44 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 0.9144 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 0.0009144 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 36 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 3 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'yd' && Ti.App.twoColumn == 'mi'){
		answerBox.value = (entry.value * 0.000568182 * Ti.App.zeroColumn);
	}
	
	//Mile conversions
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'mm'){
		answerBox.value = (entry.value * 1609340 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'cm'){
		answerBox.value = (entry.value * 160934 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'm'){
		answerBox.value = (entry.value * 1609.34 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'km'){
		answerBox.value = (entry.value * 1.60934 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'in'){
		answerBox.value = (entry.value * 63360 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'ft'){
		answerBox.value = (entry.value * 5280 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'mi' && Ti.App.twoColumn == 'yd'){
		answerBox.value = (entry.value * 1760 * Ti.App.zeroColumn);
	}
	
	//Carat conversions
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 0.2 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.0002 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * .000000220462262 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * .000000196841306 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 0.00705479239 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 0.000440924524 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ct' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * .0000002 * Ti.App.zeroColumn);
	}
	
	//Gram conversions
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.001 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * .0000011023 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * .00000098421 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 0.035274 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 0.00220462 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'g' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * .000001 * Ti.App.zeroColumn);
	}
	
	//Kilogram conversions
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 1000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 0.00110231 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.000984207 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 35.274 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2.20462 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'kg' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 0.001 * Ti.App.zeroColumn);
	}
	
	//Short Ton conversions
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 4535923.7 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 907185 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 907.185 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.892857 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 32000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'US t' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 0.907185 * Ti.App.zeroColumn);
	}
	
	//Long Ton conversions
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5080234.54 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 1016050 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 1016.05 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 1.12 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 35840 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2240 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'UK t' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 1.01605 * Ti.App.zeroColumn);
	}
	
	//Ounce conversions
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 141.747616 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 28.3495 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.0283495 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * .00003125 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * .000027902 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 0.0625 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'oz' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * .00002835 * Ti.App.zeroColumn);
	}
	
	//Pound conversions
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 2267.96185 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 453.592 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 0.453592 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 0.0005 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.000446429 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 16 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'lb' && Ti.App.twoColumn == 't'){
		answerBox.value = (entry.value * 0.000453592 * Ti.App.zeroColumn);
	}
	
	//Metric Ton conversions
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'ct'){
		answerBox.value = (entry.value * 5000000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'g'){
		answerBox.value = (entry.value * 1000000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'kg'){
		answerBox.value = (entry.value * 1000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'US t'){
		answerBox.value = (entry.value * 1.10231 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'UK t'){
		answerBox.value = (entry.value * 0.984207 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'oz'){
		answerBox.value = (entry.value * 35274 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 't' && Ti.App.twoColumn == 'lb'){
		answerBox.value = (entry.value * 2204.62 * Ti.App.zeroColumn);
	}
	
	//Milliliter conversions
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'L'){
		answerBox.value = (entry.value * 0.001 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 0.033814 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.02254268 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.00422675 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.00211338 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.00105669 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.000264172 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 0.168936 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'ml' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 0.0563121 * Ti.App.zeroColumn);
	}
	
	//Liter conversions
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 1000 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 33.814 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 22.5426667 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 4.22675 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 2.11338 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 1.05669 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.264172 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 168.936 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'L' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 56.3121 * Ti.App.zeroColumn);
	}
	
	//Fluid Ounce conversions
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 29.5735 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'L'){
		answerBox.value = (entry.value * 0.0295735 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.666667 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.125 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.0625 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.03125 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.0078125 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 4.99604 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'fl oz' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 1.66535 * Ti.App.zeroColumn);
	}
	
	//Shot conversions
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 44.3603 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'L'){
		answerBox.value = (entry.value * 0.0443603 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 1.5 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.1875 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.09375 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.046875 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.0117187 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 7.49406 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'shot' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 2.49802 * Ti.App.zeroColumn);
	}

	//Cup conversions
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 236.588 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.236588 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 8 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 5.333333 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.5 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.25 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.0625 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 39.9683 * Ti.App.zeroColumn);
	}	
	else if (Ti.App.oneColumn == 'c' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 13.3228 * Ti.App.zeroColumn);
	}	
	
	//Pint conversions
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 473.176 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.473176 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 16 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 10.66666 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 2 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.5 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.125 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 79.9367 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'pt' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 26.6456 * Ti.App.zeroColumn);
	}
	
	//Quart conversions
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 946.353 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.946353 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 32 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 21.33333 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 4 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 2 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.25 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 159.873 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'qt' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 53.2911 * Ti.App.zeroColumn);
	}
	
	//Gallon conversions
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 3785.41 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 3.78541 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 128 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 85.3333 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 16 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 8 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 4 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 639.494 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'gal' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 213.165 * Ti.App.zeroColumn);
	}
	
	//Teaspoon conversions
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 5.91939 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.00591939 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 0.200158 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.13343867 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.0250198 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.0125099 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.00625495 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.00156374 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tsp' && Ti.App.twoColumn == 'tbsp'){
		answerBox.value = (entry.value * 0.333333 * Ti.App.zeroColumn);
	}
	
	//Tablespoon conversions
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'ml'){
		answerBox.value = (entry.value * 17.7582 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'l'){
		answerBox.value = (entry.value * 0.0177582 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'fl oz'){
		answerBox.value = (entry.value * 0.600475 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'shot'){
		answerBox.value = (entry.value * 0.40031667 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'c'){
		answerBox.value = (entry.value * 0.0750594 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'pt'){
		answerBox.value = (entry.value * 0.0375297 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'qt'){
		answerBox.value = (entry.value * 0.0187649 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'gal'){
		answerBox.value = (entry.value * 0.00469121 * Ti.App.zeroColumn);
	}
	else if (Ti.App.oneColumn == 'tbsp' && Ti.App.twoColumn == 'tsp'){
		answerBox.value = (entry.value * 3 * Ti.App.zeroColumn);
	}	
};


//Tab 3 - Notes

//If device detected is an Android device then ....
if(isAndroid){
	var tab3 = Ti.UI.createTab({
		title: L('Notes'),
		icon: '/images/androidnotes.png',		
		window: win3
	});
}
//If iOS device then...
else{
	var tab3 = Ti.UI.createTab({
		title: L('Notes'),
		icon: '/images/notes.png',		
		window: win3
	});
}	

//Create view that is the full screen size of the device			
var view3 = Ti.UI.createView({
    width:'100%',
    height:'100%',
    backgroundColor: '#FFFFFF',
});

//Add view to the window
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
	
	notesText.addEventListener('done', function()
	{
    	notesText.blur();
	});
}

//If iOS device then...
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
