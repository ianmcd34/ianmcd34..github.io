/*
lb b y b
y  p r lb
b lb b p
p  r y r

*/

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
var selection=new Two.Vector(0,0);
var selectionArray=new Array();
var circleArray=new Array();

var x1=cx-ht-gap*4;
var y1=cy-ht-gap*2;
txt=two.makeText("Use the Arrows to move and Space to select/swap.",600,600);



lb= 'rgba(75, 75, 150, 0.55)';
b= 'rgba(100, 150, 250, 0.75)';
y='rgba(100, 50, 100, 0.75)';
p='rgba(200, 100, 50, 0.75)';
r='rgba(220, 50, 50, 0.75)';

var x=new Array();
var y=new Array();
squares=two.makeGroup();

x[0]=x1;
y[0]=y1;

for (i=1; i<4; i++) {
  x[i]=x[i-1]+ht+gap;
  y[i]=y[i-1]+ht+gap;
}


for (i=0; i<16; i++) {
  squares.add(two.makeRectangle(x[i%4], y[Math.floor(i/4)], ht, ht));
}


squares.children[0].fill='DeepSkyBlue';
squares.children[1].fill='Blue';
squares.children[2].fill='Yellow';
squares.children[3].fill='Blue';
squares.children[4].fill='Yellow';
squares.children[5].fill='Pink';
squares.children[6].fill='Red';
squares.children[7].fill='DeepSkyBlue';
squares.children[8].fill='Blue';
squares.children[9].fill='DeepSkyBlue';
squares.children[10].fill='Blue';
squares.children[11].fill='Pink';
squares.children[12].fill='Pink';
squares.children[13].fill='Red';
squares.children[14].fill='Yellow';
squares.children[15].fill='Red';

squares.children[0].linewidth=10;


function swap() {
  if (selectionArray[0]==selectionArray[1]) {
    
    }
  else {
    change=selectionArray[0].clone();
    selectionArray[0].fill=selectionArray[1].fill;
    selectionArray[1].fill=change.fill;
  }

  circleArray[0].remove();
  circleArray[1].remove();
  circleArray.pop();
  circleArray.pop();
  selectionArray.pop();
  selectionArray.pop();
}


// Bind a function to scale and rotate the group to the animation loop.
  //two.bind('update', update);
// Finally, start the animation loop
  two.play();

document.addEventListener('keydown', function(event) {
    squares.children[selection.x*4+selection.y].linewidth=1;
    if(event.keyCode == 39) {
        selection.y=selection.y+1;
	if (selection.y>3) {selection.y=0;}
    }
    else if(event.keyCode == 37) {
	selection.y=selection.y-1;
	if (selection.y<0) {selection.y=3;}
    }
    else if(event.keyCode == 38) {
	selection.x=selection.x-1;
	if (selection.x<0) {selection.x=3;}
    }
    else if(event.keyCode == 40) {
	selection.x=selection.x+1;
	if (selection.x>3) {selection.x=0;}
    }
    else if(event.keyCode == 32) {
	if (selectionArray.length in [0,1]) {
	  selectionArray.push(squares.children[selection.x*4+selection.y]);
	  circleArray.push(two.makeCircle(squares.children[selection.x*4+selection.y].position.x, squares.children[selection.x*4+selection.y].position.y, 20));
	  }
	else {
	  swap();
	}
    }
   squares.children[selection.x*4+selection.y].linewidth=10;
});
