type PercentProps = {
  percentDone: number;
};

export function ProgressBar({ percentDone }: PercentProps) {
  const style = { "--value": `${percentDone}` } as React.CSSProperties;

  return (
    <div className="radial-progress" style={style}>
      {percentDone}%
    </div>
  );
}
