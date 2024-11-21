// taken from Derek O'Reily DKIT, Dundalk
//https://derek.comp.dkit.ie/games_development/canvas/exampleCode/images/skeleton.png


function draw_image(){
    var canva = document.getElementById("drawing_canvas");
    var ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx.drawImage(image,0,0,image.width, image.height, 0,0, image.width,image.height);
    console.log("--");

    var x= 20, y=50;
    var sprite_x=0, sprite_y=0; 
    for (i = 0; i<3 ; i++){
        ctx.drawImage(image, 
            sprite_x, sprite_y, f_width, f_height,
            x,300,f_width, f_height);
        x+=2*f_width;
        sprite_x+=f_width+f_border;
    } 
    animation();
}

function draw_frame(sprite_row, sprite_col, x, y){
    let canva = document.getElementById("drawing_canvas");
    let ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    sprite_x = sprite_col*(f_width+f_border);
    sprite_y = sprite_row*(f_height+f_border);
    ctx.drawImage(image, 
        sprite_x, sprite_y, f_width, f_height,
        x,y,f_width, f_height);
}

function check_collisions(){
    if (pos_x <=0) { 
        move_right();
    }
    if (pos_x >= 400) {
        move_left();
    }

    if (pos_y<=0) {
        move_down();
    }

    if (pos_y>=400) {
        move_up();
    }
}

function new_position(){
    pos_x = (pos_x+x_speed*move_step);
    pos_y = (pos_y+y_speed*move_step);
}
function animation(){
    frame_number = (frame_number + 1 )%max_frames;
    new_position();
    check_collisions();
    draw_frame(sprite_row,frame_number,pos_x,pos_y);
    setTimeout(animation,time_step);
}

function move_up(){
    y_speed = -1;
    x_speed = 0;
    sprite_row = 0;
}

function move_down(){
    y_speed = 1;
    x_speed = 0;
    sprite_row = 2;
}

function move_left(){
    y_speed = 0;
    x_speed = -1;
    sprite_row = 1;
}

function move_right(){
    y_speed = 0;
    x_speed = 1;
    sprite_row = 3;
}

var x_speed =0;
var y_speed =0;

var sprite_row = 0;
var frame_number = 0;
var max_frames = 9;
var f_width = 576/9; 
var f_height = 256/4; 
var f_border =0;
var time_step = 100;
var move_step = 10;
var pos_x = 20;
var pos_y = 20;


var image = new Image();
var url = 'skeleton.png'
image.src = url;
//image.onload = draw_image
image.onload = animation
document.getElementById("button_up").addEventListener("click",move_up);
document.getElementById("button_down").addEventListener("click",move_down);
document.getElementById("button_left").addEventListener("click",move_left);
document.getElementById("button_right").addEventListener("click",move_right);

