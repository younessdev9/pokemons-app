import "@testing-library/jest-dom";
import "jest-environment-jsdom";

declare global {
  interface ImportMetaEnv {
    VITE_BASE_URL: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).importMeta = {
  env: {
    VITE_BASE_URL: "https://pokeapi.co/api/v2",
  },
};
