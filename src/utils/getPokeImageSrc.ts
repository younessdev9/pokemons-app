export const getPokeImgSrc = (url: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split("/")[6]}.png`;
};
