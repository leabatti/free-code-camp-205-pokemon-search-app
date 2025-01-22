const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonTypes = document.getElementById("types");
const spriteContainer = document.getElementById("sprite-container");

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json();
    setPokemonInfo(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

const setPokemonInfo = data => {
  const { name, id, weight, height, types, stats, sprites } = data;

  pokemonName.textContent = `${name.toUpperCase()}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;

  hp.textContent = `${stats[0].base_stat}`;
  attack.textContent = `${stats[1].base_stat}`;
  defense.textContent = `${stats[2].base_stat}`;
  specialAttack.textContent = `${stats[3].base_stat}`;
  specialDefense.textContent = `${stats[4].base_stat}`;
  speed.textContent = `${stats[5].base_stat}`;

  pokemonTypes.innerHTML = types.map(obj => `
    <span>${(obj.type.name).toUpperCase()}</span>
  `).join(" ");

  spriteContainer.innerHTML = `<img src="${sprites.front_default}" id="sprite">`;
};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  getPokemon();
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    searchButton.click();
  };
});