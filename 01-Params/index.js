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
        db = client.db("libros")
    }
})

app.get("/api/libros", function(req, res) {
    db.collection("libros").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

app.get("/api/libros/:titulo", function(req, res) {

    let nombre = req.params.titulo

    db.collection("libros").find({ titulo: nombre }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

app.post("/api/nuevoLibro/:titulo", function(req, res) {

    let titulo = req.params.titulo
    let add = { titulo: titulo, estado: "Sin leer" }

    db.collection("libros").insertOne(add, function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error: " + err })
        } else {
            res.send(datos)
        }
    })

})

app.put("/api/editarLibro/:titulo", function(req, res) {

    let titulo = req.params.titulo

    db.collection("libros").updateOne({ titulo: titulo }, { $set: { estado: "Leído" } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })

})

app.delete("/api/borrarLibro/:titulo", function(req, res) {

    let titulo = req.params.titulo

    db.collection("libros").deleteOne({ titulo: titulo }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })

})

app.listen(3000);