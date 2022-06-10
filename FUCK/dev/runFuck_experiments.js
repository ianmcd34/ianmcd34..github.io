
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
var speed=10;
//var font_f = "font-family: Georgia, "Times New Roman", "FangSong", "??", STFangSong, "????", serif";




//var stroke1=two.makeTexture('fuckinchinese.png');


var stroke2=two.makeSprite('https://i.imgur.com/StUsXjU.jpeg',40,40,68,1,0);
stroke2.scale=0.25;
stroke2.index=0;
stroke2.frameRate=10;
stroke2.play();
stroke2.pause();


var stroke3=two.makeSprite('https://i.imgur.com/ni90RnY.jpeg', 190,40,89,1,0);
stroke3.scale=0.25;
stroke3.index=0;
stroke3.frameRate=10;
//stroke3.play();

var stroke4=two.makeSprite('https://i.imgur.com/tfRaOQY.jpeg', 340,40,63,1,0);
stroke4.scale=0.25;
stroke4.index=0;
stroke4.frameRate=10;
//stroke4.play();

var fuckGroup=two.makeGroup(stroke2,stroke3,stroke4);

fuckGroup.position.set(cx-150,cy);




//var anchor=new Two.Anchor(200,200,0,0,10,0,'C');
//var anchor1=new Two.Anchor(160,300,15,10,10,10,'C');
//var path= new Two.Path([anchor,anchor1],false,true,false);
//path.linewidth=10;

//path.fill='LemonChiffon';
//path.stroke='black';
//path.plot();
//path.visible=true;
//two.add(path);


var texture = new Two.Texture("C:/Public/fuckinchinese.png");
var path=texture.src;
//texture.src=path.substr(8);
//path=texture.src;
//texture.load();
var mssage=two.makeText(path,cx/2,cy/2);
var shape = two.makeRectangle(cx, cy/2, 100, 100);
texture.scale=0.25;
shape.fill = texture;

//var shape1 = two.makeRectangle(cx+100, cy+100, 100, 1);
//shape1.fill = texture;



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

  if (stroke2._playing != 1 && stroke2.index==0) {
  	stroke2.play();
    }
  else if (stroke2.index==67 && stroke3._playing != 1 && stroke3.index==0) {
	stroke2.pause();
	stroke3.play();
    }
  else if (stroke3.index==88 && stroke4._playing != 1 && stroke4.index==0) {
	stroke3.pause();
	stroke4.play();
    }
  else if (stroke4.index==62 ) {
	stroke4.pause();
    }

  }

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 40) {
        speed=speed-1;
	if (speed < 1 ) {speed=1};
    }
    else if(event.keyCode == 38) {
        speed=speed+1;
    }
    stroke2.frameRate=speed;
    stroke3.frameRate=speed;
    stroke4.frameRate=speed;
    mssage.value=speed;
});

document.addEventListener('click', function(event) {
    stroke2.index=0;
    stroke2.play();
    stroke3.index=0;
    stroke3.pause();
    stroke4.index=0;
    stroke4.pause();
});

