var fpsDiv =  document.getElementById('fps');
var pixelRatio = (function(){
	var ctx = document.createElement("canvas").getContext("2d");
	var dPixelRatio = window.devicePixelRatio || 1;
	var bPixelRatio = ctx.backingStorePixelRatio ||  ctx.webkitBackingStorePixelRatio ||  ctx.mozBackingStorePixelRatio ||  ctx.oBackingStorePixelRatio ||  ctx.msBackingStorePixelRatio || 1;
	return dPixelRatio / bPixelRatio;})()
genCanvas = function( w, h , r){if(!r) { r = pixelRatio;}
	var c = document.createElement("canvas");
	c.width = w * r;
	c.height = h * r;
	c.style.height = h + "px";
	c.style.width = w + "px";
	c.getContext('2d').setTransform(r,0,0,r,0,0);
	return c;}

var wrapperDiv = document.getElementById('wrapper');
var canvas = genCanvas(2000,2000);
wrapperDiv.appendChild(canvas);
var ctx =canvas.getContext('2d');
ctx.fillStyle = "rgb(0,0,0)";
ctx.textAlign = "left";
ctx.textBaseline = "top";

// var spriteReady = false;
// var sprite = new Image();
// sprite.onload = function(){	
// 	spriteReady= true;
// }
// sprite.src= "triangle.png";

var digitsProcessed = 0;
var acceptingInput = false;
var questionNum=1;
var txtEntered='';
acceptingInput= false;
addEventListener("keydown",function(e){	if(e.which == 8){
		e.preventDefault();
	}});
addEventListener("keypress",function(e){
	if(e.which != 13 && acceptingInput==true){
		 txtEntered+=String.fromCharCode(e.which);
		 txtToTypewrite+=String.fromCharCode(e.which);
	}else{
		if(acceptingInput){
			switch(questionNum){
				case 1 :
					txtToTypewrite = "That's fantastic.|I'll now call you fat boy " + txtEntered;
					break;
				case 2 :
					txtToTypewrite = "do you like to eat tacos? ";
					break;
				case 3 :
					txtToTypewrite = "do you know what a taco is? ";
					break;
			}
			txtToType = [];// new Array(txtToTypewrite.split("|").length);
			for(var i = 0 ;i< txtToTypewrite.split("|").length; i++){
				txtToType.push('');
			}
			questionNum++;
			digitsProcessed=0;		
		}
	}

});
/*canvas.addEventListener("mousedown", function(e){
	var n = new Promise(function(resolve, reject){
		resolve (prompt("name") || objects.length+1);
	});
	n.then(function(result){
		var newObj = {
			name: result,
			x: e.offsetX,
			y: e.offsetY,
			target: {
				x: Math.random() * 500 + 1,
				y: Math.random() * 500 + 1
			},
			stationary: true
		}
		objects.push(newObj);	
	})
	
},false);
*/
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame;
var fps = 0;
var fpsSmoothing = 60;
var then = Date.now();
var main = function(){
	var now = Date.now();
   var delta = now-then; 
   update(delta / 1000 ); 
   render();
   then = now;
   requestAnimationFrame(main); 
}


var objects = [
{name: "X", x: rand() ,y:rand(), target: {x: rand(),y: rand()},stationary: false, rotation: 0, mousetarget: {istarget: false,x:0,y:0}},
{name: "X", x: rand() ,y:rand(), target: {x: rand(),y: rand()},stationary: false, rotation: 0, mousetarget: {istarget: false,x:0,y:0}}];
var orbitors = [
 {name: "X",a: rnd(0,360),or: rnd(250,500), d: rnd(5, 100), s:ff(rnd(0.001, 0.005)), x: rand() ,y:rand(), target: {x: rand(),y: rand()},stationary: false, rotation: 0, mousetarget: {istarget: false,x:0,y:0}},
 {name: "X",a: rnd(0,360),or: rnd(250,500), d: rnd(5, 100), s:ff(rnd(0.001, 0.005)), x: rand() ,y:rand(), target: {x: rand(),y: rand()},stationary: false, rotation: 0, mousetarget: {istarget: false,x:0,y:0}} ]

var radi = 200;
var  cx = canvas.width / 2;
var cy = canvas.height / 2;
var speeeeeed = 0.03;

 function setupOrbitors(){
		var xpos;
  		var ypos;	
  		var numNodes = orbitors.length;
  		var ang = (Math.PI * 2)  / numNodes; 
  		orbitors.forEach((o)=>{
			o.a = (i*ang) - (Math.PI / 2);
			o.x =  Math.cos(o.a) * radi + cx;
			o.y = Math.sin(o.a) * radi + cy;
		});
 }

var update = function(delta){
	objects.forEach( (o)=>{
		if(!o.stationary){
			//target x/y
				if(Math.abs(o.x  - o.target.x) > 5){
					o.x+= (o.target.x - o.x ) * (delta*speeeeeed);
				}else{
					o.target.x = rand();
				}
				if(Math.abs(o.y  - o.target.y) >  5) {
						o.y+= (o.target.y - o.y) * (delta*speeeeeed);
				}else{
					o.target.y = rand();
				}	
		}
		o.rotation = calcDirection(o, (delta*speeeeeed));
	});	
	orbitors.forEach((o)=>{
		o.a +=o.s;
		// o.x = Math.cos(o.a) * (o.or *(o.a*0.01) )+ cx ;
		// o.y = Math.sin(o.a) * (o.or * (o.a* 0.02)) + cy;
		o.x = Math.cos(o.a) * o.or + cx ;
		o.y = Math.sin(o.a) *  o.or + cy;

	});
}

var render = function(){
	clearbg();
	objects.forEach( (o)=>{

		//draw sprites
		//ctx.fillText(o.name,o.x,o.y);
		// if(spriteReady){
		// 	ctx.translate(o.x, o.y);
		// 	ctx.rotate(o.rotation - Math.PI/2);
		// 	ctx.drawImage(sprite, -12,-12);
		// 	ctx.rotate(-o.rotation + Math.PI/2);
		// 	ctx.translate(-o.x,-o.y);
		// }

		orbitors.forEach((o)=>{
			ctx.beginPath();
			ctx.moveTo(o.x, o.y);
			//ctx.ellipse(o.x, o.y, o.d,o.d, 0, 360 * (Math.PI / 180), 0, false);
			ctx.fillRect(o.x - (o.d/2), o.y -(o.d/2), o.d, o.d);
			//ctx.fillStyle = "rgba(0,0,255,0.2)";
			//ctx.fillStyle= "rgb(" + map(o.a, 0,20, 0,255)  + "," + map(o.a, 0,20, 0,255)  + "," + map(o.a, 0,20, 0,255)  + ")";
			var x =   Number(    map(o.a,0,365,50,255).toFixed(0));
			var bluetint = x *3;
			ctx.fillStyle= "rgba(" + x  + "," + x  + "," + Math.max(x,x+bluetint)  + "," + map(x,0,255, 0,1) +  ")";
			ctx.fill();

			//void ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
		});
		var index = 0;
		objects.forEach((other)=>{
			if(o!=other){
				index++;
				var colorVal = map(index , 0,objects.length - 5, 0, 255);  
				//console.log( index * 100 / 255 );
				var redTint = colorVal *  3;
				//var c = 'rgb(' + Math.max(colorVal , colorVal+ redTint)  + ',' +colorVal + ',' + colorVal+ ')';
				//ctx.strokeStyle = c;
				ctx.strokeStyle = "#fff";
				ctx.beginPath();
				ctx.moveTo(o.x, o.y);

				ctx.lineTo(other.x,other.y);
				
				
				ctx.stroke();
				ctx.fillStyle = "#fff";
				ctx.font ="12px Open Sans";
				ctx.fillText("(" + Number(o.x).toFixed(2) + ",  " + Number(o.y).toFixed(2) +")",o.x,o.y -15);
			}
		});
		ctx.font = "48px  Open Sans";
		//ctx.fillText(txtEntered, canvas.width / 2 - 300 ,canvas.height / 2 - 400);
		ctx.fillStyle="#fff";	
		var txtY = canvas.height / 2 - 400;
		txtToType.forEach((line)=>{
			if(line.indexOf('undefined') ==0){
				ctx.fillText(line.substr(9) ,  canvas.width / 2 - 300 ,txtY);	
			}else{
				ctx.fillText(line ,  canvas.width / 2 - 300 ,txtY);	
			}
			txtY+=30;
		});
	});
	updateFPS();

}


var txtToTypewrite = 'hello there and welcome, to my| taco nacho! You have been |selected to check out | my cool shit||any time you talk| i am annoyed. what?!|ok man.... |||tell me what your name is: ';
var txtToType = [];//new Array(txtToTypewrite.split("|").length);
for(var i = 0;i < txtToTypewrite.split("|").length; i++){
	txtToType.push("");
}
var txtY = canvas.height / 2 - 400;
var lineNum = 0;

setInterval(function(){

	if( digitsProcessed< txtToTypewrite.length){
		acceptingInput = false;
		var nextChar = txtToTypewrite[digitsProcessed];
		if(nextChar == "|"){
			lineNum++;
			nextChar ="";
		}
		txtToType[lineNum]+=nextChar;
		digitsProcessed++;
	}else{
		acceptingInput = true;
	}
},10);
















//so now we launch it!
main(); 


function clearbg(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
}
function updateFPS(){	var n = Date.now();//get current ticks   
	var thisframe = 1000 / (n - then);
	if(n != then){fps+= (thisframe - fps) / fpsSmoothing;	}
	fpsDiv.innerHTML = "fps: " +  Number(fps.toFixed(0));
}
function rand(){	return Math.random() *  Math.max(canvas.width + 300 , canvas.height + 300) + 1;}
function rnd(min,max){
	return Math.random() * (max - min) + min;
}
function ff(num){

	 return (Number(rnd(0,1).toFixed(0))) ? num : -num;
}

function calcDirection(o,delta){
	var y = o.target.y - o.y;
	var x = o.target.x - o.x;
	var ang = Math.atan2(y,x);
	var orientation= 0;
	var d = (ang - o.rotation);
	var dabs =  Math.abs(d);
	var targetAng = ang + (180 * (Math.PI / 180));
	return targetAng;
}


function map(src, min, max, newmin, newmax){
	return  ((src - min)/ (max -min)) * (newmax  - newmin)  + newmin
}

