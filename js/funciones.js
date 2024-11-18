let sistemaMuseo = new Sistema()
   
window.addEventListener("load", inicio);

function inicio(){
    document.getElementById("botonColores").addEventListener("click", cambiarColor);
    document.getElementById("botonAgregarArtista").addEventListener("click", agregarArtista);
    document.getElementById("botonAgregarExposicion").addEventListener("click", agregarExposicion);
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
    let nombre = document.getElementById("nombre").value.trim(); // Elimina espacios adicionales
    let edad = document.getElementById("edad").value;
    let caracteristica = document.getElementById("caracteristica").value;

    // Validar
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
            return;
        }
    }

    // Crear artista y agregarlo al sistema
    let nuevoArtista = new Artista(nombre, edad, caracteristica)
    sistemaMuseo.agregarArtista(nuevoArtista)

    // Agregar a la lista visual
    let nuevoOption = document.createElement("option");
    nuevoOption.innerHTML = nombre;
    listaArtistas1.appendChild(nuevoOption);

    document.getElementById("formRegistrarArtistas").reset();

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


// let exposiciones = [];
function agregarExposicion(){
    // Debug: Log the start of the function
    console.log("Agregando Exposición");

    let titulo = document.getElementById("titulo").value.trim();
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value.trim();
    let listaArtistas2 = document.getElementById("idListaArtistas2");
    
    // Debug: Log input values
    console.log("Título:", titulo);
    console.log("Fecha:", fecha);
    console.log("Descripción:", descripcion);
    console.log("Artistas seleccionados:", listaArtistas2.options.length);
    
    // Validaciones
    if (!titulo || !fecha || !descripcion || listaArtistas2.options.length === 0) {
        alert("Por favor, complete todos los campos y seleccione al menos un artista.");
        return;
    }
    
    // Obtener los nombres de artistas seleccionados
    let artistasSeleccionados = Array.from(listaArtistas2.options).map(option => option.text);
    
    // Debug: Log artistas seleccionados
    console.log("Artistas seleccionados:", artistasSeleccionados);
    
    // Crear nueva exposicion y agregarla al sistema
    let nuevaExposicion = new Exposicion(titulo, fecha, descripcion, artistasSeleccionados);
    
    // Debug: Verify exposicion creation
    console.log("Nueva Exposición:", nuevaExposicion);
    
    sistemaMuseo.agregarExposicion(nuevaExposicion);
    
    // Debug: Log sistema's exposiciones
    console.log("Exposiciones en el sistema:", sistemaMuseo.exposiciones);
    
    // Actualizar el select de exposiciones en la sección de comentarios
    actualizarSelectExposiciones();
    
    // Limpiar formulario y devolver artistas
    document.getElementById("formIngresarExposiciones").reset();
    while (listaArtistas2.options.length > 0) {
        document.getElementById("idListaArtistas1").appendChild(listaArtistas2.options[0]);
    }
}

function actualizarSelectExposiciones() {
    let selectExposicion = document.getElementById("exposicion");
    let selectExposicionFiltro = document.getElementById("exposicionFiltro");
    
    // Limpiar las opciones actuales
    selectExposicion.innerHTML = "";
    selectExposicionFiltro.innerHTML = "<option value='todas'>Todas</option>";
    
    // Agregar las exposiciones a ambos selects
    sistemaMuseo.exposiciones.forEach(ecpo => {
        // Agregar al select de comentarios
        let option1 = document.createElement("option");
        option1.value = expo.titulo;
        option1.text = expo.titulo;
        selectExposicion.appendChild(option1);
    
        // Agregar al select de filtro
        let option2 = document.createElement("option");
        option2.value = expo.titulo;
        option2.text = expo.titulo;
        selectExposicionFiltro.appendChild(option2);
    })
}

function agregarComentario(){
    // Obtener valores del form
    let exposicionTitulo = document.getElementById("exposicion").value
    let nombreVisitante = document.getElementById("nombreVisitante").value.trim()
    let comentarioTexto = document.getElementById("comentario").value.trim()

    // Obtener calificacion
    let calificacion = document.querySelector('input[name="calificacion"]:checked').value

    // Verificar visita guiada
    let guia = document.getElementById("guia").checked;

    // Validaciones
    if (!nombreVisitante || !comentarioTexto) {
        alert("Por favor, complete todos los campos.");
        return;
    }

     // Encontrar la exposición correspondiente
     let exposicionEncontrada = sistemaMmuseo.exposiciones.find(expo => expo.titulo === exposicionTitulo);
    
     if (!exposicionEncontrada) {
         alert("Exposición no encontrada.");
         return;
     }
 
     // Crear nueva vista (comentario)
     let nuevaVista = new Vista(
         exposicionEncontrada, 
         nombreVisitante, 
         comentarioTexto, 
         parseInt(calificacion), 
         guia
     );
 
     // Agregar comentario a la exposición y al sistema
     exposicionEncontrada.agregarComentario(nuevaVista);
     sistemaMmuseo.agregarComentario(nuevaVista);
 
     // Limpiar formulario
     document.getElementById("formComentariosDeVisitas").reset();
}
