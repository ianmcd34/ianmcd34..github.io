

var params = {
  fullscreen: true
};
var elem = document.body;
var two = new Two(params).appendTo(elem);

var cx = two.width * 0.5;
var cy = two.height * 0.5;
var ht=cx/5;
var imax=3;
iteration=0;
var speed=1;

var x1=cx;
var y1=cy;

var rect1 = two.makePolygon(0,0, ht,3 );
rect1.translation.set(x1,y1);
rect1.stroke = 'white';


var mssage=two.makeText("0",cx,cy);
mssage.size=21;
mssage.weight=750;



//kochTriangle(0, rect1);

function kochTriangle(iteration, baseTriangle) {
	rect=nextTriangle(iteration, baseTriangle, "left");
	rect=nextTriangle(iteration, baseTriangle, "right");
	rect=nextTriangle(iteration, baseTriangle, "middle");
	rect=nextTriangle(iteration, baseTriangle, "inleft");
	rect=nextTriangle(iteration, baseTriangle, "inright");
	rect=nextTriangle(iteration, baseTriangle, "inmiddle");

	if (iteration<imax) {
		iteration=iteration+1;
		kochTriangle(iteration,nextTriangle(iteration-1, baseTriangle, "left"));
		kochTriangle(iteration,nextTriangle(iteration-1, baseTriangle, "right"));
		kochTriangle(iteration,nextTriangle(iteration-1, baseTriangle, "middle"));
		kochTriangle(iteration,nextTriangle(iteration-1, baseTriangle, "inleft"));
		kochTriangle(iteration,nextTriangle(iteration-1, baseTriangle, "inright"));
		kochTriangle(iteration,nextTriangle(iteration-1, baseTriangle, "inmiddle"));
	}
  }



function nextTriangle(iteration, baseTriangle, position) {
	var rect=baseTriangle.clone(two);
	x=rect.position.x;
	y=rect.position.y;
	s=rect.scale;
	r=rect.rotation;

	rect.scale=s*0.3333333333;
	if (r==0 && position=="left" ) {
		r=Math.PI*(1/3);
		x=x-(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y-(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r!=0 && position=="left" ) {
		r=0;
		x=x-(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y+(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r==0 && position=="right" ) {
		r=Math.PI*(1/3);
		x=x+(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y-(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r!=0 && position=="right" ) {
		r=0;
		x=x+(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y+(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r==0 && position=="middle" ) {
		r=Math.PI*(1/3);
		y=y+(ht/2+ht/6)*Math.pow((1/3),iteration);
	}
	else if (r!=0 && position=="middle" ) {
		r=0;
		y=y-(ht/2+ht/6)*Math.pow((1/3),iteration);
	}
	else if (r==0 && position=="inleft" ) {
		x=x-(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y+(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r!=0 && position=="inleft" ) {
		x=x-(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y-(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r==0 && position=="inright" ) {
		x=x+(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y+(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r!=0 && position=="inright" ) {
		x=x+(Math.sqrt(3)*ht/4+Math.sqrt(3)*ht/12)*Math.pow((1/3),iteration);
		y=y-(ht/4+ht/12)*Math.pow((1/3),iteration);
	}
	else if (r==0 && position=="inmiddle" ) {
		y=y-(ht/2+ht/6)*Math.pow((1/3),iteration);
	}
	else if (r!=0 && position=="inmiddle" ) {
		y=y+(ht/2+ht/6)*Math.pow((1/3),iteration);
	}
	

	rect.rotation=r;
	rect.translation.set(x,y);

	return rect;
  
    
  }







// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', update);
// Finally, start the animation loop
two.play();




function update(frameCount) {
  // This code is called every time two.update() is called.
  speed=350;
  tick1= Math.floor((frameCount-(speed/5))/speed);
  tick2= Math.floor((frameCount-(speed*2/5))/speed);
  tick3= Math.floor((frameCount-(speed*3/5))/speed);
  tick4= Math.floor((frameCount-(speed*4/5))/speed);
  tick5= Math.floor((frameCount-speed)/speed);
  //mssage.value=4-(tick1-tick2)-(tick1-tick3)-(tick1-tick4);

    if (4-(tick1-tick2)-(tick1-tick3)-(tick1-tick4)-(tick1-tick5)!=mssage.value) {
       two.clear();
       rect1 = two.makePolygon(0,0, ht,3 );
       rect1.translation.set(x1,y1);
       rect1.stroke = 'white';

       mssage.size=21;
       mssage.weight=750;
       mssage.value=4-(tick1-tick2)-(tick1-tick3)-(tick1-tick4)-(tick1-tick5);
       imax=4-(tick1-tick2)-(tick1-tick3)-(tick1-tick4)-(tick1-tick5);
       kochTriangle(0, rect1);
   }

  }

