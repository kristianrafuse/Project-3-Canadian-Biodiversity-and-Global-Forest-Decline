Canadian Biodiversity and Global Forest Decline
-------
In this ETL and interactive visualization project, I examine Canadian biodiversity decline and forested area loss. I used a variety of tools for the ETL process and the construction of a web app including Flask, sqlalchemy, SQL, Geoapify, ajax, D3, Plotly, and DataTables. 

Highlights
-------

In the ETL process I defined a function to geocode country names and get coordinates using Geoapify, as I wanted to plot country data on a map, but didn't have the data:
```
def geocode_country(country):
    try:
        params = {
            'text': country,
            'apiKey': api_key,
        }
        response = requests.get(api_endpoint, params=params)
        data = response.json()

        if 'features' in data and data['features']:
            latitude = data['features'][0]['properties']['lat']
            longitude = data['features'][0]['properties']['lon']
            return latitude, longitude
        else:
            return None, None
    except requests.exceptions.RequestException:
        return None, None
```

Easy initialization of DataTables:
```
$(document).ready(function() {
  $('#myTable').DataTable({
    data: formattedData,
    columns: columns,
  });
});
```

Create interactive and responsive visualizations: 
```
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
        width: 1100,
        height: 1000
      };

      // Update the bar chart
      Plotly.newPlot('bar1', barData, barLayout);
    }

```






Resources: 
-------
Regional breakdown of the status of wild species, Canada, 2020
https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/general-status-wild-species.html

National conservation status of wild species, Canada, 2020
https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/general-status-wild-species.html

General status of species in selected groups, Canada, 2020
https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/general-status-wild-species.html


Trends in bird populations by species group, Canada, 1970 to 2016
https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/trends-bird-populations.html
									

Canadian species index, percentage change, 1970 to 2016
https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/canadian-species-index.html


https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/general-status-wild-species.html#status-assessment
							

World Forest Cover Trends:
https://www.kaggle.com/datasets/parasharmanas/world-forest-cover-trends


Additional information available: 
https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry/general-status/wild-species-2020.html

Images sources included in HTML. 
