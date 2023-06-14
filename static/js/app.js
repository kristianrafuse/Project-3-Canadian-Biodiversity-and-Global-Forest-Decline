let url = 'http://127.0.0.1:5000/api';

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

    // Extract the data for the bar chart from the "regional" CSV file
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
      title: 'Regional Data',
      xaxis: { title: 'Category' },
      yaxis: { title: 'Species Count' },
      width: 1200,
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
        xaxis: { title: 'Category' },
        yaxis: { title: 'Value' },
        width: 1200,
        height: 800
      };

      // Update the bar chart
      Plotly.newPlot('bar1', barData, barLayout);
    }

    // Rest of the code...
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
      width: 1200,
      height: 800
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
      width: 1200,
      height: 800
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
      title: 'Biodiversity Overview',
      width: 1000,
      height: 1000
    };

    // Create the pie chart
    Plotly.newPlot('pie1', pieData, pieLayout);
  })
  .catch(function(error) {
    console.error(error);
  });

