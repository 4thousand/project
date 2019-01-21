import { Injectable, NgZone } from '@angular/core';

import 'rxjs/add/operator/filter';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
@Injectable()
export class LocationTracker {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  
  constructor(public zone: NgZone,
    public geolocation:Geolocation) {
     
 
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
    enableHighAccuracy: true
  };
   
  this.watch = this.geolocation.watchPosition(options)
  .filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
   
    console.log(position);
   
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
   
  });
   
  }
  stopTracking() {
 
    console.log('stopTracking');
   
    
    this.watch.unsubscribe();
   
  }
 
}