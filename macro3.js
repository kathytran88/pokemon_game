// Store variables
const grass1 = document.getElementById('grass1');
const grass2 = document.getElementById('grass2');
const grass3 = document.getElementById('grass3');

const progress = document.querySelector('#progress');
const pokeball_track = document.querySelector('#pokeball_track');
const pokemon_track = document.querySelector('#pokemon_track');
const play_again = document.querySelector('#play_again');

const result = document.querySelector('#result');

let pokeball_num = 5;
let pokemon_num = 0;

// Create arrays -> choices: [2 pokeballs, pokemon, nothing] and for pokemons

const choices = ['You found two Pokeballs', 'pokemon', 'Nothing here!'];
const pokemons = [
    {name:'Pikachu', image:'images/pikachu.png'}, 
    {name:'Bulbasaur', image:'images/bulbasaur.png'},
    {name:'Charmander', image:'images/charmander.png'},
    {name:'Eevee', image:'images/eevee.png'},
    {name:'Squirtle', image:'images/squirtle.png'}
];

// Create events the grass get clicked

grass1.addEventListener('click', game1);
grass2.addEventListener('click', game2);
grass3.addEventListener('click', game3);

// Each function for each event grass get clicked

function game1() {
    if (play_again.style.display == 'block') {
        return;
    } 

    var obj = grass1;
    game(obj);
    }

function game2() {
    if (play_again.style.display == 'block') {
        return;
    } 

    var obj = grass2;
    game(obj);
    }

function game3() {
    if (play_again.style.display == 'block') {
        return;
    } 

    var obj = grass3;
    game(obj);
}

// Main function game
function game(obj){
    let num = parseInt(Math.random() * choices.length);

    // if random == 0 -> pokeball_track += 2 & progress: you win 2 pokeballs & change image 
    if (num == 0) {
        progress.innerHTML = choices[num];
        pokeball_num += 2;
        obj.src = 'images/pokeballs.png';
    }

    // if random == 1 -> access the object for pokemons: [5 pokemons: image path] & progress: you win a pokemon & change image
    else if (num == 1) {
        pokeball_num -= 1;
        pokemon_num += 1;

        // Choose a random pokemon
        let num2 = parseInt(Math.random() * pokemons.length);
        let chosen_pokemon_name = pokemons[num2]['name'];
        let chosen_pokemon_path = pokemons[num2]['image'];

        progress.innerHTML = '<h3>You caught a(n) ' + chosen_pokemon_name + '!</h3>';
        obj.src = chosen_pokemon_path;
    }

    // if random == 2 -> progress: you win nothing & pokeball -= 1 & obj disappears
    else if (num == 2) {
        progress.innerHTML = choices[num];
        pokeball_num -= 1;
        obj.style.opacity = 0;
    }

    // Report number of pokeballs and pokemons
    pokeball_track.innerHTML = '<p>Pokeballs left: ' + pokeball_num + '<p>';
    pokemon_track.innerHTML = '<p>Pokemon caught: ' + pokemon_num + '</p>';

    // if pokeball_track = 0: stop game
    if (pokeball_num == 0) {
        result.innerHTML = '<h1>Game Over!</h1>';
        play_again.style.display = 'none';
        disableGrass();
    }
    // Else: if still have chances -> Show play again button
    else {
        play_again.style.display = 'block';
    }
}


// When Play Again button is clicked, reset the game, grass back to normal
play_again.onclick = function() {
    grass1.style.opacity = 1;
    grass2.style.opacity = 1;
    grass3.style.opacity = 1;

    grass1.src = 'images/grass.png';
    grass2.src = 'images/grass.png';
    grass3.src = 'images/grass.png';

    play_again.style.display = 'none';
}

// Function to prevent users from playing when they run out of pokeballs
function disableGrass() {
    grass1.style.pointerEvents = 'none';
    grass2.style.pointerEvents = 'none';
    grass3.style.pointerEvents = 'none';
}

// Feature 1 //
// Store result history
const result_history = document.getElementById('result_history');
const clear_history = document.getElementById('clear_history');
const start_over = document.getElementById('start_over');

let results = []; // Array to store history

// Update the result history list
function updateHistory(message) {
    results.unshift(message); // Add the new result to the beginning of the array

    // Clear and repopulate the result history display
    result_history.innerHTML = '';
    results.forEach((result) => {
        let li = document.createElement('li');
        li.textContent = result;
        result_history.appendChild(li);
    });
}

// Clear history function
clear_history.onclick = function() {
    results = []; 
    result_history.innerHTML = ''; // Clear history
};

// Reset game state when Start Over is clicked
start_over.onclick = function() {
    pokeball_num = 5;  // Reset Pokeballs to initial value
    pokemon_num = 0;   // Reset caught Pokemon count to 0
    results = [];      // Clear the result history

    // Reset display
    pokeball_track.innerHTML = 'Pokeballs left: ' + pokeball_num;
    pokemon_track.innerHTML = 'Pokemon caught: ' + pokemon_num;
    result_history.innerHTML = ''; // Clear the history display
    progress.innerHTML = '';  // Clear any previous progress messages
    result.innerHTML = '';    // Clear the Game Over message

    // Reset grass visibility
    grass1.style.opacity = 1;
    grass2.style.opacity = 1;
    grass3.style.opacity = 1;

    grass1.src = 'images/grass.png';
    grass2.src = 'images/grass.png';
    grass3.src = 'images/grass.png';

    // Enable clicking again
    grass1.style.pointerEvents = 'auto';
    grass2.style.pointerEvents = 'auto';
    grass3.style.pointerEvents = 'auto';
};

// Update the game function to add results to the history
function game(obj) {
    if (pokeball_num <= 0) {
        return; // Prevent further clicks when Pokeballs are 0
    }

    let num = parseInt(Math.random() * choices.length);
    let resultMessage;

    // if random == 0 -> found 2 Pokeballs
    if (num == 0) {
        progress.innerHTML = choices[num];
        pokeball_num += 2;
        obj.src = 'images/pokeballs.png';
        resultMessage = 'Pokeballs found!';
    }

    // if random == 1 -> caught a Pokemon
    else if (num == 1) {
        pokeball_num -= 1;
        pokemon_num += 1;
        let num2 = parseInt(Math.random() * pokemons.length);
        let chosen_pokemon_name = pokemons[num2]['name'];
        let chosen_pokemon_path = pokemons[num2]['image'];
        progress.innerHTML = `<h2>You caught a(n) ${chosen_pokemon_name}!</h2>`; 
        obj.src = chosen_pokemon_path;
        resultMessage = `${chosen_pokemon_name} found!`;
    }

    // if random == 2 -> found nothing
    else if (num == 2) {
        progress.innerHTML = choices[num];
        pokeball_num -= 1;
        obj.style.opacity = 0;
        resultMessage = 'Nothing found!';
    }

    // Add result to history
    updateHistory(resultMessage);

    // Update the Pokeballs and Pokemon counters
    pokeball_track.innerHTML = `Pokeballs left: ${pokeball_num}`;
    pokemon_track.innerHTML = `Pokemon caught: ${pokemon_num}`;

    // Check for Game Over
    if (pokeball_num <= 0) {
        result.innerHTML = '<h1>Game Over!</h1>';
        play_again.style.display = 'none'; // Hide the Play Again button
        disableGrass(); // Disable grass clicks after game over
    } else {
        play_again.style.display = 'block'; // Show Play Again button if not game over
    }
}

// Feature 2 //
// Track how many of each Pokemon have been caught
let pokedex = {
    'Pikachu': 0,
    'Bulbasaur': 0,
    'Charmander': 0,
    'Eevee': 0,
    'Squirtle': 0
};

// Function to update the Pokedex whenever a Pokémon is caught
function updatePokedex(pokemon) {
    // Increment the count for the caught Pokémon
    pokedex[pokemon]++;
    
    // Update the Pokedex table
    let pokedexTable = document.querySelector('#pokedex_table tbody');
    pokedexTable.innerHTML = ''; // Clear the table content

    // Loop through each Pokemon in the Pokedex
    for (let poke in pokedex) {
        // Create a new row for each Pokémon
        let row = document.createElement('tr');

        // Create cells for the Pokemon name, count, and histogram
        let nameCell = document.createElement('td');
        nameCell.textContent = poke;
        
        let countCell = document.createElement('td');
        countCell.textContent = pokedex[poke];

        // Create a div inside a table cell to represent the histogram
        let histogramCell = document.createElement('td');
        let bar = document.createElement('div');
        bar.style.width = pokedex[poke] * 20 + 'px';  // Set the width based on count
        bar.style.height = '20px';  // Set height for all bars
        bar.style.backgroundColor = getColorForPokemon(poke); // Assign a color based on the Pokémon
        bar.innerHTML = '&nbsp;';  // Add a non-breaking space inside the bar for visibility

        histogramCell.appendChild(bar);

        // Append the cells to the row
        row.appendChild(nameCell);
        row.appendChild(countCell);
        row.appendChild(histogramCell);

        // Append the row to the table
        pokedexTable.appendChild(row);
    }

    // Check if the player has caught at least one of each type
    checkSpecialMessage();
}

// Function to get a color for each Pokemon type
function getColorForPokemon(pokemon) {
    let colors = {
        'Pikachu': 'yellow',
        'Bulbasaur': 'green',
        'Charmander': 'red',
        'Eevee': 'brown',
        'Squirtle': 'blue'
    };
    return colors[pokemon];
}

// Check if the player has caught at least one of each Pokemon
function checkSpecialMessage() {
    let caughtAll = true;

    // Check if each Pokémon has been caught at least once
    for (let poke in pokedex) {
        if (pokedex[poke] === 0) {
            caughtAll = false;
            break;
        }
    }

    // Display a special message if all Pokémon have been caught
    let specialMessage = document.getElementById('special_message');
    if (caughtAll) {
        specialMessage.textContent = 'Congratulations! You caught at least one of each Pokémon!';
    } else {
        specialMessage.textContent = '';
    }
}

// Update the game function to include Pokedex updates
function game(obj) {
    if (pokeball_num <= 0) {
        return; // Prevent further clicks when Pokeballs are 0
    }

    let num = parseInt(Math.random() * choices.length);
    let resultMessage;

    if (num == 0) {
        progress.innerHTML = choices[num];
        pokeball_num += 2;
        obj.src = 'images/pokeballs.png';
        resultMessage = 'Pokeballs found!';
    } else if (num == 1) {
        pokeball_num -= 1;
        pokemon_num += 1;

        let num2 = parseInt(Math.random() * pokemons.length);
        let chosen_pokemon_name = pokemons[num2]['name'];
        let chosen_pokemon_path = pokemons[num2]['image'];

        progress.innerHTML = `<h3>You caught a(n) ${chosen_pokemon_name}!</h3>`;
        obj.src = chosen_pokemon_path;

        resultMessage = `${chosen_pokemon_name} found!`;

        // Update the Pokedex when a Pokémon is caught
        updatePokedex(chosen_pokemon_name);
    } else if (num == 2) {
        progress.innerHTML = choices[num];
        pokeball_num -= 1;
        obj.style.opacity = 0;
        resultMessage = 'Nothing found!';
    }

    // Update the result history
    updateHistory(resultMessage);

    // Update the Pokeballs and Pokemon counters
    pokeball_track.innerHTML = `Pokeballs left: ${pokeball_num}`;
    pokemon_track.innerHTML = `Pokemon caught: ${pokemon_num}`;

    // Check for Game Over
    if (pokeball_num <= 0) {
        result.innerHTML = '<h1>Game Over!</h1>';
        play_again.style.display = 'none'; // Hide the Play Again button
        disableGrass(); // Disable grass clicks after game over
    } else {
        play_again.style.display = 'block'; // Show Play Again button if not game over
    }
}


