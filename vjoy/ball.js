var x = 100;
var y = 100;
var vx = 1;
var vy = -2;
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
    if (y<15 || y>185) {
        vy=-vy;
    }

    
}

function animation(){
    updatePosition();
    collision();
    drawBall();
    setTimeout(animation,10);
}

animation();