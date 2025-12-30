import React, { useEffect, useState } from "react";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // ✅ store clicked Pokémon
  const [modalOpen, setModalOpen] = useState(false); // ✅ modal state

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );
        const data = await response.json();

        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((res) => res.json()))
        );

        const formatted = details.map((p) => ({
          name: p.name,
          image:
            p.sprites.other.dream_world.front_default ||
            p.sprites.front_default,
          height: p.height,
          weight: p.weight,
          types: p.types.map((t) => t.type.name),
        }));

        setPokemonList(formatted);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-gray-700">Loading Pokémon...</h2>
      </div>
    );


  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Pokémon Pokédex
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {pokemonList.map((p) => (
          <div
            key={p.name}
            onClick={() => handlePokemonClick(p)}
            className="bg-white rounded-2xl p-5 flex flex-col items-center shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
          >
            <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-100 rounded-full shadow-inner">
              <img
                src={p.image}
                alt={p.name}
                className="w-28 h-28 object-contain"
              />
            </div>
            <h3 className="capitalize text-xl font-bold text-gray-800 mb-2">
              {p.name}
            </h3>
            <div className="flex space-x-2">
              {p.types.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="w-40 h-40 object-contain mx-auto mb-4"
            />
            <h2 className="capitalize text-2xl font-bold text-center mb-2">
              {selectedPokemon.name}
            </h2>
            <p className="text-gray-700 text-center mb-1">
              <strong>Height:</strong> {selectedPokemon.height}
            </p>
            <p className="text-gray-700 text-center mb-2">
              <strong>Weight:</strong> {selectedPokemon.weight}
            </p>
            <div className="flex justify-center space-x-2">
              {selectedPokemon.types.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;