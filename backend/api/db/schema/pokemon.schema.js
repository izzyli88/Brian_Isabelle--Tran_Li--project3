import { Schema } from "mongoose";

export const PokemonSchema = new Schema({
    name: String,
    type: String,
    health: {
        type: Number,
        min: 0,
        max: 1000
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    owner: String, 
    state: {
        type: String,
        default: "Wild"
    }
}, {
    collection: "pokemons"
})