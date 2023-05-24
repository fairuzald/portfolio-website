import Link from "next/link";
import type { ReactElement } from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="m-auto flex h-[100vh] w-full flex-col items-center justify-center gap-4 overflow-hidden">
        <p className="text-2xl font-bold text-primary lg:text-4xl">
          Page Not Found
        </p>
        <p className="mb-6 text-lg lg:text-xl">
          The page you&apos;re looking for doesn&apos;t exist
        </p>
        <button className="rounded-[13px] bg-primary px-4 py-2 text-lg font-semibold duration-300 ease-in-out hover:scale-110 hover:opacity-80 lg:text-xl">
          <Link href="/">Home</Link>
        </button>
      </div>
    </>
  );
};

PageNotFound.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
export default PageNotFound;
