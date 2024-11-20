class Sistema {
    constructor() {
        this.artistas = [];
        this.exposiciones = [];
        this.visitas = [];
    }

    agregarArtista(artista) {
        for (let i = 0; i < this.artistas.length; i++) {
            if (this.artistas[i].nombre === artista.nombre) {
                return false;
            }
        }
        this.artistas.push(artista);
        return true;
    }

    agregarExposicion(exposicion) {
        for (let i = 0; i < this.exposiciones.length; i++) {
            if (this.exposiciones[i].titulo === exposicion.titulo) {
                return false;
            }
        }
        this.exposiciones.push(exposicion);
        return true;
    }

    agregarVisita(visita) {
        this.visitas.push(visita);
    }

    obtenerExposicionesSinComentarios() {
        let resultado = [];
        for (let i = 0; i < this.exposiciones.length; i++) {
            let tieneComentarios = false;
            for (let j = 0; j < this.visitas.length; j++) {
                if (this.visitas[j].exposicion === this.exposiciones[i]) {
                    tieneComentarios = true;
                    break;
                }
            }
            if (!tieneComentarios) {
                resultado.push(this.exposiciones[i]);
            }
        }
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