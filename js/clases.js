class Sistema {
    constructor() {
        this.artistas = []; // guarda todos los artistas
        this.exposiciones = []; // guarda todas las expos 
        this.visitas = []; // guarda todas las visitas
    }

    // Metodo para agregar nuevos artistas
    agregarArtista(artista) {

        // Chekeamos que no este ya en el array
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
        this.exposiciones.push(exposicion);
        return true;
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

        // Revisamos cada expo
        for (let i = 0; i < this.exposiciones.length; i++) {
            let tieneComentarios = false;
            
            // Buscamos si tiene visita
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

        for (let i = 0; i < this.exposiciones.length; i++) {
            let cantidadArtistas = this.exposiciones[i].artistas.length;
            if (cantidadArtistas > maxArtistas) {
                maxArtistas = cantidadArtistas;
                resultado = [this.exposiciones[i]];
            } else if (cantidadArtistas === maxArtistas) {
                resultado.push(this.exposiciones[i]);
            }
        }
        return resultado;
    }

    ordenarPorFecha(exposiciones) {
        for (let i = 0; i < exposiciones.length - 1; i++) {
            for (let j = 0; j < exposiciones.length - i - 1; j++) {
                if (exposiciones[j].fecha > exposiciones[j + 1].fecha) {
                    let temp = exposiciones[j];
                    exposiciones[j] = exposiciones[j + 1];
                    exposiciones[j + 1] = temp;
                }
            }
        }
        return exposiciones;
    }

    ordenarVisitasPorCalificacion(ordenCreciendo) {
        this.visitas.sort((a ,b) => {
            return ordenCreciendo
                ? a.calificacion - b.calificacion // Orden creciente
                : b.calificacion - a.calificacion // Orden decreceinte
        })
    }
}

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