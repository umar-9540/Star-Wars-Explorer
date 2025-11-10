import { useState, useEffect } from "react";
import {
  X,
  User,
  Ruler,
  Weight,
  Calendar,
  Film,
  Globe,
  Zap,
  Cloud,
} from "lucide-react";
import { swapiService } from "../services/swapi";
import {
  formatDate,
  formatHeight,
  formatMass,
  formatPopulation,
} from "../utils/format";
import { getRandomImageUrl, getSpeciesColor } from "../utils/colors";
import { LoadingSpinner } from "./LoadingSpinner";

export const CharacterModal = ({ character, onClose }) => {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const colors = getSpeciesColor(character.species[0] || null);
  const imageUrl = getRandomImageUrl(character.name);

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        setLoading(true);
        const planetData = await swapiService.fetchPlanet(character.homeworld);
        setPlanet(planetData);
      } catch (error) {
        console.error("Failed to fetch planet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetData();
  }, [character.homeworld]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/80 rounded-full p-2 hover:bg-white"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div
            className={`h-96 md:h-full bg-linear-to-br ${colors.gradient} relative overflow-hidden`}
          >
            <img
              src={imageUrl}
              alt={character.name}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
              <h2 className="text-4xl font-bold text-white mb-2">
                {character.name}
              </h2>
              <p className="text-white/80 flex items-center space-x-1">
                <Zap size={16} />
                <span>Human</span>
              </p>
            </div>
          </div>

          <div className="p-8 overflow-y-auto max-h-96 md:max-h-full">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Physical Attributes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Ruler className="text-blue-500 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          HEIGHT
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatHeight(character.height)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Weight className="text-emerald-500 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          MASS
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatMass(character.mass)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-start space-x-3">
                      <User className="text-amber-500 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          BIRTH YEAR
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {character.birth_year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Career Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Film className="text-red-500 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          FILM APPEARANCES
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {character.films.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Calendar className="text-cyan-500 mt-1" size={20} />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          DATABASE ENTRY
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatDate(character.created)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-linear-to-r from-gray-50 to-white px-8 py-6">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">
              Homeworld Intelligence
            </h3>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : planet ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                  Planet
                </p>
                <p className="text-sm font-bold text-gray-900">{planet.name}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-1 mb-2">
                  <Cloud size={14} className="text-gray-400" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Climate
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  {planet.climate}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                  Terrain
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {planet.terrain}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                  Population
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {formatPopulation(planet.population)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Failed to load homeworld data
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
