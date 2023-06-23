type ProjectProps = {
  name: string | undefined | null;
  description: string | undefined | null;
};

export function Hero({ name, description }: ProjectProps) {
  return (
    <div className="hero border-b bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="py-6">{description}</p>
        </div>
      </div>
    </div>
  );
}
