var escogidos=localStorage.getItem("imagenes");
escogidos=JSON.parse(escogidos);

var numerosSeleccionados=[];
var numerosRandom=[];
var animalesActuales=[];

if(escogidos==null){
   escogidos=[]; 
}else{
    if(escogidos.length==3){
        animalesActuales=[];
    }
    if(escogidos.length==6){
        escogidos=[];
        numerosSeleccionados=[];
    }
    if(escogidos.length==9){
        escogidos=[];
        numerosSeleccionados=[];
    }else{
        for(var i in escogidos){
            let imprimir = JSON.parse(escogidos[i]);
            numerosSeleccionados[i]=imprimir.numero;
        }
    }
}

var imagenesLocal=["Cerdo","Coyote", "Elefante", "Jaguar", "Lobo", "Mono", "Oso", "Pato", "Tigre"];
var fondos=[];
var lienzo = document.getElementById("lienzo");
var lienzo2 = document.getElementById("lienzo2");
var lienzo3 = document.getElementById("lienzo3");

function obtenerImagenAleatoria(max) {
    for (var i = 0; i < 3; i++){
        do{
            var posicion = Math.floor(Math.random() * max);
        } while (numerosSeleccionados.includes(posicion));
        numerosSeleccionados.push(posicion);

        //Para agregar las imagenes y casas a LocalStorage
        var animalJSON = JSON.stringify({
            animal: imagenesLocal[posicion],
            numero: posicion,
        });
        escogidos.push(animalJSON);
        animalesActuales.push(animalJSON);
        localStorage.setItem("imagenes",JSON.stringify(escogidos));
    }
    console.log(numerosSeleccionados);
    console.log(escogidos);
    for(var i in animalesActuales){
        let imprimir = JSON.parse(animalesActuales[i]);
        fondos[i]=imprimir.animal;
    }
}

window.onload = function() {
    obtenerImagenAleatoria(9);
    var seccion = document.getElementById('cajaimagenes');
    for(var i in animalesActuales){
        let imprimir = JSON.parse(animalesActuales[i]);
        var img = document.createElement('img');
        img.id = imprimir.animal;
        img.src = 'images/' + imprimir.animal + '.png';
        seccion.appendChild(img);
    }
    llenarFondos(3);
};

function llenarFondos(max){
    for (var i = 0; i < 3; i++){
        do{
            var random = Math.floor(Math.random() * max);
        } while (numerosRandom.includes(random));
        numerosRandom.push(random);
    }
    lienzo.style.backgroundImage='url(images/'+fondos[numerosRandom[0]]+'C.png)';
    lienzo.style.backgroundRepeat='no-repeat';
    lienzo.style.backgroundSize='contain';
    lienzo.style.backgroundPosition='center';
    animal=fondos[numerosRandom[0]];
    lienzo.setAttribute("data-imagen", animal);
    console.log(lienzo.getAttribute('data-imagen'));

    lienzo2.style.backgroundImage='url(images/'+fondos[numerosRandom[1]]+'C.png)';
    lienzo2.style.backgroundRepeat='no-repeat';
    lienzo2.style.backgroundSize='contain';
    lienzo2.style.backgroundPosition='center';
    animal=fondos[numerosRandom[1]];
    lienzo2.setAttribute("data-imagen", animal);
    console.log(lienzo2.getAttribute('data-imagen'));

    lienzo3.style.backgroundImage='url(images/'+fondos[numerosRandom[2]]+'C.png)';
    lienzo3.style.backgroundRepeat='no-repeat';
    lienzo3.style.backgroundSize='contain';
    lienzo3.style.backgroundPosition='center';
    animal=fondos[numerosRandom[2]];
    lienzo3.setAttribute("data-imagen", animal);
    console.log(lienzo3.getAttribute('data-imagen'));
}
