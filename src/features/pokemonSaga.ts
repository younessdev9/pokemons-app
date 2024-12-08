import { takeEvery, put, call, Effect } from "redux-saga/effects";
import client from "../utils/api";
import { getPokemonFailure, getPokemonSuccess, Pokemon } from "./pokemonSlice";

export function* pokemonSaga() {
  yield takeEvery("pokemon/getPokemonFetch", fetchPokemonSaga);
}

function* fetchPokemonSaga(): Generator<
  Effect,
  void,
  { data: { results: Pokemon[] } }
> {
  try {
    const response = yield call(client.get, "/pokemon?limit=10&offset=0");
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
