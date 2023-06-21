
//Store the API endpoint as queryURl
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Perform a GET request to the query URL/
var plates;
d3.json(queryURL).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  plates = L.geoJson(data);
  createFeatures(data.features);
});

var earthquakes = [];
var lat;
var lng;
var EarthquakeLayers;

// Define a function that we want to run once for each feature in the features array.
function createFeatures(earthquakeData){

  // Give each feature a popup that describes the place and time of the earthquake.
  earthquakeData.forEach(x => {
    lat= x.geometry.coordinates[1];
    lng= x.geometry.coordinates[0];
    let felt;

    if(x.properties.felt){
      felt= x.properties.felt
    }
    else{
      felt= 0;
    }

    earthquakes.push(
      L.circle([lat,lng], {
        stroke:true,
        fillOpacity: 0.75,
        weight:1,
        color: "#3388ff",
        fillColor: circleColor(x.geometry.coordinates[2]),
        radius: circleSize(x.properties.mag)
      }).bindPopup(
        "<h3>" + x.properties.place + "</h3><hr><p>Magnitude:" + x.properties.mag + "</p><p>How many felt it? "+ felt +"</p><p>" + new Date(x.properties.time) + "</p>", {
          maxWidth : 560
      })
    )
  })

  EarthquakeLayers = L.layerGroup(earthquakes);

    // layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);


//Create a Geojson layer that contains the features array on the earthquakeData object.
//Run the onEachFeature function once for each piece of data in the array. 

  createMap(plates);

} 


//Function to determine the circle marker size 
function circleSize(mag){
  return mag * 30000;
}

var color;

//Function to determine circle marker size
function circleColor(depth){
  color ="green";
  if (depth < 10) {
      color = "#adff2f";  
  } else if (depth < 30) {
      color = "#00ff7f";
  } else if (depth < 50) {
      color = "#7fff00";
  } else if (depth < 70) {
      color = "#00fa9a";
  } else if (depth < 90) {
      color = "#7cfc00";
  } else if (depth < 110) {
      color = "#3cb371";
  } else if (depth < 130) {
      color = "#2e8b57";
  } else if (depth < 150) {
      color = "#006400";
  }
return color
  
}

//Send our earthquakes layer to the createMap function
function createMap() {

  // Create the base layers.

    let street= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }); 


    
  //Create a baseMaps object
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
      
    };


  //Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: EarthquakeLayers,
      //"Tectonic Plates": plates
    };

      

  //Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        39.0522, -110.2437
      ],
      zoom: 5,
      layers: [EarthquakeLayers,street]
    });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
   }).addTo(myMap);

   var legend = L.control({ position: 'bottomright' });
   var categories=['-10-10', '10-30', '30-50', '50-70', '70-90', '90-110', '110-130', '130-150'];
   var colors=["#adff2f", "#00ff7f", "#7fff00", "#00fa9a", "#7cfc00", "#3cb371", "#2e8b57", "#006400"];


   legend.onAdd = function () {

       var div = L.DomUtil.create('div', 'info legend');
       labels = []
           ;
       div.innerHTML = ""
       for (var i = 0; i < categories.length; i++) {

           labels.push(
               '<i style="height:10px; width:10 px; background: ' + (colors[i] ? colors[i] : '+') + '"></i>' +
               (categories[i] ? categories[i] : '+'));

       }
       div.innerHTML = labels.join('<br>');
       return div;

       //style="background:

   };

   // Adding legend to the map
   legend.addTo(myMap);


}










