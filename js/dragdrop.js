var urlParams = new URLSearchParams(window.location.search);
var vuelta = urlParams.get('vuelta');
var vueltaContador = urlParams.get('tiempo');
var vueltaPuntaje = urlParams.get('puntaje');
var nombre = urlParams.get('usuario');
var contador, nivel, puntaje;

if(vuelta==null){
    vuelta=1;
    contador=0;
    puntaje=0;
    nivel = document.getElementById('nivel').innerHTML="Nivel 1";
}else{
    contador=vueltaContador;
    puntaje=Number(vueltaPuntaje);
    nivel = document.getElementById('nivel').innerHTML="Nivel 2";
}

const valorContador = document.getElementById('tiempo');
let temporizador = setInterval(() => {
    contador++;

    // Calcular las horas, minutos y segundos
    let horas = Math.floor(contador / 3600);
    let minutos = Math.floor((contador % 3600) / 60);
    let segundos = contador % 60;

    // Asegúrarse de que las horas, minutos y segundos siempre tengan dos dígitos
    horas = (horas < 10) ? '0' + horas : horas;
    minutos = (minutos < 10) ? '0' + minutos : minutos;
    segundos = (segundos < 10) ? '0' + segundos : segundos;

    // Actualizar el contenido del elemento
    valorContador.textContent = `Tiempo: ${minutos}:${segundos}`;
}, 1000);

var encima, dentro, lienzoActivo, aciertos=0, url, audio;

function iniciar() {
    actualizarPuntaje();
    var imagenes = document.querySelectorAll('#cajaimagenes > img');
    for(var i=0; i<imagenes.length; i++){
        imagenes[i].addEventListener('dragstart', arrastrado, false);
        imagenes[i].addEventListener('dragend', finalizado, false);
    }
    soltar=document.getElementById('lienzo');
    soltar2=document.getElementById('lienzo2');
    soltar3=document.getElementById('lienzo3');

    lienzo=soltar.getContext('2d');
    lienzo2=soltar2.getContext('2d');
    lienzo3=soltar3.getContext('2d');
    
    asignarLienzo(soltar, soltar2, soltar3);
}

function asignarLienzo(l1, l2, l3){
    l1.addEventListener('dragenter', eventoEnter, false);
    l1.addEventListener('dragover', eventoOver, false);
    l1.addEventListener('drop', soltado, false);
    l1.addEventListener('dragleave', salio, false);

    l2.addEventListener('dragenter', eventoEnter, false);
    l2.addEventListener('dragover', eventoOver, false);
    l2.addEventListener('drop', soltado, false);
    l2.addEventListener('dragleave', salio, false);
    
    l3.addEventListener('dragenter', eventoEnter, false);
    l3.addEventListener('dragover', eventoOver, false);
    l3.addEventListener('drop', soltado, false);
    l3.addEventListener('dragleave', salio, false);
}

function eventoEnter(e){
    e.preventDefault();
    console.log("Soy el evento dragenter");
    lienzoActivo=e.target.id;
    dentro=1;
}

function salio(e){
    e.preventDefault();
    dentro=0;
    encima=0;
    console.log("Salí");
}

function eventoOver(e){
    e.preventDefault();
    console.log("Soy el evento dragover");
    encima=1;
}

function finalizado(e){
    e.preventDefault();
    elemento=e.target;
}

function arrastrado(e){
    elemento=e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 90, 90);
}

function soltado(e){
    e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var imagenLienzo = document.getElementById(lienzoActivo).getAttribute('data-imagen');

    // Verificar que el id y data-animal son iguales
    console.log("Id: "+id);
    console.log("Atributo: " +imagenLienzo);
    if (id !== imagenLienzo) {
        console.log('El id y data-imagen no son iguales.');
        url = 'audio/Error.wav';
        audio = new Audio(url);
        audio.volume=0.5;
        audio.play();
        puntaje-=10;
        if(puntaje<0){
            puntaje=0;
        }
        actualizarPuntaje();
        return;
    }

    if(encima==1 && dentro==1){
        elemento.style.visibility='hidden';
        encima=0;
        dentro=0;
    }

    // Crear un nuevo objeto de audio
    url = 'audio/'+id+'S.mp3';
    audio = new Audio(url);
    audio.play();

    url = 'audio/'+id+'.mp3';
    audio = new Audio(url);
    setTimeout(() => {
        audio.play();
    }, 1000);

    if(lienzoActivo=="lienzo"){
        var posX = (soltar.width - elemento.width) / 2;
        var posY = (soltar.height - elemento.height) / 2;
        lienzo.drawImage(elemento, posX, posY);

        var Nombre = document.getElementById('nombrel1');
        var Texto = document.createElement('h4');
        Texto.textContent=id;
        Nombre.appendChild(Texto);

        puntaje+=10;
        actualizarPuntaje();
        aciertos++;
        siguiente();
    }else if(lienzoActivo=="lienzo2"){
        var posX = (soltar2.width - elemento.width) / 2;
        var posY = (soltar2.height - elemento.height) / 2;
        lienzo2.drawImage(elemento, posX, posY);

        var Nombre = document.getElementById('nombrel2');
        var Texto = document.createElement('h4');
        Texto.textContent=id;
        Nombre.appendChild(Texto);
        
        puntaje+=10;
        actualizarPuntaje();
        aciertos++;
        siguiente();
    }else if(lienzoActivo=="lienzo3"){
        var posX = (soltar3.width - elemento.width) / 2;
        var posY = (soltar3.height - elemento.height) / 2;
        lienzo3.drawImage(elemento, posX, posY);
        
        var Nombre = document.getElementById('nombrel3');
        var Texto = document.createElement('h4');
        Texto.textContent=id;
        Nombre.appendChild(Texto);
        
        puntaje+=10;
        actualizarPuntaje();
        aciertos++;
        siguiente();
    }
}

function actualizarPuntaje(){
    var puntajeTotal = document.getElementById("puntaje").innerHTML="Puntaje: "+puntaje;
}

function siguiente(){
    var siguiente = document.getElementById('siguiente');
    if(aciertos==3 && vuelta==1){
        var boton = document.createElement('button');
        boton.setAttribute("class", "button");
        boton.onclick= function() {
            window.location.href = "Juego.html" + '?vuelta=2&tiempo='+contador+'&puntaje='+puntaje+'&usuario='+nombre;
        };
        siguiente.appendChild(boton);
        var span = document.createElement('span');
        span.setAttribute('id', 'text');
        span.textContent="Siguiente";
        boton.appendChild(span);
    }else if(aciertos==3 && vuelta==2){
        var boton = document.createElement('button');
        boton.setAttribute("class", "button");
        boton.onclick= function() {
            window.location.href="felicitacion.html?tiempo="+contador+"&puntaje="+puntaje+'&usuario='+nombre;
        };
        siguiente.appendChild(boton);
        var span = document.createElement('span');
        span.setAttribute('id', 'text');
        span.textContent="Continuar";
        boton.appendChild(span);
    }
}

window.addEventListener('load', iniciar, false);