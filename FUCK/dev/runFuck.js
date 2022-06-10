
var params = {
  fullscreen: true
};


var elem = document.body;
var two = new Two(params).appendTo(elem);

var cx = two.width * 0.5;
var cy = two.height * 0.5;
var ht=cx/5;
var gap=ht/4;
var sq=0;
var speed=2;
//var font_f = "font-family: Georgia, "Times New Roman", "FangSong", "??", STFangSong, "????", serif";




//var stroke1=two.makeTexture('fuckinchinese.png');


//var stroke2=two.makeSprite('https://i.imgur.com/ytvDmYn.png',cx,cy,1,1,0);
//stroke2.scale=0.25;
//stroke2.index=0;
//stroke2.frameRate=0;

var anchor=new Two.Anchor(200,200,0,0,10,0,'C');
var anchor1=new Two.Anchor(160,300,15,10,10,10,'C');
var path= new Two.Path([anchor,anchor1],false,true,false);
path.linewidth=10;

path.fill='LemonChiffon';
path.stroke='black';
path.plot();
path.visible=true;
two.add(path);


var texture = new Two.Texture('https://i.imgur.com/ytvDmYn.png');
//var path=texture.src;
//var mssage=two.makeText(path,cx/2,cy/2);
var shape = two.makeRectangle(cx, cy, 1, 100);
texture.scale=0.25;
shape.fill = texture;

var shape1 = two.makeRectangle(cx+100, cy+100, 100, 1);
shape1.fill = texture;



//var star = two.makeRectangle(cx, cy, 100, 100);
//var texture = new Two.Texture('https://i.imgur.com/DRmh6S9.jpg')

// Textures fill as patterns on any Two.Path
//star.fill = texture;


// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', update);
// Finally, start the animation loop
two.play();


function update(frameCount) {
  // This code is called every time two.update() is called.
  oldtick= Math.floor((frameCount-1)/speed);
  tick =Math.floor(frameCount/speed);
  if (tick!=oldtick) {
    if (shape.width<100) {
      shape.width=shape.width+2;
      shape.origin.x=shape.origin.x-1;
      shape.position.x=shape.position.x+0;
    }
    else if (shape1.height<100) {
       shape1.height=shape1.height+2;
       shape1.position.y=shape1.position.y-0;
       shape1.origin.y=shape1.origin.y-1;
      }
    }
  }

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 38) {
        speed=speed-0.1;
	if (speed < 1 ) {speed=1};
	mssage4.value="Speed : " + Math.floor(21-speed);
    }
    else if(event.keyCode == 40) {
        speed=speed+0.1;
	if (speed > 20 ) {speed=20};
	mssage4.value="Speed : " + Math.floor(21-speed);
    }
});
