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
    let titulo = document.getElementById("titulo").value.trim();
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value.trim();
    let listaArtistas2 = document.getElementById("idListaArtistas2");
    
    // Validaciones
    if (!titulo || !fecha || !descripcion || listaArtistas2.options.length === 0) {
        alert("Por favor, complete todos los campos y seleccione al menos un artista.");
        return;
    }
    
    // Obtener los nombres de artistas seleccionados
    let artistasSeleccionados = Array.from(listaArtistas2.options).map(option => option.text);
    
    // Crear nueva exposicion y agregarla al sistema
    let nuevaExposicion = new Exposicion(titulo, fecha, descripcion, artistasSeleccionados);
    
    sistemaMuseo.agregarExposicion(nuevaExposicion);
    
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
    sistemaMuseo.exposiciones.forEach(expo => {
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

// Variable global para el orden de la tabla
let ordenAscendente = true;

function agregarComentario() {
    // Obtener valores del form
    let exposicionTitulo = document.getElementById("exposicion").value;
    let nombreVisitante = document.getElementById("nombreVisitante").value.trim();
    let comentarioTexto = document.getElementById("comentario").value.trim();
    
    // Obtener calificacion
    let calificacion = document.querySelector('input[name="calificacion"]:checked').value;
    
    // Verificar visita guiada
    let guia = document.getElementById("guia").checked;
    
    // Validaciones
    if (!exposicionTitulo || !nombreVisitante || !comentarioTexto) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    
    // Encontrar la exposición correspondiente
    let exposicionEncontrada = sistemaMuseo.exposiciones.find(expo => expo.titulo === exposicionTitulo);
    
    if (!exposicionEncontrada) {
        alert("Exposición no encontrada.");
        return;
    }
    
    // Crear nueva Visita (comentario)
    let nuevaVisita = new Visita(
        exposicionEncontrada,
        nombreVisitante,
        comentarioTexto,
        parseInt(calificacion),
        guia
    );
    
    // Agregar comentario a la exposición y al sistema
    exposicionEncontrada.agregarComentario(nuevaVisita);
    sistemaMuseo.agregarComentario(nuevaVisita);
    
    // Actualizar la información mostrada
    actualizarInformacionGeneral();
    actualizarTablaComentarios();
    
    // Limpiar formulario
    document.getElementById("formComentariosDeVisitas").reset();
}

// Función para actualizar la información general
function actualizarInformacionGeneral() {
    actualizarExposicionesConMasArtistas();
    actualizarExposicionesSinComentarios();
}

// Función para encontrar y mostrar exposiciones con más artistas
function actualizarExposicionesConMasArtistas() {
    const exposiciones = sistemaMuseo.exposiciones;
    if (exposiciones.length === 0) {
        document.querySelector("#sectionInfo ul:first-of-type").innerHTML = "<li>sin datos</li>";
        return;
    }
    
    // Encontrar el máximo número de artistas
    const maxArtistas = Math.max(...exposiciones.map(expo => expo.artistas.length));
    
    // Filtrar exposiciones con el máximo número de artistas
    const exposicionesMaxArtistas = exposiciones
        .filter(expo => expo.artistas.length === maxArtistas)
        .map(expo => expo.titulo)
        .sort(); // Ordenar alfabéticamente
    
    // Actualizar la lista en el DOM
    const lista = document.querySelector("#sectionInfo ul:first-of-type");
    lista.innerHTML = exposicionesMaxArtistas
        .map(titulo => `<li>${titulo}</li>`)
        .join("");
}

// Función para mostrar exposiciones sin comentarios
function actualizarExposicionesSinComentarios() {
    const exposiciones = sistemaMuseo.exposiciones;
    if (exposiciones.length === 0) {
        document.querySelector("#sectionInfo ul:last-of-type").innerHTML = "<li>sin datos</li>";
        return;
    }
    
    // Filtrar exposiciones sin comentarios y ordenar por fecha
    const exposicionesSinComentarios = exposiciones
        .filter(expo => expo.comentario.length === 0)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .map(expo => `${expo.titulo} (${new Date(expo.fecha).toLocaleDateString()})`);
    
    // Actualizar la lista en el DOM
    const lista = document.querySelector("#sectionInfo ul:last-of-type");
    lista.innerHTML = exposicionesSinComentarios.length > 0
        ? exposicionesSinComentarios.map(texto => `<li>${texto}</li>`).join("")
        : "<li>sin datos</li>";
}

// Función para actualizar la tabla de comentarios
function actualizarTablaComentarios() {
    const tabla = document.querySelector("#sectionInfo table");
    const exposicionFiltro = document.getElementById("exposicionFiltro").value;
    let comentarios = sistemaMuseo.comentarios;
    
    // Aplicar filtro de exposición si no es "todas"
    if (exposicionFiltro !== "todas") {
        comentarios = comentarios.filter(c => c.exposicion.titulo === exposicionFiltro);
    }
    
    // Ordenar por calificación
    comentarios.sort((a, b) => {
        return ordenAscendente ? 
            a.calificacion - b.calificacion : 
            b.calificacion - a.calificacion;
    });
    
    // Limpiar tabla existente (excepto el encabezado)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
    
    // Si no hay comentarios, mostrar mensaje
    if (comentarios.length === 0) {
        const row = tabla.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 6;
        cell.textContent = "No hay comentarios para mostrar";
        return;
    }
    
    // Agregar filas de comentarios
    comentarios.forEach(comentario => {
        const row = tabla.insertRow();
        
        // Título
        const cellTitulo = row.insertCell();
        cellTitulo.textContent = comentario.exposicion.titulo;
        
        // Más datos
        const cellMasDatos = row.insertCell();
        const btnAmpliar = document.createElement("button");
        btnAmpliar.textContent = "Ampliar";
        btnAmpliar.className = "button";
        btnAmpliar.onclick = () => mostrarDetallesExposicion(comentario.exposicion);
        cellMasDatos.appendChild(btnAmpliar);
        
        // Nombre
        const cellNombre = row.insertCell();
        cellNombre.textContent = comentario.nombreVisitante;
        cellNombre.className = "borderRight";
        
        // Comentario
        const cellComentario = row.insertCell();
        cellComentario.textContent = comentario.comentario;
        cellComentario.className = "comentarios";
        
        // Guiada
        const cellGuiada = row.insertCell();
        cellGuiada.textContent = comentario.guia ? "Sí" : "No";
        
        // Calificación
        const cellCalificacion = row.insertCell();
        cellCalificacion.textContent = comentario.calificacion;
        cellCalificacion.className = "borderRight";
    });
}

// Función para mostrar detalles de una exposición
function mostrarDetallesExposicion(exposicion) {
    let detalles = `
        Título: ${exposicion.titulo}
        Fecha: ${new Date(exposicion.fecha).toLocaleDateString()}
        Descripción: ${exposicion.descripcion}
        
        Artistas:
        ${exposicion.artistas.join('\n')}
    `;
    alert(detalles);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    // Botón de agregar comentario
    document.getElementById("botonAgregarComentario").addEventListener("click", agregarComentario);
    
    // Cambio en el filtro de exposiciones
    document.getElementById("exposicionFiltro").addEventListener("change", actualizarTablaComentarios);
    
    // Botón de ordenar por calificación
    const btnOrdenar = document.querySelector("#sectionInfo table th:last-child button");
    btnOrdenar.addEventListener("click", function() {
        ordenAscendente = !ordenAscendente;
        this.textContent = ordenAscendente ? "Calificación creciente" : "Calificación decreciente";
        actualizarTablaComentarios();
    });
});