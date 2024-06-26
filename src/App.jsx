import { useSelector } from "react-redux";
import "./App.css";
import Countries from "./components/countries/Countries";
import Header from "./components/Header";
import SearchAndFilter from "./components/search&filter/SearchAndFilter";
import SelectedCountry from "./components/selectedCountry/SelectedCountry";
import { componentPicked as selectComponentPicked } from "./AppSlice";

function App() {
  const componentPicked = useSelector(selectComponentPicked);

  return (
    <>
      <Header />
      {componentPicked === 0 && <SearchAndFilter />}
      {componentPicked === 0 && <Countries />}
      {componentPicked === 1 && <SelectedCountry />}
    </>
  );
}

export default App;
