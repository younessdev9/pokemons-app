type LoaderProps = {
  size?: "small" | "medium" | "large";
  color?: string;
};

const Loader = ({ size = "medium", color = "text-blue-500" }: LoaderProps) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-b-4 border-t-4 ${color} ${
          sizeClasses[size]
        } border-gray-200`}
      ></div>
    </div>
  );
};

export default Loader;
