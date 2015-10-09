"use strict";

(function() {
//Module variables
var blankTop = 232;
var blankLeft = 232;
var pixels = 77;
var row = 4;
var game = false;
var time = null;
var rec = null;
	
	//On load function
	window.onload = function() {
		//Calls a function that creates all 15 tiles
		createTiles();

		//Attaches an event handler to the shuffle button that calls the shuffle function
		document.getElementById("shufflebutton").onclick = shuffle;
	};


	//Function that creates the tiles or squares
	function createTiles() {
		//Variables X and Y or top and left are the starting position of the square and image.
		var x = 0;
		var y = 0;
		//For loop that is traversed 15 times
		for(var i = 1; i <= 15; i++){
			//Create a div
			var square = document.createElement("div");
			//Add text to div
			square.innerHTML = i;
			//Give div an ID
			square.id = "square_" + (y + 1) + "_" + (x + 1);
			//Set div's class
			square.className = "square";
			//Positions the div in the correct order
			square.style.top = y * pixels + 1 + "px";
			square.style.left = x * pixels + 1 + "px";
			//Attach onclick handler that calls move
			square.onclick = move;
			//Attach onmouseover handler that calls highlight
			square.onmouseover = highlight;
			//Attach onmouseleave handler that calls unhighlight
			square.onmouseleave = unhighlight;
			document.getElementById("puzzlearea").appendChild(square);
			//Updates x by 1
			if((x % 2) == 0) {
				square.style.backgroundColor = "#96281B";
			} else {
				square.style.backgroundColor = "#FDE3A7";
			}
			x++;
			//If x is greater than the row size set it back to 0 and update y by 1.
			if(x >= row){
				x = 0;
				y++;
			}
		}
	}

	//Called when curser moves out of div
	//Sets the border, color, and cursor properties back to normal
	function unhighlight() {
		//Change border color back
		this.style.borderColor = "#95A5A6";
		//Change content color back
		this.style.color = "#95A5A6";
		//Change cursor back to th default arrow
		this.style.cursor = "default";
	}

	//Called when cursor moves over a div
	//If the div can move its border, colo, and cursor are changed
	function highlight() {
		//Calls function that tests if the current square is a neighbor to the empty square
		if(neighborTest(this)) {
			//Sets border to red
			this.style.borderColor = "#F2F1EF";
			//Sets color to red
			this.style.color = "#F2F1EF";
			//Changes cursor to pointer
			this.style.cursor = "pointer";
		}
	}

	//Called when user clicks on a square
	//If the div can move it is moved and values are updated
	function move() {
		//Calls function that tests if the square neighbors the empty square
		if(neighborTest(this)) {
			//Save info from the clicked square like its top and left
			var top = this.style.top;
			var left = this.style.left;
			//Parse those variables as integers
			var topInt = parseInt(top);
			var leftInt = parseInt(left);
			//Switch the square top and left value to the current blanksquares value
			this.style.top = blankTop + "px";
			this.style.left = blankLeft + "px";
			//Updates its id 
			this.id = "square_" + Math.round(((blankTop + pixels)/pixels)) + "_" 
			+ Math.round(((blankLeft + pixels)/pixels));
			//Updates the information about the blank square
			blankTop = topInt;
			blankLeft = leftInt;
		}
		if(game == true){
			var squares = document.getElementById("puzzlearea").children;
			var tot = 0
			var x = 0;
			var y = 0;
			for(var i = 1; i <=15; i++) {
				var id = squares[i-1].id;
				if(id != "square_" + (y + 1) + "_" + (x + 1)) {
					break;
				} else {
					x++;
					if(x >= row) {
						x = 0;
						y++;
					}
				}
				tot++;
			}
			if(tot == 15){
				game == false;
				var d = new Date();
        		var t = d.getTime();
        		rec = (t - time)/1000
        		alert("Game over! Time = " + rec + " seconds!");
			}
		}
	}

	//Called when user presses shuffle button
	//Creates a 'hopefully' solveable puzzle
	function shuffle() {
		var d = new Date();
      var t = d.getTime();
		time = t;
		//Runs 1000 moves
		for(var i = 0; i < 1000; i++){
			//Create an array
			var neighbors = [];
			//Get the puzzle area
			var list = document.getElementById("puzzlearea");
			//Traverses all 15 children that are the squares
			for(var j = 0; j < 15; j++){
				//Saves each square
				var squares = list.children[j];
				//Tests if that square is a neighbor
				if(neighborTest(squares)){
					//Adds square to the array if it passes the test
					neighbors.push(squares);
				}
			}
			//Generate a random number between 0 and the length of the array
			var rand = parseInt(Math.random() * neighbors.length);
			//Calls a function that moves one of the neighbors at random
			moveThis(neighbors[rand]);
		}
		game = true;
	}

	//Tests if a square is a neighbor to the empty square
	//Accepts a parameter (hopefully a div element)
	function neighborTest(square) {
		//Gets the top and left of the element
		var top = square.style.top;
		var left = square.style.left;
		//Parses those values as integers
		var topInt = parseInt(top);
		var leftInt = parseInt(left);
		//Tests if they are above, below, left or right of the blank square
					//Above
		if(((topInt == blankTop + pixels)&&(leftInt == blankLeft))||
					//Below
			((topInt == blankTop - pixels)&&(leftInt == blankLeft))||
					//Right
			((topInt == blankTop)&&(leftInt == blankLeft + pixels))||
					//Left
			((topInt == blankTop)&&(leftInt == blankLeft - pixels))) {
			//Returns true if the passed in parameter is a neighbor
			return true;
		} else {
			//False otherwise
			return false;
		}
	}

	//This function is only called by shuffle, and moves a particular square
	//Accepts a parameter (hopefully a div element)
	function moveThis(square){
		//Gets the element by the parameters passed in id
		var square = document.getElementById(square.id);
		//Gets information about the element like its top and left
		var top = square.style.top;
		var left = square.style.left;
		//Parses those values as integers
		var topInt = parseInt(top);
		var leftInt = parseInt(left);
		//Changes the blank square and the passed in squares position
		square.style.top = blankTop + "px";
		square.style.left = blankLeft + "px";
		//Updates the id of the moved square
		square.id = "square_" + Math.round(((blankTop + pixels)/pixels)) + "_" 
		+ Math.round(((blankLeft + pixels)/pixels));
		//Updates the blank squares information
		blankTop = topInt;
		blankLeft = leftInt;
	}

	function getName() {
		var name = document.getElementById("usr").value;
		var usrname = document.getElementById("userName");
      $(usrname).modal('hide');
		var xmlhttp = new XMLHttpRequest();
  		xmlhttp.open("GET","puzzlepage.php?time=" + rec + "&name=" + name, true);
  		xmlhttp.send();
  		//location.reload(true);
	}
})();