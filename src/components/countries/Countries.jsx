import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCountry } from "../selectedCountry/SelectedCountrySlice";
import {
  LoadingTimeBoolean,
  loadCountries,
  selectFilteredAllCountries,
  setLoadingTime,
} from "./CountriesSlice";
import "../../App.css";
import { setComponent } from "../../AppSlice";
import { isLight as lightBoolean } from "../lightMode/lightModeSlice";
import { FixedSizeGrid as Grid } from "react-window";

function Countries() {
  const dispatch = useDispatch();
  const countries = useSelector(selectFilteredAllCountries);
  const isLight = useSelector(lightBoolean);
  const isLoading = useSelector((state) => state.allCountries.isLoading);
  const hasError = useSelector((state) => state.allCountries.hasError);
  const loadingTimerBool = useSelector(LoadingTimeBoolean);

  // State to hold responsive grid configuration
  const [gridConfig, setGridConfig] = useState({
    numCols: 4,
    itemWidth: 300,
    itemHeight: 400,
  });

  // Function to update grid configuration based on screen size
  const updateGridConfig = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 640) {
      setGridConfig({ numCols: 1, itemWidth: screenWidth - 40, itemHeight: 350 });
    } else if (screenWidth <= 1024) {
      setGridConfig({ numCols: 2, itemWidth: (screenWidth / 2) - 40, itemHeight: 350 });
    } else if (screenWidth <= 1280) {
      setGridConfig({ numCols: 3, itemWidth: (screenWidth / 3) - 40, itemHeight: 400 });
    } else {
      setGridConfig({ numCols: 4, itemWidth: 350, itemHeight: 400 });
    }
  };

  // Update grid configuration on window resize
  useEffect(() => {
    updateGridConfig(); // Initial call
    window.addEventListener("resize", updateGridConfig);
    return () => window.removeEventListener("resize", updateGridConfig);
  }, []);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingTime(true));
      setTimeout(() => {
        dispatch(setLoadingTime(false));
      }, 1500);
    }
  }, [isLoading]);

  if (loadingTimerBool) {
    return (
      <article
        style={{
          background: isLight ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
        }}
        className="bg-veryDarkBlue w-full min-h-full xl:px-12 pt-14 flex flex-col xl:flex-row flex-wrap content-center justify-center"
      >
        <div
          style={{
            boxShadow: isLight
              ? "0 0 0 3px hsl(207, 26%, 17%) inset"
              : "0 0 0 3px hsl(0, 0%, 98%) inset",
          }}
          className="loader -top-28"
        ></div>
      </article>
    );
  }

  if (hasError) {
    return <div>Error loading countries.</div>;
  }

  const { numCols, itemWidth, itemHeight } = gridConfig;

  const CountryCard = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * numCols + columnIndex;
    if (index >= countries.length) {
      return null; // Avoid rendering empty cells
    }
    const country = countries[index];
    return (
      <div style={style} className="p-2">
        <section
          onClick={() => {
            dispatch(selectCountry(country));
            dispatch(setComponent(1));
          }}
          className="w-full bg-darkBlue overflow-hidden shadow-lg"
          style={{
            background: isLight ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
          }}
        >
          <div className="h-48 w-full flex items-center justify-center overflow-hidden">
            <img
              className="h-full w-auto"
              src={country.flags.png}
              alt={`${country.name} flag`}
            />
          </div>
          <div className="p-4">
            <h2
              className="text-lg font-bold mb-2"
              style={{
                color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              }}
            >
              {country.name}
            </h2>
            <p
              className="text-sm"
              style={{
                color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              }}
            >
              Population: <span className="font-light">{country.population}</span>
            </p>
            <p
              className="text-sm"
              style={{
                color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              }}
            >
              Region: <span className="font-light">{country.region}</span>
            </p>
            <p
              className="text-sm"
              style={{
                color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
              }}
            >
              Capital: <span className="font-light">{country.capital}</span>
            </p>
          </div>
        </section>
      </div>
    );
  };

  return (
    <article
      style={{
        background: isLight ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
      }}
      className="bg-veryDarkBlue w-full min-h-screen xl:px-12 pt-14 flex flex-col xl:flex-row flex-wrap"
    >
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <Grid
          columnCount={numCols}
          columnWidth={itemWidth}
          height={800} // Set height explicitly or use CSS to manage it
          rowCount={Math.ceil(countries.length / numCols)}
          rowHeight={itemHeight} // Adjust item size to fit Tailwind layout
          width={numCols * itemWidth} // Use full width of columns
        >
          {CountryCard}
        </Grid>
      </div>
    </article>
  );
}

export default Countries;
