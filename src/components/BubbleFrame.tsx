const BubbleFrame = ({ children }: { children: JSX.Element | string }) => {
  return (
    <span className="flex h-[60px] lg:w-[90px] w-[60px] lg:h-[90px] items-center justify-center rounded-full bg-gradient-to-br from-[#11e0a5] to-[#5430e2] text-xl lg:text-[27px] font-semibold lg:mx-10">
      {children}
    </span>
  );
};
export default BubbleFrame;
