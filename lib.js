function tirarDado(){
    //debugger
    const min = Math.ceil(1);
    const max = Math.floor(NUM_LADOS);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function calcularPuntoMedio(vertexA, vertexB){
    let [x1,y1] = vertexA;
    let [x2,y2] = vertexB;

    let midx = (x1 + x2)/valorPuntoMedio;
    let midy = (y1 + y2)/valorPuntoMedio;

    return [midx, midy];
}

function obtenerUltimoPunto(){
    let lastPoint = points[points.length-1]
    return [lastPoint.x, lastPoint.y];
}

function changeColor(element) {

    let button = document.getElementById(element.target.id);
    let backgroundColor = button.style.backgroundColor;
    let bgValues = backgroundColor.slice(4, -1).split(",");

    actualColor = {r: bgValues[0], g: bgValues[1], b: bgValues[2]};
}


function changeColorFondo(element) {

    let button = document.getElementById(element.target.id);
    let backgroundColor = button.style.backgroundColor;
    let bgValues = backgroundColor.slice(4, -1).split(",");

    figureColor = {r: bgValues[0], g: bgValues[1], b: bgValues[2]};
}

//Funcion que se ejecuta cada que cambia de tamaño la ventana
function windowResized() {
    const divCanvasContainer = document.getElementById("my-canvas");
    const width = divCanvasContainer.clientWidth;
    const height = divCanvasContainer.clientHeight;

    resizeCanvas(width, height);
}

document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener('resize', windowResized);
 
    const btnIniciar = document.getElementById("iniciar");
    const inputIter = document.getElementById("iter");
    const divBotones = document.getElementById("botonesColores");
    const divBotonesFondo = document.getElementById("fondoColores");
    const botonesColores = divBotones.querySelectorAll("button");
    const botonesColoresFondo = divBotonesFondo.querySelectorAll("button");
    const sliderVelocidad = document.getElementById("slider");
    const lblSlider = document.getElementById("lblVelocidad");
    const txtDistanciaPuntos = document.getElementById("numD");
    const botonAgregarLado = document.getElementById("agregarLados");
    const botonReducirLado = document.getElementById("reducirLados");
    const sliderTamPunto = document.getElementById("tamPunto");
    const lblSliderTamPunto = document.getElementById("lblTamPunto");

    for (const button of botonesColores) {
        button.addEventListener("click", changeColor);
    }

    for (const button of botonesColoresFondo) {
        button.addEventListener("click", changeColorFondo);
    }

    txtDistanciaPuntos.addEventListener("change", function(){
        valorPuntoMedio = txtDistanciaPuntos.value;
    });

    sliderVelocidad.addEventListener("change", function(){
        lblSlider.innerHTML = (sliderVelocidad.value / 1000) + 'segs';
        simulatioDelay = sliderVelocidad.value;
    })

    sliderTamPunto.addEventListener("change", function(){
        lblSliderTamPunto.innerHTML = sliderTamPunto.value;
        tamPunto = sliderTamPunto.value;
    })

    botonReducirLado.addEventListener("click", function(){
        //debugger
        points = [];
        aux_num_lados = NUM_LADOS - 1;
        if( aux_num_lados > 2)
            NUM_LADOS = aux_num_lados;
        stopDrawing = false;
        loop();
    })

    botonAgregarLado.addEventListener("click", function(){
        points = [];
        NUM_LADOS = NUM_LADOS + 1;
        stopDrawing = false;
        loop();
    })

    btnIniciar.addEventListener("click", function(){

        stopDrawing = false;
        loop();

        //Reiniciar arreglo de puntos
        points = [];
        //addPoint((vertices[0][0]+vertices[1][0]/2),(vertices[1][1]+vertices[0][1])/2);
        let puntoMedio = calcularPuntoMedio(vertices[0], vertices[1]);
        addPoint(puntoMedio[0], puntoMedio[1]);

        console.log(points)
    
        let iters = inputIter.value > 0 ? inputIter.value : 1000;
    
    
        for(let i=0; i<iters; i++){
            let vertice =  vertices[tirarDado()-1];
            let puntoMedio = calcularPuntoMedio(vertice, obtenerUltimoPunto());
            addPoint(puntoMedio[0], puntoMedio[1]);
            //console.log("Vertice: "+vertice+" PM:"+puntoMedio);
        }
    
        stopDrawing = true;

    
    });
});

