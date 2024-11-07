class VJoy{
    constructor(_canva,  message_function){
        this.X =  100;
        this.Y =  100;
        this.canva = document.getElementById(_canva); 
        this.message = message_function;
        console.log(this.canva);
        console.log(_canva);
        this.positionOffset = {X:parseInt(this.canva.style.left.slice(0,-2)), Y:parseInt(this.canva.style.top.slice(0,-2))};
    }

    drawBall(x, y){
        var ctx = this.canva.getContext("2d");
        var dx = x + 100; 
        var dy = y + 100;
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#555588';
        ctx.fill();
        console.log('drawing ['+dx+','+dy+']');
    }

    update(event){
        const touch = event.changedTouches[0];
        console.log(this.positionOffset.x);
        var aX=touch.clientX -this.positionOffset.X - this.X; //0 canvas positon, 100 circle_width/2
        var aY=touch.clientY -this.positionOffset.Y - this.Y; //250 canvas positon, 100 circle_height/2
        if (aX*aX+aY*aY>10000){
            console.log(aX, aY);
            console.log('outside range');
            return;    
        }
        console.log('['+aX+','+aY+']');
        console.log(this);
        this.drawBall(aX, aY);
        this.message(aX, aY)
    }

    init(){
        console.log("init");
        var ctx = this.canva.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.X, this.Y, 100, 0, 2 * Math.PI, false);
        ctx.strokeStyle = '#aaaaaa';
        ctx.lineWidth = 2;
        ctx.stroke();
        console.log(this);
        this.canva.addEventListener("touchstart", this.update.bind(this),{passive: true});
        this.canva.addEventListener("touchend", this.update.bind(this),{passive: true});
        this.canva.addEventListener("touchcancel", this.update.bind(this),{passive: true});
        this.canva.addEventListener("touchmove", this.update.bind(this),{passive: true});
    }
}

function message(x,y){
    var posX = document.getElementById("posX");
    posX.innerHTML=x;
    var posY = document.getElementById("posY");
    posY.innerHTML=y;
}

         
var vJoy = new VJoy( "vjoy_canvas", message);
document.addEventListener("DOMContentLoaded", vJoy.init.bind(vJoy));