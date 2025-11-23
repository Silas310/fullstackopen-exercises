import { useEffect, useState } from 'react';
import countryService from './services/country';
import CountryQueryResult from './components/CountryQueryResult';

function App() {
  const [queryFilter, setQueryFilter] = useState('');
  const [allCountryData, setAllCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleFilterChange = (event) => {
    setQueryFilter(event.target.value);
  }

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(initialCountries => {
        setAllCountryData(initialCountries);
        console.log(initialCountries);
      });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => { // debounce behavior
      const countriesToShow = allCountryData.filter(country => 
        country.name.common.toLowerCase().includes(queryFilter.toLowerCase())
      );
      setFilteredCountries(countriesToShow);
    }, 500);

    return () => clearTimeout(timeoutId); // cleanup to avoid multiple timeouts
  }, [queryFilter, allCountryData]);

  return (
    <div>
      <p>find countries <input type="text" value={queryFilter} 
      onChange={handleFilterChange}/></p>
      <CountryQueryResult countryData={filteredCountries} />
    </div>
  )
}

export default App
