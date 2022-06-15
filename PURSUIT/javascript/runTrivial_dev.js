
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
var speed=5;
var spinrate=0;
var mssage4=two.makeText(speed,20,20);


var startx1=-150;
var starty1=-150;


var corner1= new Two.Vector(startx1, starty1);


var startx2=-150;
var starty2=+150;

var corner2= new Two.Vector(startx2, starty2);


var startx3=+150;
var starty3=+150;

var corner3= new Two.Vector(startx3, starty3);

var startx4=+150;
var starty4=-150;

var corner4= new Two.Vector(startx4, starty4);

var endx4=startx1;
var endy4=starty1;


var line1 = two.makeLine(corner1.x,corner1.y,corner2.x,corner2.y);
var line2 = two.makeLine(corner2.x,corner2.y,corner3.x,corner3.y);
var line3 = two.makeLine(corner3.x,corner3.y,corner4.x,corner4.y);
var line4 = two.makeLine(corner4.x,corner4.y,corner1.x,corner1.y);

var group = two.makeGroup(corner1,corner2,corner3,corner4,line1,line2,line3,line4);



// Bind a function to scale and rotate the group to the animation loop.
  two.bind('update', update);
// Finally, start the animation loop
  two.play();


function update(frameCount) {
  // This code is called every time two.update() is called.
  next=false;
  tick =Math.floor(frameCount/speed);
  if (tick%10 !=0 ) {
    line1.ending=(tick%10)/10;
    line2.ending=(tick%10)/10;
    line3.ending=(tick%10)/10;
    line4.ending=(tick%10)/10;
  }
  else {
    line1.ending=1;
    line2.ending=1;
    line3.ending=1;
    line4.ending=1;
    next=true;
  }

  if (next==true && Math.floor((frameCount+1)/speed)!=Math.floor(frameCount/speed)) {
    corner2=corner2.add(corner3.clone().sub(corner2).multiply(0.1));
    line1 = two.makeLine(corner1.x,corner1.y,corner2.x,corner2.y);
    line1.ending=0;
    group.add(line1);
    corner3=corner3.add(corner4.clone().sub(corner3).multiply(0.1));
    line2 = two.makeLine(corner2.x,corner2.y,corner3.x,corner3.y);
    line2.ending=0;
    group.add(line2);
    corner4=corner4.add(corner1.clone().sub(corner4).multiply(0.1));
    line3 = two.makeLine(corner3.x,corner3.y,corner4.x,corner4.y);
    line3.ending=0;
    group.add(line3);
    corner1=corner1.add(corner2.clone().sub(corner1).multiply(0.1));
    line4 = two.makeLine(corner4.x,corner4.y,corner1.x,corner1.y);
    line4.ending=0;
    group.add(line4);

    }

    group.position.x=0;
    group.position.y=0;
    group.center();
    group.rotation=group.rotation+spinrate;
    group.position.x=cx;
    group.position.y=cy;

  
  }



document.addEventListener('keydown', function(event) {
    if(event.keyCode == 38) {
        speed=speed-1;
	if (speed < 0.1 ) {speed=1};
	mssage4.value="Speed : " + Math.floor(speed);
    }
    else if(event.keyCode == 40) {
        speed=speed+1;
	if (speed > 200 ) {speed=200};
	mssage4.value="Speed : " + Math.floor(speed);
    }
    else if(event.keyCode == 39) {
        spinrate=spinrate+0.01;
	if (spinrate > 0.5 ) {spinrate=0.5};
	mssage4.value="Speed : " + Math.floor(speed);
    }
    else if(event.keyCode == 37) {
        spinrate=spinrate-0.01;
	if (spinrate < -0.5 ) {spinrate=-0.5};
	mssage4.value="Speed : " + Math.floor(speed);
    }
});
