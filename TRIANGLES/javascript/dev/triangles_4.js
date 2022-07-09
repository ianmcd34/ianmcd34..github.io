

var params = {
  fullscreen: true
};


var elem = document.body;
var two = new Two(params).appendTo(elem);
var cx = Math.floor(two.width * 0.5);
var cy = Math.floor(two.height * 0.5);
var ht=cx/5
var gap=ht/4;
var sq=0;
var speed=10;


var recCornertl=new Two.Vector(cx-300,cy-200);
var recCornertr=new Two.Vector(cx+300,cy-200);
var recCornerbl=new Two.Vector(cx-300,cy+200);
var recCornerbr=new Two.Vector(cx+300,cy+200);

var txt=two.makeText("hi",600,600);

var corner1= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner2= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner3= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));


var triangle=two.makePath(corner1.x,corner1.y,corner2.x,corner2.y,corner3.x,corner3.y,false);
var group=two.makeGroup(triangle);




function newPoint() {

var newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
txt.value=newCorner.x+","+newCorner.y;
circle=two.makeCircle(newCorner.x,newCorner.y,20);
no_triangles=group.children.length;

is_outside=true;
for (i=0; i<no_triangles; i++) {  
  if (checkInside(group.children[i],newCorner)=="INSIDE") {is_outside=false;}
  else {}

  }

if(is_outside==true) {
  circle.fill='pink';
  d_min=600;
  d_min2=600;
  var nearest_t;
  let nearCorners=new Array();
throw new Error("Manual Abort Script");}}/*
  group.children.forEach(findMin_d);

  group.children.forEach(findMin_d2);
  
  if (nearCorners.length==2) {
    triangle=two.makePath(newCorner.x,newCorner.y,nearCorners[0].x,nearCorners[0].y,nearCorners[1].x,nearCorners[1].y,false);
    group.add(triangle);
  }

  function findMin_d(t) {
      
      d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
      d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
      d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));
	
      if (Math.min(d_a,d_b,d_c)<d_min) {d_x=Math.min(d_a,d_b,d_c); 
	if (nearCorners.length>0) {
	nearCorners.forEach(pop());} 
	var Da=new Two.Vector(newCorner.x+0.99*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.99*(t.vertices[0].y+t.position.y-newCorner.y));
	var Db=new Two.Vector(newCorner.x+0.99*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[1].y+t.position.y-newCorner.y));
	var Dc=new Two.Vector(newCorner.x+0.99*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[2].y+t.position.y-newCorner.y));

	if(d_x==d_a && checkInsideAll(Da)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value="findMind 1";}
	else if (d_x==d_a) {d_x=Math.min(d_b,d_c); if (d_x>d_min) {d_x=600;}txt.value="findMind 2";}

	if(d_x==d_b && checkInsideAll(Db)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;txt.value="findMind 3";}
	else if(d_x==d_b) {d_x=Math.min(d_a,d_c); 
	  if (d_x>d_min) {d_x=600;txt.value="findMind 4";}
	  if(d_x==d_a && checkInsideAll(Da)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value="findMind 5";}}

	if(d_x==d_c && checkInsideAll(Dc)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));d_min=d_x;txt.value="findMind 6";}
	else if(d_x==d_c) {d_x=Math.min(d_a,d_b);
	if (d_x>d_min) {d_x=600;txt.value="findMind 7";}
	if(d_x==d_a && checkInsideAll(Da)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value="findMind 8";}
	if(d_x==d_b && checkInsideAll(Db)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;txt.value="findMind 9";}
	  }
	}
  }

function findMin_d2(t) {
  txt.value="start find Mind2";
  d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
  d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
  d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));
  Da=new Two.Vector(newCorner.x+0.99*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.99*(t.vertices[0].y+t.position.y-newCorner.y));
  Db=new Two.Vector(newCorner.x+0.99*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[1].y+t.position.y-newCorner.y));
  Dc=new Two.Vector(newCorner.x+0.99*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[2].y+t.position.y-newCorner.y));
txt.value=d_min+","+d_a+","+d_b+","+d_c;
  if (d_min==d_a && d_min2>Math.min(d_b,d_c)) {txt.value="d_min==d_a";
    if (d_b==Math.min(d_b,d_c) && checkInsideAll(Db)=="OUTSIDE") {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;txt.value=nearCorners.length;}
    else if (d_c==Math.min(d_b,d_c) && checkInsideAll(Dc)=="OUTSIDE") {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;txt.value=nearCorners.length;}}

  if (d_min==d_b && d_min2>Math.min(d_a,d_c)) {txt.value="d_min==d_b";
    if (d_a==Math.min(d_a,d_c) && checkInsideAll(Da)=="OUTSIDE") {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;txt.value=nearCorners.length;}
    else if (d_c==Math.min(d_a,d_c) && checkInsideAll(Dc)=="OUTSIDE") {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));  d_min2=d_c; txt.value=nearCorners.length;}}

  if (d_min==d_c && d_min2>Math.min(d_a,d_b)) {txt.value="d_min==d_c";
    if (d_a==Math.min(d_a,d_b) && checkInsideAll(Da)=="OUTSIDE") {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));  d_min2=d_a;txt.value=nearCorners.length;}
    else if (d_b=Math.min(d_a,d_b) && checkInsideAll(Db)=="OUTSIDE") {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));  d_min2=d_b; txt.value=nearCorners.length;}}

  }

  }
}
*/
/*
function convexify() {
  var point1;
  var point2;
txt.value="convexify start"+group.children.length;
  for (i=0; i<group.children.length; i++) {
    for (j=0; j<3; j++) {
      point1=new Two.Vector(group.children[i].vertices[j].x+group.children[i].position.x,group.children[i].vertices[j].y+group.children[i].position.y);
circle=two.addCircle(point1.x,point1.y,20);
      for (k=i*3+j+1; k<group.children.length*3; k++) {
        point2=new Two.Vector(group.children[Math.floor(k/3)].vertices[k%3].x+group.children[Math.floor(k/3)].position.x,group.children[Math.floor(k/3)].vertices[k%3].y+group.children[Math.floor(k/3)].position.y);
circle=two.addCircle(point2.x,point2.y,20);
	midPoint=new Two.Vector(Math.floor((point1.x+point2.x)/2),Math.floor((point1.y+point2.y)/2));
circle=two.addCircle(midPoint.x,midPoint.y,10);
	if (checkInsideAll(midPoint)=="OUTSIDE") {
circle.stroke='pink';
	  for (m=1; m<3; m++) {
	      point1neighbour=new Two.Vector(group.children[i].vertices[(j+m)%3].x+group.children[i].position.x,group.children[i].vertices[(j+m)%3].y+group.children[i].position.y);
	      for (n=1; n<3; n++) {
	      point2neighbour=new Two.Vector(group.children[Math.floor(k/3)].vertices[(k+n)%3].x+group.children[Math.floor(k/3)].position.x,group.children[Math.floor(k/3)].vertices[(k+n)%3].y+group.children[Math.floor(k/3)].position.y);

	      txt.value="i="+i+",j="+j+",k="+k;
/*
	      if (point1neighbour.x==point2neighbour.x && point1neighbour.y==point2neighbour.y) {
		line=two.makePath(point1neighbour.x,point1neighbour.y,point1.x,point1.y,point2.x,point2.y,false);
		group.add(line);
		line.stroke='pink';

		}*/
	      }
	    }
	  }
        }
    }
  }

  */

function checkInside(t,p) {

  var cornerA=new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y);
  var cornerB=new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y);
  var cornerC=new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y);

  var AB=new Two.Vector(cornerB.x-cornerA.x,cornerB.y-cornerA.y);
  var AC=new Two.Vector(cornerC.x-cornerA.x,cornerC.y-cornerA.y);
  var BC=new Two.Vector(cornerC.x-cornerB.x,cornerC.y-cornerB.y);
  var AX=new Two.Vector(p.x-cornerA.x,p.y-cornerA.y);
  var CX=new Two.Vector(p.x-cornerC.x,p.y-cornerC.y);
  var BX=new Two.Vector(p.x-cornerB.x,p.y-cornerB.y);

  var A=Math.acos(Math.max(Math.min(AB.dot(AC)/(AB.length()*AC.length()),1),-1));
  if (A>Math.PI) {A=2*Math.PI-A;}
  var B=Math.acos(Math.max(Math.min(AB.clone().multiplyScalar(-1).dot(BC)/(AB.length()*BC.length()),1),-1));
  if (B>Math.PI) {B=2*Math.PI-B;}
  var C=Math.acos(Math.max(Math.min(BC.clone().multiplyScalar(-1).dot(AC.clone().multiplyScalar(-1))/(BC.length()*AC.length()),1),-1));
  if (C>Math.PI) {C=2*Math.PI-C;}

  var AB_X=Math.acos(Math.max(Math.min(AB.dot(AX)/(AB.length()*AX.length()),1),-1));
  if (AB_X>Math.PI) {AB_X=2*Math.PI-AB_X;}
  var AC_X=Math.acos(Math.max(Math.min(AC.dot(AX)/(AC.length()*AX.length()),1),-1));
  if (AC_X>Math.PI) {AC_X=2*Math.PI-AC_X;}
  var BA_X=Math.acos(Math.max(Math.min(AB.clone().multiplyScalar(-1).dot(BX)/(AB.length()*BX.length()),1),-1));
  if (BA_X>Math.PI) {BA_X=2*Math.PI-BA_X;}
  var BC_X=Math.acos(Math.max(Math.min(BC.dot(BX)/(BC.length()*BX.length()),1),-1));
  if (BC_X>Math.PI) {BC_X=2*Math.PI-BC_X;}

  if (AB_X<=A+0.038 && AC_X<=A+0.038 && BA_X<=B+0.038  && BC_X<=B+0.038 ) {return "INSIDE";}
  else {return "OUTSIDE";}

    }

function checkInsideAll(p) {
  var result="";
  var i;
  for (i=0; i<group.children.length; i++) {
      if (checkInside(group.children[i],p)=="INSIDE") {result="INSIDE";}
    }
  if (result!="INSIDE") {result="OUTSIDE";}
  return result;
  }

// Bind a function to scale and rotate the group to the animation loop.
  //two.bind('update', update);
// Finally, start the animation loop
  two.play();

document.addEventListener('click', function(event) {
    txt.value=event.toString();
    newPoint();
    //convexify();
});

document.addEventListener('keydown', function(event) {

    if(event.keyCode == 40) {
        triangle.fill='yellow';
	triangle.opacity=0.5;
    }

});