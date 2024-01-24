import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';


const app = express();

const PORT = 4000;

// permet de specifier que les données envoyées/reçues seront au format json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// tu as ta route principale, puis tu appeles toutes les routes dont tu as besoin
// On part toujours de la route principales
app.use('/', usersRoutes)


//il faut importer les routes que l'on peut visiter ou envoyer des requests
// il faut specifier le path dans lequel, on veut que la reponse soit donnée
// dans notre cas "/" correspond à la homepage
app.get('/', (request, response)=>{
    response.send('Hello world');
})
// ici on met le serveur en ecoute sur un port, la fonction à 
//l'interieur est une callback fonction qui sera executée quand le serveur sera lancé   
app.listen(PORT,()=> {console.log(`server running on port: http://localhost:${PORT}`)});