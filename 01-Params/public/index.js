let mensaje = ""

mostrar()

function mostrar() {

    fetch('/api/libros').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
    <h1>${data[i].titulo}</h1>
    <p>Estado: ${data[i].estado}</p>
    `
        }
        document.getElementById('mensaje').innerHTML = mensaje;
    })
}

function add() {

    let titulo = document.getElementById("add").value

    fetch(`/api/nuevoLibro/${titulo}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}


function buscar() {

    let titulo = document.getElementById("buscar").value

    fetch(`/api/libros/${titulo}`)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mensaje = `
            <h1>${data[0].titulo}</h1>
            <p>Estado: ${data[0].estado}</p>
            `
            document.getElementById("mensaje").innerHTML = mensaje
        });

}

function modificar() {

    let titulo = document.getElementById("add").value

    fetch(`/api/editarLibro/${titulo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}

function borrar() {

    let titulo = document.getElementById("add").value

    fetch(`/api/borrarLibro/${titulo}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}