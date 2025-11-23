const CountryQueryResult = ({ countryData, showCountryInfo, weatherData }) => {
  const countryCount = countryData.length;
  if (countryCount > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countryCount > 1 && countryCount <= 10) {
    return (<ul>
      {countryData.map(country => 
        <div key={country.cca3}>
          <li >{country.name.common}</li>
          <button  onClick={() => showCountryInfo(country)}>Show</button>
        </div>
      )}
    </ul>
    );
  }
  if (countryCount === 1) {
    const country = countryData[0];
    return (<div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>

      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="250" />

      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weatherData?.main?.temp} °C</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt="Weather icon" />
      <p>wind {weatherData?.wind?.speed} m/s</p>
    </div>);
  }

  return <p>No country found</p>;
}
export default CountryQueryResult;