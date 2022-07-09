

var params = {
  fullscreen: true
  //domElement: 'canvas'
};


var elem = document.body;
var two = new Two(params).appendTo(elem);
var cx = Math.floor(two.width * 0.5);
var cy = Math.floor(two.height * 0.5);
var ht=cx/5
var gap=ht/4;
var sq=0;
var speed=10;
var d_min=600;
var nearCorners=new Array();


two.type='canvas';


var rend = two.CanvasRenderer;
//var canv = two.CanvasRenderer.params.domElement;


var recCornertl=new Two.Vector(cx-300,cy-200);
var recCornertr=new Two.Vector(cx+300,cy-200);
var recCornerbl=new Two.Vector(cx-300,cy+200);
var recCornerbr=new Two.Vector(cx+300,cy+200);


var corner1= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner2= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner3= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));

var triangle=two.makePath(corner1.x,corner1.y,corner2.x,corner2.y,corner3.x,corner3.y,false);
triangle.fill='red';
var group=two.makeGroup(triangle);

//const imageData = context.createImageData(100, 100);
//context.setImageData(50,50,50,50);
var txt=two.makeText(corner1.x+","+corner1.y+";"+corner2.x+","+corner2.y+";"+corner3.x+","+corner3.y,600,600);


function newPoint() {

newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));



circle=two.makeCircle(newCorner.x,newCorner.y,20);
if (getIsPointInsidePolygon(group.children[0],newCorner)) {circle.fill='white';} else {circle.fill='pink';}
throw new Error("Manual Abort Script");
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

  group.children.forEach(findMin_d);
throw new Error("Manual Abort Script");}
}
 

function findMin_d(t) {
      
      d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
      d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
      d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));
txt.value="d_min="+d_min+",d_a="+d_a+",d_b="+d_b+",d_c="+d_c;	
      if (Math.min(d_a,d_b,d_c)<d_min) {d_x=Math.min(d_a,d_b,d_c); 
	if (nearCorners.length>0) {nearCorners.pop();} 
	var Da=new Two.Vector(newCorner.x+0.95*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.95*(t.vertices[0].y+t.position.y-newCorner.y));
	var Db=new Two.Vector(newCorner.x+0.95*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.95*(t.vertices[1].y+t.position.y-newCorner.y));
	var Dc=new Two.Vector(newCorner.x+0.95*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.95*(t.vertices[2].y+t.position.y-newCorner.y));
circle=two.makeCircle(Da.x,Da.y,5);if (checkInsideAll(Da)=="OUTSIDE") {circle.fill='pink;'}
circle=two.makeCircle(Db.x,Db.y,5);if (checkInsideAll(Db)=="OUTSIDE") {circle.fill='pink;'}
circle=two.makeCircle(Dc.x,Dc.y,5);if (checkInsideAll(Dc)=="OUTSIDE") {circle.fill='pink;'}
	if(d_x==d_a && checkInsideAll(Da)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value=txt.value+"findMind 1";}
	else if (d_x==d_a) {d_x=Math.min(d_b,d_c); if (d_x>d_min) {d_x=600;}txt.value=txt.value+"findMind 2";}

	if(d_x==d_b && checkInsideAll(Db)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;txt.value=txt.value+"findMind 3";}
	else if(d_x==d_b) {d_x=Math.min(d_a,d_c); 
	  if (d_x>d_min) {d_x=600;txt.value=txt.value+"findMind 4";}
	  if(d_x==d_a && checkInsideAll(Da)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value=txt.value+"findMind 5";}}

	if(d_x==d_c && checkInsideAll(Dc)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));d_min=d_x;txt.value=txt.value+"findMind 6";}
	else if(d_x==d_c) {d_x=Math.min(d_a,d_b);
	if (d_x>d_min) {d_x=600;txt.value=txt.value+"findMind 7";}
	if(d_x==d_a && checkInsideAll(Da)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value=txt.value+"findMind 8";}
	if(d_x==d_b && checkInsideAll(Db)=="OUTSIDE") {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;txt.value=txt.value+"findMind 9";}
	}

	pathA=two.makePath(newCorner.x,newCorner.y,nearCorners[0].x,nearCorners[0].y,false);
	
  }
}


function getIsPointInsidePolygon(t,p) {
const x = p.x;
const y = p.y;

let inside = false
for (i=0, j=2; i<3; i++) {
        if ((t.vertices[i].y+t.position.y< y && t.vertices[j].y+t.position.y>=y || 
 t.vertices[j].y+t.position.y< y && t.vertices[i].y+t.position.y>=y)
            && (t.vertices[i].x+t.position.x<=x || t.vertices[j].x+t.position.x<=x)) {
              if ((t.vertices[i].x+t.position.x + (y-t.vertices[i].y-t.position.y)*(t.vertices[j].x+t.position.x-t.vertices[i].x-t.position.x)/(t.vertices[j].y+t.position.y-t.vertices[i].y-t.position.y)) < x) {inside=!inside;}; 
        }

        j=i; 
    }


return inside
}

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

  if (AB_X<=A+0.037 && AC_X<=A+0.037 && BA_X<=B+0.037  && BC_X<=B+0.037 ) {return "INSIDE";}
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
    //txt.value=event.toString();
    newPoint();
    //convexify();
});

document.addEventListener('keydown', function(event) {

    if(event.keyCode == 40) {
        triangle.fill='yellow';
	triangle.opacity=0.5;
    }

});