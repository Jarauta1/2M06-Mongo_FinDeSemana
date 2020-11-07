let mensaje = ""

mostrar()

function mostrar() {

    fetch('/api/menus').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
    <h1>Menú nº: ${data[i].numero}</h1>
    <p>Primero: ${data[i].primero}</p>
    <p>Segundo: ${data[i].segundo}</p>
    <p>Postre: ${data[i].postre}</p>
    <h5>${data[i].precio} €</h5>
    `
        }
        document.getElementById('mensaje').innerHTML = mensaje;
    })
}

function add() {

    let numero = document.getElementById("numero").value
    let primero = document.getElementById("primero").value
    let segundo = document.getElementById("segundo").value
    let postre = document.getElementById("postre").value
    let precio = document.getElementById("precio").value
    let menu = {
        numero: numero,
        primero: primero,
        segundo: segundo,
        postre: postre,
        precio: precio
    }

    fetch(`/api/nuevoMenu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(menu),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}

function modificar() {

    let numero = document.getElementById("numeroEditado").value
    let primero = document.getElementById("primeroEditado").value
    let segundo = document.getElementById("segundoEditado").value
    let postre = document.getElementById("postreEditado").value
    let precio = document.getElementById("precioEditado").value
    let menu = {
        numero: numero,
        primero: primero,
        segundo: segundo,
        postre: postre,
        precio: precio
    }

    fetch(`/api/editarMenu`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(menu),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}

function borrar() {

    let numero = document.getElementById("numeroBorrar").value
    let borrar = { numero: numero }

    fetch(`/api/borrarMenu`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(borrar),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}