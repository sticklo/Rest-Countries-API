class App {
    constructor() {
      // hold the full country array on initial fetch
      this.countries = [];
      // hold the filtered country array on search or filter by region
      this.filteredCountries = [];
      // hold the value of the search input
      this.inputSearchValue = '';
      // hold the value of the region select
      this.selectRegionValue = '';
    }
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
        return `
          <div class="country">
            <div class="country__flag">
              <img src="${country.flag}" alt="${country.name}">
            </div>
            <div class="country__info">
              <h3 class="country__name">${country.name}</h3>
              <p class="country__region">Region: ${country.region}</p>
              <p class="country__population">Population: ${country.population}</p>
            </div>
          </div>
        `;
      });
      // console.log(html, 'html');
      return html.join('');
    }
    filterCountry() {
      console.log('filterCountry', this.countries);
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
      console.log(this.filteredCountries, 'filteredCountries');
      this.countriesContainer.innerHTML = this.generateHTML(
        this.filteredCountries
      );
    }
  }
  
  let app;
  
  document.addEventListener('DOMContentLoaded', () => {
    app = new App();
    app.searchInput.addEventListener('input', (e) => {
      // console.log(e.target.value);
      app.inputSearchValue = e.target.value;
      app.filterCountry();
    });
    app.regionSelectInput.addEventListener('change', (e) => {
      console.log(e.target.value);
      app.selectRegionValue = e.target.value;
      app.filterCountry();
    });
    app.fetchCountries().then((data) => {
      console.log('resolved:', data);
      app.countries = data;
      const generatedHtmlString = app.generateHTML(data);
      app.countriesContainer.innerHTML = generatedHtmlString;
    });
  });