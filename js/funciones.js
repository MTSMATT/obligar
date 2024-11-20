let sistema = new Sistema();

window.addEventListener('load', inicio);

function inicio() {
    // Botones principales
    document.getElementById('botonAgregarArtista').addEventListener('click', agregarArtista);
    document.getElementById('botonAgregarExposicion').addEventListener('click', agregarExposicion);
    document.getElementById('botonAgregarComentario').addEventListener('click', agregarComentario);
    document.getElementById('botonColores').addEventListener('click', cambiarColores);
    
    // Botones de movimiento de artistas
    document.getElementById('moverArtistaDerecha').addEventListener('click', moverArtistaDerecha);
    document.getElementById('moverArtistaIzquierda').addEventListener('click', moverArtistaIzquierda);
    
    actualizarListasArtistas();
    actualizarListaExposiciones();
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
    let nombre = document.getElementById('nombre').value;
    let edad = parseInt(document.getElementById('edad').value);
    let caracteristica = document.getElementById('caracteristica').value;

    // Validar
    // if (!nombre || !edad || !caracteristica) {
    //     alert("Por favor, completa todos los campos.");
    //     return;
    // }

    // let listaArtistas1 = document.getElementById("idListaArtistas1");
    // let opciones = listaArtistas1.options;

    // Verifica si el artista ya está en la lista
    // for (let i=0; i < opciones.length; i++) {
    //     if (opciones[i].text.toLowerCase() === nombre.toLowerCase()) {
    //         alert("El artista ya está en la lista.");
    //         return;
    //     }
    // }

    // Crear artista y agregarlo al sistema
    // let nuevoArtista = new Artista(nombre, edad, caracteristica)
    let artista = new Artista(nombre, edad, caracteristica);
    if (sistema.agregarArtista(artista)) {
        document.getElementById('formRegistrarArtistas').reset();
        actualizarListasArtistas();
    }

    // sistemaMuseo.agregarArtista(nuevoArtista)

    // Agregar a la lista visual
    // let nuevoOption = document.createElement("option");
    // nuevoOption.innerHTML = nombre;
    // listaArtistas1.appendChild(nuevoOption);

    // document.getElementById("formRegistrarArtistas").reset();
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
    // let listaArtistas2 = document.getElementById("idListaArtistas2");
    
    // Obtener los nombres de artistas seleccionados
    // let artistasSeleccionados = Array.from(listaArtistas2.options).map(option => option.text);
    let artistasSeleccionados = Array.from(document.getElementById("idListaArtistas2").options);
    let artistas = []
    
    for (let i = 0; i < artistasSeleccionados.length; i++) {
        for (let j = 0; j < sistema.artistas.length; j++) {
            if (sistema.artistas[j].nombre === artistasSeleccionados[i].text) {
                artistas.push(sistema.artistas[j]);
            }
        }
    }

    let exposicion = new Exposicion(titulo, fecha, descripcion, artistas);
    if (sistema.agregarExposicion(exposicion)) {
        document.getElementById('formIngresarExposiciones').reset();
        document.getElementById('idListaArtistas2').innerHTML = '';
        actualizarListaExposiciones();
        actualizarInformacionGeneral();
    }

    // Validaciones
    // if (!titulo || !fecha || !descripcion || listaArtistas2.options.length === 0) {
    //     alert("Por favor, complete todos los campos y seleccione al menos un artista.");
    //     return;
    // }
    
    
    // Crear nueva exposicion y agregarla al sistema
    // let nuevaExposicion = new Exposicion(titulo, fecha, descripcion, artistasSeleccionados);
    
    // sistemaMuseo.agregarExposicion(nuevaExposicion);
    
    // Actualizar el select de exposiciones en la sección de comentarios
    // actualizarSelectExposiciones();
    
    // Limpiar formulario y devolver artistas
    // document.getElementById("formIngresarExposiciones").reset();
    // while (listaArtistas2.options.length > 0) {
        // document.getElementById("idListaArtistas1").appendChild(listaArtistas2.options[0]);
    // }
}

// function actualizarSelectExposiciones() {
//     let selectExposicion = document.getElementById("exposicion");
//     let selectExposicionFiltro = document.getElementById("exposicionFiltro");
    
//     // Limpiar las opciones actuales
//     selectExposicion.innerHTML = "";
//     selectExposicionFiltro.innerHTML = "<option value='todas'>Todas</option>";
    
//     // Agregar las exposiciones a ambos selects
//     sistemaMuseo.exposiciones.forEach(expo => {
//         // Agregar al select de comentarios
//         let option1 = document.createElement("option");
//         option1.value = expo.titulo;
//         option1.text = expo.titulo;
//         selectExposicion.appendChild(option1);
    
//         // Agregar al select de filtro
//         let option2 = document.createElement("option");
//         option2.value = expo.titulo;
//         option2.text = expo.titulo;
//         selectExposicionFiltro.appendChild(option2);
//     })
// }

// Variable global para el orden de la tabla
// let ordenAscendente = true;

function agregarComentario() {
    // Obtener valores del form

    let exposicionSelect = document.getElementById('exposicion');
    let exposicion = sistema.exposiciones[exposicionSelect.selectedIndex];
    let nombreVisitante = document.getElementById('nombreVisitante').value;
    let comentario = document.getElementById('comentario').value;
    let calificacion = document.querySelector('input[name="calificacion"]:checked').value;
    let guiada = document.getElementById('guia').checked;

    let visita = new Visita(exposicion, nombreVisitante, comentario, calificacion, guiada);
    sistema.agregarVisita(visita);
    document.getElementById('formComentariosDeVisitas').reset();
    actualizarTablaComentarios();
    actualizarInformacionGeneral();

    // let exposicionTitulo = document.getElementById("exposicion").value;
    // let comentarioTexto = document.getElementById("comentario").value.trim();
    
    // Obtener calificacion
    
    // Verificar visita guiada
    // let guia = document.getElementById("guia").checked;
    
    // Validaciones
    // if (!exposicionTitulo || !nombreVisitante) {
    //     alert("Por favor, complete todos los campos.");
    //     return;
    // }
    
    // Encontrar la exposición correspondiente
    // let exposicionEncontrada = sistemaMuseo.exposiciones.find(expo => expo.titulo === exposicionTitulo);
    
    // if (!exposicionEncontrada) {
        // alert("Exposición no encontrada.");
        // return;
    // }
    
    // Crear nueva Visita (comentario)
    // let nuevaVisita = new Visita(
    //     exposicionEncontrada,
    //     nombreVisitante,
    //     comentarioTexto,
    //     parseInt(calificacion),
    //     guia
    // );
    
    // Agregar comentario a la exposición y al sistema
    // exposicionEncontrada.agregarComentario(nuevaVisita);
    // sistemaMuseo.agregarComentario(nuevaVisita);
    
    // Actualizar la información mostrada
    // actualizarInformacionGeneral();
    // actualizarTablaComentarios();
    
    // Limpiar formulario
    // document.getElementById("formComentariosDeVisitas").reset();
}

function actualizarListasArtistas() {
    let lista1 = document.getElementById('idListaArtistas1');
    lista1.innerHTML = '';
    
    for (let i = 0; i < sistema.artistas.length; i++) {
        let option = document.createElement('option');
        option.text = sistema.artistas[i].nombre;
        lista1.add(option);
    }
}

function actualizarListaExposiciones() {
    let selectExposicion = document.getElementById('exposicion');
    let selectFiltro = document.getElementById('exposicionFiltro');
    selectExposicion.innerHTML = '';
    selectFiltro.innerHTML = '<option value="todas">Todas</option>';
    
    for (let i = 0; i < sistema.exposiciones.length; i++) {
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        option1.text = sistema.exposiciones[i].titulo;
        option2.text = sistema.exposiciones[i].titulo;
        selectExposicion.add(option1);
        selectFiltro.add(option2);
    }
}

// Función para actualizar la información general
function actualizarInformacionGeneral() {
    // actualizarExposicionesConMasArtistas();
    // actualizarExposicionesSinComentarios();

    let exposicionesMasArtistas = sistema.obtenerExposicionesConMasArtistas();
    let listaMasArtistas = document.querySelector('#sectionInfo ul:first-of-type');
    listaMasArtistas.innerHTML = '';
    
    if (exposicionesMasArtistas.length > 0) {
        for (let i = 0; i < exposicionesMasArtistas.length; i++) {
            let li = document.createElement('li');
            li.textContent = exposicionesMasArtistas[i].titulo;
            listaMasArtistas.appendChild(li);
        }
    } else {
        let li = document.createElement('li');
        li.textContent = 'sin datos';
        listaMasArtistas.appendChild(li);
    }

    // Expos sin comntarios
    let exposicionesSinComentarios = sistema.obtenerExposicionesSinComentarios();
    let listaSinComentarios = document.querySelector('#sectionInfo ul:nth-of-type(2)');
    listaSinComentarios.innerHTML = '';
    
    if (exposicionesSinComentarios.length > 0) {
        for (let i = 0; i < exposicionesSinComentarios.length; i++) {
            let li = document.createElement('li');
            li.textContent = exposicionesSinComentarios[i].titulo + ' - ' + exposicionesSinComentarios[i].fecha;
            listaSinComentarios.appendChild(li);
        }
    } else {
        let li = document.createElement('li');
        li.textContent = 'sin datos';
        listaSinComentarios.appendChild(li);
    }
}


function actualizarTablaComentarios() {
    let tabla = document.querySelector('table');
    let filas = tabla.getElementsByTagName('tr');
    
    // Eliminar filas existentes excepto el encabezado
    while (filas.length > 1) {
        tabla.deleteRow(1);
    }

    for (let i = 0; i < sistema.visitas.length; i++) {
        let fila = tabla.insertRow();
        
        let celdaTitulo = fila.insertCell();
        celdaTitulo.textContent = sistema.visitas[i].exposicion.titulo;

        let celdaAmpliar = fila.insertCell();
        let botonAmpliar = document.createElement('button');
        botonAmpliar.textContent = 'Ampliar';
        botonAmpliar.className = 'button';
        botonAmpliar.onclick = function() {
            alert('Título: ' + sistema.visitas[i].exposicion.titulo + 
                  '\nFecha: ' + sistema.visitas[i].exposicion.fecha + 
                  '\nDescripción: ' + sistema.visitas[i].exposicion.descripcion + 
                  '\nArtistas: ' + sistema.visitas[i].exposicion.artistas.map(a => a.nombre).join(', '));
        };
        celdaAmpliar.appendChild(botonAmpliar);

        let celdaNombre = fila.insertCell();
        celdaNombre.textContent = sistema.visitas[i].nombreVisitante;
        celdaNombre.className = 'borderRight';

        let celdaComentario = fila.insertCell();
        celdaComentario.textContent = sistema.visitas[i].comentario;
        celdaComentario.className = 'comentarios';

        let celdaGuiada = fila.insertCell();
        celdaGuiada.textContent = sistema.visitas[i].guiada ? 'Sí' : 'No';

        let celdaCalificacion = fila.insertCell();
        celdaCalificacion.textContent = sistema.visitas[i].calificacion;
        celdaCalificacion.className = 'borderRight';
    }
}


// Función para encontrar y mostrar exposiciones con más artistas
// function actualizarExposicionesConMasArtistas() {
//     const exposiciones = sistemaMuseo.exposiciones;
//     if (exposiciones.length === 0) {
//         document.querySelector("#sectionInfo ul:first-of-type").innerHTML = "<li>sin datos</li>";
//         return;
//     }
    
//     // Encontrar el máximo número de artistas
//     const maxArtistas = Math.max(...exposiciones.map(expo => expo.artistas.length));
    
//     // Filtrar exposiciones con el máximo número de artistas
//     const exposicionesMaxArtistas = exposiciones
//         .filter(expo => expo.artistas.length === maxArtistas)
//         .map(expo => expo.titulo)
//         .sort(); // Ordenar alfabéticamente
    
//     // Actualizar la lista en el DOM
//     const lista = document.querySelector("#sectionInfo ul:first-of-type");
//     lista.innerHTML = exposicionesMaxArtistas
//         .map(titulo => `<li>${titulo}</li>`)
//         .join("");
// }

// // Función para mostrar exposiciones sin comentarios
// function actualizarExposicionesSinComentarios() {
//     const exposiciones = sistemaMuseo.exposiciones;
//     if (exposiciones.length === 0) {
//         document.querySelector("#sectionInfo ul:last-of-type").innerHTML = "<li>sin datos</li>";
//         return;
//     }
    
//     // Filtrar exposiciones sin comentarios y ordenar por fecha
//     const exposicionesSinComentarios = exposiciones
//         .filter(expo => expo.comentario.length === 0)
//         .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
//         .map(expo => `${expo.titulo} (${new Date(expo.fecha).toLocaleDateString()})`);
    
//     // Actualizar la lista en el DOM
//     const lista = document.querySelector("#sectionInfo ul:last-of-type");
//     lista.innerHTML = exposicionesSinComentarios.length > 0
//         ? exposicionesSinComentarios.map(texto => `<li>${texto}</li>`).join("")
//         : "<li>sin datos</li>";
// }

// // Función para actualizar la tabla de comentarios
// function actualizarTablaComentarios() {
//     const tabla = document.querySelector("#sectionInfo table");
//     const exposicionFiltro = document.getElementById("exposicionFiltro").value;
//     let comentarios = sistemaMuseo.comentarios;
    
//     // Aplicar filtro de exposición si no es "todas"
//     if (exposicionFiltro !== "todas") {
//         comentarios = comentarios.filter(c => c.exposicion.titulo === exposicionFiltro);
//     }
    
//     // Ordenar por calificación
//     comentarios.sort((a, b) => {
//         return ordenAscendente ? 
//             a.calificacion - b.calificacion : 
//             b.calificacion - a.calificacion;
//     });
    
//     // Limpiar tabla existente (excepto el encabezado)
//     while (tabla.rows.length > 1) {
//         tabla.deleteRow(1);
//     }
    
//     // Si no hay comentarios, mostrar mensaje
//     if (comentarios.length === 0) {
//         const row = tabla.insertRow();
//         const cell = row.insertCell();
//         cell.colSpan = 6;
//         cell.textContent = "No hay comentarios para mostrar";
//         return;
//     }
    
//     // Agregar filas de comentarios
//     comentarios.forEach(comentario => {
//         const row = tabla.insertRow();
        
//         // Título
//         const cellTitulo = row.insertCell();
//         cellTitulo.textContent = comentario.exposicion.titulo;
        
//         // Más datos
//         const cellMasDatos = row.insertCell();
//         const btnAmpliar = document.createElement("button");
//         btnAmpliar.textContent = "Ampliar";
//         btnAmpliar.className = "button";
//         btnAmpliar.onclick = () => mostrarDetallesExposicion(comentario.exposicion);
//         cellMasDatos.appendChild(btnAmpliar);
        
//         // Nombre
//         const cellNombre = row.insertCell();
//         cellNombre.textContent = comentario.nombreVisitante;
//         cellNombre.className = "borderRight";
        
//         // Comentario
//         const cellComentario = row.insertCell();
//         cellComentario.textContent = comentario.comentario;
//         cellComentario.className = "comentarios";
        
//         // Guiada
//         const cellGuiada = row.insertCell();
//         cellGuiada.textContent = comentario.guia ? "Sí" : "No";
        
//         // Calificación
//         const cellCalificacion = row.insertCell();
//         cellCalificacion.textContent = comentario.calificacion;
//         cellCalificacion.className = "borderRight";
//     });
// }

// // Función para mostrar detalles de una exposición
// function mostrarDetallesExposicion(exposicion) {
//     let detalles = `
//         Título: ${exposicion.titulo}
//         Fecha: ${new Date(exposicion.fecha).toLocaleDateString()}
//         Descripción: ${exposicion.descripcion}
        
//         Artistas:
//         ${exposicion.artistas.join('\n')}
//     `;
//     alert(detalles);
// }

// // Event Listeners
// document.addEventListener("DOMContentLoaded", function() {
//     // Botón de agregar comentario
//     document.getElementById("botonAgregarComentario").addEventListener("click", agregarComentario);
    
//     // Cambio en el filtro de exposiciones
//     document.getElementById("exposicionFiltro").addEventListener("change", actualizarTablaComentarios);
    
//     // Botón de ordenar por calificación
//     const btnOrdenar = document.querySelector("#sectionInfo table th:last-child button");
//     btnOrdenar.addEventListener("click", function() {
//         ordenAscendente = !ordenAscendente;
//         this.textContent = ordenAscendente ? "Calificación creciente" : "Calificación decreciente";
//         actualizarTablaComentarios();
//     });
// });



