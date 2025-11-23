const CountryQueryResult = ({ countryData }) => {
  const countryCount = countryData.length;
  if (countryCount > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countryCount > 1 && countryCount <= 10) {
    return (<ul>
      {countryData.map(country => 
        <li key={country.cca3}>{country.name.common}</li>
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
    </div>);
  }

  return <p>No country found</p>;
}
export default CountryQueryResult;