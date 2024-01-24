import express from 'express';
// permet juste de créer desid differents pour chaque personne ajouter dans notre
// base de données
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const router = express.Router();


let usersData = [ ];

// permet de specifier que les données envoyées/reçues seront au format json                    
router.use(express.json());
//lire tous les users
router.get('/users', (request, response)=>{  
    response.send(usersData);
    console.log(`voici les parametres : ${JSON.stringify(request.params)}`);
    
})

router.get('/users/:id', (request, response)=>{  
    const {id} = request.params;
    const userFound = usersData.find((you) => you.id === id );
    response.send(userFound);
})
// creer un user et l'ajouter dans notre database
router.post('/users', (request, response)=>{
    const data_receive = request.body;
    usersData.push({...data_receive, id: uuidv4()}) ;
    response.send(`User ${data_receive.name} added to the database! youpiiii`);
})


// filter permet de filtrer les données de notre database
// si elle retourne true elle garde la donnée sinon elle la supprime
router.delete('/users/:id', (request, response)=>{
    const {id} = request.params;
    usersData = usersData.filter((you) => you.id !== id);
    response.send(`User with the id ${id} deleted from the database`);
})

// put methode permet de modifier complement les données d'un user
//patch methode permet de modifier partiellement les données d'un user

router.patch('/users/:id', (request, response)=>{
    const {id} = request.params;
    const userfound =  usersData.find((you) => you.id===id)
    const {name, prenom, age} = request.body;
    if(name){
        userfound.name = name;
    }
    if(prenom){
        userfound.prenom = prenom;
    }
    if(age){
        userfound.age = age;
    }
    response.send(`User with the id ${id} has been updated`);
})
export default router;