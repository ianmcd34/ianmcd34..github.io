

var params = {
  fullscreen: true
};
var elem = document.body;
var two = new Two(params).appendTo(elem);

var cx = two.width * 0.5;
var cy = two.height * 0.5;
var ht=cx/7;
var gap=ht/6;
var sq=0;
var speed=1;
var rot=0;
var length=100;

var x1=cx-ht-gap*4;
var y1=cy-ht-gap*2;
txt=two.makeText("hi",600,600);

arrow=two.makeArrow(0,0,length,0);
arrow.position.x=cx;
arrow.position.y=cy;
arrow.stroke='green';
arrow.linewidth=10;
arrow.rotation=rot;

velocity=new Two.Vector(10,0);


var arrows=new Array(arrow);
var velocities=new Array(velocity);

redArrow();

function redArrow() {
  maxLength=0;
  maxIndex=0;
  //txt.value=velocities.length;
  for (let j=0; j<velocities.length; j++) {
    if(arrows[j].stroke=='red') {arrows[j].stroke='yellow';}

    if(velocities[j].length()>maxLength) {
      maxLength=velocities[j].length();
      maxIndex=j;
    }
  }
  arrows[maxIndex].stroke='red';
}

function flock(a) {

    arrow=arrows[a];
    velocity=velocities[a];


  midpoint=new Two.Vector(arrow.position.x+(100*velocity.length()/10*Math.cos(arrow.rotation))/2,arrow.position.y+(100*velocity.length()/10*Math.sin(arrow.rotation))/2);
  
  leastDist=cx*cx;
  nearest=0;

  for (let j=0; j<velocities.length; j++) {
    midpoint_j=new Two.Vector(arrows[j].position.x+(100*velocity.length()/10*Math.cos(arrows[j].rotation))/2,arrows[j].position.y+(100*velocity.length()/10*Math.sin(arrows[j].rotation))/2);
    if (j!=a) {
      dist=Two.Vector.distanceBetweenSquared(midpoint,midpoint_j);
      if (dist<leastDist) {
        leastDist=dist;
	nearest=j;
	}
     }
  }
  
  repulse=Math.floor(10000/leastDist);
  //txt.value=repulse;
  if (nearest!=a) {
    midpoint_j=new Two.Vector(arrows[nearest].position.x+(100*velocity.length()/10*Math.cos(arrows  [nearest].rotation))/2,arrows[nearest].position.y+(100*velocity.length()/10*Math.sin(arrows  [nearest].rotation))/2);

    preCollisionMomentum=velocities[a].length()+velocities[nearest].length();

    velocities[a].x=velocities[a].x+repulse*(midpoint.x-midpoint_j.x)/Math.abs((midpoint.x-midpoint_j.x));
    velocities[a].y=velocities[a].y+repulse*(midpoint.y-midpoint_j.y)/Math.abs((midpoint.y-midpoint_j.y));


    velocities[nearest].x=velocities[nearest].x-repulse*(midpoint.x-midpoint_j.x)/Math.abs((midpoint.x-midpoint_j.x));
    velocities[nearest].y=velocities[nearest].y-repulse*(midpoint.y-midpoint_j.y)/Math.abs((midpoint.y-midpoint_j.y));


   postCollisionMomentum=velocities[a].length()+velocities[nearest].length();
   velocities[a]=velocities[a].multiplyScalar(preCollisionMomentum/postCollisionMomentum);
   velocities[nearest]=velocities[nearest].multiplyScalar(preCollisionMomentum/postCollisionMomentum);
  }
  
  redArrow();
}


// Bind a function to scale and rotate the group to the animation loop.
  two.bind('update', update);
// Finally, start the animation loop
  two.play();

function update(frameCount) {
  // This code is called every time two.update() is called.
  next=false;
  tick =Math.floor(frameCount/speed);

if (tick%2==0) {
  for (let i = 0; i < arrows.length; i++) {
    arrow=arrows[i];
    velocity=velocities[i];

    flock(i);

    arrow.position.x=arrow.position.x+velocity.x;
    arrow.position.y=arrow.position.y+velocity.y;




    if (arrow.position.x>two.width-100) {
      arrow.position.x=0;
      }
    if (arrow.position.x<0) {
      arrow.position.x=two.width-100;
      }
    if (arrow.position.y>two.height) {
      arrow.position.y=0;
      }
    if (arrow.position.y<0) {
      arrow.position.y=two.height;
      }

    rot=Math.atan(Math.abs(velocity.y)/Math.abs(velocity.x));    

      if (velocity.y<0 && velocity.x<0) {rot=rot+Math.PI;}
      if (velocity.y>0 && velocity.x<0) {rot=Math.PI-rot;}
      if (velocity.y<0 && velocity.x>0) {rot=2*Math.PI-rot;}
      //if (velocity.y>0 && velocity.x>0) {}
      if (velocity.y==0 && velocity.x<0) {rot=Math.PI;}
      if (velocity.y==0 && velocity.x>0) {rot=0;}
      if (velocity.y<0 && velocity.x==0) {rot=3*Math.PI/2;}
      if (velocity.y>0 && velocity.x==0) {rot=Math.PI/2;}

    //if (arrow.stroke=='red') {txt.value=velocity.x+","+velocity.y+","+","+rot;}
    arrow.rotation=rot;
    arrow.scale=velocity.length()/10;
    arrow.plot();
    }
  
  
}
  }

document.addEventListener('keydown', function(event) {
    squares.children[selection.x*4+selection.y].linewidth=1;
    if(event.keyCode == 39) {

    }
    else if(event.keyCode == 37) {

    }
    else if(event.keyCode == 38) {

    }
    else if(event.keyCode == 40) {

    }
    else if(event.keyCode == 32) {

    }

});


document.addEventListener('click', function(event) {

  
  for (let i = 0; i < arrows.length; i++) {
    arrow=arrows[i];
    velocity=velocities[i];

    if (event.clientX<arrow.position.x) {velocity.x=velocity.x-1;}
    else {velocity.x=velocity.x+1;}
    if (event.clientY<arrow.position.y) {velocity.y=velocity.y-1;}
    else {velocity.y=velocity.y+1;}


  }

  velocity=new Two.Vector(10*(event.clientX-cx)/cx,10*(event.clientY-cy)/cy);
  rot=Math.atan(velocity.y/velocity.x);
      if (velocity.y<0 && velocity.x<0) {rot=rot+Math.PI;}
      if (velocity.y>0 && velocity.x<0) {rot=rot+Math.PI;}
      if (velocity.y==0 && velocity.x<0) {rot=Math.PI;}
      if (velocity.y==0 && velocity.x>0) {rot=0;}
  arrow=two.makeArrow(0,0,length,0);
  arrow.position.x=cx;
  arrow.position.y=cy;
  arrow.stroke='green';
  arrow.linewidth=10;
  arrow.scale=velocity.length()/10;
  arrow.rotation=rot;

  arrows.push(arrow);
  velocities.push(velocity);

  redArrow();


});
