import axios from "axios";
import { useEffect, useState } from "react";

export default function AllPokemon() {

    const [pokemonState, setPokemonState] = useState(null);
    const [userState, setUserState] = useState(undefined);

    async function retrieveAllPokemon() {
        const response = await axios.get('/api/pokemon/all');
        const pokemon = response.data;
        setPokemonState(pokemon)
    }


    async function retrieveUserData() {
        const response = await axios.get('/api/user/isLoggedIn')
        let userdata = response.data.username
        if(!userdata) {
            userdata = null;
        }
        setUserState(userdata);
    }

    useEffect(function () {
        retrieveAllPokemon();
        retrieveUserData();
    }, [])


    if(!pokemonState || userState === undefined) {
        return <div>
            Loading data...
        </div>
    }

    
    const pokemonKeys = Object.keys(pokemonState)
    const pokemonByOwner = {};

    for(let i = 0; i <pokemonKeys.length; i++) {
        const pokemon = pokemonState[pokemonKeys[i]];
        let owner = pokemon.owner;
        if(!owner) {
            owner = 'Wild';
        }

        if(!pokemonByOwner[owner]) {
            pokemonByOwner[owner] = [];
        }

        pokemonByOwner[owner].push(pokemon)
    }


    const ownerNameKeys = Object.keys(pokemonByOwner)
    const pokemonComponent = [];

    for(let i = 0; i < ownerNameKeys.length; i++) {
        const owner = ownerNameKeys[i];
        const ownersPokemon = pokemonByOwner[owner]

        const header = <h2>{owner}</h2>;
        pokemonComponent.push(header);
        for (let pokemon of ownersPokemon) {
            let ownerCheckBox = null;
            if (owner === useState) {
                ownerCheckBox = <div>(This is your Pokemon!)</div>
            }
            let claimIfWild = null;
            if (owner === 'Wild') {
                claimIfWild = <button onClick={() => {}}>Claim Me</button>
            }
            const pokeComponent = (<>
                <h3>{pokemon.name}</h3>
                {ownerCheckBox}
                <div>
                    Type: {pokemon.type} - 
                    Health: {pokemon.health}
                </div>
            </>)
            pokemonComponent.push(pokeComponent);
        }

    }

    async function logout() {
        await axios.delete('/api/user/logout')
        setUserState(undefined)
        await retrieveAllPokemon();
        await retrieveUserData();
    }

    let userHeader = <div>Please log in...</div>
    if(userState) {
        userHeader = <>
            <div>Welcome back, {userState}</div>
            <button onClick={() => logout()}>Logout</button>
        </>
    }

    return (
        <div>
            <div>
            {userHeader}


            </div>

            <h1>
                All Pokemon    
            </h1>
            {pokemonComponent}
        </div>
    )
}