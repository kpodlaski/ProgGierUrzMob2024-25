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
}

var frame_number = 0;
var max_frames = 9;
var f_width = 576/9, f_height = 256/4, f_border =0;
var step = 10;
var skeleton_pos = 20
screen_size = 600

var image = new Image();
var url = 'skeleton.png'
image.src = url;
image.onload = draw_image

