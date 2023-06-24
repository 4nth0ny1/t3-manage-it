type PercentProps = {
  percentDone: string;
  [key: string]: string | number;
};

export function ProgressBar({ percentDone }: PercentProps) {
  const style = { "--value": `${percentDone}` } as React.CSSProperties;

  return (
    <div className="radial-progress" style={style}>
      {percentDone}
    </div>
  );
}
