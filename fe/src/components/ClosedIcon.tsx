interface Props {
  width?: string;
  height?: string;
  fill?: string;
}

export default function ClosedIcon({
  width = '24px',
  height = width,
  fill = '#6E7191',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z"
        fill={fill}
      />
    </svg>
  );
}
