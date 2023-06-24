type PercentProps = {
  percentDone: number;
};

export function ProgressBar({ percentDone }: PercentProps) {
  const style = {
    "--value": `${percentDone}`,
    "--size": "7rem",
  } as React.CSSProperties;

  return (
    <div className="radial-progress" style={style}>
      {percentDone}%
    </div>
  );
}
