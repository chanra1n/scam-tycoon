var isNight = false;


function dayNightCycle(){
  

  if (!isNight){
    // it's daytime!
    document.getElementById('fog_filter').style.opacity = "15%";
    document.getElementById('world-map').style.filter = "brightness(70%)";

    var buildings = document.getElementsByClassName('admin-building');
var offices = document.getElementsByClassName('office-building');
var gasStations = document.getElementsByClassName('gas-station');
var libraries = document.getElementsByClassName('library');
var policeStations = document.getElementsByClassName('police-station');
var fireStations = document.getElementsByClassName('fire-station');
var restaurants = document.getElementsByClassName('restaurants');
var homes = document.getElementsByClassName('homes');

for (var i = 0; i < buildings.length; i++){
  buildings[i].style.backgroundImage = "url('sprites/office_building_1_night.png')";
  buildings[i].style.boxShadow = "0px 0px 10px yellow";
}

for (var i = 0; i < offices.length; i++){
  offices[i].style.backgroundImage = "url('sprites/office_building_1_night.png')";
  offices[i].style.boxShadow = "0px 0px 7px yellow";
}

for (var i = 0; i < gasStations.length; i++){
  gasStations[i].style.backgroundImage = "url('sprites/gas_station_night.png')";
  gasStations[i].style.boxShadow = "0px 0px 5px yellow";
}

for (var i = 0; i < libraries.length; i++){
  libraries[i].style.backgroundImage = "url('sprites/library_night.png')";
  libraries[i].style.boxShadow = "0px 0px 10px yellow";
}

for (var i = 0; i < policeStations.length; i++){
  policeStations[i].style.backgroundImage = "url('sprites/police_station_night.png')";
  policeStations[i].style.boxShadow = "0px 0px 10px yellow";
}

for (var i = 0; i < restaurants.length; i++){
  restaurants[i].style.backgroundImage = "url('sprites/rest_1_night.png')";
  restaurants[i].style.boxShadow = "0px 0px 5px yellow";
}

    isNight = true;
  } else {
    // it's nighttime!
    document.getElementById('fog_filter').style.opacity = "10%";
    document.getElementById('world-map').style.filter = "none"

var buildings = document.getElementsByClassName('admin-building');
var offices = document.getElementsByClassName('office-building');
var gasStations = document.getElementsByClassName('gas-station');
var libraries = document.getElementsByClassName('library');
var policeStations = document.getElementsByClassName('police-station');
var fireStations = document.getElementsByClassName('fire-station');
var restaurants = document.getElementsByClassName('restaurants');
var homes = document.getElementsByClassName('homes');

for (var i = 0; i < buildings.length; i++){
  buildings[i].style.backgroundImage = "url('sprites/office_building_1.png')";
  buildings[i].style.boxShadow = "0 0 0 0px rgba(255, 0, 0, 0)";
}

for (var i = 0; i < offices.length; i++){
  offices[i].style.backgroundImage = "url('sprites/office_building_1.png')";
  offices[i].style.boxShadow = "0 0 0 0px rgba(255, 0, 0, 0)";
}

for (var i = 0; i < gasStations.length; i++){
  gasStations[i].style.backgroundImage = "url('sprites/gas_station.png')";
  gasStations[i].style.boxShadow = "0 0 0 0px rgba(255, 0, 0, 0)";
}

for (var i = 0; i < libraries.length; i++){
  libraries[i].style.backgroundImage = "url('sprites/library.png')";
  libraries[i].style.boxShadow = "0 0 0 0px rgba(255, 0, 0, 0)";
}

for (var i = 0; i < policeStations.length; i++){
  policeStations[i].style.backgroundImage = "url('sprites/police_station.png')";
  policeStations[i].style.boxShadow = "0 0 0 0px rgba(255, 0, 0, 0)";
}

for (var i = 0; i < restaurants.length; i++){
  restaurants[i].style.backgroundImage = "url('sprites/rest_1.png')";
  restaurants[i].style.boxShadow = "0 0 0 0px rgba(255, 0, 0, 0)";
}

    isNight = false;
  }

}
