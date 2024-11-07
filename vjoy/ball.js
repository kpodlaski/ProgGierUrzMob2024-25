var x = 100;
var y = 100;
var vx = 1;
var vy = -2;
var width = 200;
var height = 200;
function drawBall(){
        var canva = document.getElementById("ball_canvas");
        var ctx = canva.getContext("2d");
        ctx.clearRect(0, 0, canva.width, canva.height);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#225588';
        ctx.fill();
}

function updatePosition(){
    x += vx;
    y += vy;
}

function collision(){
    if (y<=10 || y>=height - 10) {
        vy=-vy;
    }
    if (x<=10 || x>=width -10) {
        vx= -vx;
    }

    
}

function animation(){
    updatePosition();
    collision();
    drawBall();
    setTimeout(animation,10);
}

function init (){
    var canva = document.getElementById("ball_canvas");
    width = canva.width;
    height = canva.height;
    animation();
}

init();