/* Author: Benjamin Campbell
* 
* Description: This is a calculator app that has
* the most basic operations: addition, subtraction,
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

	var tab1 = Ti.UI.createTab({
		title: L('Calculator'),
		icon: '/images/calculator.png',
		window: win1
	});

/* The one and only window that displays all the buttons
  and a textbox. */
var win = Titanium.UI.createWindow;

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

/*** The one and only textfield ***/
/* This textfield displays a response to the user's work.
  As all textfields, it takes in strings. So all numbers
  entered will be concatenations of numbers pressed. 
  When a calculation occurs, its current value gets parsed
  to a float value and converted back to a string. This
  textbox also responds to all the buttons displayed and
  not to its corresponding OS' keyboard. */
var textbox = Titanium.UI.createTextField({
color: '#FFFFFF',
backgroundColor: '#000000',
top: "20dp",
left: "0dp",
width: "320dp",
height: "100dp",
enabled: false, // disables OS keyboard to launch
textAlign: 'right',
font:{fontSize:"75dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
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
top: "120dp",
left: "0dp",
width: "240dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Seven Button enables the user to produce a 
  character of '7' to be concatenated to the
  current value of the textbox. */
var sevenButton = Titanium.UI.createButton({
title: '7',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "200dp",
left: "0dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Eight Button enables the user to produce a 
  character of '8' to be concatenated to the
  current value of the textbox. */
var eightButton = Titanium.UI.createButton({
title: '8',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "200dp",
left: "80dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Nine Button enables the user to produce a 
  character of '9' to be concatenated to the
  current value of the textbox. */
var nineButton = Titanium.UI.createButton({
title: '9',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "200dp",
left: "160dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Four Button enables the user to produce a 
  character of '4' to be concatenated to the
  current value of the textbox. */
var fourButton = Titanium.UI.createButton({
title: '4',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "280dp",
left: "0dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Five Button enables the user to produce a 
  character of '5' to be concatenated to the
  current value of the textbox. */
var fiveButton = Titanium.UI.createButton({
title: '5',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "280dp",
left: "80dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Six Button enables the user to produce a 
  character of '6' to be concatenated to the
  current value of the textbox. */
var sixButton = Titanium.UI.createButton({
title: '6',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "280dp",
left: "160dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The One Button enables the user to produce a 
  character of '1' to be concatenated to the
  current value of the textbox. */
var oneButton = Titanium.UI.createButton({
title: '1',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "360dp",
left: "0dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Two Button enables the user to produce a 
  character of '2' to be concatenated to the
  current value of the textbox. */
var twoButton = Titanium.UI.createButton({
title: '2',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "360dp",
left: "80dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Three Button enables the user to produce a 
  character of '3' to be concatenated to the
  current value of the textbox. */
var threeButton = Titanium.UI.createButton({
title: '3',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "360dp",
left: "160dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Zero Button enables the user to produce a 
  character of '0' to be concatenated to the
  current value of the textbox. */
var bigWideZeroButton = Titanium.UI.createButton({
title: '0',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "440dp",
left: "0dp",
width: "160dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Decimal Point Button enables the user to produce a 
  character, '.' to be concatenated to the
  current value of the textbox. */
var decimalPointButton = Titanium.UI.createButton({
title: '.',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "440dp",
left: "160dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Minus button enables the user to indicate that
  subtraction is the next operation to execute. */
var minusButton = Titanium.UI.createButton({
title: '-',
color:'#FFFFFF',
backgroundColor: '#F27935',
borderColor: '#000000',
top: "280dp",
left: "240dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});


/* The Plus button enables the user to indicate that 
  addition is the next operation to execute. */
var plusButton = Titanium.UI.createButton({
title: '+',
color:'#FFFFFF',
backgroundColor: '#F27935',
borderColor: '#000000',
top: "360dp",
left: "240dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Equals button enables the user to indicate the
  previously chosen operation should be executed and
  display a result to the textbox. */
var equalsButton = Titanium.UI.createButton({
title: '=',
color:'#FFFFFF',
backgroundColor: '#F27935',
borderColor: '#000000',
top: "440dp",
left: "240dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Divide button enables the user to indicate that
  division is the next operation to execute. */
var divideButton = Titanium.UI.createButton({
title: '/',
color:'#FFFFFF',
backgroundColor: '#F27935',
borderColor: '#000000',
top: "120dp",
left: "240dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/* The Multiply button enables the user to indicate that
  multiplication is the next operation to execute. */
var multiplyButton = Titanium.UI.createButton({
title: 'x',
color:'#FFFFFF',
backgroundColor: '#F27935',
borderColor: '#000000',
top: "200dp",
left: "240dp",
width: "80dp",
height: "80dp",
font:{fontSize:"40dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

/*** Listeners ***/

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
win1.add(textbox);
win1.add(clearButton);
win1.add(sevenButton);
win1.add(eightButton);
win1.add(nineButton);
win1.add(fourButton);
win1.add(fiveButton);
win1.add(sixButton);
win1.add(oneButton);
win1.add(twoButton);
win1.add(threeButton);
win1.add(bigWideZeroButton);
win1.add(decimalPointButton);
win1.add(minusButton);
win1.add(plusButton);
win1.add(equalsButton);
win1.add(divideButton);
win1.add(multiplyButton);

// Tab 2 that displays following
	var tab2 = Ti.UI.createTab({
		title: L('Conversion'),
		icon: '/images/conversion.png',
		window: win2
	});

//Distance button opens distance measurement tables
var distanceButton = Titanium.UI.createButton({
title: 'Distance',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "20dp",
left: "0dp",
width: "80dp",
height: "40dp",
font:{fontSize:"15dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

//Weight button opens weight measurement tables
var weightButton = Titanium.UI.createButton({
title: 'Weight',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "20dp",
left: "80dp",
width: "80dp",
height: "40dp",
font:{fontSize:"15dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});

//Volume button opens volume measurement tables
var volumeButton = Titanium.UI.createButton({
title: 'Volume',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "20dp",
left: "160dp",
width: "80dp",
height: "40dp",
font:{fontSize:"15dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});	

//Cooking Button opens common cooking measurement tables	
var cookingButton = Titanium.UI.createButton({
title: 'Cooking',
color:'#000000',
backgroundColor: '#FFFFFF',
borderColor: '#000000',
top: "20dp",
left: "240dp",
width: "80dp",
height: "40dp",
font:{fontSize:"15dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'}
});		

//Add all buttons to second tab
win2.add(distanceButton);
win2.add(weightButton);
win2.add(volumeButton);
win2.add(cookingButton);

//Text field for user to enter initial value to be converted
var entry = Titanium.UI.createTextField({
color: '#000000',
backgroundColor: '#FFFFFF',
keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
top: "70dp",
left: "5dp",
width: "310dp",
height: "40dp",
enabled: true, // enables OS keyboard to launch
textAlign: 'left',
font:{fontSize:"30dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
placeholder: 'Enter initial value', // Display on initial launches
enableReturnKey: true,
suppressReturn : false,
hintText: 'Enter initial value'
});

//Set a maximum of 10 characters for text field entry
entry.addEventListener('change', function(e){
    e.source.value = e.source.value.slice(0,10);
});

//Blur keyboard upon click
win2.addEventListener("click", function(e){
	entry.blur();
});

//Add text field to window
win2.add(entry);

//First distance table entry
var distance1 = [
	{title: "Millimeter (mm)", val:"millimeter"},
	{title: "Centimeter (cm)", val:"centimeter"},
	{title: "Meter (m)", val:"meter"},
	{title: "Inch (in)", val:"inch"},
	{title: "Feet (ft)", val:"feet"},
	{title: "Yard (yd)", val:"yard"},
	{title: "Mile (mi)", val:"mile"}
];

//Second distance table entry
var distance2 = [
	{title: "Millimeter (mm)", val:"millimeter"},
	{title: "Centimeter (cm)", val:"centimeter"},
	{title: "Meter (m)", val:"meter"},
	{title: "Inch (in)", val:"inch"},
	{title: "Feet (ft)", val:"feet"},
	{title: "Yard (yd)", val:"yard"},
	{title: "Mile (mi)", val:"mile"}
];

//Create first picker column	
var firstColumn = Ti.UI.createPickerColumn({
	width: "160dp"
});

for (var x = 0; x < distance1.length; x++){
	firstColumn.addRow(Ti.UI.createPickerRow({
		title:distance1[x].title, val:distance1[x].val
	}));
}

//Create second picker column
var secondColumn = Ti.UI.createPickerColumn({
	width: "160dp"
});	

for (var x = 0; x < distance1.length; x++){
	secondColumn.addRow(Ti.UI.createPickerRow({
		title:distance2[x].title, val:distance2[x].val
	}));
}

//Create picker and set format
var picker = Ti.UI.createPicker({
	selectionIndicator: true,
	userSpinner: true,
	type: Ti.UI.PICKER_TYPE_PLAIN,
	top: 110,
	height: 200,
	columns: [firstColumn, secondColumn]
});

picker.addEventListener("change", function(e){
	
});

//Add picker to window
win2.add(picker);

//Create button that will convert the value entered into the text field by following the
//conversion selected in the picker tables and then display final result in same field
var convertButton = Titanium.UI.createButton({
  color:'#FFFFFF',
  backgroundColor: '#F27935',
  borderColor: '#000000',
  font: { fontSize:30, fontWeight:'bold', fontFamily:'HelveticaNeue-Light' },
  title: 'CONVERT',
  textAlign: 'center',
  top: 310,
  height: 40,
  width: 320
});

//Add convert button to window
win2.add(convertButton);

win2.open();

//Set starting selections for picker
picker.setSelectedRow(0, 3, false); 
picker.setSelectedRow(1, 4, false); 

// Tab 3 that displays following
	var tab3 = Ti.UI.createTab({
		title: L('Notes'),
		icon: '/images/notes.png',		
		window: win3
	});

//Create label to alert user that a text area is below
var label1 = Ti.UI.createLabel({
  color: '#900',
  font: { fontSize:15 },
  text: 'Tap below to add notes',
  textAlign: 'left',
  top: 30,
  height: 20,
  width: Ti.UI.SIZE, height: Ti.UI.SIZE
});

//Create cancel button that can be added to keyboard toolbar
var cancel = Ti.UI.createButton({
    systemButton : Ti.UI.iPhone.SystemButton.CANCEL
});

//Create text area that allows use of keyboard with toolbar
var text = Titanium.UI.createTextArea({
color: '#000000',
backgroundColor: '#FFFFFF',
verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
returnKeyType: Ti.UI.RETURNKEY_RETURN,
keyboardToolbar : [cancel],
scrollable: true,
top: "50dp",
left: "5dp",
width: "310dp",
height: "470dp",
enabled: true, // enables OS keyboard to launch
textAlign: 'left',
font:{fontSize:"20dp",fontFamily:'HelveticaNeue-Light', fontWeight:'bold'},
enableReturnKey: true,
suppressReturn : false,
});

//Blur keyboard upon click
win3.addEventListener("click", function(e){
	text.blur();
});

//Add components to window
win3.add(cancel);
win3.add(label1);
win3.add(text);


	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);

	return self;
};

module.exports = ApplicationTabGroup;
