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