import { useEffect, useState } from 'react';
import countryService from './services/country';
import CountryQueryResult from './components/CountryQueryResult';
import weatherService from './services/weather';

function App() {
  const [queryFilter, setQueryFilter] = useState('');
  const [allCountryData, setAllCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);

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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0];
      weatherService.getWeatherData(capital)
        .then(weatherData => {
          setWeatherInfo(weatherData);
        });
    }
  }, [filteredCountries]);

  const showCountryInfo = (country) => {
    setFilteredCountries([country]);
  }

  return (
    <div>
      <p>find countries <input type="text" value={queryFilter} 
      onChange={handleFilterChange}/></p>
      <CountryQueryResult weatherData={weatherInfo} countryData={filteredCountries} showCountryInfo={showCountryInfo} />
    </div>
  )
}

export default App
