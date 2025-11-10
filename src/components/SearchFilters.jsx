import { Search, Filter } from "lucide-react";

export const SearchFilters = ({
  searchQuery,
  onSearchChange,
  selectedHomeworld,
  onHomeworldChange,
  selectedFilm,
  onFilmChange,
  selectedSpecies,
  onSpeciesChange,
  planets,
  films,
  species,
  loading,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 space-y-4 border border-white/20">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="text-cyan-400" size={24} />
        <h2 className="text-xl font-bold text-white">Search & Filters</h2>
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by character name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Homeworld
          </label>
          <select
            value={selectedHomeworld}
            onChange={(e) => onHomeworldChange(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" className="bg-slate-800">
              All Homeworlds
            </option>
            {planets.map((planet) => (
              <option
                key={planet.name}
                value={planet.name}
                className="bg-slate-800"
              >
                {planet.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Film
          </label>
          <select
            value={selectedFilm}
            onChange={(e) => onFilmChange(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" className="bg-slate-800">
              All Films
            </option>
            {films.map((film) => (
              <option key={film.url} value={film.url} className="bg-slate-800">
                {film.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Species
          </label>
          <select
            value={selectedSpecies}
            onChange={(e) => onSpeciesChange(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" className="bg-slate-800">
              All Species
            </option>
            {species.map((spec) => (
              <option key={spec.url} value={spec.url} className="bg-slate-800">
                {spec.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
