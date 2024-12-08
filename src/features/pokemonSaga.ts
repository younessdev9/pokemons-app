import { takeEvery, put, call, Effect, select } from "redux-saga/effects";
import client from "../utils/api";
import {
  getPokemonFailure,
  getPokemonSuccess,
  getMorePokemonSuccess,
  Pokemon,
  PokemonState,
} from "./pokemonSlice";
import { RootState } from "../store/rootReducer";

export function* pokemonSaga() {
  yield takeEvery("pokemon/getPokemonFetch", fetchPokemonSaga);
  yield takeEvery("pokemon/getMorePokemonFetch", fetchMorePokemonSaga);
}

function* fetchPokemonSaga(): Generator<
  Effect,
  void,
  { data: { results: Pokemon[] } }
> {
  try {
    const response = yield call(client.get, "/pokemon?limit=11&offset=0");
    console.log(response);
    yield put(getPokemonSuccess(response.data.results));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getPokemonFailure(error.message));
    } else {
      yield put(getPokemonFailure("An unknown error occurred"));
    }
  }
}

function* fetchMorePokemonSaga(): Generator<
  Effect,
  void,
  { pokemon: PokemonState; data: { results: Pokemon[] } }
> {
  try {
    const state: RootState = yield select((state) => state);
    const offset = state.pokemon.offset;
    const response = yield call(
      client.get,
      `/pokemon?limit=10&offset=${offset}`,
    );
    yield put(getMorePokemonSuccess(response.data.results));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getPokemonFailure(error.message));
    } else {
      yield put(getPokemonFailure("An unknown error occurred"));
    }
  }
}
