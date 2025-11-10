import { useState } from "react";
import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { SearchFilters } from "./components/SearchFilters";
import { CharacterCard } from "./components/CharacterCard";
import { CharacterModal } from "./components/CharacterModal";
import { Pagination } from "./components/Pagination";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { useCharacters } from "./hooks/useCharacters";
import "./App.css";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const {
    characters,
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
  } = useCharacters();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10">
        <Header
          onLoginClick={() => setShowLoginModal(true)}
          success={isLoggedIn}
          onLogout={() => setIsLoggedIn(false)}
        />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedHomeworld={selectedHomeworld}
              onHomeworldChange={setSelectedHomeworld}
              selectedFilm={selectedFilm}
              onFilmChange={setSelectedFilm}
              selectedSpecies={selectedSpecies}
              onSpeciesChange={setSelectedSpecies}
              planets={planets}
              films={films}
              species={species}
              loading={loading}
            />
          </div>

          {error ? (
            <ErrorMessage message={error} onRetry={retry} />
          ) : loading ? (
            <LoadingSpinner />
          ) : characters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No characters found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.url}
                    character={character}
                    onClick={() => setSelectedCharacter(character)}
                  />
                ))}
              </div>

              {!searchQuery && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                />
              )}
            </>
          )}
        </main>

        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}

        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
