let mensaje

mostrar()

function mostrar() {
    fetch('/api/series').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
    <h1>${data[i].titulo}</h1>
    <p>Plataforma: ${data[i].plataforma}</p>
    <p>Nota: ${data[i].nota}</p>
    `
        }
        document.getElementById('mensaje').innerHTML = mensaje;
    })
}


fetch('/api/serie').then(function(res) {
    return res.json();
}).then(function(data) {
    mensaje = `
    <h1>${data[0].titulo}</h1>
    <p>Plataforma: ${data[0].plataforma}</p>
    <p>Nota: ${data[0].nota}</p>
    `

    document.getElementById('mensaje').innerHTML = mensaje;
})


function add() {

    let nombre = document.getElementById("nombre").value
    let plataforma = document.getElementById("plataforma").value
    let nota = parseInt(document.getElementById("nota").value)
    let nueva = { titulo: nombre, plataforma: plataforma, nota: nota }

    fetch(`/api/nuevaSerie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nueva),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrar()
        });

}