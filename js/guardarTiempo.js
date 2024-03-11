var usuarios=localStorage.getItem("users");
usuarios=JSON.parse(usuarios);

var urlParams = new URLSearchParams(window.location.search);
var tiempo = urlParams.get('tiempo');
var puntaje = urlParams.get('puntaje');
var nombre = urlParams.get('usuario');

puntaje=Number(puntaje);
tiempo=Number(tiempo);

window.onload = function() {
    var asignarNombre = document.getElementById('nombre').innerHTML="¡¡FELICIDADES "+nombre+"!!";
    for(var i in usuarios){
        if(usuarios[i].name==nombre){
            console.log(usuarios[i].name);
            if(usuarios[i].score==0 && usuarios[i].time==0){
                usuarios[i].score=puntaje;
                usuarios[i].time=tiempo;
                localStorage.setItem('users', JSON.stringify(usuarios));
                break;
            }else{
                console.log("entro");
                console.log(tiempo);
                console.log(puntaje);
                if(usuarios[i].score==60 && usuarios[i].time>tiempo){
                    console.log("entro 60");
                    usuarios[i].time=tiempo;
                    localStorage.setItem('users', JSON.stringify(usuarios));
                    break;
                }
                if(usuarios[i].score<puntaje){
                    console.log("entro Menor puntaje guardado");
                    usuarios[i].score=puntaje;
                    usuarios[i].time=tiempo;
                    localStorage.setItem('users', JSON.stringify(usuarios));
                    break;
                }
                if(usuarios[i].time>tiempo){
                    console.log("entro Mayor tiempo guardado");
                    if(usuarios[i].score<puntaje){
                        usuarios[i].score=puntaje;
                        usuarios[i].time=tiempo;
                        localStorage.setItem('users', JSON.stringify(usuarios));
                        break;
                    }
                    if(usuarios[i].score==puntaje){
                        console.log("entro Mayor tiempo guardado, puntaje igual");
                        usuarios[i].time=tiempo;
                        localStorage.setItem('users', JSON.stringify(usuarios));
                        break;
                    }
                }
            }
        }
    }
};

function volverJugar(){
    window.location.href="Juego.html?usuario="+nombre;
}