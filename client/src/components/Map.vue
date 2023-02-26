<template>
  <!-- Import map component -->
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

let mapDiv;
export default {
  name: "Map",
  data() {
    return{
      center: [57.7088, 11.9745]
    }},
    mounted() {
      this.setupLeafletMap();
        this.$root.$on('ClinicSlots', data => {
          console.log(data)
            this.panToClinic(data)
 
       })
    },

  methods: {
    setupLeafletMap: function () {
      mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapDiv);

      const toothIcon = L.icon({
        iconUrl: 'icons8-tooth-67.png',

        iconSize:     [45, 45],
        shadowSize:   [50, 42],
        iconAnchor:   [30, 45],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
      });

      const marker = L.marker([57.707619, 11.969388], {icon: toothIcon}).addEventListener('click', function(e){
        mapDiv.flyTo(this.getLatLng(), 13);
        //openClinicDetails(1);
        this.panToClinic('Your Dentist')
      }).addTo(mapDiv);
      const marker1 = L.marker([57.685255, 11.942625], {icon: toothIcon}).addEventListener('click', function(e){
        mapDiv.flyTo(this.getLatLng(), 13);
        //openClinicDetails(2)
        this.panToClinic("Tooth Fairy Dentist")
      }).addTo(mapDiv);
      const marker2 = L.marker([57.709872, 11.940386], {icon: toothIcon}).addEventListener('click', function(e){
        mapDiv.flyTo(this.getLatLng(), 13);
        //openClinicDetails(3)
        this.panToClinic('The Crown')
      }).addTo(mapDiv);
      const marker3 = L.marker([57.694723, 11.991153], {icon: toothIcon}).addEventListener('click', function(e){
        mapDiv.flyTo(this.getLatLng(), 13);
        //openClinicDetails(4)
        this.panToClinic("Lisebergs Dentists")
      }).addTo(mapDiv);
    },

    panToClinic: function (clinicId) {
      switch(clinicId) {
        case 'Your Dentist': {
        mapDiv.flyTo({
    "lat": 57.707619,
    "lng": 11.969388
}, 13);
        mapDiv.panTo(new L.LatLng(57.707619, 11.969388));
      break;
        }
          
        case "Tooth Fairy Dentist": { 
        mapDiv.flyTo({
    "lat": 57.685255,
    "lng": 11.942625
}, 13);
        map.panTo(new L.LatLng(57.685255, 11.942625));
      break;
        }
      
          
        case 'The Crown': {
        mapDiv.flyTo({
    "lat": 57.709872,
    "lng": 11.940386
}, 13);
        map.panTo(new L.LatLng(57.709872, 11.940386));
      break;
        }
          

        case "Lisebergs Dentists": {
        mapDiv.flyTo({
    "lat": 57.694723,
    "lng": 11.991153
}, 13);
        map.panTo(new L.LatLng(57.694723, 11.991153));
      break;
        }
        
         
      }
    }
  }
};
</script>

<style scoped>
#mapContainer {
  height: 400px;
  width: 700px;
  margin-top: 20px;
  margin-left: 100px;
  box-shadow: 0px 4px 4px rgba(143, 145, 190, 0.25);
}
</style>
