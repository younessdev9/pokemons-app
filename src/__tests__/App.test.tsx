import App from "../App";
import "@testing-library/jest-dom";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStore } from "redux-mock-store";

const mockStore = configureStore([]);

describe("App Component", () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      pokemon: {
        pokemonList: [],
        loading: false,
        loadingMore: false,
        error: null,
        offset: 0,
      },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText("Pokemon Cards")).toBeInTheDocument();
  });
});
