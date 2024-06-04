// Fetching data using .then
function fetchDataUsingThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            renderTable(data);
            console.log('Data fetched using .then');
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetching data using async/await
async function fetchDataUsingAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        renderTable(data);
        console.log('Data fetched using async/await');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in the table
function renderTable(data) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = `
            <tr>
                <td><img src="${coin.image}" alt="${coin.name}"></td>
                <td>${coin.name}</td>
                <td>${coin.symbol}</td>
                <td>${coin.current_price}</td>
                <td>${coin.total_volume}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Function to filter data based on search input
function filterData(data, searchTerm) {
    return data.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to sort data by market cap
function sortByMarketCap(data) {
    return data.sort((a, b) => b.market_cap - a.market_cap);
}

// Function to sort data by percentage change (assuming we have percentage change data)
function sortByPercentageChange(data) {
    return data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
}

// Event listeners for search and sort buttons
document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    fetchDataUsingAsyncAwait().then(data => {
        const filteredData = filterData(data, searchTerm);
        renderTable(filteredData);
    });
});

document.getElementById('sortMarketCapButton').addEventListener('click', () => {
    fetchDataUsingAsyncAwait().then(data => {
        const sortedData = sortByMarketCap(data);
        renderTable(sortedData);
    });
});

document.getElementById('sortPercentageChangeButton').addEventListener('click', () => {
    fetchDataUsingAsyncAwait().then(data => {
        const sortedData = sortByPercentageChange(data);
        renderTable(sortedData);
    });
});

// Initial data fetch
fetchDataUsingThen();
