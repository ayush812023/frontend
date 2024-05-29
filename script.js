document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("dataTable");
    const tr = table.getElementsByTagName("tr");
  
    for (let i = 1; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td");
      let rowContainsFilter = false;
  
      for (let j = 0; j < td.length; j++) {
        if (td[j] && td[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
          rowContainsFilter = true;
          break;
        }
      }
  
      tr[i].style.display = rowContainsFilter ? "" : "none";
    }
  }
  
  document.getElementById("myButton").onclick = () => location.href = "www.yoursite.com";
  document.getElementById("myButton2").onclick = () => location.href = "www.yoursite.com";
  document.getElementById("myButton3").onclick = () => location.href = "www.yoursite.com";
  document.getElementById("myButton4").onclick = () => location.href = "www.yoursite.com";

  // Function to fetch data from the API sales data
async function fetchData() {
    const apiUrl = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        calculateStatistics(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => processSalesData(data))
    .catch(error => console.error('Error fetching data:', error));

function processSalesData(data) {
    let totalSales = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    // Assuming each product has a stock of 100 units
    const stockPerProduct = 100;

    data.forEach(item => {
        // For demonstration, let's assume each item sold 20 units
        const quantitySold = 20;

        totalSales += item.price * quantitySold;
        totalSoldItems += quantitySold;
        totalNotSoldItems += stockPerProduct - quantitySold;
    });

    displayTally(totalSales, totalSoldItems, totalNotSoldItems);
}

function displayTally(totalSales, totalSoldItems, totalNotSoldItems) {
    document.getElementById('total-sales').innerText = `Total Sales: $${totalSales.toFixed(2)}`;
    document.getElementById('total-sold-items').innerText = `Total Sold Items: ${totalSoldItems}`;
    document.getElementById('total-not-sold-items').innerText = `Total Not Sold Items: ${totalNotSoldItems}`;
}

  
  const ctx = document.getElementById('chart_area').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901 above'],
        datasets: [{
            label: 'Range',
            data: [3, 5, 8, 6, 15, 7, 10, 25, 5, 11],
            backgroundColor: '#09d3d6',
        }]
    },
    options: {
        title: {
            display: true,
            text: 'transaction Bar Chart',
            fontSize: 30,
            fontColor: 'black',
        }
        },
    
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
  
  async function fetchData() {
    const response = await fetch('api/endpoint'); // Replace with your API endpoint
    const data = await response.json();
    console.log(data);
  }
  
  // Fetch data from your Node.js API
async function fetchTransactions() {
    try {
        const response = await fetch('http://localhost:3000/api/transactions');
        const data = await response.json();
        processSalesData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchTransactions();
