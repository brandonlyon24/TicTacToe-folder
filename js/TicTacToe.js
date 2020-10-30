//This variable keeps track of whos trun it is
let activePlayer = 'X';
//This array stores an array of moves we use this to determine win conditions.
let selectSquares = [];

//This function is for placing an x into the square
function placeXOrO(squareNumber) {
    //this condition ensures a square hasnt be selected already 
    //the .some() method is used to check each element of selectedSqure array to if its being clicked 
    if (!selectSquares.some(Element => Element.includes(squareNumber))) {
        //this var retrives the html emelment id that was clicked
        let select = document.getElementById(squareNumber);
        //This condition checks whos turn it is 
        if (activePlayer === 'X') {
            //If active player is equal to x the x png is placed in html
            select.style.backgroundImage = 'url("images/x.png")';
            //Active player may only be x or o so if not x must be o 
        }else {
            //If activePlayer is equal to o the o.png is placed in html 
            select.style.backgroundImage = 'url(images/o.png")';
        }
        //squarenumber and active player are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions 
        checkWinConditons();
        //This condition is for changing the active player 
        if (activePlayer === 'X') {
            //changed player
            activePlayer = 'O';
        }else {
            //changed player to x
            activePlayer = 'X'
        }

        //This function is for sound
        Audio('./media/place.mp3');
        //this conditon checks to see if its the computers turn 
        if (activePlayer === 'O') {
            //this function disables clicking for comptuer choice
            disableClick();
            //This function waits 1 second before placing an image
            //and enabling click
            setTimeout(function () {  computersTurn();  }, 1000);
        }
        //Returning true is needed for our computers turn function to work 
        return true;
    }
    //This function results in a random square being selected 
    function computersTurn() {
        //This boolen is needed for our while loop
        let success = false;
        //This var stores a random number between 0 and 8 
        let pickASquare;
        //This condition allows our while loop to keep trying if a square is slected already
        while(!success) {
            //a random number between 0 and 8 is slected
            let pickASquare = String(Math.floor(Math.random() * 9));
            //If random number evaluates return true the square hasent been slected yet 
            if (placeXOrO(pickASquare)) {
                //This line calls the funtion
                placeXOrO(pickASquare);
                //This changes our boolen and ends the loop
                success = true;
        };
        }
    }
}

//This function parses the selectSquares array to search for win conditions.
//draw win line function is called to draw line if conditon is met 
function checkWinConditons() {
    // X 0, 1, 2 condition.
    if  (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    // X 3, 4, 5 condition.
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    // X 6, 7, 8 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    // X 0, 3, 6 condition.
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    // X 1, 4, 7 condition.
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    // X 2, 5, 8 condition.
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    // X 6, 4, 2 condition.
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    // X 0, 4, 8 condition.
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    // O  condition.
    else if  (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    // O 3, 4, 5 condition.
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    // O 6, 7, 8 condition.
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    // O 0, 3, 6 condition.
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    // O 1, 4, 7 condition.
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    // O 2, 5, 8 condition.
    else if (arrayIncludes('2O', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    // O 6, 4, 2 condition.
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    // O 0, 4, 8 condition.
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    //This condition checks for tie. If none of the above conditions register 
    // and 9 squares are selected , the codes exucutes
    else if (selectSquares.length >= 9) {
        Audio('./media/tie.mp3');
        //This function sets a .3 second timer before the resetgame is called
        setTimeout(function () { resetGame(); }, 1000);
    }
}
//This function checks if an array includes 3 strings 
//It is used to check for each win condition
function arrayIncludes(squareA, squareB, squareC) {
    //The next 3 vars will be used to check for 3 in a row 
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    if (a === true && b === true && c === true) { retrun true; };
}
//This function makes our body element temporaily unclickable
function disableClick() {
    //This makes our body unclickable
    body.style.pointerEvents = 'none';
    //This makes our body clickable again after 1 second 
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}
//This function takes a string parameter of the path you set earlier for
//placement sound 
function audio(audioURL) {
    //we create a new audio object and we pass the path as a parameter
    let audio = new audio(audioURL);
    //play method plays our audio sound
    audio.play();
}
//This function utlizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our html canvas element 
    const canvas = document.getElementById('Win-lines');
    //this line gives us acess to methods and proprtys to use on canvas
    const c = canvas.getContext('2d');
    let x1 = coordX1,
    y1 = coordY1,
    x2 = coordX2,
    y2 = coordY2,
    x = x1,
    y = y1;
}
//this function interacts with the canvas
function animateLineDrawing() {
    //This if for when the game ends and restarts 
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    //This method clears content form last loop 
    c.clearRect(0, 0, 608, 608);
    //This method starts a new path
    c.beginPath();
    //Moves to a starting point
    c.moveTo(x1, y1);
    //This method indecates the end point of our line
    c.lineTo(x, y);
    //This method sets the the width of our line
    c.lineWidth = 10;
    //This method sets the color of our line
    c.strokeStyle = 'rgba(70, 255, 33, .8)';
    //This method draws everything we laid out above 
    c.stroke();
    //This condition checks if weve reached the end point
    if (x1 <= x2 && y1 <= y2) {
        //This condition adds 10 to the previous x end point
        if (x < x2) { x += 10; }
        //This condition adds 10 to the previous y end point
        if (y < y2) { y += 10; }
        //This condition cancles our animation loop
        if (x >+ x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y-= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
}
//This function clears out the canvas after win line is drawn
function clear() {
    const animationLoop = requestAnimationFrame(clear);
    c.clearRect(0, 0, 608, 608);
    cancelAnimationFrame(animationLoop);
}
disableClick();
audio('./media/winGame.mp3');
animateLineDrawing();
setTimeout(function () { clear(); resetGame(); }, 1000);