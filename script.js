const api = 'https://www.freetogame.com/api/games';
const search = document.getElementById("search");
const movieContainer = document.getElementById("movie-container");
const form = document.getElementById("form");

let allGames = [];

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    allGames = data;
    return allGames;
}

function renderGames(games) {
    movieContainer.innerHTML = games.map((game) =>
        `<div class="game-card">
            <img src="${game.thumbnail}">
            <h3>${game.title}</h3>
            <p>${game.genre}</p>
            <p>${game.platform}</p>
        </div>`
    ).join("");
}

async function displayGames(url) {
    await getData(url);
    const firstBatch = allGames.slice(0, 100);
    renderGames(firstBatch);
}

displayGames(api);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = search.value;
    const filtered = allGames.filter(game =>
        game.title.toLowerCase().includes(query.toLowerCase())
    );
    renderGames(filtered);
});

/* How each game looks:
[
  {
    id: 540,
    title: 'Overwatch',
    thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg',
    short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment.',
    game_url: 'https://www.freetogame.com/open/overwatch',
    genre: 'Shooter',
    platform: 'PC (Windows)',
    publisher: 'Activision Blizzard',
    developer: 'Blizzard Entertainment',
    release_date: '2022-10-04',
    freetogame_profile_url: 'https://www.freetogame.com/overwatch'
  },
*/