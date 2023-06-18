type ProjectProps = {
  name: string;
  description: string;
};

export function Hero({ name, description }: ProjectProps) {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="py-6">{description}</p>
        </div>
      </div>
    </div>
  );
}
