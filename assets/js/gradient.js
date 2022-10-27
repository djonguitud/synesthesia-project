var colors = [];
var step = 0;
var colorIndices = [10,5,15,8];
var gradientSpeed = .016;

function genColor(energy, valence, ) {
  
  if (valence<0.5) {
    var colorYelQty = Math.round(valence*10);
    var colorBluQty = Math.round(10-valence*10);
  } else {
    var colorYelQty = Math.round(valence*10);
    var colorBluQty = Math.round(10-valence*10);
  }

  if (energy<0.5) {
    var colorRedQty = Math.round(10-energy*10);
    var colorMagQty = Math.round(energy*10);
  } else {
    var colorRedQty = Math.round(energy*10);
    var colorMagQty = Math.round(10-energy*10);
  }

  for(var i=0; i<colorYelQty; i++) {
    colors.push([255,255-(i*25),0]);
  }
  
  for(var j=0; j<colorBluQty; j++) {
    colors.push([0+(j*25),0,255]);
  }

  for(var k=0; k<colorRedQty; k++) {
    colors.push([255,0,0+(k*25)]);
  }
  
  for(var l=0; l<colorMagQty; l++) {
    colors.push([255,0,255-(l*25)]);
  }

  console.log(colors)
  console.log("y: "+colorYelQty+"  b: "+colorBluQty+"  r: "+colorRedQty+"  m: "+colorMagQty);
  return;
}

function modColor(addColor) {
  
  if(addColor=="yellow") {
    colors.push([255,255-Math.floor(Math.random() * 200), 0]);
  } else if (addColor=="blue") {
    colors.push([0+Math.floor(Math.random() * 200),0,255]);
  } else if (addColor=="red") {
    colors.push([255,0,0+Math.floor(Math.random() * 200)]);
  } else if (addColor=="magenta") {
    colors.push([255,0,255-Math.floor(Math.random() * 200)]);
  }

  console.log(colors)
  return;
}

function updateGradient() {
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;

  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]); 
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

  $('#GradContainer').css({
      background: "-webkit-radial-gradient(center, circle cover, "+color1+","+color2+")"});
  
      step += gradientSpeed;
      if ( step >= 1 )  {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;  
          console.log(colorIndices);
      }
  }

setInterval(updateGradient, 15);