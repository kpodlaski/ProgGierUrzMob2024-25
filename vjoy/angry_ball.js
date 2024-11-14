
var width = 200;
var height = 600;
var grav = {x : 0, y : .05};

class Ball{

    constructor(x, y, vx, vy, color){
        this.x = x;
        this.y=y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }

    drawBall(ctx){
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
    }

    updatePosition(){
        this.x += this.vx;
        this.y += this.vy;
        this.vx += grav.x;
        this.vy += grav.y;
    }

    collisionWithWalls(){
        if (this.y<=10 || this.y>=height - 10) {
            this.vy=-this.vy/2;
            this.vx/=1.05;
        }
        if (this.x<=10 || this.x>=width -10) {
            this.vx= -this.vx/2;
        }   
    }

    colisionWith(ball){

        if ( (Math.pow(this.x - ball.x,2) + Math.pow(this.y - ball.y,2) )<200 ){
            if (Math.abs(this.x - ball.x)< 10) {
                this.bounceX();
                ball.bounceX();
            }
            if (Math.abs(this.y - ball.y)< 10) {
                this.bounceY();
                ball.bounceY();
            }
        }
    }

    bounceX(){
        this.vx=-this.vx;
    }

    
    bounceY(){
        this.vy=-this.vy;
    }
}

var ball; 

function updatePositions(){
    ball.updatePosition();        
}

function collisions()
{
    ball.collisionWithWalls();
}

function drawScreen(){
    var canva = document.getElementById("game_canvas");
    var ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    ball.drawBall(ctx);
}

function animation(){
    updatePositions();
    collisions();
    drawScreen();   
    setTimeout(animation,10);
}

function update(event){
    const touch = event.changedTouches[0];
    var aX=touch.clientX; 
    var aY=touch.clientY; 
    console.log("[", aX,"," , aY, "]");
    
}

function message(x,y){
    ball.vx = 5*x/vJoy.R;
    ball.vy = 5*y/vJoy.R;
    console.log(ball);
}


function init (){
    var canva = document.getElementById("game_canvas");
    width = canva.width;
    height = canva.height;
    ball = new Ball(30, 100 ,0, 0,'#225588');
    console.log(ball);
    canva.addEventListener("touchstart", update,{passive: true});
    canva.addEventListener("touchend", update,{passive: true});
    canva.addEventListener("touchcancel", update,{passive: true});
    canva.addEventListener("touchmove", update,{passive: true});
    animation();      
    
    
}

vJoy= new VJoy( "vjoy_canvas", message);
document.addEventListener("DOMContentLoaded", vJoy.init.bind(vJoy));
init();