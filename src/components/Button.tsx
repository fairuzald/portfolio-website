const bgColorDefault = {
  solid:
    "bg-primary text-white shadow-md shadow-primary hover:opacity-80 hover:shadow-lg",
  gradient:
    "bg-gradient-to-br from-primary to-primary text-white shadow-md shadow-primary hover:from-[#11e0a5] hover:to-[#5430e2] hover:opacity-80 hover:shadow-xl",
};

const Button = ({
  color,
  children,
}: {
  color: "gradient" | "solid";
  children: string | JSX.Element;
}) => {
  return (
    <button
      className={`flex w-fit items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition duration-300 ease-in-out hover:scale-110 md:text-xl lg:px-8 lg:py-4 xl:text-[22px] ${bgColorDefault[color]}`}
    >
      {children}
    </button>
  );
};

export default Button;
