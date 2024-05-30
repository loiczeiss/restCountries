import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectCountry, selectSelectedCountry } from "./SelectedCountrySlice";
import { loadCountries, selectFilteredAllCountries } from "./AllCountrySlice";
import SearchAndFilter from './SearchAndFilter';

function Countries() {
    const dispatch = useDispatch();
    const countries = useSelector(selectFilteredAllCountries);
    const selectedCountry = useSelector(selectSelectedCountry);
    const isLoading = useSelector((state) => state.allCountries.isLoading);
    const hasError = useSelector((state) => state.allCountries.hasError);

    useEffect(() => {
        dispatch(loadCountries());
    }, [dispatch]);

    useEffect(() => {
        console.log("Selected country:", selectedCountry);
    }, [selectedCountry]);

    if (isLoading) return <div>Loading...</div>;
    if (hasError) return <div>Error loading countries.</div>;

    return (
        <>
           
            <article className="bg-veryDarkBlue w-full min-h-full xl:px-12 pt-14 flex flex-col xl:flex-row flex-wrap">
                {countries.map((country, i) => (
                    <section
                        key={i}
                        onClick={() => dispatch(selectCountry(country.name))}
                        className="w-full xl:w-1/4 h-1/2 px-14 pb-6 xl:p-8"
                    >
                        <div className="bg-darkBlue h-full flex flex-col">
                            <div className="flex-grow-0 flex-shrink-0 h-42 w-full flex items-center justify-center overflow-hidden">
                                <img className="h-full w-auto max-w-full" src={country.flags.png} alt={`${country.name} flag`} />
                            </div>
                            <div className="flex-grow px-6 py-4">
                                <h2 className="pb-4 font-nunito text-whiteL&D font-bold text-sm">{country.name}</h2>
                                <p className="font-nunito text-whiteL&D font-light text-xs py-[2px]">Population: <span className="font-extralight">{country.population}</span></p>
                                <p className="font-nunito text-whiteL&D font-light text-xs py-[2px]">Region: <span className="font-extralight">{country.region}</span></p>
                                <p className="font-nunito text-whiteL&D font-light text-xs py-[2px]">Capital: <span className="font-extralight">{country.capital}</span></p>
                            </div>
                        </div>
                    </section>
                ))}
            </article>
        </>
    );
}

export default Countries;

