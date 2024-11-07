
var width = 200;
var height = 200;

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
    }

    collisionWithWalls(){
        if (this.y<=10 || this.y>=height - 10) {
            this.vy=-this.vy;
        }
        if (this.x<=10 || this.x>=width -10) {
            this.vx= -this.vx;
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

var balls = []; 

function updatePositions(){
    for (i=0; i<balls.length; i++){
        balls[i].updatePosition();        
    }
}

function collisions()
{
    for (i=0; i<balls.length; i++){
        balls[i].collisionWithWalls();
        for (j=i+1; j<balls.length; j++){
            balls[i].colisionWith(balls[j]);
        }
    }
}

function drawScreen(){
    var canva = document.getElementById("ball_canvas");
    var ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    for (i=0; i<balls.length; i++){
        balls[i].drawBall(ctx);
    }
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

function init (){
    var canva = document.getElementById("ball_canvas");
    width = canva.width;
    height = canva.height;
    balls.push(new Ball(30, 30 ,1, -2,'#225588'))
    balls.push(new Ball(100, 100 ,1, -2, '#885522')) 
    balls.push(new Ball(130, 30 ,2, -2, '#228855'))
    balls.push(new Ball(20, 180 ,-1, 2, '#558822')) 
    balls.push(new Ball(30, 130 ,1, 1, '#552288'))
    balls.push(new Ball(60, 160 ,-1, -1, '#882255')) 
    console.log(balls);
    canva.addEventListener("touchstart", update,{passive: true});
    canva.addEventListener("touchend", update,{passive: true});
    canva.addEventListener("touchcancel", update,{passive: true});
    canva.addEventListener("touchmove", update,{passive: true});
    animation();
}

init();