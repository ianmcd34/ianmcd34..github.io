
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

var anchor=new Two.Anchor(200,200,0,0,10,0,'C');
var anchor1=new Two.Anchor(160,275,15,10,10,10,'C');
var path_1_1= new Two.Path([anchor,anchor1],false,true,false);
path_1_1.linewidth=10;

path_1_1.fill='LemonChiffon';
path_1_1.stroke='black';
path_1_1.plot();
path_1_1.visible=false;
two.add(path_1_1);



anchor=new Two.Anchor(250,200,0,0,0,0,'C');
anchor1=new Two.Anchor(250,300,0,0,0,0,'C');
var path_1_2= new Two.Path([anchor,anchor1],false,true,false);
path_1_2.linewidth=10;

path_1_2.fill='LemonChiffon';
path_1_2.stroke='black';
path_1_2.plot();
path_1_2.visible=false;
two.add(path_1_2);


anchor=new Two.Anchor(300,230,0,0,0,0,'L');
anchor1=new Two.Anchor(380,200,0,0,0,0,'L');
var path_1_3= new Two.Path([anchor,anchor1],false,true,false);
path_1_3.linewidth=10;

path_1_3.fill='LemonChiffon';
path_1_3.stroke='black';
path_1_3.plot();
path_1_3.visible=false;
two.add(path_1_3);


anchor=new Two.Anchor(370,275,20,15,10,10,'C');
anchor1=new Two.Anchor(380,200,0,0,0,0,'C');
var path_1_4= new Two.Path([anchor1,anchor],false,true,false);
path_1_4.linewidth=10;

path_1_4.fill='LemonChiffon';
path_1_4.stroke='black';
path_1_4.plot();
path_1_4.visible=false;
two.add(path_1_4);


anchor=new Two.Anchor(400,300,0,0,0,0,'C');
anchor1=new Two.Anchor(475,275,10,30,10,10,'C');
var path_1_5= new Two.Path([anchor,anchor1],false,true,false);
path_1_5.linewidth=10;

path_1_5.fill='LemonChiffon';
path_1_5.stroke='black';
path_1_5.plot();
path_1_5.visible=false;
two.add(path_1_5);

/*

anchor=new Two.Anchor(520,200,0,0,0,0,'C');
anchor1=new Two.Anchor(495,275,0,0,0,0,'C');
anchor2=new Two.Anchor(535,315,0,0,0,0,'C');
var path_2_1= new Two.Path([anchor,anchor1,anchor2],false,false,false);
path_2_1.linewidth=10;

path_2_1.fill='LemonChiffon';
path_2_1.stroke='black';
path_2_1.plot();
path_2_1.visible=true;
two.add(path_2_1);

anchor=new Two.Anchor(550,230,0,0,0,0,'C');
anchor1=new Two.Anchor(595,230,0,0,0,0,'C');
var path_2_2= new Two.Path([anchor,anchor1],false,false,false);
path_2_2.linewidth=10;

path_2_2.fill='LemonChiffon';
path_2_2.stroke='black';
path_2_2.plot();
path_2_2.visible=true;
two.add(path_2_2);

anchor=new Two.Anchor(595,230,10,10,10,10,'C');
anchor1=new Two.Anchor(550,300,20,10,20,10,'C');
var path_2_3= new Two.Path([anchor,anchor1],false,true,false);
path_2_3.linewidth=10;

path_2_3.fill='LemonChiffon';
path_2_3.stroke='black';
path_2_3.plot();
path_2_3.visible=true;
two.add(path_2_3);

anchor=new Two.Anchor(610,260,10,10,10,10,'C');
anchor1=new Two.Anchor(625,300,10,10,10,10,'C');
var path_2_4= new Two.Path([anchor,anchor1],false,true,false);
path_2_4.linewidth=10;

path_2_4.fill='LemonChiffon';
path_2_4.stroke='black';
path_2_4.plot();
path_2_4.visible=true;
two.add(path_2_4);

*/

stroke1=path_1_1.clone();
stroke1.position.set(-180,-200);
stroke1.visible=true;

var fuckGroup=two.makeGroup(stroke1);

fuckGroup.position.set(cx,cy);
fuckGroup.visible=true;

x1=stroke1.position.x;
y1=stroke1.position.y;

stroke2=path_1_2.clone();
stroke2.position.set(x1-60,y1+40);
stroke2.visible=true;

fuckGroup.add(stroke2);

x1=stroke2.position.x;
y1=stroke2.position.y;

stroke3=path_1_3.clone();
stroke3.position.set(x1-40,y1);
stroke3.visible=true;

fuckGroup.add(stroke3);

x1=stroke3.position.x;
y1=stroke3.position.y;

stroke4=path_1_4.clone();
stroke4.position.set(x1-5,y1+50);
stroke4.visible=true;
stroke4.scale = new Two.Vector(1, 0.75);

fuckGroup.add(stroke4);

x1=stroke2.position.x;
y1=stroke2.position.y;

stroke5=path_1_2.clone();
stroke5.position.set(x1+50,y1-30);
stroke5.visible=true;

fuckGroup.add(stroke5);

stroke6=path_1_2.clone();
stroke6.position.set(x1+15,y1+20);
stroke6.visible=true;
stroke6.scale = new Two.Vector(1, 0.9);

fuckGroup.add(stroke6);

x1=stroke6.position.x;
y1=stroke6.position.y;

stroke7=path_1_5.clone();
stroke7.position.set(x1-145,y1-35);
stroke7.visible=true;

fuckGroup.add(stroke7);


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
