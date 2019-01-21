import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Parking, Profileuser, Timeline, Loglogin, Parkinglist, Carpark } from '../../model/parking/parking.model';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  userRef: AngularFireList<any>;
  user: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  item: Carpark = {
    name: "",
    empty: 6,
    slots: undefined,
    location: "",
    notempty: 0,
    status: undefined,
    url: ""
  }
  park: Parkinglist = {
    name: "",
    standby: "",
    status: true,
    local: ""
  };
  name: string;
  constructor(private db: AngularFireDatabase, private FirebaseServiceProvider: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


    this.itemsRef = db.list('Parking');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(data => {
      return data.map(data => ({ key: data.payload.key, ...data.payload.val() }));

    });

  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad NotificationPage');

  }
  addParking(item: Carpark) {
    var namess;
    this.item.name = "P" + this.name;
    this.item.empty = 6;
    this.item.notempty = 0;
    this.item.status = false;
    this.FirebaseServiceProvider.addPark(item);
    namess = this.item.name;
    for (var i = 1; i <= this.item.slots; i++) {
      console.log(this.name + i.toString());
      this.park.name = this.name + i.toString();
      this.park.standby = "none";
      this.park.status = true;
      this.park.local = this.item.location;
      this.FirebaseServiceProvider.addparklist(this.park, namess);
    }
  }

}
