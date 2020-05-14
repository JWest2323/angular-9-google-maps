import { Component, ViewChild, OnInit } from "@angular/core";
import { MapInfoWindow, MapMarker, GoogleMap } from "@angular/google-maps";
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

interface citiMarker {
    latLng: google.maps.LatLngLiteral
    type: 'branch' | 'atm'
    options: {
      draggable: boolean
      icon: string
    }
}
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
  markers: citiMarker[] = [
    {latLng: {lat: 26.073581419812424, lng: -80.33291691002196},
    options: {draggable: false, icon: "https://img.icons8.com/ultraviolet/40/000000/bank.png"},
    type: "atm"},
    {latLng: {lat: 26.034101756132287, lng: -80.19970768150634},
    options: {draggable: false, icon: "https://img.icons8.com/ultraviolet/40/000000/bank.png"},
    type: "branch"},
    {latLng: {lat: 26.16729226373687, lng: -80.11181705650634},
    options: {draggable: false, icon: "https://img.icons8.com/ultraviolet/40/000000/bank.png"},
    type: "atm"},
    {latLng: {lat: 26.274474133866548, lng: -80.23815982994384},
    options: {draggable: false, icon: "https://img.icons8.com/ultraviolet/40/000000/bank.png"},
    type: "branch"}
  ];
  zoom = 10;
  display?: google.maps.LatLngLiteral;
  currentLocationInfo: google.maps.LatLngLiteral;
  
  myMarker = new google.maps.Marker();
  icons: any;

  // array for map bounds 
  mapBounds: google.maps.LatLngBounds[] = [];
  
  // Callback booleans
  mapLoaded: boolean;
  markersLoaded: boolean;
  mapDragged: boolean;
  centerChanged: boolean;
  zoomChange: boolean;
  


  getCurrentLocation(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const latLng = {lat: latitude, lng: longitude};

        this.currentLocationInfo = latLng;
        this.center = latLng; 
        //this.markerPositions.push(this.myMarker.getPosition().toJSON());
        //this.centerOnSelf();
        // console.log(this.center);
        
      })
    }
  }

  centerOnSelf(){
    this.center = this.currentLocationInfo;
  }

  centerOnMarker(event: google.maps.MouseEvent) {
    const latLng = event.latLng.toJSON();
    this.center = latLng;
  }
  filterMarkers() {
    this.markers = this.markers.filter((marker: citiMarker) => marker.type === 'atm')
  }

  ngOnInit(){
    this.getCurrentLocation();
    this.centerOnSelf();
  }

  addMarker(event: google.maps.MouseEvent) {
    const newMarker: citiMarker = {latLng: event.latLng.toJSON(), type: "atm", options: {draggable: false, icon: 'https://img.icons8.com/ultraviolet/40/000000/bank.png'}};
    this.markers.push(newMarker);
    console.log(this.markers);
    
  }

  announceNewBounds() {
    this.mapBounds.push(this.map.getBounds());
    this.mapBounds.reverse();
    //console.log("map bounds: " + this.map.getBounds());
  }
  tilesLoaded() {
    this.mapLoaded = true;
    console.log('tiles Loaded')
    setTimeout(()=> {
      this.mapLoaded = false;
    }, 3000)
  }
  mapDragEvent() {
    this.mapDragged = true;
    this.centerChanged = true;
    console.log('map dragged');
    console.log('center changed');
    setTimeout(()=> {
      this.mapDragged = false;
      this.centerChanged = false;
    }, 3000);
  }

  zoomChanged() {
    this.zoomChange = true;
    console.log('zoom changed');
    setTimeout(()=> {
      this.zoomChange = false;
    }, 3000);
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markers.pop();
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
   initMap() {
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
    
    this.icons = {
      // branch icon
      branch: {
        url: '',
        scaledSize: new google.maps.Size(35, 31)
      },
      // active branch icon
      branchActive:  {
        url: '',
        scaledSize: new google.maps.Size(58, 53)
      },
      // atm icon
      atm: {
        url: '',
        scaledSize: new google.maps.Size(35, 31) 
      }, 
      // active atm icon
      atmActive: {
        url: '',
        scaledSize: new google.maps.Size(58, 53)
      },
      // moneyPass icon
      moneypass: {
        url: '',
        scaledSize: new google.maps.Size(35, 31)
      },
      // active moneyPass icon
      moneypassActive: {
        url: '',
        scaledSize: new google.maps.Size(58, 53)
      },
      // user location icon
      userlocation: {
        url: 'assets/marker-circle.png',
        scaledSize: new google.maps.Size(35, 35)
      }


    }



    
    
    return map;
  }
}
