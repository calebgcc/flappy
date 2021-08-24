

// VAR

var c;
var ctx;
var end;

var bird;

var sfondo = new Image();
sfondo.src ="img/background.png";

var avatar = new Image();
avatar.src="img/bird.png";

var tuboUp = new Image();
tuboUp.src="img/tuboUp.png";

var tuboDown = new Image();
tuboDown.src="img/tuboDown.png";

var point=0;

class Player{

	constructor(){
		this.x=10;
		this.y=150;
		this.vy=0;
		this.g=0.1;
	}

	show(){
		ctx.drawImage(avatar,this.x,this.y,40,30);
	}

	fly(){
		this.vy=-2;
	}

	gravity(){
		this.y+=this.vy;
		if(this.y > 354){
			this.y = 354;
		}
		this.vy+=this.g;
	}

}


// TUBI
var SPEED_GAME = 2;
var tubi = [];
var SPEED_TUBE = 50;

tubi[0] ={
	x:288,
	y:-100,
};




function gameOver(){
	clearInterval(end);
	document.getElementById("over").style.visibility="visible";
	// AI
	/*
	console.clear();
	triggerGameOver();

	tubi = [];
	point = 0;
	tubi[0] ={
		x:288,
		y:-100,
	};
	setup();
	*/
}

function rigioca(){
	window.location.reload();
}

function update(){

	ctx.drawImage(sfondo,0,0,288,384);

	// AI
	//************************************** */
	/*
	if(tubi[0].x < tubi[1].x && bird.x < tubi[0].x)
		targetTube = 0;
	else
		targetTube = 1;

	if(bird.x - tubi[targetTube].x < 50){
		var state = {
			dfy: (tubi[targetTube].y+300+42)-bird.y,
			speedy: Math.round(bird.vy*100),
			tubex :tubi[targetTube].x,
		}

		var doAction = getAction(state);

		var record = {
			env: state,
			action: doAction
		}
		buffer.push(record);
		episodeFrame++;
		if(doAction == qAction.JUMP)
			bird.fly();
		AZIONE = 0;
	}
	*/
	//************************************ */

	for(var i=0;i<tubi.length;i++){
		ctx.drawImage(tuboUp,tubi[i].x,tubi[i].y,60,300);
		ctx.drawImage(tuboDown,tubi[i].x,tubi[i].y+385,60,300);
		tubi[i].x--;

		if(tubi[i].x+60==0){
			tubi.splice(i,1);
			i--;
			continue;
		}

		if(tubi[i].x==SPEED_TUBE){
			tubi.push({x:288,y:Math.floor(Math.random()*200)-200})
		}
		
		//rules game over
		if(bird.x==tubi[i].x-30 && (bird.y<tubi[i].y+295 || bird.y > tubi[i].y+365)){
			console.log("frontale");
			gameOver();
		}
		if(bird.x>tubi[i].x && bird.x<tubi[i].x+60 && (bird.y<tubi[i].y+295 || bird.y>tubi[i].y+365)){
			console.log("interno");
			gameOver();
		}
		if(bird.y>384 || bird.y<0){
			console.log("fuori dal terreno di gioco");
			gameOver();
		}

		if(bird.x==tubi[i].x+60){
			point++;
			SPEED_TUBE = Math.floor(point/10)*10 + 50;

			// AI
			//doReward(15,true);
		}
		ctx.font = "30px Arial";
		ctx.fillStyle="white";
		ctx.fillText(point.toString(), 10, 30);
	}
	
	bird.show();
	bird.gravity();
}


function setup(){

	c = document.getElementById("canvas");
	ctx = c.getContext("2d");

	bird = new Player();

	document.body.addEventListener("keypress",fly =>{
		bird.fly();
	});

	end = setInterval(update,8);
}
