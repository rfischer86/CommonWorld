import { Component,  OnInit,  Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgElement,  WithProperties } from '@angular/elements';
import { tileLayer,  latLng, LatLng,  Layer,  icon,  Marker, LatLngExpression, Map, LayerGroup } from 'leaflet';
import * as Leave from 'leaflet';
import { InfoPopupComponent } from './info-popup/info-popup.component';
import * as OSM from './osm-interface';
import { ImageService} from '@shared/images/image.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.component.scss'],
})
export class OsmComponent implements OnInit, AfterViewInit {
  @Output() newMapCenter = new EventEmitter<LatLng>();

  map: Map;
  isLoaded = false;
  latitude: number;
  longitude: number;
  latLon = {
    latitude: this.latitude,
    longitude: this.longitude
  };
  baseMape = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Open Street Map'
  });
  baseLayer = {'baseMape': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };
  pinPath = 'assets/icons/mat-location.svg';
  mapLayerGroups: {[key: string]: LayerGroup} = {};
  infoPopup: Layer;
  options = {};
  places: OSM.OsmMarker[] = [];
  addedPlaces: OSM.OsmMarker[] = [];

  constructor(
    private imageService: ImageService
    ) {
    }

  @Input() set setCenter(geoCoord: {
    latitude: number,
    longitude: number
  }) {
    this.latitude = geoCoord.latitude;
    this.longitude = geoCoord.longitude;
    this.options = {
      layers: [this.baseMape],
      zoom: 12,
      center: latLng(this.latitude, this.longitude)
    };
    this.isLoaded = true;
  }

  @Input() set setMarker(markers) {
    if (this.isLoaded && markers.length > 0) {
      this.places = markers;
      of(this.createMarkers()).toPromise().then( () => {
          this.addLayerToMap();
      });
    }
  }

  @Input() set updateMarker(markers) {
    if (this.isLoaded && markers.length > 0) {
      this.places = markers;
      this.createMarkers();
    }
  }

  ngOnInit() {
    this.map = new Map('map', this.options);
    // To add a control inside the view to interactive add and remove layers
    // Leave.control.layers(this.baseLayer, null, {collapsed: true}).addTo(this.map);
  }

  ngAfterViewInit() {
    // the second argument is a callback function inside the map component,
    // thats why one must bind 'this', other wise the conext get lost
    this.map.on('moveend', this.onMoveEnd.bind(this));
  }

  onMoveEnd(event) {
    this.newMapCenter.emit(this.map.getCenter());
  }

  checkLayerGroup(layerName: string) {
    if (!Object.keys(this.mapLayerGroups).includes(layerName)) {
      this.mapLayerGroups[layerName] = new LayerGroup();
    }
  }

  createMarkers() {
    let alreadyOnMap = false;
    this.places.forEach(place => {
      alreadyOnMap = this.addedPlaces.filter(addedPlace => place.id === addedPlace.id ).length === 1;
      if (!alreadyOnMap) {
        this.addedPlaces.push(place);
        if (!place.markerType) {
          place.markerType = 'unknown Marker';
        }
        this.checkLayerGroup(place.markerType);
        const latLong: LatLngExpression = {
          lat: place.latitude,
          lng: place.longitude,
        };
        let newMarker: Marker;
        newMarker = new Marker(
          latLong, {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: this.pinPath,
            }),
            riseOnHover: true,
          });
        newMarker = this.addEvents(newMarker, place);
        this.markerClickInfoPopup(newMarker, place);
        newMarker.addTo(this.mapLayerGroups[place.markerType]);
      }
    });
    this.places = [];
  }

  addLayerToMap() {
    Object.keys(this.mapLayerGroups).map(key => {
      if (!this.map.hasLayer(this.mapLayerGroups[key])) {
        this.map.addLayer(this.mapLayerGroups[key]);
      } else {
        this.map.removeLayer(this.mapLayerGroups[key]);
        this.map.addLayer(this.mapLayerGroups[key]);
      }

    });
  }

  addEvents(changeMarker: Leave.Marker, place): Leave.Marker {
    changeMarker.on('click', () => {
      this.markerClickInfoPopup(changeMarker, place);
    });
    return changeMarker;
  }

  markerClickInfoPopup(changeMarker: Leave.Marker, place) {
    const reader = new FileReader();
    if (place.logoId === '00000000-0000-0000-0000-000000000000') {
      this.bindPopup(place, changeMarker);
    } else {
      this.imageService.getImage(place.logoId).subscribe(
        file => {
          reader.readAsDataURL(file);
          reader.onload = () => {
            place['logoImage'] = reader.result;
          };

          this.bindPopup(place, changeMarker);
        },
        (error) => console.log(error)
      );
    }
  }

  bindPopup(popupData, changeMarker) {
    const popupHTML: NgElement & WithProperties < InfoPopupComponent > = document.createElement('info-popup') as any;
    popupHTML.placeData = popupData;
    const markerPopup = new Leave.Popup({
        minWidth: 250,
        maxHeight: 150,
        closeButton: false,
        autoClose: false,
        className: 'info-popup',
        closeOnClick: true,
        keepInView: true,
        autoPan: false,
        autoPanPadding: new Leave.Point(0, 0)
      }).setLatLng(changeMarker.getLatLng())
      .setContent(popupHTML);
    markerPopup.addEventListener('remove', () => {});
    changeMarker.bindPopup(markerPopup, {
      offset: new Leave.Point(0, -25)
    });
  }
}
