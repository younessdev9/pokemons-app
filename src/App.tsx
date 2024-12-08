import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonFetch } from "./features/pokemonSlice";
import type { RootState } from "./store/rootReducer";

function App() {
  const dispatch = useDispatch();

  const result = useSelector((state: RootState) => state.pokemon);
  useEffect(() => {
    dispatch(getPokemonFetch());
  }, [dispatch]);
  if (result.loading) return <div>loading...</div>;
  return <div className="h-32 p-2 pl-4 text-green-300">Hello world!</div>;
}

export default App;
