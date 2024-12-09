import { render, screen } from "@testing-library/react";
import { PokemonDetails } from "../components/pokemonDetails";

// Mocking Loader component
jest.mock("../components/loader.tsx", () => () => (
  <div data-testid="loader">Loader</div>
));

describe("PokemonDetails Component", () => {
  const mockDetails = {
    name: "pikachu",
    height: 40,
    weight: 60,
    types: [{ type: { name: "electric" } }],
    stats: [
      { base_stat: 25.5, stat: { name: "speed" } },
      { base_stat: 38.25, stat: { name: "attack" } },
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://example.com/pikachu.png",
        },
      },
    },
  };

  test("renders the loader when loading is true", () => {
    render(<PokemonDetails loading={true} details={null} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders nothing when loading is false and details are null", () => {
    const { container } = render(
      <PokemonDetails loading={false} details={null} />,
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders the details correctly when loading is false and details are provided", () => {
    render(<PokemonDetails loading={false} details={mockDetails} />);

    // Name and Image
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "pikachu",
    );
    expect(screen.getByAltText("pikachu")).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png",
    );

    // Basic Info
    expect(screen.getByText("Height: 4m")).toBeInTheDocument();
    expect(screen.getByText("Weight: 6kg")).toBeInTheDocument();
    expect(screen.getByText("Types: electric")).toBeInTheDocument();

    // Stats
    expect(screen.getByText("speed: 25.5")).toBeInTheDocument();
    expect(screen.getByText("attack: 38.25")).toBeInTheDocument();

    // Stat Progress Bar
    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(2);

    expect(progressBars[0]).toHaveStyle("width: 10%"); // (55 / 255) * 100
    expect(progressBars[1]).toHaveStyle("width: 15%"); // (40 / 255) * 100
  });
});
