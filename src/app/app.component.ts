import { Component, ViewChild, OnInit } from "@angular/core";
import { MapInfoWindow, MapMarker, GoogleMap } from "@angular/google-maps";


@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  displaySidenav = true;

  @ViewChild('map') map: google.maps.Map;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  bluedot = '../../assets/marker-circle.png';

  
  center: google.maps.LatLngLiteral;
  markerOptions = { draggable: false, icon: 'https://img.icons8.com/ultraviolet/40/000000/bank.png' };
  markerOptions2 = { draggable: false, icon: 'https://img.icons8.com/ultraviolet/40/000000/circled-dot.png' };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 10;
  display?: google.maps.LatLngLiteral;
  currentLocationInfo: google.maps.LatLngLiteral;
  
  myMarker = new google.maps.Marker();
  


  getCurrentLocation(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const latLng = {lat: latitude, lng: longitude};

        this.currentLocationInfo = latLng;
        this.center = latLng; 
        //this.markerPositions.push(this.myMarker.getPosition().toJSON());
        this.centerOnSelf();
        // console.log(this.center);
        
      })
    }
  }

  centerOnSelf(){
    this.center = this.myMarker.getPosition().toJSON();
  }

  centerOnMarker(event: google.maps.MouseEvent) {
    const latLng = event.latLng.toJSON();
    this.center = latLng;
  }

  ngOnInit(){
    this.getCurrentLocation();
  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
    console.log(this.markerPositions);
    
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

  CenterControl(controlDiv, map: google.maps.Map) {
    var currLocation: any;
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center Map';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      this.map.setCenter(currLocation);
    });

  }

  // init map and place the custom control ui
   initMap(): google.maps.Map {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: this.currentLocationInfo
    });

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new this.CenterControl(centerControlDiv, map);

    //centerControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControl);
    return map;
  }
}
