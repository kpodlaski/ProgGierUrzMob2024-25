// taken from Derek O'Reily DKIT, Dundalk
//https://derek.comp.dkit.ie/games_development/canvas/exampleCode/images/skeleton.png




function draw_frame(sprite_row, sprite_col, x, y){
    let canva = document.getElementById("animation_canvas");
    let ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    sprite_x = sprite_col*(f_width+f_border);
    sprite_y = sprite_row*(f_height+f_border);
    
    //draw middle
    ctx.drawImage(sky_image, 
        sky_x, 0, canva.width, 500,
        0,0,canva.width, 500);
    if (sky_x+canva.width> sky_width) {
        ctx.drawImage(sky_image, 
            0, 0, canva.width, 500,
            sky_width-sky_x,0,canva.width, 500);
    }

    //draw middle
    ctx.drawImage(middle_image, 
        mb_x, 0, canva.width, 500,
        0,0,canva.width, 500);
    if (mb_x+canva.width> mb_width) {
            ctx.drawImage(middle_image, 
                0, 0, canva.width, 500,
                mb_width-mb_x,0,canva.width, 500);
        }    
    //draw foreground
    ctx.drawImage(fg_image, 
        fb_x, 0, canva.width, 500,
        0,0,canva.width, 500);
    if (fb_x+canva.width> fb_width) {
            //One pixel difference added to show where old fb_image finished and new one should start
            ctx.drawImage(fg_image, 
                0, 0, canva.width, 500,
                fb_width-fb_x+1,0,canva.width, 500);
        }
    // //draw skeleton
    ctx.drawImage(image, 
        sprite_x, sprite_y, f_width, f_height,
        x,y,f_width, f_height);
    // console.log(image, 
    //     sprite_x, sprite_y, f_width, f_height,
    //     x,y,f_width, f_height);

}

function check_collisions(){
    if (pos_x <=0) { 
        move_right();
    }
    if (pos_x >= 400) {
        move_left();
    }
}

function new_position(){
    //pos_x = (pos_x+x_speed*move_step);
    //pos_y = (pos_y+y_speed*move_step);
    move_right();
    fb_x= (fb_x+fb_speed)%fb_width ;
    mb_x= (mb_x+mb_speed)%mb_width;
    sky_x=(sky_x+sky_speed)%sky_width;
}
function animation(){
    frame_number = (frame_number + 1 ) % max_frames;
    new_position();
    check_collisions();
    draw_frame(sprite_row,frame_number,pos_x,pos_y);
    setTimeout(animation,time_step);
}

function move_right(){
    y_speed = 0;
    x_speed = 0;
    sprite_row = 3;
}

var loaded_parts = 0;
function part_loaded(){
    loaded_parts++;
    if (loaded_parts==4){
        animation();
    }
}


var x_speed = 0;
var y_speed = 0;

var sprite_row = 0;
var frame_number = 0;
var max_frames = 9;
var f_width = 576/9; 
var f_height = 256/4; 
var f_border =0;
var time_step = 100;
var move_step = 10;
var pos_x = 40;
var pos_y = 430;

var fb_width = 2000
var mb_width = 2000
var sky_width = 2000
var fb_speed = 6;
var mb_speed = 2;
var sky_speed = 1;
var fb_x = 1000;
var mb_x = 1000;
var sky_x =1000;


var image = new Image(); 
var url = 'skeleton.png'
image.src = url;
image.onload = part_loaded();

var fg_image = new Image();
fg_image.src = 'scrolling_background_foreground.png';
fg_image.onload = part_loaded();

var middle_image = new Image();
middle_image.src = 'scrolling_background_middle.png';
middle_image.onload = part_loaded();

var sky_image = new Image();
sky_image.src = 'scrolling_background_sky.png';
sky_image.onload = part_loaded();

