//Trabajo de Matias Piedra (354007) & Joaquin Piedra (304804)

let sistema = new Sistema(); // Creamos la clase sistema antes que nada

window.addEventListener('load', inicio);

function inicio() {
    // Obtenemos el boton cambiar color y aplicamos la fucnion
    document.getElementById('botonColores').addEventListener('click', cambiarColores);
    
    // Obtenemos el form de los coments para prevenir la recarga al darle al boton, Luego ejecutamos la funcion agregar comentario
    document.getElementById('formComentariosDeVisitas').addEventListener('submit', function (e) {
        e.preventDefault()
        agregarComentario()
    })
    
    // document.getElementById('botonAgregarExposicion').addEventListener('click', agregarExposicion);
    document.getElementById('formIngresarExposiciones').addEventListener('submit', function (e) {
        e.preventDefault()
        agregarExposicion()

    })
    
    document.getElementById('formRegistrarArtistas').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir recarga de la página
        agregarArtista();
    });
    
    // Botones de movimiento de artistas
    document.getElementById('moverArtistaDerecha').addEventListener('click', moverArtistaDerecha);
    document.getElementById('moverArtistaIzquierda').addEventListener('click', moverArtistaIzquierda);
    
    document.getElementById('tableButton').addEventListener('click', ordenarPorCalificacion);

    document.getElementById('exposicionFiltro').addEventListener('change', filtrarTablaPorExposicion);
 
    actualizarListasArtistas();
    actualizarListaExposiciones();
    actualizarTablaComentarios();
}

let colorOriginal = true;
function cambiarColores(){
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

    // Obtenemos datos del formulario
    let nombre = document.getElementById('nombre').value;
    let edad = parseInt(document.getElementById('edad').value);
    let caracteristica = document.getElementById('caracteristica').value;

    // Creamos un nuevo artista con la estructura de la clase Artista 
    let artista = new Artista(nombre, edad, caracteristica);

    // Si el artista ya esta, al agregarlo a sistema devolvera false, sino, entraen el if y lo agrega
    if (sistema.agregarArtista(artista)) {
        document.getElementById('formRegistrarArtistas').reset(); // Limpiar el formulario
        actualizarListasArtistas(); // Actualizar el select de los artistas
    } else {
        alert('El artista ya existe. Intenta nuevamente.');
    }
}

function moverArtistaDerecha(){

    //Traemos los dos selects
    let listaArtistas1 = document.getElementById("idListaArtistas1");
    let listaArtistas2 = document.getElementById("idListaArtistas2");

    // Obtiene los artistas seleccionados en el primer select y lo convierte en un array
    let opcionesSeleccionadas = Array.from(listaArtistas1.selectedOptions);

    // Mueve CADA UNA opción seleccionada del primer select al segundo select
    opcionesSeleccionadas.forEach(opcion => {
        listaArtistas2.appendChild(opcion);
    });

}

function moverArtistaIzquierda(){

    // Traemos los dos selects
    let listaArtistas1 = document.getElementById("idListaArtistas1");
    let listaArtistas2 = document.getElementById("idListaArtistas2");

    // Obtiene los artistas seleccionados en el segundo select y los convierte en un array
    let opcionesSeleccionadas = Array.from(listaArtistas2.selectedOptions);

    // Mueve CADA UNA de las opciones seleccionadas del segundo select al primer select
    opcionesSeleccionadas.forEach(opcion => {
        listaArtistas1.appendChild(opcion);
    });

    // Ordenamos alfabeticamente
    actualizarListasArtistas()
}

function actualizarListasArtistas() {

    // Traemos el primer select y lo limpiamos
    let lista = document.getElementById('idListaArtistas1');
    lista.innerHTML = '';
    
    // Ordenamos los artistas alfabeticamente
    let sortedArtistas = sistema.artistas.sort((a, b) => {
        if (a.nombre < b.nombre) return -1; // Coloca -> a antes que b
        if (a.nombre > b.nombre) return 1; // Coloca -> b antes que a
        return 0;
    });

    // Va creando las opciones ordenadas y las mete en el select 
    for (let i = 0; i < sistema.artistas.length; i++) {
        let option = document.createElement('option');
        option.innerText = sortedArtistas[i].nombre;
        lista.add(option);
    }
}   

function agregarExposicion(){

    // Traemos los datos del formulario
    let titulo = document.getElementById("titulo").value.trim();
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value.trim();

    // Obtenemos los artistas seleccionados en formato de array
    let artistasSeleccionados = Array.from(document.getElementById("idListaArtistas2").options);
    let artistas = []

    // Comparamos al nombre del artista seleccionado con el nombre de los artistas en sistema, para pushear al artista con todos sus datos
    for (let i = 0; i < artistasSeleccionados.length; i++) {
        for (let j = 0; j < sistema.artistas.length; j++) {
            if (sistema.artistas[j].nombre === artistasSeleccionados[i].text) {
                artistas.push(sistema.artistas[j]);
            }
        }
    }

    // Creamos una nueva exposicion con los datos obtenidos, usando la calse Exposicion
    let exposicion = new Exposicion(titulo, fecha, descripcion, artistas);
   
    // Si la exposicion ya existe, no se agrega, sino, se agrega (esto es porque el metoodo agregarExposicion retorna true o false)
    if (sistema.agregarExposicion(exposicion)) {
        document.getElementById('formIngresarExposiciones').reset(); // Limpiar el formulario
        document.getElementById('idListaArtistas2').innerHTML = ''; // Vaciar la lista de artistas seleccionados
        actualizarListaExposiciones(); // Actualizar la lista de exposiciones
        actualizarInformacionGeneral(); // Actualizar información general
        actualizarListasArtistas(); // Actualizar select de elegir artista
    } else {
        alert('La exposición ya existe, intenta nuevamente.');
    }

}

function agregarComentario() {

    // Obtenemos los datos del formulario
    let exposicionSelect = document.getElementById('exposicion');
    
    let exposicion = sistema.exposiciones[exposicionSelect.selectedIndex];
    
    let nombreVisitante = document.getElementById('nombreVisitante').value;
    let comentario = document.getElementById('comentario').value;
    let calificacion = document.querySelector('input[name="calificacion"]:checked').value;
    let guiada = document.getElementById('guia').checked;
    
    let visita = new Visita(exposicion, nombreVisitante, comentario, calificacion, guiada);

    if (sistema.agregarVisita(visita)) {
        document.getElementById('formComentariosDeVisitas').reset();
        actualizarTablaComentarios();
        actualizarInformacionGeneral();
    } else {
        alert('No se pudo agregar la exposición. Intenta nuevamente.') // En caso de errores inesperados
    }

    console.log(sistema.exposiciones)
    console.log(sistema.visitas)
}



function filtrarTablaPorExposicion() {
    const filtro = document.getElementById('exposicionFiltro').value;
    
    let visitasFiltradas = []

    if (filtro === 'todas') {
        visitasFiltradas = sistema.visitas;  // No es necesario hacer nada más si seleccionan 'todas'
    } else {
        // Filtrar las visitas que coincidan con el filtro
        for (let i = 0; i < sistema.visitas.length; i++) {
            if (sistema.visitas[i].exposicion.titulo === filtro) {
                visitasFiltradas.push(sistema.visitas[i]);  // Agregar la visita al arreglo
            }
        }
    }

    // Actualizar la tabla con las visitas filtradas
    actualizarTablaComentarios(visitasFiltradas);
}

function actualizarListaExposiciones() {
    let selectExposicion = document.getElementById('exposicion');
    let selectFiltro = document.getElementById('exposicionFiltro');
    selectExposicion.innerHTML = '';
    selectFiltro.innerHTML = '<option value="todas">Todas</option>';
    
    let exposicionesSorted = sistema.exposiciones.sort((a, b) => {
        if (a.titulo < b.titulo) return -1;
        if (a.titulo > b.titulo) return 1;
        return 0;
    })

    for (let i = 0; i < sistema.exposiciones.length; i++) {
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');
        option1.text = exposicionesSorted[i].titulo;
        option2.text = exposicionesSorted[i].titulo;
        
        selectExposicion.add(option1);
        selectFiltro.add(option2);
    }
}

// Función para actualizar la información general
function actualizarInformacionGeneral() {
 
    let exposicionesMasArtistas = sistema.obtenerExposicionesConMasArtistas();
    let listaMasArtistas = document.querySelector('#sectionInfo ul:first-of-type');
    listaMasArtistas.innerHTML = '';
    
    if (exposicionesMasArtistas.length > 0) {
        exposicionesMasArtistas.forEach((expo) => {
            let li = document.createElement('li');
            li.textContent = expo.titulo;
            listaMasArtistas.appendChild(li);
        });
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
        exposicionesSinComentarios.forEach((expo) => {
            let li = document.createElement('li');
            li.textContent = `${expo.titulo} (${expo.fecha})`;
            listaSinComentarios.appendChild(li);
        });
    } else {
        let li = document.createElement('li');
        li.textContent = 'sin datos';
        listaSinComentarios.appendChild(li);
    }
}

function obtenerImagenCalificacion(calificacion) {
    const rutasImagenes = {
        1: 'img/red.jpg',       // Muy baja
        2: 'img/orange.jpg',    // Baja
        3: 'img/yellow.jpg',    // Media
        4: 'img/lightgreen.jpg', // Buena
        5: 'img/green.jpg',     // Excelente
    };

    let img = document.createElement('img');
    img.src = rutasImagenes[calificacion];
    img.alt = `Calificación ${calificacion}`;
    img.className = 'imagen'; // Clase para asegurar que las imágenes sean consistentes con las del formulario
    return img;
}

let ordenCreciendo = true; // Variable para controlar si el orden es creciente o decreciente
function ordenarPorCalificacion() {
    // Cambiar el orden de las visitas de acuerdo con el valor de ordenCreciendo
 
    sistema.ordenarVisitasPorCalificacion(ordenCreciendo)

    // Cambiar el texto del botón según el estado de la variable ordenCreciendo
    const botonCalificacion = document.getElementById('tableButton');
    botonCalificacion.innerText = ordenCreciendo
        ? 'Calificación decreciente'
        : 'Calificación creciente';

    // Alternar el estado de ordenCreciendo
    ordenCreciendo = !ordenCreciendo;

    // Actualizar la tabla con los datos ordenados
    actualizarTablaComentarios();
}

function actualizarTablaComentarios(visitas = sistema.visitas) { // Por defecto vale sistema.visitas, si se para un parametro se usa ese
    let tabla = document.querySelector('table');
    let filas = tabla.getElementsByTagName('tr');
    
    // Eliminar filas existentes excepto el encabezado
    while (filas.length > 1) {
        tabla.deleteRow(1);
    }

    visitas.forEach((visita) => {
        let fila = tabla.insertRow();

        // Columna: Título
        let celdaTitulo = fila.insertCell();
        celdaTitulo.textContent = visita.exposicion.titulo;

        // Columna: Más datos
        let celdaAmpliar = fila.insertCell();
        let botonAmpliar = document.createElement('button');
        botonAmpliar.textContent = 'Ampliar';
        botonAmpliar.className = 'button';
        botonAmpliar.onclick = function (event) {
            event.preventDefault(); // Prevenir refresco
            let artistasInfo = visita.exposicion.artistas
            .map(artista => {return `${artista.nombre} Edad: ${artista.edad} Estilo: ${artista.caracteristica}`;})
            .join('\n'); // Unir las líneas con un salto de línea

            artistasInfo = artistasInfo.replace(/\n\s*\n/g, '\n'); // Eliminar líneas vacías

            alert(`Información de la Exposición:\nFecha: ${visita.exposicion.fecha}\nDescripción: ${visita.exposicion.descripcion}\nArtistas:\n${artistasInfo}`); // Mostrar alerta con la información
        };

        celdaAmpliar.appendChild(botonAmpliar);

        // Columna: Nombre
        let celdaNombre = fila.insertCell();
        celdaNombre.textContent = visita.nombreVisitante;
        celdaNombre.className = 'borderRight';

        // Columna: Comentario
        let celdaComentario = fila.insertCell();
        celdaComentario.textContent = visita.comentario;
        celdaComentario.className = 'comentarios';

        // Columna: Guiada
        let celdaGuiada = fila.insertCell();
        celdaGuiada.textContent = visita.guiada ? 'SI' : 'NO';

        // Columna: Calificación
        let celdaCalificacion = fila.insertCell();
        let imagenCalificacion = obtenerImagenCalificacion(visita.calificacion);
        celdaCalificacion.appendChild(imagenCalificacion);
        celdaCalificacion.className = 'borderRight';
    });
}