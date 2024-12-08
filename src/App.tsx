import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonFetch } from "./features/pokemonSlice";
import type { RootState } from "./store/rootReducer";
import { PokemonCard } from "./components/pokemoncard";
import { getPokeImgSrc } from "./utils/getPokeImageSrc";
import Loader from "./components/Loader";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
export default function App() {
  const dispatch = useDispatch();
  const { loading, loadingMore, pokemonList } = useSelector(
    (state: RootState) => state.pokemon,
  );
  useInfiniteScroll({ loading, loadingMore });

  useEffect(() => {
    dispatch(getPokemonFetch());
  }, [dispatch]);

  if (loading)
    return (
      <div className="my-auto">
        <Loader size="large" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Pokemon Cards</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {pokemonList?.map((p, indx) => (
          <PokemonCard key={indx} name={p.name} image={getPokeImgSrc(p.url)} />
        ))}
      </div>
      {loadingMore && (
        <div className="mt-8 flex justify-center">
          <Loader size="medium" />
        </div>
      )}
    </div>
  );
}
