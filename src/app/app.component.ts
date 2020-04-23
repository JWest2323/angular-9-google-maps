import { Component, ViewChild, OnInit } from "@angular/core";
import { MapInfoWindow, MapMarker, GoogleMap } from "@angular/google-maps";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";

  @ViewChild(GoogleMap) map: google.maps.Map;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  center: google.maps.LatLngLiteral;
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 10;
  display?: google.maps.LatLngLiteral;

  myMarker = new google.maps.Marker({
    // position: {lat: -34.397, lng: 150.644},
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });

  getCurrentLocation(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const latLng = {lat: latitude, lng: longitude};
        this.myMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
        this.myMarker.setMap(this.map);
        this.myMarker.setPosition(latLng);
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

  centerOnMarker(marker: google.maps.LatLngLiteral) {
    const lat = marker.lat;
    const lng = marker.lng;
    const latLng = {lat: lat, lng: lng};
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
