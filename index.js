const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PORT = 3000

const conexion = mysql.createConnection(
    {
    host:'db4free.net',
    database:'cursoandroid',
    user:'byronbarahona',
    password:'*byronbarahona18'
    }
)

app.listen(PORT, () => {
    console.log(`Servidor compilador en el puerto ${PORT}`)
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexion exitosa, Podemos seguir')
})

app.get('/', (req,res) =>{
    res.send('Api Conectado, base de datos OK')
})

app.get('/lista', (req, res) =>{
    const consulta ="SELECT * FROM cursoandroid.usr;"
    conexion.query(consulta, (error,resultado) => {
        if(error){return console.error(error.message)}

        const obj = {}

        if(resultado.length > 0){
            obj.lista = resultado
            res.json(obj)
        }
        else{
            res.json('No hay nada que mostrar')
        }
    })
})

app.get('/lista/id', (req, res) =>{

    const {id} = req.params

    const consulta =`SELECT * FROM cursoandroid.usr WHERE id_usr=${id};`
    conexion.query(consulta, (error,resultado) => {
        if(error){return console.error(error.message)}

        const obj = {}

        if(resultado.length > 0){
           console.log("Individuo encontrado")
           res.json(resultado)
        }
        else{
            res.json('No hay nada que mostrar')
        }
    })
})

app.post('/lista/agregar'), (req, res) => {
    const usuario = {
        nombre: req.body.nom,
        apellido: req.body.ape,
        correo: req.body.emai
    }

    const consulta = `INSERT INTO cursoandroid.usr (nombre,apellido,correo)`

    conexion.query(consulta,[
        usuario.nombre,
        usuario.apellido,
        usuario.correo], (error) => {
            if(error) return console.error(error.message)
            res.json('Cliente agregado a la lista')
        }
    )
}