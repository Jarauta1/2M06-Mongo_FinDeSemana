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
        db = client.db("restaurante")
    }
})

app.get("/api/menus", function(req, res) {
    db.collection("restaurante").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })
})

app.post("/api/nuevoMenu", function(req, res) {

    let numero = parseInt(req.body.numero)
    let primero = req.body.primero
    let segundo = req.body.segundo
    let postre = req.body.postre
    let precio = parseInt(req.body.precio)
    let add = { numero: numero, primero: primero, segundo: segundo, postre: postre, precio: precio }

    db.collection("restaurante").insertOne(add, function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error: " + err })
        } else {
            res.send(datos)
        }
    })

})

app.put("/api/editarMenu", function(req, res) {

    let numero = parseInt(req.body.numero)
    let primero = req.body.primero
    let segundo = req.body.segundo
    let postre = req.body.postre
    let precio = parseInt(req.body.precio)
    let add = { numero: numero, primero: primero, segundo: segundo, postre: postre, precio: precio }


    db.collection("restaurante").updateOne({ numero: numero }, { $set: { primero: primero, segundo: segundo, postre: postre, precio: precio } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })

})

app.delete("/api/borrarMenu", function(req, res) {

    let numero = parseInt(req.body.numero)

    db.collection("restaurante").deleteOne({ numero: numero }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            res.send(datos)
        }
    })

})

app.listen(3000);