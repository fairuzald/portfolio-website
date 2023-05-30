const Button = ({ children }: { children: string | JSX.Element }) => {
  return (
    <button className="flex w-fit items-center justify-center md:text-xl rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-md shadow-primary transition duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:shadow-lg lg:px-8 lg:py-4 xl:text-[22px]">
      {children}
    </button>
  );
};

export default Button;
