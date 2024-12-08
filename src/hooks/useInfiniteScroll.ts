import { useCallback, useEffect } from "react";
import { getMorePokemonFetch } from "../features/pokemonSlice";
import { useDispatch } from "react-redux";

type useInfiniteScrollProps = {
  loading: boolean;
  loadingMore: boolean;
};
export default function useInfiniteScroll({
  loading,
  loadingMore,
}: useInfiniteScrollProps) {
  const dispatch = useDispatch();
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      !loading &&
      !loadingMore
    ) {
      dispatch(getMorePokemonFetch());
    }
  }, [dispatch, loadingMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadingMore, handleScroll]);
}
