
const CARAS_DE_DADO = 3;
const MIN = 1;
const C_WIDTH = 700;
const C_HEIGHT = 410;
var LADO_FIGURA = 400;
var stopDrawing = false;
var changeStroke = false;
var actualColor = {r: 76, g: 147, b: 180};
var figureColor = {r: 255, g: 255, b: 255};
var simulatioDelay = 0;
var valorPuntoMedio = 2;

// Vértices del triángulo
var vertex1 = [0, LADO_FIGURA];
var vertex2 = [-(LADO_FIGURA/2), 0];
var vertex3 = [LADO_FIGURA/2, 0];
var vertices = [vertex1, vertex2, vertex3];

let vertexA, vertexB, vertexC;

// Declarar variables para el lienzo y el contenedor
let canvas;
let canvasContainer;
let points = []; // Almacena los puntos agregados al plano

function setup() {

  const divCanvasContainer = document.getElementById("my-canvas");
  const width = divCanvasContainer.clientWidth;
  const height = divCanvasContainer.clientHeight;

  console.log("width: " + width);
  console.log("height: " + height);

  LADO_FIGURA = width-100

  canvas = createCanvas(width, height); // Crear un lienzo de 400x300

  // Colocar el lienzo dentro del contenedor
  canvas.parent('#my-canvas');

  vertexA = createVector(vertex1[0], vertex1[1]); // Coordenadas del vértice A
  vertexB = createVector(vertex2[0], vertex2[1]);  // Coordenadas del vértice B
  vertexC = createVector(vertex3[0], vertex3[1]);     // Coordenadas del vértice C

  vertices = [vertex1, vertex2, vertex3];
  //frameRate(1); 
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

  console.log("Lado triangulo: " + height);
  if(height < 300)
    LADO_FIGURA = height;
  else
    LADO_FIGURA = width - (width-height);

  var vertex1 = [0, LADO_FIGURA];
  var vertex2 = [-(LADO_FIGURA/2), 0];
  var vertex3 = [LADO_FIGURA/2, 0];

  vertexA = createVector(vertex1[0], vertex1[1]); // Coordenadas del vértice A
  vertexB = createVector(vertex2[0], vertex2[1]);  // Coordenadas del vértice B
  vertexC = createVector(vertex3[0], vertex3[1]);     // Coordenadas del vértice C

  vertices = [vertex1, vertex2, vertex3];
  
  background(220);
  
  translate(width/2, height); // Coloca el origen en el centro del lienzo
  scale(1, -1); // Invierte la dirección del eje Y para que sea coherente con el sistema cartesiano

  drawTriangle(vertexA, vertexB, vertexC);
  fill(figureColor.r, figureColor.g, figureColor.b);
  
  for (let point of points) {
    stroke(actualColor.r, actualColor.g, actualColor.b);
    ellipse(point.x, point.y, 5, 5); // Dibujar los puntos almacenados en el array
    if(simulatioDelay > 0)
        await sleep(simulatioDelay);
  }

  //points = [];

}
  

function getRandomDecimal(min, max, decimalPlaces) {
    const range = max - min;
    const randomValue = Math.random() * range + min;
    const multiplier = Math.pow(10, decimalPlaces);
    const roundedValue = Math.round(randomValue * multiplier) / multiplier;
    return roundedValue;
  }


  function createVector(array) {
    // Verificar que el arreglo tenga dos elementos
    if (array.length !== 2) {
      throw new Error("El arreglo debe tener dos elementos");
    }
  
    // Crear el vector
    const vector = [array[0], array[1]];
  
    return vector;
  }

  // Función para generar un punto aleatorio entre dos puntos
function generateRandomPointBetween(p1, p2) {
    const t = Math.random();
    const x = p1[0] + t * (p2[0] - p1[0]);
    const y = p1[1] + t * (p2[1] - p1[1]);
    return [x, y];
}

// Función para comprobar si un punto está dentro de un triángulo
function isPointInsideTriangle(point, v1, v2, v3) {
    const b1 = (v2[0] - v1[0]) * (point[1] - v1[1]) - (point[0] - v1[0]) * (v2[1] - v1[1]);
    const b2 = (v3[0] - v2[0]) * (point[1] - v2[1]) - (point[0] - v2[0]) * (v3[1] - v2[1]);
    const b3 = (v1[0] - v3[0]) * (point[1] - v3[1]) - (point[0] - v3[0]) * (v1[1] - v3[1]);
    
    return (b1 >= 0 && b2 >= 0 && b3 >= 0) || (b1 <= 0 && b2 <= 0 && b3 <= 0);
}

// Función para generar puntos aleatorios dentro del triángulo equilátero
function generateRandomPointsInTriangle(v1, v2, v3, numPoints) {
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
        const randomT = Math.random();
        const randomSqrtT = Math.sqrt(randomT);
        
        const x = (1 - randomSqrtT) * v1[0] + (randomSqrtT * (1 - randomT)) * v2[0] + (randomT * randomSqrtT) * v3[0];
        const y = (1 - randomSqrtT) * v1[1] + (randomSqrtT * (1 - randomT)) * v2[1] + (randomT * randomSqrtT) * v3[1];
        
        const point = [x, y];
        
        if (isPointInsideTriangle(point, v1, v2, v3)) {
            points.push(point);
        }
    }
    
    return points;
}

function startDrawing() {
    points = []; // Limpiar el array de puntos al presionar el botón "Dibujar"
}

function init(){
    let resultantPoints = generateRandomPointsInTriangle(vertex1, vertex2, vertex3, 10000);
    resultantPoints.forEach( (point) => {
        addPoint(point[0], point[1]);
    })
}


// Función para agregar un punto al plano en una posición específica (x, y)
function addPoint(x, y) {
    points.push({ x: x, y: y });
}

function drawTriangle(v1, v2, v3) {
    triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
}

function changeStrokeColor(color){
    actualColor = color;
}