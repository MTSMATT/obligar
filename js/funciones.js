let sistema = new Sistema();

window.addEventListener('load', inicio);

function inicio() {
    // Botones principales
    document.getElementById('botonColores').addEventListener('click', cambiarColores);
    
    // document.getElementById('botonAgregarComentario').addEventListener('click', agregarComentario);
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
    
    actualizarListasArtistas();
    actualizarListaExposiciones();
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

    let nombre = document.getElementById('nombre').value;
    let edad = parseInt(document.getElementById('edad').value);
    let caracteristica = document.getElementById('caracteristica').value;

    // Verificar si todos los campos están completos
    if (!nombre || isNaN(edad) || !caracteristica) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    let artista = new Artista(nombre, edad, caracteristica);

    if (sistema.agregarArtista(artista)) {
        document.getElementById('formRegistrarArtistas').reset(); // Limpiar el formulario
        actualizarListasArtistas(); // Actualizar listas
    } else {
        alert('No se pudo agregar el artista. Intenta nuevamente.');
    }
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
    let titulo = document.getElementById("titulo").value.trim();
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value.trim();

    let artistasSeleccionados = Array.from(document.getElementById("idListaArtistas2").options);
    let artistas = []
    
    for (let i = 0; i < artistasSeleccionados.length; i++) {
        for (let j = 0; j < sistema.artistas.length; j++) {
            if (sistema.artistas[j].nombre === artistasSeleccionados[i].text) {
                artistas.push(sistema.artistas[j]);
            }
        }
    }

    if (!titulo || !fecha || !descripcion || artistas.length === 0) {
        alert('Por favor, completa todos los campos y selecciona al menos un artista.');
        return;
    }

    let exposicion = new Exposicion(titulo, fecha, descripcion, artistas);
   
    if (sistema.agregarExposicion(exposicion)) {
        document.getElementById('formIngresarExposiciones').reset(); // Limpiar el formulario
        document.getElementById('idListaArtistas2').innerHTML = ''; // Vaciar la lista de artistas seleccionados
        actualizarListaExposiciones(); // Actualizar la lista de exposiciones
        actualizarInformacionGeneral(); // Actualizar información general
    } else {
        alert('No se pudo agregar la exposición. Intenta nuevamente.');
    }
}

function agregarComentario() {

    let exposicionSelect = document.getElementById('exposicion');
    let exposicion = sistema.exposiciones[exposicionSelect.selectedIndex];
    let nombreVisitante = document.getElementById('nombreVisitante').value;
    let comentario = document.getElementById('comentario').value;
    let calificacion = document.querySelector('input[name="calificacion"]:checked').value;
    let guiada = document.getElementById('guia').checked;

    if(!exposicionSelect || !nombreVisitante || !calificacion) {
        alert('Por favor, completa todos los campos y selecciona al menos un artista.');
        return
    }

    let visita = new Visita(exposicion, nombreVisitante, comentario, calificacion, guiada);

    if (sistema.agregarVisita(visita)) {
        document.getElementById('formComentariosDeVisitas').reset();
        actualizarTablaComentarios();
        actualizarInformacionGeneral();
    } else {
        alert('No se pudo agregar la exposición. Intenta nuevamente.')
    }
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