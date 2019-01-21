import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profileuser } from '../../model/parking/parking.model';
import { Observable } from 'rxjs/Observable';
//import { AngularFireList } from 'angularfire2/database/interfaces';
//import { User } from 'firebase/app';
//import { Subscription } from 'ionic-native/node_modules/rxjs/Subscription';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
//import { ToastController } from 'ionic-angular/components/toast/toast-controller';
//import { Firebase, Camera } from 'ionic-native';
import { ViewChild, ElementRef } from '@angular/core';
import { LocationTracker } from '../../providers/location-track';
import { NgZone } from '@angular/core';


import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

/**
 * Generated class for the NavigatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html',
})
export class NavigatePage {

  userP: Profileuser = {
    key: "",
    uid: "",
    Email: "",
    DisplayName: "",
    Password: "",
    status,
  };
  public currentUser;
  public watch: any;
  public lat: any;
  public lng: any;
  public itemsRef;
  users: Observable<Profileuser[]>;
  map: any;
  img: any = 'assets/icon/pin.png';
  markers = [];
  public icon = {
    url: 'assets/icon/pin.png', // url

    scaledSize: new google.maps.Size(18, 18), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  @ViewChild('map') mapRef: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public locationTracker: LocationTracker
    , public navCtrl: NavController, public navParams: NavParams, public Geo: Geolocation, private platform: Platform
    , private homeaut: AngularFireAuth,
    private firebaseservice: FirebaseServiceProvider,
    private afb: AngularFireDatabase, public zone: NgZone, ) {
    platform.ready().then(() => {
      //this.locationTracker.startTracking();
      this.update();
      this.showMap();
      this.startTracking();
    });


  }
  update() {
    setTimeout(() => {
      console.log('a');
      this.set();
    }, 500);
  }
  set() {
    setTimeout(() => {
      this.update();
    }, 500);
  }
  ionViewDidLoad() {

    console.log("map", this.mapRef, this.lat, this.lng);

  }

  startTracking() {

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
    // Background Tracking
    // Foreground Tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true,

    };
    this.watch = this.Geo.watchPosition(options)
      .filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

        console.log(position);
        const locat = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.addMarker(locat, this.map);
        this.deleteMarkers();
        this.addMarker(locat, this.map);
        this.setMapOnAll(this.map);
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });


      });

  }

  showMap() {

    this.Geo.getCurrentPosition().then(pos => {

      this.directionsDisplay = new google.maps.DirectionsRenderer(
        {
          suppressMarkers: true
        });
      const location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      const option = {
        center: location,
        zoom: 50,
        streetViewControl: false,
        mapTypeId: 'terrain',
        rotateControl: true,
        fullscreenControl: true
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, option);
      const end = new google.maps.LatLng(18.813133, 98.9536546);
      this.directionsDisplay.setMap(this.map);
      this.directionsService.route({
        origin: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        destination: { lat: 18.813133, lng: 98.9536546 },
        travelMode: google.maps.TravelMode.DRIVING
      }
        , (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setOptions({ preserveViewport: true });

            this.directionsDisplay.setDirections(response);
            this.addMarkerend(end, this.map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

    }).catch(err => console.log(err));

    //
  }
  addMarkerend(position, map) {
    return new google.maps.Marker({
      position: position,
      map: this.map,

    });
  }
  addMarker(position, map) {

    let marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: this.icon
    });
    this.markers.push(marker);
  }
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  calculateAndDisplayRoute() {

  }

}
