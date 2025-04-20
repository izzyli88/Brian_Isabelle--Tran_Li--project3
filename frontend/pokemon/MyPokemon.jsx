import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPokemon() {
  const [pokemonState, setPokemonState] = useState(null);
  const [newPokemonName, setNewPokemonNameState] = useState("");
  const [newPokemonHealth, setNewPokemonHealthState] = useState("");
  const [newPokemonType, setNewPokemonTypeState] = useState("");


  async function retrieveAllPokemon() {
    const response = await axios.get("/api/pokemon");
    const pokemon = response.data;
    setPokemonState(pokemon);
  }

  useEffect(function () {
    retrieveAllPokemon();
  }, []);
  function updateNewPokemonName(event) {
    setNewPokemonNameState(event.target.value);
  }

  function updateNewPokemonHealth(event) {
    setNewPokemonHealthState(event.target.value);
  }

  function updateNewPokemonType(event) {
    setNewPokemonTypeState(event.target.value);
  }


  async function createNewPokemon() {
    const req = {
      name: newPokemonName,
      health: newPokemonHealth,
      type: newPokemonType,
    };
    await axios.post("/api/pokemon", req);
    await retrieveAllPokemon();
  }

  async function deletePokemon(id) {
    console.log(id);
    await axios.delete("/api/pokemon/" + id);
    await retrieveAllPokemon();
  }

  if (!pokemonState) {
    return <div>Loading Pokemon...</div>;
  }

  const pokemonComponent = [];
  const pokemonKeys = Object.keys(pokemonState);
  for (let i = 0; i < pokemonKeys.length; i++) {
    const key = pokemonKeys[i];
    const currPokemon = pokemonState[key];

    const pokemonOutput = (
      <div key={key}>
        {currPokemon.name} - Type: {currPokemon.type} - Health:{" "}
        {currPokemon.health} --{" "}
        <button onClick={() => deletePokemon(currPokemon._id)}>Delete</button>
      </div>
    );

    pokemonComponent.push(pokemonOutput);
  }

  return (
    <>
      <div>Hello from the All Pokemon Page</div>
      {pokemonComponent}

      <div>
        <h3>New Pokemon</h3>
        <div>
          Name:
          <input value={newPokemonName} onChange={updateNewPokemonName} />
        </div>
        <div>
          Health:
          <input
            value={newPokemonHealth}
            onChange={updateNewPokemonHealth}
            type="number"
          />
        </div>
        <div>
          Type:
          <input value={newPokemonType} onChange={updateNewPokemonType} />
        </div>

        <div>
          <button onClick={createNewPokemon}>Submit</button>
        </div>
      </div>
    </>
  );
}
