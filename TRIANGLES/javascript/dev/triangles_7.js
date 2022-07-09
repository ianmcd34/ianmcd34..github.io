
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
var d_min=600;
var nearCorners=new Array();
var txt=two.makeText("",600,600);


var recCornertl=new Two.Vector(cx-300,cy-200);
var recCornertr=new Two.Vector(cx+300,cy-200);
var recCornerbl=new Two.Vector(cx-300,cy+200);
var recCornerbr=new Two.Vector(cx+300,cy+200);


var corner1= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner2= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner3= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));

var triangle=two.makePath(corner1.x,corner1.y,corner2.x,corner2.y,corner3.x,corner3.y,false);
two.makeCircle((corner1.x+corner2.x+corner3.x)/3,(corner1.y+corner2.y+corner3.y)/3,10);
var group=two.makeGroup(triangle);


function newPoint() {

newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
//two.makeCircle(newCorner.x,newCorner.y,10);
no_triangles=group.children.length;

if (!checkInsideAll(newCorner)) {
  d_min=600;
  d_min2=600;
  var nearest_t;
  nearCorners=new Array();

  group.children.forEach(findMin_d);
  txt.value=nearCorners.length;

  group.children.forEach(findMin_d2);

 
  triangle=two.makePath(newCorner.x,newCorner.y,nearCorners[0].x,nearCorners[0].y,nearCorners[1].x,nearCorners[1].y,false);
  group.add(triangle);
  }

}


function findMin_d(t) {
   
      d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
      d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
      d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));

      if (Math.min(d_a,d_b,d_c)<d_min) {d_x=Math.min(d_a,d_b,d_c);    	
	if (nearCorners.length>0) {
	nearCorners.pop();} 
	var Da=new Two.Vector(newCorner.x+0.99*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.99*(t.vertices[0].y+t.position.y-newCorner.y));
	var Db=new Two.Vector(newCorner.x+0.99*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[1].y+t.position.y-newCorner.y));
	var Dc=new Two.Vector(newCorner.x+0.99*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[2].y+t.position.y-newCorner.y));

	if(d_x==d_a && !checkInsideAll(Da)) {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value="findMind 1";}
	else if (d_x==d_a) {d_x=Math.min(d_b,d_c); if (d_x>d_min) {d_x=600;} txt.value="findMind 2";}

	if(d_x==d_b && !checkInsideAll(Db)) {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;txt.value="findMind 3";}
	else if(d_x==d_b) {d_x=Math.min(d_a,d_c); 
	  if (d_x>d_min) {d_x=600;txt.value="findMind 4";}
	  if(d_x==d_a && !checkInsideAll(Da)) {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value="findMind 5";}}

	if(d_x==d_c && !checkInsideAll(Dc)) {nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));d_min=d_x;txt.value="findMind 6";}
	else if(d_x==d_c) {d_x=Math.min(d_a,d_b);
	if (d_x>d_min) {d_x=600;txt.value="findMind 7";}
	if(d_x==d_a && !checkInsideAll(Da)) {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;txt.value="findMind 8";}
	if(d_x==d_b && !checkInsideAll(Db)) {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;txt.value="findMind 9";}}

	}

  }

function findMin_d2(t) {
  txt.value="start find Mind2";
  d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
  d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
  d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));
  Da=new Two.Vector(newCorner.x+0.95*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.95*(t.vertices[0].y+t.position.y-newCorner.y));
  Db=new Two.Vector(newCorner.x+0.95*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.95*(t.vertices[1].y+t.position.y-newCorner.y));
  Dc=new Two.Vector(newCorner.x+0.95*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.95*(t.vertices[2].y+t.position.y-newCorner.y));
txt.value=d_min+","+d_min2+","+d_a+","+d_b+","+d_c;

  if (d_min==d_a && d_min2>Math.min(d_b,d_c)) {txt.value="d_min==d_a";
    if (d_b==Math.min(d_b,d_c) && checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;txt.value=nearCorners.length;}
    else if (d_c==Math.min(d_b,d_c) && checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;txt.value=nearCorners.length;}
    else if (checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;txt.value=nearCorners.length;}
    else if (checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;txt.value=nearCorners.length;}}

  if (d_min==d_b && d_min2>Math.min(d_a,d_c)) {txt.value="d_min==d_b";
    if (d_a==Math.min(d_a,d_c) && checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;txt.value=nearCorners.length;}
    else if (d_c==Math.min(d_a,d_c) && checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));  d_min2=d_c; txt.value=nearCorners.length;}
    else if (checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;txt.value=nearCorners.length;}
    else if (checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;txt.value=nearCorners.length;}}

  if (d_min==d_c && d_min2>Math.min(d_a,d_b)) {txt.value="d_min==d_c";
    if (d_a==Math.min(d_a,d_b) && checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));  d_min2=d_a;txt.value=nearCorners.length;}
    else if (d_b==Math.min(d_a,d_b) && checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));  d_min2=d_b; txt.value=nearCorners.length;}
    else if (checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;txt.value=nearCorners.length;}
    else if (checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;txt.value=nearCorners.length;}}

}


function convexify() {
  var point1;
  var point2;
  txt.value="convexify start"+group.children.length;

  lastTriangle=group.children[group.children.length-1];

  //check if last triangle made shape convex
  concave=false;
  for (i=0; i<group.children.length-1; i++) {
    for (j=0; j<3; j++) {txt.value="convexify find vertices"+j;
      vertex=new Two.Vector(group.children[i].position.x+group.children[i].vertices[j].x,group.children[i].position.y+group.children[i].vertices[j].y);two.makeCircle(vertex.x,vertex.y,10);

      A=new Two.Vector(lastTriangle.position.x+lastTriangle.vertices[0].x,lastTriangle.position.y+lastTriangle.vertices[0].y);

      B=new Two.Vector(lastTriangle.position.x+lastTriangle.vertices[1].x,lastTriangle.position.y+lastTriangle.vertices[1].y);

      C=new Two.Vector(lastTriangle.position.x+lastTriangle.vertices[2].x,lastTriangle.position.y+lastTriangle.vertices[2].y);

       Ap=vertex.clone().lerp(A,0.95); Ap.x=Math.floor(Ap.x); Ap.y=Math.floor(Ap.y);
       Bp=vertex.clone().lerp(B,0.95); Bp.x=Math.floor(Bp.x); Bp.y=Math.floor(Bp.y);
       Cp=vertex.clone().lerp(C,0.95); Cp.x=Math.floor(Cp.x); Cp.y=Math.floor(Cp.y);
txt.value="A=("+A.x+","+A.y+"),B=("+B.x+","+B.y+"),C=("+C.x+","+C.y+"),P=(";
c=two.makeCircle(Ap.x,Ap.y,5); if (!vertex.equals(Ap) && !(checkInsideAll(Ap))) {c.fill='Pink';txt.value=txt.value+Ap.x+","+Ap.y+")";}
c=two.makeCircle(Bp.x,Bp.y,5); if (!vertex.equals(Bp) && !(checkInsideAll(Bp))) {c.fill='Pink';txt.value=txt.value+Bp.x+","+Bp.y+")";}
c=two.makeCircle(Cp.x,Cp.y,5); if (!vertex.equals(Cp) && !(checkInsideAll(Cp))) {c.fill='Pink';txt.value=txt.value+Cp.x+","+Cp.y+")";}
  if (!vertex.equals(Ap) && concave==false) {concave=!(checkInsideAll(Ap)) ;}
  if (!vertex.equals(Bp) && concave==false) {concave=!(checkInsideAll(Bp)) ;}
  if (!vertex.equals(Cp) && concave==false) {concave=!(checkInsideAll(Cp)) ;}
txt.value=txt.value+","+concave;
    if (concave) {
      if (!vertex.equals(Ap) && !(checkInsideAll(Ap))) {
	if (checkInsideAll(Bp.clone().add(Ap.clone().multiplyScalar(0.05))))
          {p=two.makePath(vertex.x,vertex.y,lastTriangle.position.x+lastTriangle.vertices[0].x,lastTriangle.position.y+lastTriangle.vertices[0].y,lastTriangle.position.x+lastTriangle.vertices[2].x,lastTriangle.position.y+lastTriangle.vertices[2].y, false);txt.value="convexify add XAC";}/*
	  else {p=two.makePath(vertex.x,vertex.y,lastTriangle.position.x+lastTriangle.vertices[0].x,lastTriangle.position.y+lastTriangle.vertices[0].y,lastTriangle.position.x+lastTriangle.vertices[1].x,lastTriangle.position.y+lastTriangle.vertices[1].y, false);txt.value="convexify add XAB";}
       
        group.add(p);*/
      }/*
      else if (!vertex.equals(Bp) && !(checkInsideAll(Bp))) {
	if (checkInsideAll(Ap.clone().add(Bp.clone().multiplyScalar(0.05))))
          {p=two.makePath(vertex.x,vertex.y,lastTriangle.position.x+lastTriangle.vertices[1].x,lastTriangle.position.y+lastTriangle.vertices[1].y,lastTriangle.position.x+lastTriangle.vertices[2].x,lastTriangle.position.y+lastTriangle.vertices[2].y, false);txt.value="convexify add XBC";}
	  else {p=two.makePath(vertex.x,vertex.y,lastTriangle.position.x+lastTriangle.vertices[1].x,lastTriangle.position.y+lastTriangle.vertices[1].y,lastTriangle.position.x+lastTriangle.vertices[0].x,lastTriangle.position.y+lastTriangle.vertices[0].y, false);txt.value="convexify add XAB";}
       group.add(p);
      }
      else if (!vertex.equals(Cp) && !(checkInsideAll(Cp))) {
	if (checkInsideAll(Ap.clone().add(Cp.clone().multiplyScalar(0.05))))
          {p=two.makePath(vertex.x,vertex.y,lastTriangle.position.x+lastTriangle.vertices[2].x,lastTriangle.position.y+lastTriangle.vertices[2].y,lastTriangle.position.x+lastTriangle.vertices[1].x,lastTriangle.position.y+lastTriangle.vertices[1].y, false);txt.value="convexify add XBC";}
	  else {p=two.makePath(vertex.x,vertex.y,lastTriangle.position.x+lastTriangle.vertices[2].x,lastTriangle.position.y+lastTriangle.vertices[2].y,lastTriangle.position.x+lastTriangle.vertices[0].x,lastTriangle.position.y+lastTriangle.vertices[0].y, false);txt.value="convexify add XAC";}
       group.add(p);
         
      } 
     */}
   }
  }

 }

function sign (p1, p2, p3)
{
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}
/*
function PointInTriangle (t,p)
{
    var d1, d2, d3;
    var has_neg, has_pos;
    v1=new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y);
    v2=new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y);
    v3=new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y);

    d1 = sign(p, v1, v2);
    d2 = sign(p, v2, v3);
    d3 = sign(p, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

function getIsPointInsidePolygon(t,p) {
   return PointInTriangle (t,p);
/*   result2 = PointInTriangle(two.makePath(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y,t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y,t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y,false), p);

   return (result1 && result2);

const x = p.x;
const y = p.y;
var i;
var j;
const epsilon=5;

let inside = false;
for (i=0, j=2; i<3; i++) {
        if ((t.vertices[i].y+t.position.y< y && t.vertices[j].y+t.position.y>=y || 
 t.vertices[j].y+t.position.y< y && t.vertices[i].y+t.position.y>y)
            && (t.vertices[i].x+t.position.x<x || t.vertices[j].x+t.position.x<=x)) {
              if ((t.vertices[i].x+t.position.x + (y-t.vertices[i].y-t.position.y)*(t.vertices[j].x+t.position.x-t.vertices[i].x-t.position.x)/(t.vertices[j].y+t.position.y-t.vertices[i].y-t.position.y)) <= x) {inside=!inside;}; 
        
        j=i; 
    }

  }
return inside;
*/
}

*/
/*
function checkInsideAll(p) {
  var result=false;
  var i;
  for (i=0; i<group.children.length; i++) {
      if (getIsPointInsidePolygon(group.children[i],p)) {result=true;}
    }
  return result;
  }
*/
// Bind a function to scale and rotate the group to the animation loop.
  //two.bind('update', update);
// Finally, start the animation loop
  two.play();

document.addEventListener('click', function(event) {
    txt.value=event.toString();
    newPoint();
    convexify();
});

document.addEventListener('keydown', function(event) {

    if(event.keyCode == 40) {
        triangle.fill='yellow';
	triangle.opacity=0.5;
    }

});