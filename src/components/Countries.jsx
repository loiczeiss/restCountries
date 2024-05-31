import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCountry } from "./SelectedCountrySlice";
import {
  LoadingTimeBoolean,
  loadCountries,
  selectFilteredAllCountries,
  setLoadingTime,
} from "./CountriesSlice";
import "../App.css";
import { setComponent } from "../AppSlice";
import { isLight as lightBoolean } from "./lightModeSlice";

function Countries() {
  const dispatch = useDispatch();
  const countries = useSelector(selectFilteredAllCountries);
  const isLight = useSelector(lightBoolean);
  const isLoading = useSelector((state) => state.allCountries.isLoading);
  const hasError = useSelector((state) => state.allCountries.hasError);
  const loadingTimerBool = useSelector(LoadingTimeBoolean);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingTime(true));
      setTimeout(() => {
        dispatch(setLoadingTime(false));
      }, 1500);

      // Clean up the timer if the component unmounts or isLoading changes
    }
  }, [isLoading]);

  if (loadingTimerBool)
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

  if (hasError) return <div>Error loading countries.</div>;

  return (
    <>
      <article
        style={{
          background: isLight ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
        }}
        className="bg-veryDarkBlue w-full min-h-full xl:px-12 pt-14 flex flex-col xl:flex-row flex-wrap "
      >
        {countries.map((country, i) => (
          <section
            key={i}
            onClick={() => {
              dispatch(selectCountry(country));
              dispatch(setComponent(1));
            }}
            className="w-full xl:w-1/4 h-1/2 px-14 pb-6 xl:p-8"
          >
            <div
              className="bg-darkBlue h-full flex flex-col"
              style={{
                background: isLight ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
              }}
            >
              <div className="flex-grow-0 flex-shrink-0 h-42 w-full flex items-center justify-center overflow-hidden">
                <img
                  className="h-full w-auto max-w-full"
                  src={country.flags.png}
                  alt={`${country.name} flag`}
                />
              </div>
              <div className="flex-grow px-6 py-4">
                <h2
                  className="pb-4 font-nunito text-whiteL&D font-bold text-sm"
                  style={{
                    color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                  }}
                >
                  {country.name}
                </h2>
                <p
                  className="font-nunito text-whiteL&D font-light text-xs py-[2px]"
                  style={{
                    color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                  }}
                >
                  Population:{" "}
                  <span className="font-extralight">{country.population}</span>
                </p>
                <p
                  className="font-nunito text-whiteL&D font-light text-xs py-[2px]"
                  style={{
                    color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                  }}
                >
                  Region:{" "}
                  <span className="font-extralight">{country.region}</span>
                </p>
                <p
                  className="font-nunito text-whiteL&D font-light text-xs py-[2px]"
                  style={{
                    color: isLight ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
                  }}
                >
                  Capital:{" "}
                  <span className="font-extralight">{country.capital}</span>
                </p>
              </div>
            </div>
          </section>
        ))}
      </article>
    </>
  );
}

export default Countries;
