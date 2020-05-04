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
        this.markerPositions.push(this.myMarker.getPosition().toJSON());
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


}
