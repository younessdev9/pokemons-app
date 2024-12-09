interface PokemonCardProps {
  name: string;
  image: string;
  url: string;
  onSelect: (url: string) => void;
}

export function PokemonCard({ name, image, url, onSelect }: PokemonCardProps) {
  return (
    <div
      className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
      onClick={() => onSelect(url)}
    >
      <img
        src={image}
        alt={name}
        className="mx-auto h-36 w-36 object-contain"
      />
      <h2 className="mt-2 text-center text-xl capitalize">{name}</h2>
    </div>
  );
}
