
var NUM_LADOS = 3;
var CARAS_DE_DADO = NUM_LADOS;
var LADO_FIGURA = 300;
var stopDrawing = false;
var changeStroke = false;
var actualColor = {r: 0, g: 0, b: 0};
var figureColor = {r: 255, g: 255, b: 255};
var simulatioDelay = 0;
var valorPuntoMedio = 2;
var tamPunto = 1;

// Vértices del triángulo
var vertices ;

// Declarar variables para el lienzo y el contenedor
let canvas;
let canvasContainer;
let points = []; // Almacena los puntos agregados al plano

function setup() {

  const divCanvasContainer = document.getElementById("my-canvas");
  const width = divCanvasContainer.clientWidth;
  const height = divCanvasContainer.clientHeight;

  // console.log("width: " + width);
  // console.log("height: " + height);

  canvas = createCanvas(width, height); // Crear un lienzo de 400x300

  // Colocar el lienzo dentro del contenedor
  canvas.parent('#my-canvas');

  vertices = generarFigura(NUM_LADOS, LADO_FIGURA);
}

const sleep = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis))
}

async function draw() {

  if (stopDrawing) {
    noLoop(); // Detiene la función draw
  }else{
    loop();
    stopDrawing = false;
  }

  const divCanvasContainer = document.getElementById("my-canvas");
  const width = divCanvasContainer.clientWidth;
  const height = divCanvasContainer.clientHeight;

  if(height < 300)
    LADO_FIGURA = height / 2;
  else
    LADO_FIGURA = (width - (width-height))/2;
  
  //background(220);
  
  translate(width/2, height/2); // Coloca el origen en el centro del lienzo
  scale(1, -1); // Invierte la dirección del eje Y para que sea coherente con el sistema cartesiano

  vertices = generarFigura(NUM_LADOS, LADO_FIGURA);

  background(figureColor.r, figureColor.g, figureColor.b);
  dibujarFigura(vertices);
  
  for (let point of points) {
    stroke(actualColor.r, actualColor.g, actualColor.b);
    ellipse(point.x, point.y, tamPunto, tamPunto); // Dibujar los puntos almacenados en el array
    if(simulatioDelay > 0)
        await sleep(simulatioDelay);
  }

}

function generarFigura(n, tam_lado) {
  // Crea un arreglo vacío para almacenar los vértices de la figura
  const vertices = [];

  // Calcula el ángulo central de la figura
  const anguloCentral = 2 * Math.PI / n;

  // Itera sobre los n lados de la figura
  for (let i = 0; i < n; i++) {
    // Calcula las coordenadas del vértice actual
    const x = Math.cos(anguloCentral * i) * tam_lado;
    const y = Math.sin(anguloCentral * i) * tam_lado;

    // Agrega el vértice al arreglo
    vertices.push([x, y]);
  }

  // Devuelve el arreglo de vértices
  return vertices;
}

function dibujarFigura(vertices) {
  stroke(actualColor.r, actualColor.g, actualColor.b);
  // Itera sobre los n lados de la figura
  for (let i = 0; i < vertices.length - 1; i++) {
    // Dibuja una línea entre el vértice actual y el siguiente
    line(vertices[i][0], vertices[i][1], vertices[i + 1][0], vertices[i + 1][1]);
  }

  // Dibuja una línea entre el último vértice y el primero
  line(vertices[vertices.length - 1][0], vertices[vertices.length - 1][1], vertices[0][0], vertices[0][1]);
}
  

function startDrawing() {
    points = []; // Limpiar el array de puntos al presionar el botón "Dibujar"
}


// Función para agregar un punto al plano en una posición específica (x, y)
function addPoint(x, y) {
    points.push({ x: x, y: y });
}

function changeStrokeColor(color){
    actualColor = color;
}