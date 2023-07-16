type PercentProps = {
  percentDone: number;
  height?: string;
};

export function ProgressBarLine({ percentDone, height }: PercentProps) {
  return (
    <progress
      className={`progress-accent progress ${
        height ? height : "h-[30px]"
      } w-full border`}
      value={percentDone}
      max="100"
    ></progress>
  );
}
