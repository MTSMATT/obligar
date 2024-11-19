class Sistema {
    constructor() {
        this.artistas = [];
        this.exposiciones = [];
        this.comentarios = []
    }

    agregarArtista (artista) {
        this.artistas.push(artista)
    }

    agregarExposicion (expo) {
        this.exposiciones.push(expo)
    }

    agregarComentario (coment) {
        this.comentarios.push(coment)
    }
}

class Artista {
    constructor(nombre, edad, caracteristica) {
        this.nombre = nombre;
        this.edad = edad;
        this.caracteristica = caracteristica
    }
}

class Exposicion {
    constructor(titulo, fecha, descripcion, artistas) {
        this.titulo = titulo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.artistas = artistas;
        this.comentario = []
    }

    agregarComentario (comentarios) {
        this.comentario.push(comentarios)
    }
}

class Visita {
    constructor(exposicion, nombreVisitante, comentario, calificacion, guia) {
        this.exposicion = exposicion;
        this.nombreVisitante = nombreVisitante;
        this.comentario = comentario;
        this.calificacion = calificacion;
        this.guia = guia
    }
}