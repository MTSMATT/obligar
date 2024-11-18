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

    let exposiciones = [];
    function agregarExposicion(){
        // Obtener los valores del formulario
        let titulo = document.getElementById("titulo").value.trim();
        let fecha = document.getElementById("fecha").value;
        let descripcion = document.getElementById("descripcion").value.trim();
        let listaArtistas2 = document.getElementById("idListaArtistas2");
        
        // Validar que todos los campos estén completos
        if (!titulo || !fecha || !descripcion || listaArtistas2.options.length === 0) {
            alert("Por favor, complete todos los campos y seleccione al menos un artista.");
            return;
        }
        
        // Obtener los artistas seleccionados
        let artistasSeleccionados = Array.from(listaArtistas2.options).map(option => option.text);
        
        // Crear nueva exposición
        let nuevaExposicion = new Exposicion(titulo, fecha, descripcion, artistasSeleccionados);
        
        // Agregar la exposición al array
        exposiciones.push(nuevaExposicion);
        
        // Actualizar el select de exposiciones en la sección de comentarios
        actualizarSelectExposiciones();
        
        // Limpiar el formulario
        document.getElementById("formIngresarExposiciones").reset();
        // Devolver los artistas a la lista 1
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
        exposiciones.forEach(expo => {
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
        });
    }

    function agregarComentario(){
        
    }
