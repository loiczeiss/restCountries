import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "./SearchedCountrySlice";
import { useState, useEffect, useRef } from "react";
import {
  setFilterByRegion,
  removeFilter,
  selectFilteredRegion,
} from "./regionFilterSlice";
import { loadCountries } from "../countries/CountriesSlice";
import { isLight as lightCheck } from "../lightMode/lightModeSlice";

function SearchAndFilter() {
  const [liAppearance, setLiAppearance] = useState({ display: "none" });
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const filteredRegion = useSelector(selectFilteredRegion);
  const dropdownRef = useRef(null);
  const isLight = useSelector(lightCheck);
  const onSearchChangeHandler = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const onHover = () => {
    setLiAppearance({ display: "block" });
  };

  const onLeave = () => {
    setLiAppearance({ display: "none" });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      onLeave();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegionClick = (region) => {
    dispatch(setFilterByRegion(region));
    onLeave();
  };

  const handleRemoveFilter = () => {
    dispatch(removeFilter());
  };

  useEffect(() => {
    dispatch(loadCountries());
  }, [filteredRegion, dispatch]);

  return (
    <>
      <article>
        <section
          className="bg-veryDarkBlue w-full flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-20 pt-10"
          style={{
            background: isLight ? " hsl(0, 0%, 98%)" : " hsl(207, 26%, 17%)",
          }}
        >
          <div
            style={{
              background: isLight ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
            }}
            className="bg-darkBlue flex w-full md:w-80 h-12 pl-4 mb-6 md:mb-0"
          >
            <svg
              style={{
                fill: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              }}
              className="w-4 fill-whiteL&D mr-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
            </svg>
            <input
              className="bg-transparent"
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={onSearchChangeHandler}
              style={{
                color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "14px",
              }}
            />
          </div>
          <div
            ref={dropdownRef}
            style={{
              background: isLight ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
            }}
            className="bg-darkBlue h-12 w-48 flex flex-col justify-center relative"
          >
            <div
              onClick={onHover}
              className="flex w-full items-center px-4 justify-between cursor-pointer"
            >
              <p
                style={{
                  color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                }}
                className="font-nunito text-whiteL&D font-light text-sm"
              >
                Filter by region
              </p>
              <p
                style={{
                  color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                }}
                className="text-whiteL&D"
              >
                &#x2B9F;
              </p>
            </div>
            <ul
              style={{
                color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                background: isLight ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
                ...liAppearance,
              }}
              className="bg-darkBlue w-48 absolute top-12"
            >
              {["Africa", "Americas", "Asia", "Europe", "Oceania"].map(
                (region) => (
                  <li
                    key={region}
                    style={{
                      color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                      background: isLight
                        ? "hsl(0, 0%, 100%)"
                        : "hsl(209, 23%, 22%)",
                    }}
                    onClick={() => handleRegionClick(region)}
                    className="bg-darkBlue w-48 pl-4 py-2 text-whiteL&D font-nunito font-light text-sm cursor-pointer"
                  >
                    {region}
                  </li>
                )
              )}
              <li
                style={{
                  color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                  background: isLight
                    ? "hsl(0, 0%, 100%)"
                    : "hsl(209, 23%, 22%)",
                }}
                onClick={handleRemoveFilter}
                className="bg-darkBlue w-48 pl-4 py-2 text-whiteL&D font-nunito font-light text-sm cursor-pointer"
              >
                Remove Filter
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}

export default SearchAndFilter;
