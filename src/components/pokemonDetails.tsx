import { useEffect, useState } from "react";
import Loader from "./loader";
import client from "../utils/api";

interface PokemonDetailsProps {
  pokemonUrl: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export function PokemonDetails({ pokemonUrl }: PokemonDetailsProps) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemonUrl) {
      setLoading(true);
      client
        .get(pokemonUrl)
        .then((response) => {
          setDetails(response.data);
        })
        .catch((error) =>
          console.error("Error fetching pokemon details:", error),
        )
        .finally(() => setLoading(false));
    }
  }, [pokemonUrl]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="medium" />
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold capitalize">{details.name}</h2>
        <div className="h-48 w-full">
          <img
            src={details.sprites.other["official-artwork"].front_default}
            alt={details.name}
            className="mx-auto h-48 w-48 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-bold">Basic Info</h3>
          <p>Height: {details.height / 10}m</p>
          <p>Weight: {details.weight / 10}kg</p>
          <p>Types: {details.types.map((t) => t.type.name).join(", ")}</p>
        </div>

        <div>
          <h3 className="font-bold">Stats</h3>
          {details.stats.map((stat) => (
            <div key={stat.stat.name} className="mb-2">
              <p className="capitalize">
                {stat.stat.name}: {stat.base_stat}
              </p>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
