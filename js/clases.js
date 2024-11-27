//Trabajo de Matias Piedra (354007) & Joaquin Piedra (304804)

class Sistema {
    constructor() {
        this.artistas = []; // guarda todos los artistas
        this.exposiciones = []; // guarda todas las expos 
        this.visitas = []; // guarda todas las visitas
    }

    // Metodo para agregar nuevos artistas
    agregarArtista(artista) {

        // Chequeamos que no este ya en el array
        for (let i = 0; i < this.artistas.length; i++) {
            if (this.artistas[i].nombre === artista.nombre) {
                return false;
            }
        }
        this.artistas.push(artista); // Agreagamos al array
        return true; // Funcion exitosa (por defecto retorna undefine)
    }

    // Metodo para agregar nueva expo
    agregarExposicion(exposicion) {
        for (let i = 0; i < this.exposiciones.length; i++) {
            if (this.exposiciones[i].titulo === exposicion.titulo) {
                return false;
            }
        }
        this.exposiciones.push(exposicion); // Agreagamos al array
        return true; // Funcion exitosa (por defecto retorna undefine)
    }

    // Metodo para agregar nueva visita
    agregarVisita(visita) {
        if (!visita || !visita.exposicion || !visita.nombreVisitante) {
            return false; // Visita inválida
        }
        this.visitas.push(visita);
        return true; // Visita agregada exitosamente
    }

    // Buscar expos sin comentarios
    obtenerExposicionesSinComentarios() {
        let resultado = [];

        // Recorremos las expos
        for (let i = 0; i < this.exposiciones.length; i++) {
            let tieneComentarios = false;
            
            // Buscamos en cada VISITA la expo vinculada y la comparamos con la expo del array
            for (let j = 0; j < this.visitas.length; j++) {
                if (this.visitas[j].exposicion === this.exposiciones[i]) {
                    tieneComentarios = true;
                    break;
                }
            }

            // Si no tiene comentatiso la agregamos a resultado
            if (!tieneComentarios) {
                resultado.push(this.exposiciones[i]);
            }
        }

        // Retornamos llamando al metodo para ordenar por fecha
        return this.ordenarPorFecha(resultado);
    }

    obtenerExposicionesConMasArtistas() {
        let maxArtistas = 0;
        let resultado = [];

        // Recorremos las expos
        for (let i = 0; i < this.exposiciones.length; i++) {
            // Guardamos el numero de artistas de la expo
            let cantidadArtistas = this.exposiciones[i].artistas.length;

            // Nos vamos quedando con el mayor
            if (cantidadArtistas > maxArtistas) {
                maxArtistas = cantidadArtistas;
                resultado = [this.exposiciones[i]];

            // Si hay varios con la misma cantidad tambien lo mostramos 
            } else if (cantidadArtistas === maxArtistas) {
                resultado.push(this.exposiciones[i]);
            }
        }
        return resultado;
    }

    // Ordenar los select de las exposiciones
    ordenarExposicionesAlfabeticamente() {
        return this.exposiciones.sort((a, b) => {
            if (a.titulo < b.titulo) return -1;
            if (a.titulo > b.titulo) return 1;
            return 0;
        })
    }

    // Ordenamos las expos sin comentarios
    ordenarPorFecha(exposiciones) {

        // Con el objeto Date ordenamos por fecha
        return exposiciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }
}

// moldes de las clases para crear objetos 
class Artista {
    constructor(nombre, edad, caracteristica) {
        this.nombre = nombre;
        this.edad = edad;
        this.caracteristica = caracteristica;
    }
}

class Exposicion {
    constructor(titulo, fecha, descripcion, artistas) {
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.artistas = artistas;
    }
}

class Visita {
    constructor(exposicion, nombreVisitante, comentario, calificacion, guiada) {
        this.exposicion = exposicion;
        this.nombreVisitante = nombreVisitante;
        this.comentario = comentario;
        this.calificacion = calificacion;
        this.guiada = guiada;
    }
}