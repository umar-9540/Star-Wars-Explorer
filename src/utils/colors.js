export const getSpeciesColor = (speciesUrl) => {
  if (!speciesUrl) {
    return {
      gradient: "from-slate-300 to-slate-100",
      accent: "bg-slate-200",
      text: "text-slate-900",
    };
  }

  const speciesId = speciesUrl.split("/").filter(Boolean).pop();

  const colorMap = {
    1: {
      gradient: "from-sky-300 via-blue-200 to-cyan-200",
      accent: "bg-sky-100",
      text: "text-sky-900",
    },
    2: {
      gradient: "from-orange-300 via-amber-200 to-yellow-200",
      accent: "bg-orange-100",
      text: "text-orange-900",
    },
    3: {
      gradient: "from-yellow-300 via-amber-200 to-lime-200",
      accent: "bg-yellow-100",
      text: "text-yellow-900",
    },
    4: {
      gradient: "from-emerald-300 via-green-200 to-teal-200",
      accent: "bg-emerald-100",
      text: "text-emerald-900",
    },
    5: {
      gradient: "from-rose-300 via-pink-200 to-red-200",
      accent: "bg-rose-100",
      text: "text-rose-900",
    },
    6: {
      gradient: "from-teal-300 via-cyan-200 to-sky-200",
      accent: "bg-teal-100",
      text: "text-teal-900",
    },
    7: {
      gradient: "from-pink-300 via-rose-200 to-fuchsia-200",
      accent: "bg-pink-100",
      text: "text-pink-900",
    },
    8: {
      gradient: "from-cyan-300 via-sky-200 to-indigo-200",
      accent: "bg-cyan-100",
      text: "text-cyan-900",
    },
    9: {
      gradient: "from-lime-300 via-green-200 to-emerald-200",
      accent: "bg-lime-100",
      text: "text-lime-900",
    },
    10: {
      gradient: "from-amber-300 via-yellow-200 to-orange-200",
      accent: "bg-amber-100",
      text: "text-amber-900",
    },
    11: {
      gradient: "from-violet-300 via-purple-200 to-fuchsia-200",
      accent: "bg-violet-100",
      text: "text-violet-900",
    },
    12: {
      gradient: "from-indigo-300 via-purple-200 to-pink-200",
      accent: "bg-indigo-100",
      text: "text-indigo-900",
    },
    13: {
      gradient: "from-orange-300 via-amber-200 to-yellow-200",
      accent: "bg-orange-100",
      text: "text-orange-900",
    },
    14: {
      gradient: "from-rose-300 via-pink-200 to-fuchsia-200",
      accent: "bg-rose-100",
      text: "text-rose-900",
    },
  };

  return (
    colorMap[speciesId || ""] || {
      gradient: "from-slate-300 to-slate-100",
      accent: "bg-slate-200",
      text: "text-slate-900",
    }
  );
};

export const getRandomImageUrl = (seed) => {
  const hash = seed.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const imageId = Math.abs(hash % 1000);
  return `https://picsum.photos/seed/${imageId}/400/300`;
};
