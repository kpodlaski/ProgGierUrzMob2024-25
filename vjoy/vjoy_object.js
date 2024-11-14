class VJoy{
    constructor(_canva,  message_function){
        this.X =  100;
        this.Y =  100;
        this.R = 60;
        this.canva = document.getElementById(_canva); 
        this.message = message_function;
        console.log(this.canva);
        console.log(_canva);
        this.positionOffset = {X:parseInt(this.canva.style.left.slice(0,-2)), Y:parseInt(this.canva.style.top.slice(0,-2))};
    }

    drawCircle(){
        var ctx = this.canva.getContext("2d");
        ctx.clearRect(0, 0, this.canva.width, this.canva.height);
        ctx.beginPath();
        ctx.arc(this.X, this.Y, this.R, 0, 2 * Math.PI, false);
        ctx.strokeStyle = '#aaaaaa';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawBall(x, y){
        var ctx = this.canva.getContext("2d");
        var dx = x + this.X; 
        var dy = y + this.Y;
        ctx.beginPath();
        ctx.moveTo(this.X, this.Y);
        ctx.lineTo(dx,dy);
        ctx.arc(dx, dy, 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#555588';
        ctx.fill();
        console.log('drawing ['+dx+','+dy+']');
    }

    update(event){
        event.preventDefault();
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
        this.drawCircle();
        this.drawBall(aX, aY);
        
    }

    updateGame(event){
        event.preventDefault();
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
        message(aX,aY);
    }

    init(){
        console.log("init");
        this.drawCircle();
        console.log(this);
        this.canva.addEventListener("touchstart", this.update.bind(this),{passive: false});
        this.canva.addEventListener("touchend", this.updateGame.bind(this),{passive: false});
        this.canva.addEventListener("touchcancel", this.update.bind(this),{passive: false});
        this.canva.addEventListener("touchmove", this.update.bind(this),{passive: false});
    }
}

