//colores default, una vez que carga despliega los 4 colores base
var colors = [[255,0,0],
              [0,0,255],
              [255,255,0],
              [255,0,255]];

var step = 0; //step: variable que varía de 0 a 1 para generar el efecto de "fade" del color
var colorIndices = [0,1,2,3]; //step: inicialización de los índices, estos cambiarán dependiendo de la longitud del arr de colores
var gradientSpeed = .016; //velocidad del efecto "fade", este se suma y resta a step

//función para generar la matriz. esta función es llamada cuando se obtienen los datos energy y valence
function genColor(energy, valence) {

  var newColors = []; //nuevo arr inicializado para sobreescribir el arr de colores actal
  
  // algoritmo para generar cantidades de colores (amarillo=1=feliz y azul=0=triste para valence y rojo=1=energético y magenta=0=relajado). Se utiliza una base 10 para calcular cantidades de cada color
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
    newColors.push([255,255-(i*25),0]); //con las cantidades definidas, agrega los colores haciendo ligeras variaciones de cada color, así, si hay 6 amarillos, serán 6 amarillos distintos
  }
  
  for(var j=0; j<colorBluQty; j++) {
    newColors.push([0+(j*25),0,255]);
  }

  for(var k=0; k<colorRedQty; k++) {
    newColors.push([255,0,0+(k*25)]);
  }
  
  for(var l=0; l<colorMagQty; l++) {
    newColors.push([255,0,255-(l*25)]);
  }
  
  //console.log("actual  --->   ");
  //console.log(colors)
  //console.log("y: "+colorYelQty+"  b: "+colorBluQty+"  r: "+colorRedQty+"  m: "+colorMagQty);
  //console.log("nueva  --->   ");
  colors = newColors; //sobreescribe el arr actual de colores
  colorIndices[0] = 0; //sobreescribe los índices por si el arr anterior era de longitud mayor a 20, así evita valores undefined
  colorIndices[1] = 1;
  colorIndices[2] = 2;
  colorIndices[3] = 3;
  //console.log(newColors);
  //console.log("sobreescrita  --->   ");
  //console.log(colors);

  return;
}

// función que manda a llamar el usuario al hacer click en los botones para agregar colores
function modColor(addColor) {
  
  if(addColor=="yellow") {
    colors.push([255,255-Math.floor(Math.random() * 200), 0]); // se agrega una tonalidad al azar del color seleccionado, así se verán más matices en la animación
    colors.push([255,255-Math.floor(Math.random() * 200), 0]);
  } else if (addColor=="blue") {
    colors.push([0+Math.floor(Math.random() * 200),0,255]);
    colors.push([0+Math.floor(Math.random() * 200),0,255]);
  } else if (addColor=="red") {
    colors.push([255,0,0+Math.floor(Math.random() * 200)]);
    colors.push([255,0,0+Math.floor(Math.random() * 200)]);
  } else if (addColor=="magenta") {
    colors.push([255,0,255-Math.floor(Math.random() * 200)]);
    colors.push([255,0,255-Math.floor(Math.random() * 200)]);
  }

  //console.log("actual  --->   ");
  //console.log(colors)
  return;
}

// función llamada recurrentemente para cambiar las propiedades del DOM
function updateGradient() {

  // el gradiente tiene dos colores compuestos por dos colores que se "suman" para generar un tercer color el cual será modificado con cada llamada de la función.
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  // empieza en 1 lo cual hace que el primer color desplegado sea el original seleccionado del arr de colores, con las siguientes iteraciones, istep irá disminuyendo y step aumentando
  var istep = 1 - step;

  // con las variaciones de step e istep, la suma de colores se define en función a  los valores de step e istep
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]); 
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

  //modificación del DOM para agregar el efecto radial-gradient 
  $('#GradContainer').css({
      background: "-webkit-radial-gradient(center, circle cover, "+color1+","+color2+")"});
  
      //aumento de step para restar a istep en el siguiente llamado a la función
      step += gradientSpeed;

      //cuando step es mayor a 1, selecciona nuevos colores y los asigna a los índices 1 y 3 para que estos después se muevan a las posiciones 0 y 1. Así se tienen una animación más suave
      if ( step >= 1 )  {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length; //los dos nuevos colores se seleccionan al azar cuidando de que no se seleccione la misma posición de color
          colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;  
          //console.log(colorIndices);
      }
  }

setInterval(updateGradient, 15);