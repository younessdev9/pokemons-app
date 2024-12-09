import { useEffect, useState } from "react";
import client from "../utils/api";

export interface PokemonDetailsType {
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
type usePokeDetailsParams = {
  pokemonUrl: string;
};
export default function usePokeDetails({ pokemonUrl }: usePokeDetailsParams) {
  const [details, setDetails] = useState<PokemonDetailsType | null>(null);
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

  return {
    details,
    loading,
  };
}
