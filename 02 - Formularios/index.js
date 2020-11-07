const express = require("express");
const mongodb = require("mongodb");
const app = express();
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if (err !== null) {
        console.log(err)
    } else {
        db = client.db("tv")
    }
})

app.get("/api/series", function(req, res) {
    db.collection("tv").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

app.get("/api/serie", function(req, res) {

    let nombre = req.body.titulo

    db.collection("libros").find({ titulo: nombre }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

app.post("/api/nuevaSerie", function(req, res) {

    let titulo = req.body.titulo
    let plataforma = req.body.plataforma
    let nota = req.body.nota
    let add = { titulo: titulo, plataforma: plataforma, nota: nota }

    db.collection("tv").insertOne(add, function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error: " + err })
        } else {
            res.send(datos)
        }
    })

})



app.listen(3000);