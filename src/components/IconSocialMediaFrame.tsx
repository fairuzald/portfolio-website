const IconSocialMediaFrame = ({
  children,
}: {
  children: string | JSX.Element;
}) => {
  return (
    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 duration-300 ease-in-out hover:scale-[1.2] hover:border-teal-500 hover:bg-teal-500 hover:text-white">
      {children}
    </div>
  );
}
export default IconSocialMediaFrame;
