interface Props {
  width: number;
  height?: number;
  fill: string;
}

export default function PlusIcon({ width, height = width, fill }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z"
        fill={fill}
      />
    </svg>
  );
}
