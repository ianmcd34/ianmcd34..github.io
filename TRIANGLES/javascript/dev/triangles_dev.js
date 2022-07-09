

var params = {
  fullscreen: true
};


var elem = document.body;
var two = new Two(params).appendTo(elem);
var cx = two.width * 0.5;
var cy = two.height * 0.5;
var ht=cx/5
var gap=ht/4;
var sq=0;
var speed=10;
//var font_f = "font-family: Georgia, "Times New Roman", "FangSong", "??", STFangSong, "????", serif";


//var rec=two.makeRectangle(cx,cy,300,200);
var recCornertl=new Two.Vector(cx-150,cy-100);
var recCornertr=new Two.Vector(cx+150,cy-100);
var recCornerbl=new Two.Vector(cx-150,cy+100);
var recCornerbr=new Two.Vector(cx+150,cy+100);
var txt=two.makeText(Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),400,400);


var corner1= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner2= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner3= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));


var triangle=two.makePath(corner1.x,corner1.y,corner2.x,corner2.y,corner3.x,corner3.y,false);

/*

var AB=new Two.Vector(corner2.x-corner1.x,corner2.y-corner1.y);
var AC=new Two.Vector(corner3.x-corner1.x,corner3.y-corner1.y);
var BC=new Two.Vector(corner3.x-corner2.x,corner3.y-corner2.y);
*/

var newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));

circle=two.makeCircle(newCorner.x,newCorner.y,10);
circle.noFill();
var txt1=two.makeText("hi",400,300);
if (checkInside(triangle,newCorner)=="INSIDE") {txt.value="INSIDE";}
else {txt.value="OUTSIDE";}

var D=new Two.Vector(newCorner.x+0.99*(corner1.x-newCorner.x),newCorner.y+0.99*(corner1.y-newCorner.y));
//circle=two.makeCircle(D.x,D.y,10);
//circle.noFill();



if (checkInside(triangle,D)=="INSIDE") {txt1.value="inside";}
else {var XA1=two.makePath(newCorner.x,newCorner.y,corner1.x,corner1.y,false);}


D=new Two.Vector(newCorner.x+0.99*(corner2.x-newCorner.x),newCorner.y+0.99*(corner2.y-newCorner.y));

if (checkInside(triangle,D)=="INSIDE") {txt1.value="inside";}
else {var XA2=two.makePath(newCorner.x,newCorner.y,corner2.x,corner2.y,false);}

D=new Two.Vector(newCorner.x+0.99*(corner3.x-newCorner.x),newCorner.y+0.99*(corner3.y-newCorner.y));

if (checkInside(triangle,D)=="INSIDE") {txt1.value="inside";}
else {var XA3=two.makePath(newCorner.x,newCorner.y,corner3.x,corner3.y,false);}


/*
circle=two.makeCircle(corner1.x,corner1.y,10);
circle.noFill();
circle=two.makeCircle(corner2.x,corner2.y,10);
circle.noFill();
*/
/*
var AX=new Two.Vector(newCorner.x-corner1.x,newCorner.y-corner1.y);
var CX=new Two.Vector(newCorner.x-corner3.x,newCorner.y-corner3.y);
var BX=new Two.Vector(newCorner.x-corner2.x,newCorner.y-corner2.y);




var A=Math.acos(AB.dot(AC)/(AB.length()*AC.length()));
if (A>Math.PI) {A=2*Math.PI-A;}
var B=Math.acos(AB.clone().multiplyScalar(-1).dot(BC)/(AB.length()*BC.length()));
if (B>Math.PI) {B=2*Math.PI-B;}
var C=Math.acos(BC.clone().multiplyScalar(-1).dot(AC.clone().multiplyScalar(-1))/(BC.length()*AC.length()));
if (C>Math.PI) {C=2*Math.PI-C;}

var AB_X=Math.acos(AB.dot(AX)/(AB.length()*AX.length()));
if (AB_X>Math.PI) {AB_X=2*Math.PI-AB_X;}
var AC_X=Math.acos(AC.dot(AX)/(AC.length()*AX.length()));
if (AC_X>Math.PI) {AC_X=2*Math.PI-AC_X;}
var BA_X=Math.acos(AB.clone().multiplyScalar(-1).dot(BX)/(AB.length()*BX.length()));
if (BA_X>Math.PI) {BA_X=2*Math.PI-BA_X;}
var BC_X=Math.acos(BC.dot(BX)/(BC.length()*BX.length()));
if (BC_X>Math.PI) {BC_X=2*Math.PI-BC_X;}

*/

/*

var txt7=two.makeText("cornerC= " + corner3.x.toString() + "," + corner3.y.toString(),400,210);
var txt4=two.makeText("cornerA= " + corner1.x.toString() + "," + corner1.y.toString(),400,240);
var txt6=two.makeText("cornerB= " + corner2.x.toString() + "," + corner2.y.toString(),400,255);
var txt5=two.makeText("newCorner= " + newCorner.x.toString() + "," + newCorner.y.toString(),400,270);
var txt1=two.makeText("AB= " + AB.x.toString() + "," + AB.y.toString(),400,300);
var txt2=two.makeText("AX= " + AX.x.toString() + "," + AX.y.toString(),400,330);
var txt3=two.makeText("AB.AX= " + AB.dot(AX).toString() ,400,360);
*/
/*
if (AB_X<A && AC_X<A && BA_X<B  && BC_X<B ) {txt.value=Math.floor(A/(2*Math.PI)*360).toString() + " " + Math.floor(AB_X/(2*Math.PI)*360).toString() + " " + Math.floor(B/(2*Math.PI)*360).toString()  + Math.floor(BA_X/(2*Math.PI)*360).toString() + " " + "INSIDE";}
else {txt.value=Math.floor(A/(2*Math.PI)*360).toString() + " " + Math.floor(AB_X/(2*Math.PI)*360).toString() + " " + Math.floor(B/(2*Math.PI)*360).toString() + " " + Math.floor(BA_X/(2*Math.PI)*360).toString() + " " + "OUTSIDE";}
*/

/*
var circumcircleO=new Two.Vector((corner1.x*Math.sin(2*A)+corner2.x*Math.sin(2*B)+corner3.x*Math.sin(2*C))/(Math.sin(2*A)+Math.sin(2*B)+Math.sin(2*C)), (corner1.y*Math.sin(2*A)+corner2.y*Math.sin(2*B)+corner3.y*Math.sin(2*C))/(Math.sin(2*A)+Math.sin(2*B)+Math.sin(2*C)));


txt.value=Math.min(AB.length(),AC.length(),BC.length());

if (Math.max(AB.length(),AC.length(),BC.length())==AB.length()) {D=AB.clone();txt.value="AB";}
else if (Math.max(AB.length(),AC.length(),BC.length())==AC.length()) {D=AC.clone();txt.value="AC";}
else {D=BC.clone();txt.value="BC";}



if (Math.max(AB.length(),AC.length(),BC.length())==AB.length()) {var side=two.makePath(corner1.x,corner1.y,corner1.x+D.x,corner1.y+D.y);}
else if (Math.max(AB.length(),AC.length(),BC.length())==AC.length()) {var side=two.makePath(corner1.x,corner1.y,corner1.x+D.x,corner1.y+D.y);}
else {var side=two.makePath(corner2.x,corner2.y,corner2.x+D.x,corner2.y+D.y);}
side.stroke='pink';



if (Math.max(AB.length(),AC.length(),BC.length())==AB.length()) {var O=new Two.Vector(corner1.x+D.x/2,corner1.y+D.y/2);}
else if (Math.max(AB.length(),AC.length(),BC.length())==AC.length()) {var O=new Two.Vector(corner1.x+D.x/2,corner1.y+D.y/2);}
else {var O=new Two.Vector(corner2.x+D.x/2,corner2.y+D.y/2);}

var radius=Math.max(D.length()/2, Two.Vector.distanceBetween(O,corner1),Two.Vector.distanceBetween(O,corner2),Two.Vector.distanceBetween(O,corner3));


circle=two.makeCircle(O.x,O.y,radius);
circle.noFill();
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

  var A=Math.acos(AB.dot(AC)/(AB.length()*AC.length()));
  if (A>Math.PI) {A=2*Math.PI-A;}
  var B=Math.acos(AB.clone().multiplyScalar(-1).dot(BC)/(AB.length()*BC.length()));
  if (B>Math.PI) {B=2*Math.PI-B;}
  var C=Math.acos(BC.clone().multiplyScalar(-1).dot(AC.clone().multiplyScalar(-1))/(BC.length()*AC.length()));
  if (C>Math.PI) {C=2*Math.PI-C;}

  var AB_X=Math.acos(AB.dot(AX)/(AB.length()*AX.length()));
  if (AB_X>Math.PI) {AB_X=2*Math.PI-AB_X;}
  var AC_X=Math.acos(AC.dot(AX)/(AC.length()*AX.length()));
  if (AC_X>Math.PI) {AC_X=2*Math.PI-AC_X;}
  var BA_X=Math.acos(AB.clone().multiplyScalar(-1).dot(BX)/(AB.length()*BX.length()));
  if (BA_X>Math.PI) {BA_X=2*Math.PI-BA_X;}
  var BC_X=Math.acos(BC.dot(BX)/(BC.length()*BX.length()));
  if (BC_X>Math.PI) {BC_X=2*Math.PI-BC_X;}

  if (AB_X<A && AC_X<A && BA_X<B  && BC_X<B ) {return "INSIDE";}
  else {return "OUTSIDE";}



  }


// Bind a function to scale and rotate the group to the animation loop.
  //two.bind('update', update);
// Finally, start the animation loop
  two.play();