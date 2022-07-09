


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
//var txt1=two.makeText("",600,570);
var colours=new Array('pink','green','blue','orange','red','yellow');
var triangle=two.makePath(0,0,0,0,0,0,false);
//var tax=two.makeText("Ax",10,10);
//var tbx=two.makeText("Bx",10,10);
//var tcx=two.makeText("Cx",10,10);
//var ta=two.makeText("A",10,10);
//var tb=two.makeText("B",10,10);
//var tc=two.makeText("C",10,10);
var counter=0;


var recCornertl=new Two.Vector(cx-300,cy-200);
var recCornertr=new Two.Vector(cx+300,cy-200);
var recCornerbl=new Two.Vector(cx-300,cy+200);
var recCornerbr=new Two.Vector(cx+300,cy+200);

do {
triangle.remove();
var corner1= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner2= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var corner3= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
var newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));

var triangle=two.makePath(corner1.x,corner1.y,corner2.x,corner2.y,corner3.x,corner3.y,false);
}

while(checkSharpness(triangle)=="sharp");

var group=two.makeGroup(triangle);



function newPoint() {txt.value="newPoint";

newCorner= new Two.Vector(recCornertl.x+Math.floor(Math.random()*(recCornertr.x-recCornertl.x)),recCornertl.y+Math.floor(Math.random()*(recCornerbr.y-recCornertl.y)));
//c=two.makeCircle(newCorner.x,newCorner.y,10);
no_triangles=group.children.length;

if (!checkInsideAll(newCorner)) {
  d_min=600;
  d_min2=600;
  var nearest_t;
  nearCorners=new Array();

  group.children.forEach(findMin_d);
 // txt.value=nearCorners.length;

  group.children.forEach(findMin_d2);

 if (nearCorners.length<2) {return;}

  triangle=two.makePath(newCorner.x,newCorner.y,nearCorners[0].x,nearCorners[0].y,nearCorners[1].x,nearCorners[1].y,false);

  if (checkSharpness(triangle)!="sharp") {
    group.add(triangle);
  }
  else {triangle.remove();}
  }

  else {
    for (n=0; n<group.children.length; n++) {
        if (pointInTriangle(group.children[n],newCorner)) {
          tXAB=two.makePath(newCorner.x,newCorner.y,group.children[n].position.x+group.children[n].vertices[0].x,group.children[n].position.y+group.children[n].vertices[0].y,group.children[n].position.x			+group.children[n].vertices[1].x,group.children[n].position.y+group.children[n].vertices[1].y, false);
	  tXAC=two.makePath(newCorner.x,newCorner.y,group.children[n].position.x+group.children[n].vertices[0].x,group.children[n].position.y+group.children[n].vertices[0].y,group.children[n].position.x			+group.children[n].vertices[2].x,group.children[n].position.y+group.children[n].vertices[2].y, false);
	  tXBC=two.makePath(newCorner.x,newCorner.y,group.children[n].position.x+group.children[n].vertices[1].x,group.children[n].position.y+group.children[n].vertices[1].y,group.children[n].position.x			+group.children[n].vertices[2].x,group.children[n].position.y+group.children[n].vertices[2].y, false);
	  if (checkSharpness(tXAB)!="sharp" && checkSharpness(tXAC)!="sharp" && checkSharpness(tXBC)!="sharp") 	    {
	      group.add(tXAB);group.add(tXAC);group.add(tXBC);group.remove(group.children[n]);
	    }
	   else {tXAB.remove(); tXAC.remove(); tXBC.remove();}
        }
    }

  }

}


function findMin_d(t) {txt.value="findMin_d";
   
      d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
      d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
      d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));

      if (Math.min(d_a,d_b,d_c)<d_min) {d_x=Math.min(d_a,d_b,d_c);    	
	if (nearCorners.length>0) {
	nearCorners.pop();} 
	var Da=new Two.Vector(newCorner.x+0.99*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.99*(t.vertices[0].y+t.position.y-newCorner.y));
	var Db=new Two.Vector(newCorner.x+0.99*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[1].y+t.position.y-newCorner.y));
	var Dc=new Two.Vector(newCorner.x+0.99*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.99*(t.vertices[2].y+t.position.y-newCorner.y));

	if(d_x==d_a && !checkInsideAll(Da)) {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;}
	else if (d_x==d_a) {d_x=Math.min(d_b,d_c); if (d_x>d_min) {d_x=600;} }

	if(d_x==d_b && !checkInsideAll(Db)) {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;}
	else if(d_x==d_b) {d_x=Math.min(d_a,d_c); 
	  if (d_x>d_min) {d_x=600;}
	  if(d_x==d_a && !checkInsideAll(Da)) {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;}}

	if(d_x==d_c && !checkInsideAll(Dc)) {nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));d_min=d_x;}
	else if(d_x==d_c) {d_x=Math.min(d_a,d_b);
	if (d_x>d_min) {d_x=600;}
	if(d_x==d_a && !checkInsideAll(Da)) {nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));d_min=d_x;}
	if(d_x==d_b && !checkInsideAll(Db)) {nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));d_min=d_x;}}

	}

  }

function findMin_d2(t) {txt.value="findMin_d2";
  
  d_a=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));
  d_b=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));
  d_c=Two.Vector.distanceBetween(newCorner,new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));
  Da=new Two.Vector(newCorner.x+0.95*(t.vertices[0].x+t.position.x-						newCorner.x),newCorner.y+0.95*(t.vertices[0].y+t.position.y-newCorner.y));
  Db=new Two.Vector(newCorner.x+0.95*(t.vertices[1].x+t.position.x-							newCorner.x),newCorner.y+0.95*(t.vertices[1].y+t.position.y-newCorner.y));
  Dc=new Two.Vector(newCorner.x+0.95*(t.vertices[2].x+t.position.x-							newCorner.x),newCorner.y+0.95*(t.vertices[2].y+t.position.y-newCorner.y));


  if (d_min==d_a && d_min2>Math.min(d_b,d_c)) {
    if (d_b==Math.min(d_b,d_c) && checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;}
    else if (d_c==Math.min(d_b,d_c) && checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;}
    else if (checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;}
    else if (checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;}}

  if (d_min==d_b && d_min2>Math.min(d_a,d_c)) {
    if (d_a==Math.min(d_a,d_c) && checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;}
    else if (d_c==Math.min(d_a,d_c) && checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y));  d_min2=d_c; }
    else if (checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;}
    else if (checkInsideAll(Dc)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[2].x+t.position.x,t.vertices[2].y+t.position.y)); d_min2=d_c;}}

  if (d_min==d_c && d_min2>Math.min(d_a,d_b)) {
    if (d_a==Math.min(d_a,d_b) && checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y));  d_min2=d_a;}
    else if (d_b==Math.min(d_a,d_b) && checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y));  d_min2=d_b; }
    else if (checkInsideAll(Da)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[0].x+t.position.x,t.vertices[0].y+t.position.y)); d_min2=d_a;}
    else if (checkInsideAll(Db)==false) {if (d_min2<600) {nearCorners.pop();}
nearCorners.push(new Two.Vector(t.vertices[1].x+t.position.x,t.vertices[1].y+t.position.y)); d_min2=d_b;}}

}


function convexify(counter) {txt.value="convexify";
  var point1;
  var point2;
  var groupsize=group.children.length;
  txt.value="convexify start"+group.children.length;

  lastTriangle=group.children[groupsize-1];
  A=new Two.Vector(lastTriangle.position.x+lastTriangle.vertices[0].x,lastTriangle.position.y+lastTriangle.vertices[0].y);
 two.scene.remove(ta);
 ta=two.makeText("A",A.x,A.y);

  B=new Two.Vector(lastTriangle.position.x+lastTriangle.vertices[1].x,lastTriangle.position.y+lastTriangle.vertices[1].y);
 two.scene.remove(tb);
 tb=two.makeText("B",B.x,B.y);

  C=new Two.Vector(lastTriangle.position.x+lastTriangle.vertices[2].x,lastTriangle.position.y+lastTriangle.vertices[2].y);
 two.scene.remove(tc);
 tc=two.makeText("C",C.x,C.y);

  //find outside vertex of lastTriangle
  var Afound=false;
  var Bfound=false;
  var Cfound=false;

  for (i=0; i<groupsize-1; i++) {

    Ax=new Two.Vector(group.children[i].position.x+group.children[i].vertices[0].x,group.children[i].position.y+group.children[i].vertices[0].y);

    Bx=new Two.Vector(group.children[i].position.x+group.children[i].vertices[1].x,group.children[i].position.y+group.children[i].vertices[1].y);

    Cx=new Two.Vector(group.children[i].position.x+group.children[i].vertices[2].x,group.children[i].position.y+group.children[i].vertices[2].y);
    if (A.equals(Ax)) {Afound=true;}
    if (A.equals(Bx)) {Afound=true;}
    if (A.equals(Cx)) {Afound=true;}
    if (B.equals(Bx)) {Bfound=true;}
    if (B.equals(Cx)) {Bfound=true;}
    if (B.equals(Ax)) {Bfound=true;}
    if (C.equals(Cx)) {Cfound=true;}
    if (C.equals(Ax)) {Cfound=true;}
    if (C.equals(Bx)) {Cfound=true;}
  }


  if (Afound==false) {
    c=two.makeCircle(A.x,A.y,10);
    vertex=A.clone();
  }
  if (Bfound==false) {
    c=two.makeCircle(B.x,B.y,10);
    vertex=B.clone()
  }
  if (Cfound==false) {
    c=two.makeCircle(C.x,C.y,10);
    vertex=C.clone();
  }



  //check if last triangle made shape convex
  concave=false;
  i=counter;
  


      Ax=new Two.Vector(group.children[i].position.x+group.children[i].vertices[0].x,group.children[i].position.y+group.children[i].vertices[0].y);
two.scene.remove(tax);
tax=two.makeText("Ax",Ax.x+5,Ax.y+5);

      Bx=new Two.Vector(group.children[i].position.x+group.children[i].vertices[1].x,group.children[i].position.y+group.children[i].vertices[1].y);
two.scene.remove(tbx);
tbx=two.makeText("Bx",Bx.x+5,Bx.y+5);

      Cx=new Two.Vector(group.children[i].position.x+group.children[i].vertices[2].x,group.children[i].position.y+group.children[i].vertices[2].y);
two.scene.remove(tcx);
tcx=two.makeText("Cx",Cx.x+5,Cx.y+5);


  if (Ax.equals(A) || Ax.equals(B) || Ax.equals(C) || Bx.equals(A) || Bx.equals(B) || Bx.equals(C) || Cx.equals(A) || Cx.equals(B) || Cx.equals(C) ) {

Ap=Ax.clone().lerp(vertex,(Ax.distanceTo(vertex)-20)/Ax.distanceTo(vertex)); txt.value=txt.value+"Ap=("+Ap.x+","+Ap.y+")";
Bp=Bx.clone().lerp(vertex,(Bx.distanceTo(vertex)-20)/Bx.distanceTo(vertex)); txt.value=txt.value+"Bp=("+Bp.x+","+Bp.y+")";
Cp=Cx.clone().lerp(vertex,(Cx.distanceTo(vertex)-20)/Cx.distanceTo(vertex)); txt.value=txt.value+"Cp=("+Cp.x+","+Cp.y+")";

  if (concave==false && !Ax.equals(A) && !Ax.equals(B) && !Ax.equals(C) ) {
	 c=two.makeCircle(Ap.x,Ap.y,5); if (!(checkInsideAll_multi(Ax,vertex))) 	{c.fill='Pink';vertex1=Ax.clone();txt.value="checkOutsideAll_multi(Cx,Ap)="+checkOutsideAll_multi(Cx,Ap)+"checkOutsideAll_multi(Bx,Ap)="+checkOutsideAll_multi(Bx,Ap);}; concave=!(checkInsideAll(Ap)) ;}
  if (concave==false && !Bx.equals(A) && !Bx.equals(B) && !Bx.equals(C) ) {
	 c=two.makeCircle(Bp.x,Bp.y,5); if ( !(checkInsideAll_multi(Bx,vertex))) 	{c.fill='Pink';vertex1=Bx.clone();txt.value="checkOutsideAll_multi(Ax,Bp)="+checkOutsideAll_multi(Ax,Bp)+"checkOutsideAll_multi(Cx,Bp)="+checkOutsideAll_multi(Cx,Bp);}; concave=!(checkInsideAll(Bp)) ;}
  if (concave==false && !Cx.equals(A) && !Cx.equals(B) && !Cx.equals(C) ) {
	 c=two.makeCircle(Cp.x,Cp.y,5); if (!(checkInsideAll_multi(Cx,vertex))) 	{c.fill='Pink';vertex1=Cx.clone();txt.value="checkOutsideAll_multi(Ax,Cp)="+checkOutsideAll_multi(Ax,Cp)+"checkOutsideAll_multi(Bx,Cp)="+checkOutsideAll_multi(Bx,Cp);}; concave=!(checkInsideAll(Cp)) ;}


    if (concave && (vertex1.equals(Ax) && (checkOutsideAll_multi(Cx,Ap) || checkOutsideAll_multi(Bx,Ap)) || vertex1.equals(Bx) && (checkOutsideAll_multi(Cx,Bp) || checkOutsideAll_multi(Ax,Bp)) || vertex1.equals(Cx) && (checkOutsideAll_multi(Bx,Cp) || checkOutsideAll_multi(Ax,Cp)))) {group.children[i].fill="green";
      if (vertex1.equals(Ax) ) {
	if (checkOutsideAll_multi(Cx,Ap))
          {
	    p=two.makePath(vertex.x,vertex.y,Ax.x,Ax.y,Cx.x,Cx.y, false);txt.value=txt.value+"XAC"+checkSharpness(p);
	  }
	else if (checkOutsideAll_multi(Bx,Ap)) 
	  {
	    p=two.makePath(vertex.x,vertex.y,Ax.x,Ax.y,Bx.x,Bx.y, false);txt.value=txt.value+"XAB"+checkSharpness(p);
	  }
	}
      
      else if (vertex1.equals(Bx)) {
	if (checkOutsideAll_multi(Cx,Bp))
          {p=two.makePath(vertex.x,vertex.y,Bx.x,Bx.y,Cx.x,Cx.y, false);txt.value=txt.value+"XBC"+checkSharpness(p);
	  }
	else if (checkOutsideAll_multi(Ax,Bp)) 
	  {p=two.makePath(vertex.x,vertex.y,Ax.x,Ax.y,Bx.x,Bx.y, false);txt.value=txt.value+"XAB"+checkSharpness(p);
	  }
        }
      else if (vertex1.equals(Cx)) {
	if (checkOutsideAll_multi(Bx,Cp))
          {p=two.makePath(vertex.x,vertex.y,Bx.x,Bx.y,Cx.x,Cx.y, false);txt.value=txt.value+"XBC"+checkSharpness(p);
	  }
	else if (checkOutsideAll_multi(Ax,Cp)) 
	  {p=two.makePath(vertex.x,vertex.y,Ax.x,Ax.y,Cx.x,Cx.y, false);txt.value=txt.value+"XAC"+checkSharpness(p);
	  }         
        } 
      if (checkSharpness(p)!="sharp") {
    	  group.add(p);
  	}
      else {p.remove();}
    }
  else {group.children[i].fill="pink";}

  }

 

}

function sign (p1, p2, p3)
{txt.value="sign";
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle (t,p)
{txt.value="pointInTriangle";
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

function checkInsideAll(p) {txt.value="checkInsideAll";
  var result=false;
  var i;
  for (i=0; i<group.children.length; i++) {
      if (pointInTriangle(group.children[i],p)) {result=true;}
    }
  return result;
  }

function checkInsideAll_multi(s,f) {txt.value="checkInsideAll_multi";
  var result=false;
  for (n=1; n<100; n++) {
    if (checkInsideAll(s.clone().lerp(f,n/100))) {result=true;}
  }
  return result;
 }

function checkOutsideAll_multi(s,f) {
  var result=true;
  for (n=1; n<100; n++) {
    if (checkInsideAll(s.clone().lerp(f,n/100))) {result=false;}
  }
  return result;
 }


function checkSharpness(t) {
    AB=t.vertices[1].clone().subtract(t.vertices[0]);
    AC=t.vertices[2].clone().subtract(t.vertices[0]);
    BC=t.vertices[2].clone().subtract(t.vertices[1]);
    A=Math.acos(AB.dot(AC)/(AB.length()*AC.length()));
    B=Math.acos(AB.clone().multiplyScalar(-1).dot(BC)/(AB.length()*BC.length()));
    C=Math.acos(AC.clone().multiplyScalar(-1).dot(BC.clone().multiplyScalar(-1))/(AC.length()*BC.length()));;

    if (A/(2*Math.PI)*360>10 && B/(2*Math.PI)*360>10 && C/(2*Math.PI)*360>10) {return "not sharp";}
    else {return "sharp";}
  }

// Bind a function to scale and rotate the group to the animation loop.
  //two.bind('update', update);
// Finally, start the animation loop
  two.play();

document.addEventListener('click', function(event) {
  for (j=0; j<200;j++) {
    //txt1.value=counter;

    
    //two.scene.remove(two.scene.getByType(Two.Circle));
    //convexify(counter);
    //counter=counter+1;

    newPoint();
   }
  for (i=0; i<group.children.length; i++) {
          group.children[i].fill=colours[i%6];
	  group.children[i].opacity=1;
      }
});


document.addEventListener('keydown', function(event) {

    if(event.keyCode == 40) {
        for (n=0; n<group.children.length; n++) {group.children[n].fill='white';}
	
    }

    else if(event.keyCode == 32) { 

    }

});