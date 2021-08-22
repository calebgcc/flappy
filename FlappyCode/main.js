

// VAR

var c;
var ctx;
var end;

var bird;

var sfondo = new Image();
sfondo.src ="background.png";

var avatar = new Image();
avatar.src="bird.png";

var tuboUp = new Image();
tuboUp.src="tuboUp.png";

var tuboDown = new Image();
tuboDown.src="tuboDown.png";

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
		this.vy+=this.g;
	}

}


// TUBI

var tubi = [];

tubi[0] ={
	x:288,
	y:0,
};


function gameOver(){
	document.getElementById("over").style.visibility="visible";
}

function rigioca(){
	window.location.reload();
}

function update(){

	ctx.drawImage(sfondo,0,0,288,384);

	for(var i=0;i<tubi.length;i++){
		ctx.drawImage(tuboUp,tubi[i].x,tubi[i].y,60,300);
		ctx.drawImage(tuboDown,tubi[i].x,tubi[i].y+360,60,300);
		tubi[i].x--;

		if(tubi[i].x==50){
			tubi.push({x:288,y:Math.floor(Math.random()*200)-200})
		}

		//fase di game over
		if(bird.x==tubi[i].x-30 && (bird.y>=tubi[i].y && bird.y<=tubi[i].y+280)){
			gameOver();
			clearInterval(end);
			console.log("game over");
		}

		if(bird.x==tubi[i].x+10 && (bird.y>=tubi[i].y && bird.y<=tubi[i].y+280)){
			gameOver();
			clearInterval(end);
			console.log("game over");
		}

		if((bird.y>=tubi[i].y && bird.y<=tubi[i].y+285)&&(bird.x>=tubi[i].x && bird.x<=tubi[i].x+60)){
			gameOver();
			clearInterval(end);
			console.log("game over")
		}


		if(bird.x==tubi[i].x-40 && bird.y>=tubi[i].y+330){
			gameOver();
			clearInterval(end);
			console.log("game over");
		}

		if(bird.x==tubi[i].x+10 && bird.y>=tubi[i].y+330){
			gameOver();
			clearInterval(end);
			console.log("game over");
		}

		if(bird.x==tubi[i].x+60)
			point++;

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
		console.log("vola vola volaa");
	});

	end = setInterval("update()",10);
}
