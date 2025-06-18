import { useSearchRequest } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  selectedCuisines: string[];
  sortOption: string;
  page: number;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    selectedCuisines: [],
    sortOption: "bestMatch",
    page: 1,
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRequest(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const onSubmit = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearchQuery = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 px-4">
      {/* CUISINES LIST */}
      <div id="cuisines-list">
        <CuisineFilter
          selectedCusinies={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        {/* SEARCH BAR  */}
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={onSubmit}
          onReset={resetSearchQuery}
          placeholder="Search by Cuisine or Restaurant Name"
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          {/* SEARCH RESULT INFO */}
          <SearchResultsInfo total={results.pagination.total} city={city} />
          {/* SORT OPTION  */}
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={setSortOption}
          />
        </div>

        {/* RESULTS CARD  */}
        {results.data.map((restaurant, index) => (
          <SearchResultsCard key={index} restaurant={restaurant} />
        ))}

        {/* PAGINATION  */}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
