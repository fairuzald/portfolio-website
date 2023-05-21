import type { IconStyleProps } from "@/types/icon";

const ChevronIcon: React.FC<IconStyleProps> = ({ style }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 9.70492L16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492Z" />
    </svg>
  );
};
ChevronIcon.defaultProps = {
  style: "fill-white",
};
export default ChevronIcon;
