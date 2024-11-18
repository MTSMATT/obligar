window.addEventListener("load", inicio);

function inicio(){
	document.getElementById("botonColores").addEventListener("click", cambiarColor);
    document.getElementById("botonAgregarArtista").addEventListener("click", agregarArtista);
	document.getElementById("botonColores").addEventListener("click", agregarExposicion);
	document.getElementById("moverArtistaDerecha").addEventListener("click", moverArtistaDerecha);
    document.getElementById("moverArtistaIzquierda").addEventListener("click", moverArtistaIzquierda);
}

let colorOriginal = true;
function cambiarColor(){
    let cambiarColor = document.getElementsByClassName("cambiarColor")

    if(colorOriginal){

        for (let i = 0; i < cambiarColor.length; i++) {

            cambiarColor[i].style.backgroundColor = "#8DB58E"        
        }
        colorOriginal = false;
    } else if (!colorOriginal){
        
        for (let i = 0; i < cambiarColor.length; i++) {

            cambiarColor[i].style.backgroundColor = "#98fb98"
        }
        colorOriginal = true;
    }

}

function agregarArtista(){

    let form = document.getElementById("formRegistrarArtistas")

    let nombre = document.getElementById("nombre").value.trim(); // Elimina espacios adicionales
    let edad = document.getElementById("edad").value;
    let caracteristica = document.getElementById("caracteristica").value;

    // Verifica si los campos están llenos
    if (!nombre || !edad || !caracteristica) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let listaArtistas1 = document.getElementById("idListaArtistas1");
    let opciones = listaArtistas1.options;

    // Verifica si el artista ya está en la lista
    for (let i=0; i < opciones.length; i++) {
        if (opciones[i].text.toLowerCase() === nombre.toLowerCase()) {
            alert("El artista ya está en la lista.");
            return; // Sal del método sin agregar
        }
    }

    // Si no está repetido, crea la opción y la agrega
    let nuevoOption = document.createElement("option");
    nuevoOption.innerHTML = nombre; // Usamos solo el nombre como texto visible
    listaArtistas1.appendChild(nuevoOption);

    form.reset()
}

function moverArtistaDerecha(){
    let listaArtistas1 = document.getElementById("idListaArtistas1");
    let listaArtistas2 = document.getElementById("idListaArtistas2");

    // Obtiene los artistas seleccionados en el primer select
    let opcionesSeleccionadas = Array.from(listaArtistas1.selectedOptions);

    // Mueve cada opción seleccionada al segundo select
    opcionesSeleccionadas.forEach(opcion => {
        listaArtistas2.appendChild(opcion);
    });
}

function moverArtistaIzquierda(){
    let listaArtistas1 = document.getElementById("idListaArtistas1");
    let listaArtistas2 = document.getElementById("idListaArtistas2");

    // Obtiene los artistas seleccionados en el segundo select
    let opcionesSeleccionadas = Array.from(listaArtistas2.selectedOptions);

    // Mueve cada opción seleccionada al primer select
    opcionesSeleccionadas.forEach(opcion => {
        listaArtistas1.appendChild(opcion);
    });
}

function agregarExposicion(){
    
}

function agregarComentario(){
    
}
