import express from 'express';
const router = express.Router();
import { findPokemonByType, getAllPokemon, addPokemon, findPokemonById, deletePokemon, findPokemonByOwner } from './db/model/pokemon.model.js';

router.get("/", async function(req, res){
    const owner = req.cookies.user;

    if(!owner) {
        // if no owner cookie, redirect to login
    }

    
    const allPokemonResponse = await findPokemonByOwner(owner);
    res.json(allPokemonResponse);
})

router.get("/all", async function(req, res){
    const allPokemonResponse = await getAllPokemon();
    res.json(allPokemonResponse);
})


router.get('/:pokemonId', async function(req, res) {
    const pokemonId = req.params.pokemonId;

    const responsePokemon = await findPokemonById(pokemonId);

    if(!responsePokemon) {
        res.status(404);
        res.send('No pokemon with Pokemon ID ' + pokeId + ' exists');
        return;
    }

    res.json(responsePokemon)
})


router.post("/", async function(req, res) {
    const body = req.body;
    if (!body.name || !body.health || !body.type) {
        res.status(400);
        res.send("Not enough information given.");
        return;
    }

    const newPokemon = {
        "name": body.name,
        "type": body.type,
        "health": body.health,
        "creationDate": body.creationDate,
    }

    if (body.creationDate) {
        newPokemon.creationDate = body.creationDate;
    }

    const newPokemonId = await addPokemon(newPokemon)

   
    res.send(`Pokémon ${newPokemonId}: ${body.name} added.`);


})

router.delete("/:pokemonId", async function(req, res) {
    const id = req.params.pokemonId;

    await deletePokemon(id);
    res.send("Delete request received");
})


export default router;