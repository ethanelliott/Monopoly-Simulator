var dice = function(count) {
	this.dice = [];
	this.roll = function() {
		for (var i = 0; i < count; i++)
		{
			this.dice[i] = Math.floor((Math.random() * 6)) + 1;
		}
	};
	this.sum = function() {
		var total = 0;
		for (var i = 0; i < count; i++)
		{
			total += this.dice[i];
		}
		return total;
	}
	this.isAllSame = function() {
		var x = this.dice[0];
		for (var i = 0; i < count; i++)
		{
			if (this.dice[i] != x)
			{
				return false;
			}
		}
		return true;
	}
	this.draw = function() {
		fill(255,255,255);
		stroke(0);
		rect(10, 10, 70, 70);
		rect(10, 100, 70, 70);
		textSize(50);
		textAlign(CENTER);
		strokeWeight(4);
		text(this.sum(), 45, 180);
		if (this.isAllSame())
		{
			textSize(25);
			textAlign(CENTER);
			fill(255,0,0);
			stroke(255);
			strokeWeight(4);
			text("DBLS!", 50, 230);
		}
		for (var i = 0; i < count; i++)
		{
			translate(45,45 + (i*90));
			fill(0);
			stroke(0);
			switch(this.dice[i])
			{
				case 1:
					ellipse(0,0,10);
					break;
				case 2:
					ellipse(-15,-15,10);
					ellipse(15,15,10);
					break;
				case 3:
					ellipse(-20,-20,10);
					ellipse(0,0,10);
					ellipse(20,20,10);
					break;
				case 4:
					ellipse(-15,-15,10);
					ellipse(15,-15,10);
					ellipse(-15,15,10);
					ellipse(15,15,10);
					break;
				case 5:
					ellipse(-20,-20,10);
					ellipse(20,-20,10);
					ellipse(0,0,10);
					ellipse(-20,20,10);
					ellipse(20,20,10);
					break;
				case 6:
					ellipse(-20,-20,10);
					ellipse(20,-20,10);
					ellipse(-20,0,10);
					ellipse(20,0,10);
					ellipse(-20,20,10);
					ellipse(20,20,10);
					break;

			}
			translate(-45,-(45 + (i*90)));
		}
	};
};

var player = function(n, s) {
	this.name = n;
	this.money = s;
	this.property = [];
	this.credit = function(a) {
		this.money += a;
	};
	this.debit = function(a) {
		this.money -= a;
	};
};

var drawPlayerBoard = function(players, atBat) {
	translate(width-240, 20);
	fill(255);
	stroke(0);
	rect(0,0,220, 40 + (30*players.length));
	rect(0,0,80,  40 + (30*players.length));
	rect(0,0,220, 40);
	fill(0);
	text("PLAYERS", 110, 10);

	for (var i = 0; i < players.length; i++) {
		if (i == atBat)
		{
			noFill();
			stroke(255,0,0);
			rect(0,40 + (30*i),220,30);
		}
		noStroke();
		fill(0);
		textAlign(RIGHT);
		text("$" + players[i].money, 75, 45 + (30*i));
		textAlign(LEFT);
		text(players[i].name, 85, 45 + (30*i));
	}
	translate(-(width-240), -20);
};

var writePlaceName = function(t, x, y, x2, y2, ffs) {
	fill(0);
	textAlign(CENTER,TOP);
	if(ffs) {
		textSize(ffs);
	} else {
		textSize(12);
	}
	noStroke();
	text(t, x, y, x2, y2);
	stroke(0);
};

var drawGameboard = function() {
	var boardWidth = 1000;
	var innerSquare = boardWidth - (boardWidth / 3);
	stroke(0,0,0);
	strokeWeight(5);
	fill(0);

	rect((windowWidth - boardWidth)/2, (windowHeight - boardWidth)/2, boardWidth, boardWidth);
	fill(150,255,150);
	rect((windowWidth - innerSquare)/2, (windowHeight - innerSquare)/2, innerSquare, innerSquare);
	strokeWeight(2);

	fill(150,255,150);
	rect((windowWidth - boardWidth)/2, (windowHeight - boardWidth)/2, (boardWidth / 6), (boardWidth / 6));
	translate((windowWidth - boardWidth)/2, (windowHeight - boardWidth)/2);
	rotate(PI*-0.25);
	writePlaceName(GameBoard[20].name, 0, (boardWidth / 16), 0, 100, 30);
	rotate(-PI*-0.25);
	translate(-(windowWidth - boardWidth)/2,-(windowHeight - boardWidth)/2);

	fill(150,255,150);
	rect(innerSquare + ((boardWidth) / 6) + ((windowWidth - boardWidth)/2), (windowHeight - boardWidth)/2, (boardWidth / 6), (boardWidth / 6));
	translate(innerSquare + (boardWidth / 6) + ((windowWidth - boardWidth)/2), (windowHeight - boardWidth)/2);
	rotate(PI*0.25);
	writePlaceName(GameBoard[30].name, (boardWidth / 8), -(boardWidth / 16), 0, boardWidth/6, 30);
	rotate(-PI*0.25);
	translate(-(innerSquare + (boardWidth / 6) + ((windowWidth - boardWidth)/2)),-((windowHeight - boardWidth)/2));

	fill(150,255,150);
	rect(innerSquare + ((windowWidth - innerSquare)/2),innerSquare + ((windowHeight - innerSquare)/2), (boardWidth / 6), (boardWidth / 6));
	translate(innerSquare + ((windowWidth - innerSquare)/2), innerSquare + ((windowHeight - innerSquare)/2));
	rotate(PI*-0.25);
	writePlaceName(GameBoard[0].name, 0, (boardWidth / 16), 0, 100, 30);
	rotate(-PI*-0.25);
	translate(-(innerSquare + ((windowWidth - innerSquare)/2)), -(innerSquare + ((windowHeight - innerSquare)/2)));

	fill(150,255,150);
	rect((windowWidth - boardWidth)/2, innerSquare + (boardWidth / 6) + ((windowHeight - boardWidth)/2), (boardWidth / 6), (boardWidth / 6));
	fill(255, 145, 0);
	rect((boardWidth / 18) + ((windowWidth - boardWidth)/2), innerSquare + (boardWidth / 6) + ((windowHeight - boardWidth)/2), (boardWidth / 9), (boardWidth / 9));
	translate((windowWidth - boardWidth)/2, innerSquare + (boardWidth / 6) + ((windowHeight - boardWidth)/2));
	rotate(PI*0.25);
	writePlaceName(GameBoard[10].name, (boardWidth / 8), -(boardWidth / 16), 0, boardWidth/6, 30);
	rotate(-PI*0.25);
	translate(-((windowWidth - boardWidth)/2), -(innerSquare + (boardWidth / 6) + ((windowHeight - boardWidth)/2)));

	//Logo
	translate(windowWidth/2, windowHeight/2);
	rotate(PI*-0.25);

	stroke(0);
	fill(0,100,255);
	rect(-110, -(innerSquare - 100)/2, 220, 140);
	stroke(0);
	fill(255, 145, 0);
	rect(-110, 150, 220, 140);

	strokeWeight(8);
	stroke(0);
	fill(255,0,0);
	rect(-innerSquare/2,-60,innerSquare,120);
	fill(255,255,255);
	stroke(150,150,150);
	textSize(100);
	textAlign(CENTER,CENTER);
	text("MONOPOLY", 0, 0);
	rotate(-PI*-0.25);
	translate(-windowWidth/2, -windowHeight/2);


	stroke(0);
	strokeWeight(2);

	var placeX = (windowWidth - boardWidth)/2 + (boardWidth / 6);
	var placeY = (windowHeight - boardWidth)/2;
	var placeWidth = (boardWidth - (boardWidth/3))/9;
	var placeHeight = (boardWidth / 6);
	for (var i = 0; i < 9; i++)
	{
		fill(150,255,150);
		rect(placeX, placeY, placeWidth, placeHeight);
		switch(i) {
			case 0:
				writePlaceName(GameBoard[21].name, placeX, placeY + (placeHeight * 3/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[21].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				fill(255,0,0);
				rect(placeX, placeY + (placeHeight * 5/6), placeWidth, (placeHeight * 1/6));
				break;
			case 1:
				writePlaceName(GameBoard[22].name, placeX, placeY + (placeHeight * 4/6), placeWidth, placeHeight);
				break;
			case 2:
				writePlaceName(GameBoard[23].name, placeX, placeY + (placeHeight * 3/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[23].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				fill(255,0,0);
				rect(placeX, placeY + (placeHeight * 5/6), placeWidth, (placeHeight * 1/6));
				break;
			case 3:
				writePlaceName(GameBoard[24].name, placeX, placeY + (placeHeight * 3/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[24].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				fill(255,0,0);
				rect(placeX, placeY + (placeHeight * 5/6), placeWidth, (placeHeight * 1/6));
				break;
			case 4:
				writePlaceName(GameBoard[25].name, placeX, placeY + (placeHeight * 4/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[25].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				break;
			case 5:
				writePlaceName(GameBoard[26].name, placeX, placeY + (placeHeight * 3/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[26].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				fill(255,255,0);
				rect(placeX, placeY + (placeHeight * 5/6), placeWidth, (placeHeight * 1/6));
				break;
			case 6:
				writePlaceName(GameBoard[27].name, placeX, placeY + (placeHeight * 3/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[27].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				fill(255,255,0);
				rect(placeX, placeY + (placeHeight * 5/6), placeWidth, (placeHeight * 1/6));
				break;
			case 7:
				writePlaceName(GameBoard[28].name, placeX, placeY + (placeHeight * 4/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[28].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				break;
			case 8:
				writePlaceName(GameBoard[29].name, placeX, placeY + (placeHeight * 3/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[29].cost, placeX, placeY + (placeHeight * 1/12), placeWidth, placeHeight, 20);
				fill(255,255,0);
				rect(placeX, placeY + (placeHeight * 5/6), placeWidth, (placeHeight * 1/6));
				break;
		}
		placeX += placeWidth;
	}
	placeX = (windowWidth - boardWidth)/2 + (boardWidth / 6);
	placeY = ((windowHeight - boardWidth)/2) + (boardWidth / 6) + (innerSquare);
	placeWidth = (boardWidth - (boardWidth/3))/9;
	placeHeight = (boardWidth / 6);
	for (var i = 0; i < 9; i++)
	{
		fill(150,255,150);
		rect(placeX, placeY, placeWidth, placeHeight);
		switch(i) {
			case 0:
				writePlaceName(GameBoard[9].name, placeX, placeY + (placeHeight * 2/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[9].cost, placeX, placeY + (placeHeight * 9/12), placeWidth, placeHeight, 20);
				fill(50, 196, 255);
				rect(placeX, placeY, placeWidth, (placeHeight * 1/6));
				break;
			case 1:
				writePlaceName(GameBoard[8].name, placeX, placeY + (placeHeight * 2/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[8].cost, placeX, placeY + (placeHeight * 9/12), placeWidth, placeHeight, 20);
				fill(50, 196, 255);
				rect(placeX, placeY, placeWidth, (placeHeight * 1/6));
				break;
			case 2:
				writePlaceName(GameBoard[7].name, placeX, placeY + (placeHeight * 1/6), placeWidth, placeHeight);
				break;
			case 3:
				writePlaceName(GameBoard[6].name, placeX, placeY + (placeHeight * 2/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[6].cost, placeX, placeY + (placeHeight * 9/12), placeWidth, placeHeight, 20);
				fill(50, 196, 255);
				rect(placeX, placeY, placeWidth, (placeHeight * 1/6));
				break;
			case 4:
				writePlaceName(GameBoard[5].name, placeX, placeY + (placeHeight * 1/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[5].cost, placeX, placeY + (placeHeight * 9/12), placeWidth, placeHeight, 20);
				break;
			case 5:
				writePlaceName(GameBoard[4].name, placeX, placeY + (placeHeight * 1/6), placeWidth, placeHeight);
				break;
			case 6:
				writePlaceName(GameBoard[3].name, placeX, placeY + (placeHeight * 2/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[3].cost, placeX, placeY + (placeHeight * 9/12), placeWidth, placeHeight, 20);
				fill(99, 48, 0);
				rect(placeX, placeY, placeWidth, (placeHeight * 1/6));
				break;
			case 7:
				writePlaceName(GameBoard[2].name, placeX, placeY + (placeHeight * 1/6), placeWidth, placeHeight);
				break;
			case 8:
				writePlaceName(GameBoard[1].name, placeX, placeY + (placeHeight * 2/6), placeWidth, placeHeight);
				writePlaceName("$" + GameBoard[1].cost, placeX, placeY + (placeHeight * 9/12), placeWidth, placeHeight, 20);
				fill(99, 48, 0);
				rect(placeX, placeY, placeWidth, (placeHeight * 1/6));
				break;
		}
		placeX += placeWidth;
	}
	placeX = (windowWidth - boardWidth)/2;
	placeY = ((windowHeight - boardWidth)/2) + (boardWidth / 6);
	placeWidth = (boardWidth / 6);
	placeHeight = (boardWidth - (boardWidth/3))/9;

	for (var i = 0; i < 9; i++)
	{
		fill(150,255,150);
		rect(placeX, placeY, placeWidth, placeHeight);
		switch(i) {
			case 0:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[19].name, 0, 0 - (placeWidth * 4/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[19].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				fill(255, 124, 0);
				rect(placeX + placeWidth - (placeWidth * 1/6), placeY, (placeWidth * 1/6), placeHeight); //
				break;
			case 1:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[18].name, 0, 0 - (placeWidth * 4/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[18].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				fill(255, 124, 0);
				rect(placeX + placeWidth - (placeWidth * 1/6), placeY, (placeWidth * 1/6), placeHeight); //
				break;
			case 2:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[17].name, 0, 0 - (placeWidth * 5/6),placeHeight, placeWidth);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				break;
			case 3:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[16].name, 0, 0 - (placeWidth * 4/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[16].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				fill(255, 124, 0);
				rect(placeX + placeWidth - (placeWidth * 1/6), placeY, (placeWidth * 1/6), placeHeight); //
				break;
			case 4:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[15].name, 0, 0 - (placeWidth * 5/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[15].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				break;
			case 5:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[14].name, 0, 0 - (placeWidth * 4/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[14].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				fill(255, 0, 191);
				rect(placeX + placeWidth - (placeWidth * 1/6), placeY, (placeWidth * 1/6), placeHeight);
				break;
			case 6:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[13].name, 0, 0 - (placeWidth * 4/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[13].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				fill(255, 0, 191);
				rect(placeX + placeWidth - (placeWidth * 1/6), placeY, (placeWidth * 1/6), placeHeight);
				break;
			case 7:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[12].name, 0, 0 - (placeWidth * 5/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[12].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				break;
			case 8:
				translate(placeX, placeY);
				rotate(PI/2.0);
				writePlaceName(GameBoard[11].name, 0, 0 - (placeWidth * 4/6),placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[11].cost, 0, 0 - (placeWidth * 1/6), placeHeight, placeWidth, 20);
				rotate(-PI/2.0);
				translate(-placeX,-placeY);
				fill(255, 0, 191);
				rect(placeX + placeWidth - (placeWidth * 1/6), placeY, (placeWidth * 1/6), placeHeight);
				break;
		}
		placeY += placeHeight;
	}
	placeX = ((windowWidth - boardWidth)/2) + (boardWidth / 6) + (innerSquare);
	placeY = ((windowHeight - boardWidth)/2) + (boardWidth / 6);
	placeWidth = (boardWidth / 6);
	placeHeight = (boardWidth - (boardWidth/3))/9;
	for (var i = 0; i < 9; i++)
	{
		fill(150,255,150);
		rect(placeX, placeY, placeWidth, placeHeight);
		switch(i) {
			case 0:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[31].name, 0 - placeHeight, 0 + (placeWidth * 2/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[31].cost, 0 - placeHeight, 0 + (placeWidth * 5/6), placeHeight, placeWidth, 20);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				fill(38, 163, 77);
				rect(placeX, placeY, (placeWidth * 1/6), placeHeight); //
				break;
			case 1:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[32].name, 0 - placeHeight, 0 + (placeWidth * 2/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[32].cost, 0 - placeHeight, 0 + (placeWidth * 5/6), placeHeight, placeWidth, 20);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				fill(38, 163, 77);
				rect(placeX, placeY, (placeWidth * 1/6), placeHeight); //
				break;
			case 2:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[33].name, 0 - placeHeight, 0 + (placeWidth * 1/6), placeHeight, placeWidth);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				break;
			case 3:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[34].name, 0 - placeHeight, 0 + (placeWidth * 2/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[34].cost, 0 - placeHeight, 0 + (placeWidth * 5/6), placeHeight, placeWidth, 20);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				fill(38, 163, 77);
				rect(placeX, placeY, (placeWidth * 1/6), placeHeight); //
				break;
			case 4:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[35].name, 0 - placeHeight, 0 + (placeWidth * 1/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[35].cost, 0 - placeHeight, 0 + (placeWidth * 5/6), placeHeight, placeWidth, 20);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				break;
			case 5:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[36].name, 0 - placeHeight, 0 + (placeWidth * 1/6), placeHeight, placeWidth);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				break;
			case 6:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[37].name, 0 - placeHeight, 0 + (placeWidth * 2/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[37].cost, 0 - placeHeight, 0 + (placeWidth * 5/6), placeHeight, placeWidth, 20);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				fill(0, 43, 220);
				rect(placeX, placeY, (placeWidth * 1/6), placeHeight);
				break;
			case 7:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[38].name, 0 - placeHeight, 0 + (placeWidth * 1/6), placeHeight, placeWidth);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				break;
			case 8:
				translate(placeX, placeY);
				rotate(PI*1.5);
				writePlaceName(GameBoard[39].name, 0 - placeHeight, 0 + (placeWidth * 2/6), placeHeight, placeWidth);
				writePlaceName("$" + GameBoard[39].cost, 0 - placeHeight, 0 + (placeWidth * 5/6), placeHeight, placeWidth, 20);
				rotate(-PI*1.5);
				translate(-placeX,-placeY);
				fill(0, 43, 220);
				rect(placeX, placeY, (placeWidth * 1/6), placeHeight);
				break;
		}
		placeY += placeHeight;
	}

};

var button = function(t, x, y, w, h, c, cH, cC, tC, tS) {
	this.text = t;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = c;
	this.colorHover = cH;
	this.colorClick = cC;
	this.textColor = tC;
	this.textSize = tS;
	this.wasPressed = false;
	this.draw = function() {
		noStroke();
		if ((mouseX > this.x && mouseX < (this.x + this.w)) && (mouseY > this.y && mouseY < (this.y + this.h))) {
			cursor(HAND);
			if (mouseIsPressed) {
				fill(this.colorClick[0], this.colorClick[1], this.colorClick[2]);
			} else {
				fill(this.colorHover[0], this.colorHover[1], this.colorHover[2]);
			}
		} else {
			cursor(ARROW);
			fill(this.color[0], this.color[1], this.color[2]);
		}
		rect(this.x, this.y, this.w, this.h);
		textAlign(CENTER, CENTER);
		noStroke();
		textSize(this.textSize);
		fill(this.textColor[0],this.textColor[1],this.textColor[2])
		var m = this.x + (this.w/2);
		text(this.text, this.x, this.y,this.w, this.h);
	};
	this.isClicked = function(callback) {
		if ((mouseX > this.x && mouseX < (this.x + this.w)) && (mouseY > this.y && mouseY < (this.y + this.h))) {
			if (!this.wasPressed && mouseIsPressed) {
				callback();
				this.wasPressed = true;
			}
			else if (this.wasPressed && !mouseIsPressed)  {
				this.wasPressed = false;
			}
		}
	};
};

var d;

var players = [];
var currentPlayer = 0;

var buttons = [];

function setup() {
	//Make the screen
	createCanvas(windowWidth, windowHeight);

	//create the dice
	d = new dice(2);
	d.roll();

	//create the players
	players[0] = new player("Ethan", 1000);
	players[1] = new player("Ethan", 1000);
	players[2] = new player("Ethan", 1000);

	//create a button
	buttons[0] = new button("NEXT", windowWidth-220, 200, 200, 100, [0,0,0], [100,100,100], [255,0,0], [255,255,255], 30);
}

function draw()
{
	background(200,200,200);
	drawGameboard();
	drawPlayerBoard(players, currentPlayer);
	d.draw();

	buttons[0].draw();
	buttons[0].isClicked(function() {
		d.roll();
		currentPlayer++;
		if (currentPlayer >= players.length) {
			currentPlayer = 0;
		}
	});
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
