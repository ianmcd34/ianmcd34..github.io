

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
var rot1=Math.PI;
var length=100;
var greenTexture = new Two.Texture('https://i.imgur.com/yVjYnyW.png');
var path=greenTexture.src;
greenTexture.offset.x=70;
greenTexture.offset.y=370;
var redBlueTexture= new Two.Texture('https://i.imgur.com/yVjYnyW.png');
redBlueTexture.offset.x=-370;
redBlueTexture.offset.y=380;
var blueTexture= new Two.Texture('https://i.imgur.com/yVjYnyW.png');
blueTexture.offset.x=390;
blueTexture.offset.y=430;
var redTexture= new Two.Texture('https://i.imgur.com/yVjYnyW.png');
redTexture.offset.x=-410;
redTexture.offset.y=420;
var redGreenTexture= new Two.Texture('https://i.imgur.com/yVjYnyW.png');
redGreenTexture.offset.x=778;
redGreenTexture.offset.y=150;
var blueGreenTexture= new Two.Texture('https://i.imgur.com/yVjYnyW.png');
blueGreenTexture.offset.x=412;
blueGreenTexture.offset.y=149;
var redBlueGreenTexture= new Two.Texture('https://i.imgur.com/yVjYnyW.png');
redBlueGreenTexture.offset.x=18;
redBlueGreenTexture.offset.y=111;



var x1=cx-ht-gap*4;
var y1=cy-ht-gap*2;
txt=two.makeText("hi",600,600);


txt.value=parseInt(redTexture.id.substring(redTexture.id.length - 1));

var poly=two.makePolygon(cx,cy,20,5);
poly.position.x=cx+ht;
poly.position.y=cy+ht;
poly.rotation=rot;
poly.fill=redBlueTexture;


var poly1=two.makePolygon(cx,cy,20,6);
poly1.position.x=cx-ht;
poly1.position.y=cy-ht;
poly1.rotation=rot1;
poly1.fill=redBlueGreenTexture;

var polygons=new Array(poly,poly1);
var rotations=new Array(rot,rot1);

function newPolygon() {
  sides=4+Math.floor(Math.random()*2+1);
  rot1=Math.random()*Math.PI*2;
  if (Math.random()<(1/3)) {tex=blueTexture;}
  else if (Math.random()<(1/2)) {tex=redTexture;}
  else {tex=greenTexture};
  poly1=two.makePolygon(cx,cy,20,sides);
  poly1.position.x=cx;
  poly1.position.y=cy;
  poly1.rotation=rot1;
  poly1.fill=tex;

  polygons.push(poly1);
  rotations.push(rot1);

  }



function bump(index,left,top,right,bottom) {

    if (polygons[index].position.x<left) {rotations[index]=Math.PI/2+Math.random()*Math.PI;polygons[index].position.x=polygons[index].position.x+1;}
    else if (polygons[index].position.x>right) {rotations[index]=Math.PI+Math.random()*Math.PI;polygons[index].position.x=polygons[index].position.x-1;}
    else if (polygons[index].position.y<top) {rotations[index]=Math.PI*3/2+Math.random()*Math.PI;polygons[index].position.y=polygons[index].position.y+1;}
    else if (polygons[index].position.y>bottom) {rotations[index]=Math.random()*Math.PI;polygons[index].position.y=polygons[index].position.y-1;}
    polygons[index].rotation=rotations[index];

 }

function interact(index1,index2) {txt.value='interact';
    //same sides, same colour -- avoid/fight for sides
    //exactly same sides, same colour -- avoid/harmonise rotation
    //different sides, same colour -- avoid/mate producing same colour/harmonise rotation
    //same sides, different colour -- avoid/fight for colour
    //exactly same sides, different colour -- avoid
    //different sides, different colour -- avoid/mate producing other colour

    pa_1=Math.random();
    pa_2=Math.random();

    if (polygons[index1].fill==polygons[index2].fill) {
      ph_1=Math.random();
      ph_2=Math.random();
    }
    else {
      ph_1=0;
      ph_2=0;    
    }

   if (Math.max(polygons[index1].sides,polygons[index2].sides)==6 && Math.min(polygons[index1].sides,polygons[index2].sides)==5) {
      pm_1=Math.random();
      pm_2=Math.random();
    }
    else {
      pm_1=0;
      pm_2=0;    
    }

    if (ph_1==0 && pm_1==0) {
      pf_1=Math.random();
    }
    else {
      pf_1=0;
    }

    if (ph_2==0 && pm_2==0) {
      pf_2=Math.random();
    }
    else {
      pf_2=0;
    }
   
    if (Math.max(pa_1,ph_1,pm_1,pf_1)==pa_1) {reaction1='avoid';}
    else if (Math.max(pa_1,ph_1,pm_1,pf_1)==ph_1) {reaction1='harmonise';}
    else if (Math.max(pa_1,ph_1,pm_1,pf_1)==pm_1) {reaction1='mate';}
    else if (Math.max(pa_1,ph_1,pm_1,pf_1)==pf_1) {reaction1='fight';}
    if (Math.max(pa_2,ph_2,pm_2,pf_2)==pa_2) {reaction2='avoid';}
    else if (Math.max(pa_2,ph_2,pm_2,pf_2)==ph_2) {reaction2='harmonise';}
    else if (Math.max(pa_2,ph_2,pm_2,pf_2)==pm_2) {reaction2='mate';}
    else if (Math.max(pa_2,ph_2,pm_2,pf_2)==pf_2) {reaction2='fight';}

    if (reaction1=='avoid') {
      if (polygons[index2].sides>polygons[index1].sides) {result=reaction2;}
      else {result=reaction1;}
    }
    if (reaction1=='harmonise') {
      if (reaction2=='avoid') {result=reaction2;}
      else if (reaction1=='harmonise' || reaction1=='mate') {result=reaction1;}
      else if (polygons[index2].sides>polygons[index1].sides) {result=reaction2;}
      else {result=reaction1;}
    }
    if (reaction1=='mate') {
      if (reaction2!='avoid') {result=reaction2;}
      else if (polygons[index1].sides>polygons[index2].sides) {result=reaction1;}
      else {result=reaction2;}
    }
    if (reaction1=='fight') {
      if (reaction2=='fight' || reaction2=='mate') {result=reaction1;}
      else if (polygons[index1].sides>polygons[index2].sides) {result=reaction1;}
      else {result=reaction2;}
    }
   txt.value=result;
   if (result=='harmonise') {harmonise(index1,index2);}
   else if (result=='mate') {mate(index1,index2);}
   else if (result=='fight') {fight(index1,index2);}

  }


function harmonise(index1,index2) {
  rotn=(polygons[index1].rotation+polygons[index2].rotation)/2;
  rotations[index1]=rotn;
  rotations[index2]=rotn;
  polygons[index1].rotation=rotations[index1];
  polygons[index2].rotation=rotations[index2];
  }

function mate(index1,index2) {
  if (Math.random()<0.5) {sides=3;}
  else {sides=4;}
  rot1=(polygons[index1].rotation+polygons[index2].rotation)/2;
  switch(polygons[index1].fill.id) {
    case redTexture.id: code1=2;
    break;
    case blueTexture.id: code1=3;
    break;
    case greenTexture.id: code1=5;
    break;
    case redBlueTexture.id: code1=7;
    break;
    case redGreenTexture.id: code1=11;
    break;
    case blueGreenTexture.id: code1=13;
    break;
    case redBlueGreenTexture.id: code1=17;
    break;
    default: code1=0;
  }
  switch(polygons[index2].fill.id) {
    case redTexture.id: code2=2;
    break;
    case blueTexture.id: code2=3;
    break;
    case greenTexture.id: code2=5;
    break;
    case redBlueTexture.id: code2=7;
    break;
    case redGreenTexture.id: code2=11;
    break;
    case blueGreenTexture.id: code2=13;
    break;
    case redBlueGreenTexture.id: code2=17;
    break;
    default: code2=0;
  }
  txt.value=code1+","+code2;
  switch(code1*code2) {
     case 4: case 39: case 65: case 221:
       tex=redTexture;
     break;
     case 14: case 21: case 25: case 119:
       tex=greenTexture;
     break;
     case 22: case 9: case 55: case 187:
       tex=blueTexture;
     break;
     case 6: case 85: case 49: case 143:
       tex=redBlueTexture;
     break;
     case 10: case 51: case 91: case 121:
       tex=redGreenTexture;
     break;
     case 34: case 15: case 77: case 169:
       tex=blueGreenTexture;
     break;
     case 26: case 33: case 35: case 289:
       tex=redBlueGreenTexture;
     break;
     default: tex='white';
  }
  poly1=two.makePolygon(0,0,20,sides);
  poly1.position.x=3*ht;
  poly1.position.y=3*ht;
  poly1.rotation=rot1;
  poly1.fill=tex;

  polygons.push(poly1);
  rotations.push(rot1);
  
  }

function fight(index1,index2) {txt.value='fight';
   sides1=polygons[index1].sides;
   sides2=polygons[index2].sides;
   result=Math.floor(Math.random()*(sides1+sides2)+1);
   if (result<=sides1) {sides1=sides1+2; sides2=sides2-2;}
   else {sides1=sides1-2; sides2=sides2+2;}
   if (sides1<3) {
     polygons[index1].remove();polygons.splice(index1,1);
     if (index2>index1) {index2=index2-1;}}
   if (sides2<3) {
     polygons[index2].remove();polygons.splice(index2,1);
     if (index1>index2) {index1=index1-1;}}
   if (sides1>6) {sides1=sides1-2;polygons[index1].radius=polygons[index1].radius+5;}
   if (sides2>6) {sides2=sides2-2;polygons[index2].radius=polygons[index2].radius+5;}
   if (sides1>=3) {polygons[index1].sides=sides1;}
   if (sides2>=3) {polygons[index2].sides=sides2;}
  }






// Bind a function to scale and rotate the group to the animation loop.
  two.bind('update', update);
// Finally, start the animation loop
  two.play();

function update(frameCount) {
  // This code is called every time two.update() is called.
  next=false;
  tick =Math.floor(frameCount/speed);

  for (i=0; i<polygons.length; i++) {
    dx=Math.sin(rotations[i]);
    dy=Math.cos(rotations[i]);

    polygons[i].position.x=polygons[i].position.x+dx;
    polygons[i].position.y=polygons[i].position.y+dy;
   }

  
  for (i=0; i<polygons.length; i++) {
    

    if (polygons[i].position.x<1) {
      polygons[i].position.x=two.width-1;
    }
    if (polygons[i].position.x>two.width-1) {
      polygons[i].position.x=1;
    }
    if (polygons[i].position.y<1) {
      polygons[i].position.y=two.height-1;
    }
    if (polygons[i].position.y>two.height-1) {
      polygons[i].position.y=1;
    }

      for (j=i+1; j<polygons.length; j++) {

        if (Math.abs(polygons[i].position.x-polygons[j].position.x)<20 && Math.abs(polygons[i].position.y-polygons[j].position.y)<20) { 
          if (polygons[i].position.x-polygons[j].position.x>=0 && polygons[i].position.y-polygons[j].position.y>=0)       {
            bump(i,polygons[j].position.x+20,polygons[j].position.y+20,two.width,two.height);
            bump(j,0,0,polygons[i].position.x-20,polygons[i].position.y-20);
           }
          else if (polygons[i].position.x-polygons[j].position.x<0 && polygons[i].position.y-polygons[j].position.y>=0) {
            bump(i,0,polygons[j].position.y+20,polygons[j].position.x-20,two.height);
            bump(j,polygons[i].position.x+20,0,two.width,polygons[i].position.y-20);
            }
          else if (polygons[i].position.x-polygons[j].position.x>=0 && polygons[i].position.y-polygons[j].position.y<0) {
            bump(i,polygons[j].position.x+20,0,two.width,polygons[j].position.y-20);
            bump(j,0,polygons[i].position.y+20,polygons[i].position.x-20,two.height);
            }
          else if (polygons[i].position.x-polygons[j].position.x<0 && polygons[i].position.y-polygons[j].position.y<0) {
            bump(i,0,0,polygons[j].position.x-20,polygons[j].position.y-20);
            bump(j,polygons[i].position.x+20,polygons[i].position.y+20,two.width,two.height);
            }
	  interact(i,j);
          }
        }
     }
  }

document.addEventListener('keydown', function(event) {
    
    if(event.keyCode == 39) {
	redBlueGreenTexture.offset.x=redBlueGreenTexture.offset.x+1;
    }
    else if(event.keyCode == 37) {
	redBlueGreenTexture.offset.y=redBlueGreenTexture.offset.y+1;
    }
    else if(event.keyCode == 38) {
	redBlueGreenTexture.offset.x=redBlueGreenTexture.offset.x-1;
    }
    else if(event.keyCode == 40) {
	redBlueGreenTexture.offset.y=redBlueGreenTexture.offset.y-1;
    }
    else if(event.keyCode == 32) {

    }
    txt.value=redBlueGreenTexture.offset.x+","+redBlueGreenTexture.offset.y;
    redBlueGreenTexture.load();
    
});


document.addEventListener('click', function(event) {

  newPolygon();
});
