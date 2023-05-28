import axios from 'axios';
import { useEffect, useState } from 'react';

import { Country, CountryList, FormInput } from './components';

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data));
  }, []);

  const [countryFilter, setCountryFilter] = useState('');
  const handleCountryFilterChange = (event) =>
    setCountryFilter(event.target.value);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  let countryComponent = <p>Too many matches, increase specificity.</p>;

  if (filteredCountries.length === 1)
    countryComponent = <Country country={filteredCountries[0]} />;
  else if (filteredCountries.length <= 10)
    countryComponent = (
      <CountryList
        countries={filteredCountries}
        onSelectCountry={(name) => setCountryFilter(name)}
      />
    );

  return (
    <div>
      <h1>Countries</h1>
      <FormInput
        label="Find by name"
        value={countryFilter}
        onChange={handleCountryFilterChange}
      />
      {countryComponent}
    </div>
  );
};

export default App;
