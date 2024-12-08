interface PokemonCardProps {
  name: string;
  image: string;
}

export function PokemonCard({ name, image }: PokemonCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-48 w-full">
        <img src={image} alt={name} className="p-4" />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold capitalize">{name}</h2>
      </div>
    </div>
  );
}
