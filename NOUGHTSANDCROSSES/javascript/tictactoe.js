
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
var crossedArray=new Array();

var x1=cx-ht-gap*4;
var y1=cy-ht-gap*2;
txt=two.makeText("Use the Arrows to move and Space to select/swap.",600,600);
txtPlayer=two.makeText("Player X.",cx,130);


var x=new Array();
var y=new Array();


x[0]=x1;
y[0]=y1;

for (i=1; i<4; i++) {
  x[i]=x[i-1]+ht+gap;
  y[i]=y[i-1]+ht+gap;
}

for (i=1; i<3; i++) {
  two.makeLine(x[i],y[0],x[i],y[3]);
  two.makeLine(x[0],y[i],x[3],y[i]);
}

txtCurrent=two.makeText("X",x[0]+ht/2+gap/2,y[0]+ht/2+gap/2);
txtCurrent.size=50;
txtCurrent.opacity=0.5;

function checkForWinner() {
  
}


// Bind a function to scale and rotate the group to the animation loop.
  //two.bind('update', update);
// Finally, start the animation loop
  two.play();


document.addEventListener('keydown', function(event) {
    txtCurrent.value="";
    if(event.keyCode == 39) {
        selection.x=selection.x+1;
	if (selection.x>2) {selection.x=0;}
    }
    else if(event.keyCode == 37) {
	selection.x=selection.x-1;
	if (selection.x<0) {selection.x=2;}
    }
    else if(event.keyCode == 38) {
	selection.y=selection.y-1;
	if (selection.y<0) {selection.y=2;}
    }
    else if(event.keyCode == 40) {
	selection.y=selection.y+1;
	if (selection.y>2) {selection.y=0;}
    }
    else if(event.keyCode == 32) {
	selectionTaken=false;
	if (selectionArray.length>0) {
	  for (i=0; i<selectionArray.length-1; i=i+2) {
	      if (selectionArray[i]==selection.x && selectionArray[i+1]==selection.y) {selectionTaken=true;}
	  }
	}

	if (selectionTaken==false) {
	  selectionArray.push(selection.x);
	  selectionArray.push(selection.y);
	  txtSelection=txtCurrent.clone(two);
	  txtSelection.opacity=1;
	  if (txtPlayer.value=="Player X.") {
	    txtSelection.value="X";
	    txtPlayer.value="Player O."
	  }
          else {
	    txtSelection.value="O";
	    txtPlayer.value="Player X."
	  }

	  
	  

	}
	
    }
    txtCurrent.position.x=x[selection.x]+ht/2+gap/2;
    txtCurrent.position.y=y[selection.y]+ht/2+gap/2;
    if (txtPlayer.value=="Player X.") {
	txtCurrent.value="X";
	}
    else {
	txtCurrent.value="O";
	}

});
