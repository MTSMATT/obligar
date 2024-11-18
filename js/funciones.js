window.addEventListener("load", inicio);

function inicio(){
	document.getElementById("botonColores").addEventListener("click", cambiarColor);
    document.getElementById("botonAgregarArtista").addEventListener("click", agregarArtista);
	document.getElementById("botonColores").addEventListener("click", agregarExposicion);
	document.getElementById("botonColores").addEventListener("click", agregarComentario);
}

let colorOriginal = true;
function cambiarColor(){
    let header = document.getElementById("idHeader");
    let sectionIngresos = document.getElementById("sectionIngresos");
    let sectionExposiciones = document.getElementById("sectionInfo");

    if(colorOriginal){
        header.style.backgroundColor = "#8DB58E";
        sectionIngresos.style.backgroundColor = "#8DB58E";
        sectionInfo.style.backgroundColor = "#8DB58E";
        colorOriginal = false;
    } else{
        header.style.backgroundColor = "#98fb98";
        sectionIngresos.style.backgroundColor = "#98fb98";
        sectionInfo.style.backgroundColor = "#98fb98";
        colorOriginal = true;
    }

}

function agregarArtista(){
    /*
    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value;
    let caracteristica = document.getElementById("caracteristica").value;

    let artista = {nombre:nombre, edad:edad, caracteristica:caracteristica};
    
    let nuevoOption = document.createElement("option");
    let listaArtistas1 = document.getElementById("idListaArtistas1");
    listaArtistas1.appendChild(nuevoOption);
    nuevoOption.innerHTML = artista.nombre;
    */

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
    for (let i=0; i<opciones.length; i++) {
        if (opciones[i].text.toLowerCase() === nombre.toLowerCase()) {
            alert("El artista ya está en la lista.");
            return; // Sal del método sin agregar
        }
    }

    // Si no está repetido, crea la opción y la agrega
    let nuevoOption = document.createElement("option");
    nuevoOption.innerHTML = nombre; // Usamos solo el nombre como texto visible
    listaArtistas1.appendChild(nuevoOption);

    alert("Artista agregado exitosamente.");
}

function moverArtista(){
    let listaArtista1 = document.getElementById("listaArtista1");
    let listaArtista2 = document.getElementById("listaArtista2");
}

function agregarExposicion(){
    
}

function agregarComentario(){
    
}
