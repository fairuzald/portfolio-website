const MappingTagFrame = ({ children }: { children: string | JSX.Element }) => {
  return (
    <p className="flex items-center rounded-lg bg-primary px-3.5 py-1 text-center text-sm font-medium text-white shadow-sm  shadow-primary lg:text-lg">
      {children}
    </p>
  );
};
export default MappingTagFrame;
