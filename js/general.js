var veces=0, url, musicaFondo;
url = 'audio/Juego.mp3';
musicaFondo = new Audio(url);
url = 'audio/Menu.mp3';
musicaIndex = new Audio(url);
musicaFondo.volume=0.2;

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

function reproducir(){
    veces++;
    if(veces==1){
        musicaFondo.play();
    }
    if(veces==2){
        musicaFondo.pause();
        veces=0;
    }   
}

function reproducirIndex(){
    veces++;
    if(veces==1){
        musicaIndex.play();
    }
    if(veces==2){
        musicaIndex.pause();
        veces=0;
    }   
}

function cerrar(){
    localStorage.removeItem('imagenes');
    window.location.href="index.html";
}

function abrirJuego(){
    window.location.href="usuarios.html";
}

function abrirPuntaje(){
    window.location.href="scores.html";
}