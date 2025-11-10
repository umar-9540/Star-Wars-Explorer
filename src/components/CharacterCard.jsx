import { getSpeciesColor, getRandomImageUrl } from "../utils/colors";
import { Film } from "lucide-react";

export const CharacterCard = ({ character, onClick }) => {
  const colors = getSpeciesColor(character.species[0] || null);
  const imageUrl = getRandomImageUrl(character.name);

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <div
        className={`h-56 bg-linear-to-br ${colors.gradient} relative overflow-hidden`}
      >
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className={`p-5 relative bg-linear-to-br ${colors.gradient}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {character.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm ">
            <Film size={16} className="mr-2" />
            <span>
              {" "}
              Appeared in {character.films.length} film
              {character.films.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div
          className={`bg-white rounded-lg p-2 text-center text-sm font-medium ${colors.text}`}
        >
          Click to explore
        </div>
      </div>

      <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
