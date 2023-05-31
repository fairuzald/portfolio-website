import type { PortfolioProps } from "@/types/portfolio";
import type { PostProps } from "@/types/post";
import type { Dispatch, SetStateAction } from "react";
import SearchIcon from "./icons/SearchIcon";
import CrossIcon from "./icons/CrossIcon";

const SearchBar = ({
  defaultData,
  filteredData,
  setFilteredData,
  search,
  setSearch,
  placeholder,
}: {
  defaultData: PortfolioProps[];
  filteredData: PortfolioProps[];
  setFilteredData: Dispatch<SetStateAction<PortfolioProps[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) => {
  // Function to handle search mechanism
  function handleSearch(search: string) {
    setSearch(search);
    const newData = defaultData.filter((itemData: PortfolioProps) => {
      if (
        itemData.title
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        itemData.app.some((item: string) =>
          item.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredData(newData);
  }
  // Function to cancel search
  function handleCancelSearch() {
    setSearch("");
    setFilteredData(defaultData);
  }
  return (
    <div
      className="mx-auto flex w-[70vw] items-center justify-center gap-[1.5vw] rounded-[7px] bg-white py-[0.17rem] lg:w-[50vw]"
      data-aos-duration="600"
      data-aos="slide-left"
    >
      {/* Input section  */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        value={search}
        className="w-[60vw] bg-transparent text-center text-base font-semibold text-black outline-none lg:w-[40vw]"
      ></input>
      {/* Cancel or search icon */}
      <button
        onClick={() => {
          search === "" ? handleSearch(search) : handleCancelSearch();
        }}
      >
        {search === "" ? (
          <SearchIcon style={"w-[1rem] h-[1rem]"} />
        ) : (
          <CrossIcon style={"w-[1rem] h-[1rem]"} />
        )}
      </button>
    </div>
  );
};
export default SearchBar;
