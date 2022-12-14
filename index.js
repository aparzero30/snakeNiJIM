//console.log("hello")

const canvas=document.getElementById('game');
const ctx = canvas.getContext('2d');


class snakeParadigm{

    constructor(x,y){
        this.x=x;
        this.y=y;
    }


}

let speed=7;
let tilecount = 25;
let tilesize = canvas.width/tilecount-7;

console.log(tilesize);

let headx = 10;
let heady = 10;
const snakeparts=[];
let taillength = 2;

let appx = 10;
let appy = 10;

let score = 0;

let ixvelocity=0;
let iyvelocity=0;


let xvelocity = 0;
let yvelocity = 0;

const ded = new Audio("sound.mp3");
const pok = new Audio("pokemon.mp3");


function drawGame(){
  //
    
 changeSnakePos();
    let result= isGameOver();

    if(result==true){
        
           return;
    }
    
    console.log("dumaan saken pre ule");




    clearscreen();
   
    checkappcollisiton();
    drawapp();
    drawSnake();
    displayscore();
 

    speed = 7 +score;




    setTimeout(drawGame, 1000/speed);


}



function isGameOver() {
    let gm = false;


   
 

    if (yvelocity === 0 && xvelocity === 0) {
      return false;
    }




//walls
    if(headx<0){
        gm = true;
    }

    else if(headx===32){
        gm = true;
       
    }

    else if(heady<0){
        gm = true;
        
    }

    else if(heady===32){
        gm = true;
       
    }

//check if head collided to a snake part  





for (let i = 0; i < snakeparts.length; i++) {
    let part = snakeparts[i];
    if (part.x === headx && part.y === heady) {
      gm = true;
      break;
    }
  }


  
if(gm){

    ded.play();

    //display game over
    ctx.fillStyle = "white";
    ctx.font = "50px Arial Black";
    ctx.fillText("Game over Score: " +score, canvas.width/8,canvas.height/2);



}





return gm;
    
  }




















function displayscore(){
ctx.fillStyle = "white";
ctx.font = "10px Verdana";
ctx.fillText("Score "+score, canvas.width-50,10)


}

function clearscreen(){
ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvas.clientWidth,canvas.height);

}

function  drawSnake(){

    ctx.fillStyle='aquamarine';

   for(let i=0;i<snakeparts.length; i++){
    let part = snakeparts[i];
    ctx.fillRect(part.x*tilecount,part.y*tilecount,tilesize,tilesize);
   }
   
   snakeparts.push(new snakeParadigm(headx,heady));

   if(snakeparts.length>taillength){
    snakeparts.shift();

   }

   ctx.fillStyle='aqua';
   ctx.fillRect(headx*tilecount,heady*tilecount, tilesize, tilesize);


}


function changeSnakePos(){

    headx = headx + xvelocity;
    heady = heady + yvelocity;
}


function drawapp(){

    ctx.fillStyle='#39FF14';
    ctx.fillRect(appx*tilecount,appy*tilecount,tilesize, tilesize)
}


// add score
function checkappcollisiton(){
if(appx == headx && appy == heady ){
    pok.play();
 appx = Math.floor(Math.random()*tilecount);
 appy = Math.floor(Math.random()*tilecount);
 taillength++;
 score++;

}
}




document.addEventListener('keydown',keyDown);


function keyDown(event){
//uo
    if(event.keyCode==38){
      
        if(yvelocity==1){
            return
        }
        yvelocity = -1;
        xvelocity = 0;
    }
//down
    if(event.keyCode==40){

    if(yvelocity==-1){
            return
        }
    yvelocity = 1;
    xvelocity = 0;
    }

//left
if(event.keyCode==37){

    if(xvelocity==1){
        return
    }

    yvelocity = 0;
    xvelocity = -1;
    }

//right
if(event.keyCode==39){

    if(xvelocity==-1){
        return
    }
    yvelocity = 0;
    xvelocity = 1;
    }


}



drawGame();