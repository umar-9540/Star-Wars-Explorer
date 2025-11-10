import { useState, useEffect, useCallback } from "react";
import { swapiService } from "../services/swapi";

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHomeworld, setSelectedHomeworld] = useState("");
  const [selectedFilm, setSelectedFilm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  const [planetsMap, setPlanetsMap] = useState(new Map());

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [planetsData, filmsData, speciesData] = await Promise.all([
          swapiService.fetchAllPlanets(),
          swapiService.fetchAllFilms(),
          swapiService.fetchAllSpecies(),
        ]);

        setPlanets(planetsData);
        setFilms(filmsData);
        setSpecies(speciesData);

        const planetUrlMap = new Map();
        planetsData.forEach((planet, index) => {
          planetUrlMap.set(
            `https://swapi.dev/api/planets/${index + 1}/`,
            planet.name
          );
        });
        setPlanetsMap(planetUrlMap);
      } catch (err) {
        console.error("Failed to fetch metadata:", err);
      }
    };

    fetchMetadata();
  }, []);

  const fetchCharacters = useCallback(async (page) => {
    setLoading(true);
    setError(null);

    try {
      const data = await swapiService.fetchCharacters(page);
      setCharacters(data.results);
      setTotalCount(data.count);
      setHasNext(data.next !== null);
      setHasPrevious(data.previous !== null);
    } catch (err) {
      setError("Failed to fetch characters. Please try again.");
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      fetchCharacters(currentPage);
    }
  }, [currentPage, searchQuery, fetchCharacters]);

  useEffect(() => {
    const searchCharacters = async () => {
      if (searchQuery) {
        setLoading(true);
        setError(null);

        try {
          const data = await swapiService.searchCharacters(searchQuery);
          setCharacters(data.results);
          setTotalCount(data.count);
          setHasNext(false);
          setHasPrevious(false);
        } catch (err) {
          setError("Failed to search characters. Please try again.");
          console.error("Error searching characters:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    const debounce = setTimeout(() => {
      searchCharacters();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    let filtered = [...characters];

    if (selectedHomeworld) {
      filtered = filtered.filter((char) => {
        const planetName = planetsMap.get(char.homeworld);
        return planetName === selectedHomeworld;
      });
    }

    if (selectedFilm) {
      filtered = filtered.filter((char) => char.films.includes(selectedFilm));
    }

    if (selectedSpecies) {
      filtered = filtered.filter((char) =>
        char.species.includes(selectedSpecies)
      );
    }

    setFilteredCharacters(filtered);
  }, [
    characters,
    selectedHomeworld,
    selectedFilm,
    selectedSpecies,
    planetsMap,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retry = () => {
    fetchCharacters(currentPage);
  };

  const totalPages = Math.ceil(totalCount / 10);

  return {
    characters: filteredCharacters,
    loading,
    error,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    handlePageChange,
    retry,
    searchQuery,
    setSearchQuery,
    selectedHomeworld,
    setSelectedHomeworld,
    selectedFilm,
    setSelectedFilm,
    selectedSpecies,
    setSelectedSpecies,
    planets,
    films,
    species,
  };
};
