const CountryList = ({ countries, onSelectCountry }) =>
  countries.map((country) => (
    <div key={country.cca3}>
      {country.name.common}{' '}
      <button onClick={() => onSelectCountry(country.name.common)}>Show</button>
    </div>
  ));

export default CountryList;
