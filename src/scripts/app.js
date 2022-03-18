class App {
  constructor() {
    // hold the full country array on initial fetch
    this.countries = [];
    // hold the filtered country array on search or filter by region
    this.filteredCountries = [];
    this.selectedCountry = {};
    // hold the value of the search input
    this.inputSearchValue = '';
    // hold the value of the region select
    this.selectRegionValue = '';
  }
  // update --- start
  countriesViewELement = document.getElementById('countries_view');
  countryDetailsElement = document.getElementById('country_details');
  countryMoreDetailsElement = document.getElementById('country_more_details');
  countryDetailsBackBtnElement = document.getElementById('back_btn');
  // update --- end
  countriesContainer = document.getElementById('countries_container');
  searchInput = document.getElementById('searchbar');
  regionSelectInput = document.getElementById('region_select');
  async fetchCountries() {
    const res = await fetch('https://restcountries.com/v2/all');
    if (res.status !== 200) {
      throw new Error('cannot fetch the data');
    }
    const data = await res.json();
    return data;
  }
  generateHTML(data) {
    const html = data.map((country) => {
      // update ---start
      return `
        <div class="country" onclick="(function(){
            app.handleCountryDetails('${country.alpha3Code}');
            return false;
        })();return false;">
          <div class="country__flag">
            <img src="${country.flag}" alt="${country.name}">
          </div>
          <div class="country__info">
            <h3 class="country__name">${country.name}</h3>
            <p class="country__population">Population: ${country.population}</p>
            <p class="country__region">Region: ${country.region}</p>
            <p class="country__capital">Capital: ${country.capital}</p>
            
          </div>
        </div>
      `;
    });
    return html.join('');
  }
  generateMoreDetailsHTML(country) {
    return `
      <div class="flag_img_container">
            <img src="${country.flag}" alt="${country.name}" />
          </div>
          <div class="description">
            <h1>${country.name}</h1>
            <div class="left_description">
              <p>native name: <span>${country.nativeName}</span></p>
              <p>population: <span>${country.population}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Sub Region: <span>${country.subregion}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
            </div>
            <div class="right_description">
              <p>Top Level Domain: <span>${country.topLevelDomain[0]}</span></p>
              <p>Currencies: <span>${country.currencies[0].name}</span></p>
              <p>Languages: <span>${country.languages[0].name}</span></p>
            </div>
            <div class="country_borders">
              <h2>Border Countries:</h2>
                ${app.generateCountryBorderHTML(country.borders || [])}
            </div>
          </div>
    `;
  }
  generateCountryBorderHTML(countryBorders) {
    const html = countryBorders.map((border) => {
      const borderCountry = app.filteredCountries.find(
        (country) => country.alpha3Code === border
      );
      return `<div class="country_border" onclick="(function(){
            app.handleCountryDetails('${borderCountry.alpha3Code}');
            return false;
        })();return false;">${borderCountry.name}</div>`;
    });
    return html.join('');
  }
  filterCountry() {
    this.filteredCountries = this.countries.filter((country) => {
      if (this.selectRegionValue === '') {
        return country.name.toLowerCase().includes(this.inputSearchValue);
      } else if (
        country.name.toLowerCase().includes(this.inputSearchValue) &&
        country.region.toLowerCase() === this.selectRegionValue
      ) {
        return country;
      }
    });
    this.countriesContainer.innerHTML = this.generateHTML(
      this.filteredCountries
    );
  }
  // update --- start
  handleCountryDetails(alpha3Code) {
    app.selectedCountry = app.filteredCountries.find(
      (country) => country.alpha3Code === alpha3Code
    );
    app.countriesViewELement.classList.add('hide');
    app.countryDetailsElement.classList.remove('hide');
    app.countryMoreDetailsElement.innerHTML = app.generateMoreDetailsHTML(
      app.selectedCountry
    );
  }

  // update --- end
}

let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  app.searchInput.addEventListener('input', (e) => {
    app.inputSearchValue = e.target.value;
    app.filterCountry();
  });
  app.regionSelectInput.addEventListener('change', (e) => {
    app.selectRegionValue = e.target.value;
    app.filterCountry();
  });
  app.fetchCountries().then((data) => {
    app.countries = data;
    app.filteredCountries = data;
    const generatedHtmlString = app.generateHTML(data);
    app.countriesContainer.innerHTML = generatedHtmlString;
  });
  app.countryDetailsBackBtnElement.addEventListener('click', () => {
    app.countriesViewELement.classList.remove('hide');
    app.countryDetailsElement.classList.add('hide');
  });
});