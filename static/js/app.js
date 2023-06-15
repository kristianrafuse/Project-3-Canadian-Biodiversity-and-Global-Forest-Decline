let url = '/api';

// tried a new to me method of GETing the data with AJAX
$.ajax({
  url: url,
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  },
  error: function(xhr, status, error) {
    console.error(error);
  }
});

d3.json(url)
  .then(function(response) {

// grab the data needed to build the table 
// I'll be building a table with datatables.net, a new to me JavaScript plugin for building interactive tables
const selectedData = response.selected.csv_data;

// Create an array to store the formatted data
const formattedData = [];

// Iterate over each entry in the selectedData array
selectedData.forEach(column => {
  const speciesGroup = column['Species group'];
  const criticallyImperiled = column['Critically imperiled (N1)'];
  const imperiled = column['Imperiled (N2)'];
  const vulnerable = column['Vulnerable (N3)'];
  const apparentlySecure = column['Apparently secure (N4)'];
  const secure = column['Secure (N5)'];
  const subtotalSpecies = column['Subtotal of species with numerical ranks'];
  const presumedExtirpated = column['Presumed extirpated (NX)'];
  const possiblyExtirpated = column['Possibly extirpated (NH)'];
  const unrankable = column['Unrankable (NU)'];
  const unranked = column['Unranked (NNR)'];
  const notApplicable = column['Not applicable (NNA)'];
  const total = column['Total'];

  // Create an array with the formatted row data
  const rowData = [
    speciesGroup,
    criticallyImperiled,
    imperiled,
    vulnerable,
    apparentlySecure,
    secure,
    subtotalSpecies,
    presumedExtirpated,
    possiblyExtirpated,
    unrankable,
    unranked,
    notApplicable,
    total
  ];

  // Add the row data to the formattedData array
  formattedData.push(rowData);
});

// Define the table columns
const columns = [
  { title: 'Species Group' },
  { title: 'Critically Imperiled (N1)' },
  { title: 'Imperiled (N2)' },
  { title: 'Vulnerable (N3)' },
  { title: 'Apparently Secure (N4)' },
  { title: 'Secure (N5)' },
  { title: 'Subtotal of Species with Numerical Ranks' },
  { title: 'Presumed Extirpated (NX)' },
  { title: 'Possibly Extirpated (NH)' },
  { title: 'Unrankable (NU)' },
  { title: 'Unranked (NNR)' },
  { title: 'Not Applicable (NNA)' },
  { title: 'Total' }
];

$(document).ready(function() {
  $('#myTable').DataTable({
    data: formattedData,
    columns: columns,
  });
});
    // Extract the data for the bar chart
    const regionalData = response.regional.csv_data;

    // Extract the categories from the regional data
    const regionalCategories = Object.keys(regionalData[0]);

    // Remove the "Region" category from the list
    regionalCategories.splice(regionalCategories.indexOf('Region'), 1);

    // Create the data array for the bar chart
    const barData = [{
      x: regionalCategories,
      y: regionalCategories.map(category => parseInt(regionalData[0][category])),
      type: 'bar'
    }];

    // Create the layout for the bar chart
    const barLayout = {
      title: 'Regional Data, Canada, 2020',
      xaxis: { title: 'Category',
              automargin: true,
    },
      yaxis: { title: 'Species Count' },
      width: 1139,
      height: 1000
    };

    // Create the bar chart
    Plotly.newPlot('bar1', barData, barLayout);

    // Populate the dropdown with province options
    const provinceDropdown = document.getElementById('selDataset');
    const provinces = regionalData.map(entry => entry.Region);
    provinces.forEach(province => {
      const option = document.createElement('option');
      option.text = province;
      provinceDropdown.add(option);
    });

    // Add event listener to the dropdown
    provinceDropdown.addEventListener('change', function() {
      const selectedProvince = this.value;
      updateBarChart(selectedProvince);
    });

    // Function to update the bar chart based on the selected province
    function updateBarChart(selectedProvince) {
      // Find the data for the selected province
      const selectedData = regionalData.find(entry => entry.Region === selectedProvince);

      // Extract the categories from the selected data
      const regionalCategories = Object.keys(selectedData);

      // Remove the "Region" category from the list
      regionalCategories.splice(regionalCategories.indexOf('Region'), 1);

      // Create the data array for the bar chart
      const barData = [{
        x: regionalCategories,
        y: regionalCategories.map(category => parseInt(selectedData[category])),
        type: 'bar'
      }];

      // Create the layout for the bar chart
      const barLayout = {
        title: `Regional Data for ${selectedProvince}`,
        xaxis: { title: 'Category',
                 automargin: true,
      },
        yaxis: { title: 'Species Count' },
        width: 1139,
        height: 1000
      };

      // Update the bar chart
      Plotly.newPlot('bar1', barData, barLayout);
    }

    // (Line graphs, pie chart, etc.)
    const data = response.birds.csv_data;

    // Extract the years from the data
    const years = data.map(entry => parseInt(entry.Year));

    // Extract the percentage change values for each bird category
    const categories = ['Aerial insectivores', 'All other birds', 'Birds of prey', 'Forest birds',
                        'Grassland birds', 'Seabirds', 'Shorebirds', 'Waterfowl', 'Wetland birds'];

    const categoryData = {};

    categories.forEach(category => {
      categoryData[category] = data.map(entry => parseFloat(entry[`${category} (percentage change from 1970)`]));
    });

    // Create the trace objects for the first line graph
    const traces = categories.map(category => ({
      x: years,
      y: categoryData[category],
      name: category,
      type: 'scatter',
      line: {
        width: 5     
      }
    }));

    // Create the layout for the first line graph
    const layout = {
      title: 'Bird Population Changes Since 1970',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Percentage Change' },
      width: 1139,
      height: 900
    };

    // Create the first line graph
    Plotly.newPlot('line2', traces, layout);

    // Load the data for the second line graph from species_percent.csv_data
    const secondLineData = response.species_percent.csv_data;

    // Extract the years from the data
    const secondLineYears = secondLineData.map(entry => parseInt(entry.Year));

    // Extract the percentage change values for each source of data
    const sources = Object.keys(secondLineData[0]).filter(key => key !== 'Year');

    const sourceData = {};

    sources.forEach(source => {
      sourceData[source] = secondLineData.map(entry => parseFloat(entry[source]));
    });

    // Create the traces for the second line graph
    const sourceTraces = sources.map(source => ({
      x: secondLineYears,
      y: sourceData[source],
      name: source,
      type: 'scatter',
      line: {   
        width: 5,
      }
    }));

    // Create the layout for the second line graph
    const secondLineLayout = {
      title: 'Species Percentage Change Since 1970',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Percentage Change' },
      width: 1139,
      height: 900
    };

    // Create the second line graph
    Plotly.newPlot('line1', sourceTraces, secondLineLayout);

    // Extract the "Number of species" and "Status" data from the "national" CSV file
    const nationalData = response.national.csv_data;

    // Extract the values from the national data
    const values = nationalData.map(entry => parseFloat(entry['Number of species']));
    const labels = nationalData.map(entry => entry['Status']);

    // Create the data array for the pie chart
    const pieData = [{
      labels: labels,
      values: values,
      type: 'pie'
    }];

    // Create the layout for the pie chart
    const pieLayout = {
      title: 'Biodiversity Overview, Canada 2020',
      width: 1139,
      height: 1000
    };

    // Create the pie chart
    Plotly.newPlot('pie1', pieData, pieLayout);
  })
  .catch(function(error) {
    console.error(error);
  });

  d3.json(url)
  .then(function(response) {
    // Extract the CSV data from the response
    const csvData = response.forests_df_total.csv_data;

    // Create a map instance (replace 'mapContainer' with your actual map container ID)
    var map = L.map('map', {
      minZoom: 1,
      maxZoom: 10
    }).setView([0, 0], 2);

    // Add a tile layer to the map (you can choose a different tile provider if needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Iterate over the CSV data
    csvData.forEach(function(country) {
      // Extract the required values for each country
      var latitude = parseFloat(country.Latitude);
      var longitude = parseFloat(country.Longitude);
      var value1990 = parseFloat(country['1990 Total']);
      var value2000 = parseFloat(country['2000 Total']);
      var value2010 = parseFloat(country['2010 Total']);
      var value2020 = parseFloat(country['2020 Total']);

      // Create circles for each year/value combination
      var circle1990 = L.circle([latitude, longitude], value1990, { color: 'red', fillColor: 'green' }).addTo(map);
      var circle2000 = L.circle([latitude, longitude], value2000, { color: 'red', fillColor: 'green' }).addTo(map);
      var circle2010 = L.circle([latitude, longitude], value2010, { color: 'yellow', fillColor: 'green' }).addTo(map);
      var circle2020 = L.circle([latitude, longitude], value2020, { color: 'green', fillColor: 'green' }).addTo(map);
      
      // Add popups to the circles with the country name and values
      circle1990.bindPopup('Country: ' + country.Country + '<br>1990: ' + value1990 +'km');
      circle2000.bindPopup('Country: ' + country.Country + '<br>2000: ' + value2000 +'km');
      circle2010.bindPopup('Country: ' + country.Country + '<br>2010: ' + value2010 +'km');
      circle2020.bindPopup('Country: ' + country.Country + '<br>2020: ' + value2020 +'km');
    });
  })
  .catch(function(error) {
    console.log('Error:', error);
  });

  // Complete