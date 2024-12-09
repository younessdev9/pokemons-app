const mockClient = {
  get: jest.fn().mockResolvedValue({
    data: {
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        {
          name: "charmander",
          url: "https://pokeapi.co/api/v2/pokemon/4/",
        },
      ],
    },
  }),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

export default mockClient;
