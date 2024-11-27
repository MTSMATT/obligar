//Trabajo de Matias Piedra (354007) & Joaquin Piedra (304804)

let sistema = new Sistema(); // Creamos la clase sistema antes que nada

window.addEventListener('load', inicio);

function inicio() {
    // Obtenemos el boton cambiar color y aplicamos la fucnion
    document.getElementById('botonColores').addEventListener('click', cambiarColores);
    
    // Obtenemos el form de los coments para prevenir la recarga al darle al boton, Luego ejecutamos la funcion agregar comentario
    document.getElementById('formComentariosDeVisitas').addEventListener('submit', function (e) {
        e.preventDefault();
        agregarComentario();
        ordenCreciendo = true; // Restablecer el orden a creciente
        ordenarPorCalificacion(); // Ordenar por calificación
    })
    
    document.getElementById('formIngresarExposiciones').addEventListener('submit', function (e) {
        e.preventDefault();
        agregarExposicion(); // Agregar exposicion
    })
    
    document.getElementById('formRegistrarArtistas').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir recarga de la página
        agregarArtista(); // Agregar artista
    });
    
    // Botones de movimiento de artistas
    document.getElementById('moverArtistaDerecha').addEventListener('click', moverArtistaDerecha);
    document.getElementById('moverArtistaIzquierda').addEventListener('click', moverArtistaIzquierda);
    
    document.getElementById('tableButton').addEventListener('click', ordenarPorCalificacion);

    document.getElementById('exposicionFiltro').addEventListener('change', filtrarTablaPorExposicion);
 
    actualizarListasArtistas(); // Actualizar el select de artistas
    actualizarListaExposiciones(); // Actualizar el select de exposiciones
    actualizarTablaComentarios();  // Actualizar la tabla de comentarios
}

let colorOriginal = true;
function cambiarColores(){
    let cambiarColor = document.getElementsByClassName("cambiarColor"); // Traemos todos los elementos con la clase cambiarColor

    if(colorOriginal){
        for (let i = 0; i < cambiarColor.length; i++) {
            cambiarColor[i].style.backgroundColor = "#8DB58E"; // Cambiamos el color de fondo   
        }
        colorOriginal = false;
    } else if (!colorOriginal){
        for (let i = 0; i < cambiarColor.length; i++) {
            cambiarColor[i].style.backgroundColor = "#98fb98"; // Cambiamos el color de fondo
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
    actualizarListasArtistas();
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
    let nombreVisitante = document.getElementById('nombreVisitante').value;
    let comentario = document.getElementById('comentario').value;
    let calificacion = document.querySelector('input[name="calificacion"]:checked').value;
    let guiada = document.getElementById('guia').checked;

    // Guardamos la exposicion seleccionada (selectedIndex es el indice de la opcion seleccionada)
    let exposicion = sistema.exposiciones[exposicionSelect.selectedIndex];
    
    // Creamos una nueva visita con los datos obtenidos usando la clase Visita
    let visita = new Visita(exposicion, nombreVisitante, comentario, calificacion, guiada);

    // Si la visita se agrega correctamente (porque la calse retorna true or false), se limpia el formulario y se actualiza la tabla
    if (sistema.agregarVisita(visita)) {
        document.getElementById('formComentariosDeVisitas').reset();
        actualizarTablaComentarios();
        actualizarInformacionGeneral();
    } else {
        alert('No se pudo agregar la exposición. Intenta nuevamente.'); // En caso de errores inesperados
    }
}

function filtrarTablaPorExposicion() {

    // Obtenemos el valor del select de exposiciones
    const filtro = document.getElementById('exposicionFiltro').value;
    
    let visitasFiltradas = []; // Array para guardar las visitas filtradas

    // Filtrar las visitas que coincidan con el filtro
    if (filtro === 'todas') {
        visitasFiltradas = sistema.visitas;  // Mostrar todas las visitas
    } else {
        for (let i = 0; i < sistema.visitas.length; i++) {
            if (sistema.visitas[i].exposicion.titulo === filtro) { // Si la exposicion de la visita coincide con el filtro 
                visitasFiltradas.push(sistema.visitas[i]);  // Agregar la visita al array
            }
        }
    }

    // Actualizar la tabla con las visitas filtradas
    actualizarTablaComentarios(visitasFiltradas);

    return visitasFiltradas;
}

function actualizarListaExposiciones() {

    // Obtenemos los selects de exposiciones y de filtrar exposiciones
    let selectExposicion = document.getElementById('exposicion');
    let selectFiltro = document.getElementById('exposicionFiltro');

    selectExposicion.innerHTML = ''; // Limpiar el select
    selectFiltro.innerHTML = '<option value="todas">Todas</option>'; // Limpiar el select y agregar la opción 'Todas'
    
    // Ordenamos las exposiciones alfabeticamente
    let exposicionesSorted = sistema.ordenarExposicionesAlfabeticamente();

    // Creamos las opciones de los selects con las exposiciones ordenadas en ambos selects
    for (let i = 0; i < sistema.exposiciones.length; i++) {
        let optionExposicion = document.createElement('option');
        let optionFiltro = document.createElement('option');

        // Agregamos el titulo de la exposicion a las opciones
        optionExposicion.innerText = exposicionesSorted[i].titulo;
        optionFiltro.innerText = exposicionesSorted[i].titulo;
        
        // Agregamos las opciones a los selects
        selectExposicion.add(optionExposicion);
        selectFiltro.add(optionFiltro);
    }
}

// Función para actualizar la información general
function actualizarInformacionGeneral() {
 
    // Expos con mas artistas usando el metodo de Sistema
    let exposicionesMasArtistas = sistema.obtenerExposicionesConMasArtistas();
    
    let listaMasArtistas = document.getElementById('listaMasArtistas');
    // Limpiamos el contenido de la lista
    listaMasArtistas.innerHTML = '';

    // Si hay exposiciones con más artistas, las agregamos a la lista
    if (exposicionesMasArtistas.length > 0) {
        for (let i = 0; i < exposicionesMasArtistas.length; i++) {
            let li = document.createElement('li'); // Creamos un elemento li
            li.innerText = exposicionesMasArtistas[i].titulo; // Agregamos el título de la exposición
            listaMasArtistas.appendChild(li); // Agregamos el li a la lista
        }
    } else {
        // Si no hay exposiciones con más artistas, agregamos un li con el texto 'sin datos'
        let li = document.createElement('li');
        li.innerText = 'sin datos';
        listaMasArtistas.appendChild(li);
    }

    // Expos sin comntarios
    let exposicionesSinComentarios = sistema.obtenerExposicionesSinComentarios();
    let listaSinComentarios = document.getElementById('listaSinComentarios');
    listaSinComentarios.innerHTML = '';

    if (exposicionesSinComentarios.length > 0) {

        for (let i = 0 ; i < exposicionesSinComentarios.length; i++) {
            let li = document.createElement('li');
            let [yyyy, mm, dd] = (exposicionesSinComentarios[i].fecha).split('-'); // Dividir la fecha en partes y asignarlo al array. Formato default es "YYYY-MM-DD"
            let fechaFormato = `${dd}/${mm}/${yyyy}`; // Cambiar el formato de la fecha.
            li.textContent = `${exposicionesSinComentarios[i].titulo} ${fechaFormato}`;
            listaSinComentarios.appendChild(li);
        }
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
    img.src = rutasImagenes[calificacion]; // el path sera el valor de la calificacion pasado por parametro
    img.alt = `Calificación ${calificacion}`;
    img.className = 'imagen'; // Clase para asegurar que las imágenes sean consistentes con las del formulario
    return img;
}

let ordenCreciendo = true; // Variable para controlar si el orden es creciente o decreciente
function ordenarPorCalificacion() {

    // Filtrar las visitas de acuerdo con el filtro actual
    let visitasFiltradas = filtrarTablaPorExposicion(); 

    // Ordena las visitas según el estado de `ordenCreciendo`
    let filtroOrdenado = visitasFiltradas.sort((a, b) => {
        if (visitasFiltradas.length > 1) {
            
            if (ordenCreciendo) {
                return a.calificacion - b.calificacion; // Ascendente
            } else {
                return b.calificacion - a.calificacion; // Descendente
            }

        }
    });

    // Alterna el estado de orden
    ordenCreciendo = !ordenCreciendo;

    // Cambia el texto del botón según el orden
    const botonCalificacion = document.getElementById('tableButton');

    // Si hay más de una visita, cambia el texto del botón
    if (visitasFiltradas.length > 1) {
        if(ordenCreciendo){
            botonCalificacion.innerText = 'Calificación decreciente';
        } else{
            botonCalificacion.innerText = 'Calificación creciente';
        }
    }

    actualizarTablaComentarios(filtroOrdenado);
}

function actualizarTablaComentarios(visitas = sistema.visitas) { // Por defecto vale sistema.visitas, si se para un parametro se usa ese
    let tabla = document.querySelector('table');
    let filas = tabla.getElementsByTagName('tr');
    
    // Eliminar filas existentes excepto el encabezado
    while (filas.length > 1) {
        tabla.deleteRow(1);
    }

    // visitas.forEach((visita) => {
    for (let i = 0; i < visitas.length; i++) {
        let visita = visitas[i];  // Acceder al elemento actual de visitas
        let fila = tabla.insertRow(); // Insertar una fila en la tabla

        // Columna: Título
        let celdaTitulo = fila.insertCell(); // Insertar una celda en la fila
        celdaTitulo.textContent = visita.exposicion.titulo; // Agregar el título de la exposición

        // Columna: Más datos
        let celdaAmpliar = fila.insertCell(); // Insertar una celda en la fila
        let botonAmpliar = document.createElement('button'); 
        botonAmpliar.textContent = 'Ampliar';
        botonAmpliar.className = 'button';
        botonAmpliar.onclick = function (event) { // Función para mostrar la información de la exposición
            event.preventDefault(); // Prevenir refresco
            let artistasInfo = '';
            for (let i = 0; i < visita.exposicion.artistas.length; i++) {
                let artista = visita.exposicion.artistas[i]; // Acceder al artista actual
                artistasInfo += `${artista.nombre} Edad: ${artista.edad} Estilo: ${artista.caracteristica}\n`;  // Agregar la información del artista
            }

            artistasInfo = artistasInfo.replace(/\n\s*\n/g, '\n'); // Eliminar líneas vacías

            let [yyyy, mm, dd] = (visita.exposicion.fecha).split('-'); // Dividir la fecha en partes y asignarlo al array. Formato default es "YYYY-MM-DD"
            let fechaFormato = `${dd}/${mm}/${yyyy}`; // Cambiar el formato de la fecha.

            alert(`Información de la Exposición:\nFecha: ${fechaFormato}\nDescripción: ${visita.exposicion.descripcion}\nArtistas:\n${artistasInfo}`); // Mostrar alerta con la información
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
        
    }
}