(async () => {
    const root = document.getElementById('app');

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    const response = await fetch(url);
    const data = await response.json();

    const container = document.createElement('ul');
    container.classList.add('pokemon-list');
    root.appendChild(container);

    for (const pokemon of data.results) {
        const link = getPokemonLink(pokemon);
        const item = document.createElement('li');
        item.classList.add('pokemon-list__item');

        const info = document.createElement('div');
        info.classList.add('pokemon-list__info');

        item.appendChild(link);
        item.appendChild(info);

        container.appendChild(item);
    }

    document.addEventListener('click', async e => {
        const target = e.target.closest('.pokemon');
        if (!target) {
            return;
        }
        e.preventDefault();
        const name = target.textContent;
        const pokemonInfo = await getPokemonInfo(name);
        const item = target.closest('.pokemon-list__item');
        const info = item.querySelector('.pokemon-list__info');

        if (info.classList.contains('pokemon-list__info_with-data')) {
            return;
        }

        const src = pokemonInfo.sprites.front_default;
        const img = document.createElement('img');
        img.src = src;

        info.appendChild(img);
        info.classList.add('pokemon-list__info_with-data');

    });

    async function getPokemonInfo(name) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + name;
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    function getPokemonLink(data) {
        const link = document.createElement('a');
        link.href = data.url;
        link.textContent = data.name;
        link.classList.add('pokemon');

        return link;
    }
})();