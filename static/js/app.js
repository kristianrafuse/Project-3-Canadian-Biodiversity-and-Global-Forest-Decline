let url = 'http://127.0.0.1:5000/api';

d3.json(url)
  .then(function(response) {
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
      type: 'scatter'
    }));

    // Create the layout for the first line graph
    const layout = {
      title: 'Bird Population Changes',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Percentage Change' }
    };

    // Create the first line graph
    Plotly.newPlot('line2', traces, layout);

    // Load the data for the second line graph from species_percent.csv_data
    const secondLineData = response.species_percent.csv_data;

    // Extract the years from the data
    const secondLineYears = secondLineData.map(entry => parseInt(entry.Year));

    // Extract the national index percentage change values
    const nationalIndex = secondLineData.map(entry => parseFloat(entry['National index (percent change)']));

    // Create the trace for the second line graph
    const secondLineTrace = {
      x: secondLineYears,
      y: nationalIndex,
      name: 'National Index',
      type: 'scatter'
    };

    // Create the layout for the second line graph
    const secondLineLayout = {
      title: 'Species Percentage Change',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Percentage Change' }
    };

    // Create the second line graph
    Plotly.newPlot('line1', [secondLineTrace], secondLineLayout);
  })
  .catch(function(error) {
    console.error(error);
  });
