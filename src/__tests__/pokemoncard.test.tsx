import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonCard } from "../components/pokemoncard";

describe("PokemonCard Component", () => {
  const mockOnSelect = jest.fn();
  const pokemon = {
    name: "Bulbasaur",
    image: "https://example.com/bulbasaur.png",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  };

  beforeEach(() => {
    render(
      <PokemonCard
        name={pokemon.name}
        image={pokemon.image}
        url={pokemon.url}
        onSelect={mockOnSelect}
      />,
    );
  });

  it("renders the PokemonCard with the correct name and image", () => {
    const nameElement = screen.getByText(/bulbasaur/i);
    const imageElement = screen.getByAltText(/bulbasaur/i);

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", pokemon.image);
  });

  it("calls onSelect when the card is clicked", () => {
    const cardElement = screen.getByRole("button");
    fireEvent.click(cardElement);

    expect(mockOnSelect).toHaveBeenCalledWith(pokemon.url);
  });
});
