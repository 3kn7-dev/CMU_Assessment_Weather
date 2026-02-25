const API_URL = "https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags,languages,currencies";

const countryListEl = document.getElementById("countryList");
const detailsContentEl = document.getElementById("detailsContent");
const searchInputEl = document.getElementById("searchInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const chartCanvas = document.getElementById("populationChart");

let countries = [];
let filteredCountries = [];
let populationChart = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchCountries();
  searchInputEl.addEventListener("input", handleSearch);
});

// Fetch countries
async function fetchCountries() {
  showLoading(true);
  hideError();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    countries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    filteredCountries = countries;

    renderCountryList(filteredCountries);
    showLoading(false);

  } catch (error) {
    showLoading(false);
    showError();
  }
}

// Render country list
function renderCountryList(countryArray) {
  countryListEl.innerHTML = "";

  if (countryArray.length === 0) {
    countryListEl.innerHTML = "<li>No countries found.</li>";
    return;
  }

  countryArray.forEach(country => {
    const li = document.createElement("li");

    li.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag">
      <div>
        <strong>${country.name.common}</strong><br>
        <small>${country.region}</small>
      </div>
    `;

    li.addEventListener("click", () => {
      renderDetails(country);
      renderChart(country);
    });

    countryListEl.appendChild(li);
  });
}

// Render details panel
function renderDetails(country) {
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(cur => cur.name)
        .join(", ")
    : "N/A";

  detailsContentEl.innerHTML = `
    <img src="${country.flags.svg}" alt="Flag">
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Currencies:</strong> ${currencies}</p>
  `;
}

// Render chart
function renderChart(selectedCountry) {
  const sameRegion = countries.filter(
    c => c.region === selectedCountry.region
  ).slice(0, 5);

  const labels = sameRegion.map(c => c.name.common);
  const populations = sameRegion.map(c => c.population);

  if (populationChart) {
    populationChart.destroy();
  }

  populationChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Population",
        data: populations
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Search filter
function handleSearch(event) {
  const query = event.target.value.toLowerCase();

  filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );

  renderCountryList(filteredCountries);
}

// UI helpers
function showLoading(isLoading) {
  loadingEl.style.display = isLoading ? "block" : "none";
}

function showError() {
  errorEl.classList.remove("hidden");
}

function hideError() {
  errorEl.classList.add("hidden");
}