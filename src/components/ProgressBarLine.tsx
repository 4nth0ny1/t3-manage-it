type PercentProps = {
  percentDone: number;
};

export function ProgressBarLine({ percentDone }: PercentProps) {
  return (
    <progress
      className="progress-info progress h-[30px] w-full border"
      value={percentDone}
      max="100"
    ></progress>
  );
}
