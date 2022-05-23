
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
var speed=1;

var x1=cx*0.5;
var y1=cy*0.5;
var r1=Math.floor(Math.random()*256);
var g1=Math.floor(Math.random()*256);
var b1=Math.floor(Math.random()*256);
fillString1= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
var x2=x1+ht+gap;
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString2= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
var x3=x2+ht+gap;
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString3= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
var x4=x3+ht+gap;
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString4= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
var y2=y1+ht+gap;
var y3=y2+ht+gap;
var y4=y3+ht+gap;
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString5= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
var y3=y2+ht+gap;
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString6= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString7= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString8= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString8= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString9= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString10= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString11= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString12= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString13= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString14= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString15= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';
r1=Math.floor(Math.random()*256);
g1=Math.floor(Math.random()*256);
b1=Math.floor(Math.random()*256);
fillString16= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 0.75)';

var rect1 = two.makeRectangle(x1, y1, ht, ht);
rect1.fill = fillString1;
var rect2 = two.makeRectangle(x2, y1, ht, ht);
rect2.fill = fillString2;
var rect3 = two.makeRectangle(x3, y1, ht, ht);
rect3.fill = fillString3;
var rect4 = two.makeRectangle(x4, y1, ht, ht);
rect4.fill = fillString4;
var rect5 = two.makeRectangle(x1, y2, ht, ht);
rect5.fill = fillString5;
var rect6 = two.makeRectangle(x2, y2, ht, ht);
rect6.fill = fillString6;
var rect7 = two.makeRectangle(x3, y2, ht, ht);
rect7.fill = fillString7;
var rect8 = two.makeRectangle(x4, y2, ht, ht);
rect8.fill = fillString8;
var rect9 = two.makeRectangle(x1, y3, ht, ht);
rect9.fill = fillString9;
var rect10 = two.makeRectangle(x2, y3, ht, ht);
rect10.fill = fillString10;
var rect11 = two.makeRectangle(x3, y3, ht, ht);
rect11.fill = fillString11;
var rect12 = two.makeRectangle(x4, y3, ht, ht);
rect12.fill = fillString12;
var rect13 = two.makeRectangle(x1, y4, ht, ht);
rect13.fill = fillString13;
var rect14 = two.makeRectangle(x2, y4, ht, ht);
rect14.fill = fillString14;
var rect15 = two.makeRectangle(x3, y4, ht, ht);
rect15.fill = fillString15;
var rect16 = two.makeRectangle(x4, y4, ht, ht);
rect16.fill = fillString16;


var group = two.makeGroup(rect1, rect2, rect3, rect4,
			  rect5, rect6, rect7, rect8,
			  rect9, rect10, rect11, rect12,
			  rect13, rect14, rect15, rect16);
var groupRec=two.makeRectangle(0,0,group.getBoundingClientRect(true).width, group.getBoundingClientRect(true).height);


groupRec.fill='rgba(20,20,200,0.5)';
groupRec.opacity=0.5;
groupRec.position.set(x1+gap*9.25, y1+gap*4.7);
groupRec.scale=0.3;


group = two.makeGroup(rect1, rect2, rect3, rect4,
			  rect5, rect6, rect7, rect8,
			  rect9, rect10, rect11, rect12,
			  rect13, rect14, rect15, rect16);
group.position.set(x1+gap*4, y1+gap);
group.scale=0.3;

var mssage=two.makeText("BLOCKBLOCKBLOCK",cx-ht*0.2-gap*0.0,cy-ht*0.7-gap*0.4);
mssage.size=21;
mssage.weight=750;
mssage1=mssage.clone(two);
mssage1.rotation=Math.PI * 0.5;
mssage1.position.set(cx-ht*1.0-gap*0.0,cy-ht*0.0-gap*0.0);
mssage2=mssage.clone(two);
mssage2.rotation=Math.PI * 1.5;
mssage2.position.set(cx+ht*0.7-gap*0.3,cy-ht*0.0-gap*0.0);
mssage3=mssage.clone(two);
mssage3.rotation=0;
mssage3.value="KCOLBKCOLBKCOLB";
mssage3.position.set(cx-ht*0.2+gap*0.1,cy+ht*0.7+gap*0.4);

var mssage4=two.makeText("Speed : 10", cx-ht*0.2-gap*0.0, cy-ht*1-gap);
mssage4.size=42;
mssage4.weight=750;




// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', update);
// Finally, start the animation loop
two.play();


function update(frameCount) {
  // This code is called every time two.update() is called.
  oldtick= Math.floor((frameCount-1)/speed);
  tick =Math.floor(frameCount/speed);
  if (tick != oldtick) {
    r1=Math.floor(Math.random()*256);
    g1=Math.floor(Math.random()*256);
    b1=Math.floor(Math.random()*256);
    fillString= 'rgba(' + r1 + ', ' + g1 + ', ' + b1 + ', 1.0)';
    sq=Math.floor(Math.random()*16+1);
    if (sq==1) {
	rect1.fill = fillString;
	}
    else if (sq==2) {
	rect2.fill = fillString;
	}
    else if (sq==3) {
	rect3.fill = fillString;
	}
    else if (sq==4) {
	rect4.fill = fillString;
	}
    else if (sq==5) {
	rect5.fill = fillString;
	}
    else if (sq==6) {
	rect6.fill = fillString;
	}
    else if (sq==7) {
	rect7.fill = fillString;
	}
    else if (sq==8) {
	rect8.fill = fillString;
	}
    else if (sq==9) {
	rect9.fill = fillString;
	}
   else if (sq==10) {
	rect10.fill = fillString;
	}
    else if (sq==11) {
	rect11.fill = fillString;
	}
    else if (sq==12) {
	rect12.fill = fillString;
	}
    else if (sq==13) {
	rect13.fill = fillString;
	}
    else if (sq==14) {
	rect14.fill = fillString;
	}
    else if (sq==15) {
	rect15.fill = fillString;
	}
    else if (sq==16) {
	rect16.fill = fillString;
	}
    }
  }

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 38) {
        speed=speed-0.1;
	if (speed < 1 ) {speed=1};
	mssage4.value="Speed : " + Math.floor(11-speed);
    }
    else if(event.keyCode == 40) {
        speed=speed+0.1;
	if (speed > 10 ) {speed=10};
	mssage4.value="Speed : " + Math.floor(11-speed);
    }
});
