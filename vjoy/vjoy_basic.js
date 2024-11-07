var X =  100;
var Y =  100; 

function message(x,y){
    var posX = document.getElementById("posX");
    posX.innerHTML=x;
    var posY = document.getElementById("posY");
    posY.innerHTML=y;
}

function drawBall(x, y){
    var canva = document.getElementById("vjoy_canvas");
    var ctx = canva.getContext("2d");
    var dx = x + 100 
    var dy = y + 100
    ctx.beginPath();
    ctx.arc(dx, dy, 4, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#555588';
    ctx.fill();
    console.log('drawing ['+dx+','+dy+']');
}

function update(event){
    const touch = event.changedTouches[0];
    var canva = document.getElementById("vjoy_canvas");
    var aX=touch.clientX - 100; //0 canvas positon, 100 circle_width/2
    var aY=touch.clientY - 250 -100; //250 canvas positon, 100 circle_height/2
    if (aX*aX+aY*aY>10000){
        console.log('outside range');
        return;    
    }
    console.log('['+aX+','+aY+']');
    drawBall(aX, aY);
    message(aX, aY)
}

function init(){
    console.log("init");
    var canva = document.getElementById("vjoy_canvas");
    var ctx = canva.getContext("2d");
    ctx.beginPath();
    ctx.arc(X, Y, 100, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#aaaaaa';
	ctx.lineWidth = 2;
	ctx.stroke();
    canva.addEventListener("touchstart", update,{passive: true});
    canva.addEventListener("touchend", update,{passive: true});
    canva.addEventListener("touchcancel", update,{passive: true});
    canva.addEventListener("touchmove", update,{passive: true});
}

document.addEventListener("DOMContentLoaded", init);
console.log("yup");