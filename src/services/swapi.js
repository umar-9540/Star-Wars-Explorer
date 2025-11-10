const BASE_URL = "https://swapi.dev/api";

export const swapiService = {
  async fetchCharacters(page = 1) {
    const response = await fetch(`${BASE_URL}/people/?page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch characters");
    return response.json();
  },

  async searchCharacters(query) {
    const response = await fetch(
      `${BASE_URL}/people/?search=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to search characters");
    return response.json();
  },

  async fetchPlanet(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch planet");
    return response.json();
  },

  async fetchSpecies(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch species");
    return response.json();
  },

  async fetchAllPlanets() {
    const planets = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`${BASE_URL}/planets/?page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch planets");
      const data = await response.json();
      planets.push(...data.results);
      hasMore = data.next !== null;
      page++;
    }

    return planets;
  },

  async fetchAllFilms() {
    const response = await fetch(`${BASE_URL}/films/`);
    if (!response.ok) throw new Error("Failed to fetch films");
    const data = await response.json();
    return data.results;
  },

  async fetchAllSpecies() {
    const speciesData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`${BASE_URL}/species/?page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch species");
      const data = await response.json();
      speciesData.push(...data.results);
      hasMore = data.next !== null;
      page++;
    }

    return speciesData;
  },
};
