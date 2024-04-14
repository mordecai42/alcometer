const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'alcometer',
    port: 3307
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL');
    }
});

app.use(express.json());
app.use(cors());

app.post('/usuarios', (req, res) => {
    const { nombre, token, email, password } = req.body;

    const query = 'INSERT INTO admin(nombre, token, email, password) VALUES(?,?,?,?)';
    const values = [nombre, token, email, password];

    connection.query(query, values, (error, results) => {
        if(error){
            console.error('Error al registrar el administrador: ', error);
            res.status(500).json({ error: 'Error al registrar' });
        }else{
            console.log('Administrador registrado correctamente');
            res.status(201).json({ message: 'Administrador registrado exitosamente' });
        }
    });
});

app.post('/cliente', (req, res) => {
    const { nombre, placa, telefono, celular, ficha, carro, permiso } = req.body;

    const query = 'INSERT INTO usuario(nombre, placa, telefono, celular, ficha, carro, permiso) VALUES (?,?,?,?,?,?,?)';
    const values = [nombre, placa, telefono, celular, ficha, carro, permiso];

    connection.query(query, values, (error, results) => {
        if(error){
            console.error('Error al registrar el usuario: ', error);
            res.status(500).json({ error: 'Error al registrar' });
        }else{
            console.log('Usuario registrado correctamente');
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        }
    })
})

app.get('/mostrarUsuario', (req, res) => {
    const query = 'SELECT * FROM usuario';

    connection.query(query, (error, results) => {
        if(error){
            console.error('Error al obtener los usuarios: ', error);
            res.status(500).json({ error: 'Error al obtener los datos' });
        }else{
            console.log('Usuarios obtenidos correctamente');

            const formatted = results.map(result => ({
                ...result,
                fecha: formatDate(result.fecha)
            }))

            res.status(200).json(formatted);
        }
    });
});

app.delete('/cliente/:clienteId', (req, res) => {
    const clienteId = req.params.clienteId;

    const query = 'DELETE FROM usuario WHERE id = ?';
    const values = [clienteId];

    connection.query(query, values, (error, results) => {
        if (error){
            console.error('Error al eliminar el usuario: ', error);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            console.log('Usuario eliminado correctamente');
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password, token } = req.body;

    const query = 'SELECT COUNT(*) AS count FROM admin WHERE email = ? AND password = ? AND token = ?'
    const values = [email, password, token];

    connection.query(query, values, (error, results) => {
        if(error){
            console.error("Error al verificar el inicio de sesión: ", error);
            res.sendStatus(500);
        }else{
            const count = results[0].count;

            if(count === 1){
                res.sendStatus(200);
            }else{
                res.sendStatus(401);
            }
        }
    })
})

function formatDate(dateString){
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})