import React from "react";
import { selectSelectedCountry } from "./SelectedCountrySlice";
import { useDispatch, useSelector } from "react-redux";
import { setComponent } from "../AppSlice";
function SelectedCountry() {
  const selectedCountry = useSelector(selectSelectedCountry);
  const dispatch = useDispatch();
  console.log(selectedCountry);

  return (
    <>
      <article className="bg-veryDarkBlue w-full min-h-[85%]  pt-14 px-0 flex flex-col xl:flex-row flex-wrap content-start">
        <section className="h-[30%] flex flex-row">
          <div
            onClick={() => {
              dispatch(setComponent(0));
            }}
            className="bg-darkBlue h-8 w-24 flex justify-center items-center ml-20"
          >
            <p className="font-nunito text-sm text-whiteL&D pr-2"> &#8592;</p>
            <p className="font-nunito text-xs font-extralight text-whiteL&D ">
              Back
            </p>
          </div>
        </section>
        <section className="flex flex-row px-20 pt-14 justify-between">
          <div className="w-1/2">
            <img src={selectedCountry.flag} alt="flag" />
          </div>
          <div className="flex flex-col w-1/2 pl-20 font-nunito text-whiteL&D ">
            <div className="flex flex-row h-5/6 pt-8 w-full justify-between">
              <div className="w-1/2">
                <h1>{selectedCountry.name}</h1>
                <ul className="text-sm font-light pt-4">
                  <li className="py-2">
                    Native Name:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.nativeName}
                    </span>
                  </li>
                  <li className="py-2">
                    Population:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.population}
                    </span>
                  </li>
                  <li className="py-2">
                    Region:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.region}
                    </span>
                  </li>
                  <li className="py-2">
                    Subregion :{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.subregion}
                    </span>
                  </li>
                  <li className="py-2">
                    Capital:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.capital}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-10 w-1/2">
                <ul className="text-sm font-light pl-8">
                  <li className="py-2">
                    Top Level Domain:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.topLevelDomain[0]}
                    </span>
                  </li>
                  <li className="py-2">
                    Currencies:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.currencies.map((currency, index) => (
                        <span key={currency.code}>
                          {currency.code}
                          {index < selectedCountry.currencies.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </span>
                  </li>
                  <li className="py-2">
                    Languages:{" "}
                    <span className="font-extralight text-xs">
                      {selectedCountry.languages.map((language, index) => (
                        <span key={language.name}>
                          {language.name}
                          {index < selectedCountry.languages.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-row pt-4">
              <h3 className="text-sm ">Border countries :</h3>
              <ul className="flex align-middle px-4">
                <li className="text-xs font-extralight self-center">
                  {selectedCountry.borders &&
                  selectedCountry.borders.length > 0 ? (
                    selectedCountry.borders.map((border, index) => (
                      <span key={border}>
                        {border}
                        {index < selectedCountry.borders.length - 1 ? ", " : ""}
                      </span>
                    ))
                  ) : (
                    <span>no border country</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

export default SelectedCountry;
