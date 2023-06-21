# leaflet-challenge
Module 15 Assignment
### This assignment is to practice creating geomaps using leaflet.js and d3.
### Background for analysis: 
  - The United States Geological Survey,USGS for short,is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment,and the impacts of climate and land-use change.Their
  - scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.
  - The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data.
  - They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it.
  - In this challenge, we have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues
  - facing our planet.   

 

### Part 1: Create the Earthquake Visualization
  - Getting the required dataset from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php, where USGS provides earthquake data in number of different formats. 
  - The dataset having "All Earthquakes from the Past 7 Days" is clicked which gives a json representation of that data. 
  - The URL of this JSON dataset is used to pull in the data for visualization. 
  - The following image shows the the sampling of earthquake data in JSON format:
  - ![image](https://github.com/BijoyetaK/leaflet-challenge/assets/126313924/b586b8bd-e367-4352-b686-7ec899a67d58)

  - The JSON is imported and visualized by doing the following: 
  - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
  - 2 baselayers are created (street and topo) and earthquake data as overlaymap layer. 
  - Circle markers(L.circle) are created reflecting the magnitude of the earthquake by the size and the depth of the earthquake by color. 
  - Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
  - The depth of the earth can be found as the third coordinate for each earthquake.
  - Pop ups on each circle provide additional information about the earthquake when its associated marker is clicked.
  - A that will provide context for the map data.(Depth pallete)

  - ![image](https://github.com/BijoyetaK/leaflet-challenge/assets/126313924/5f7e18e7-369d-4a49-9a68-126a12d439aa)



     
 ### references: 
   - module activities examples
   - leaflet.js site
   - medium 

