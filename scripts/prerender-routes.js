( async () => {
    const fs = require('fs');

    const TOTAL_PAGES = 8; // 20 pokemons per page
    const TOTAL_POKEMONS = 151;

    let fileContent = '';

    // write list pages
    for(let i = 0; i < TOTAL_PAGES; i++) {
        fileContent += `/pokemons/page/${ i + 1 }\n`;
    }

    // write pokemons pages by number
    for(let i = 0; i < TOTAL_POKEMONS; i++) {
        fileContent += `/pokemons/${ i + 1 }\n`;
    }

    // write pokemons pages by name
    const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }`).then(response => response.json());

    if(pokemons.results && pokemons.results.length > 0) {
        for(let pokemon of pokemons.results) {
            fileContent += `/pokemons/${ pokemon.name }\n`;
        }
    }

    fs.writeFileSync('routes.txt', fileContent);

    console.log('routes.txt generated');
})();