import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Parking, Profileuser, Timeline, Loglogin, Parkinglist, Carpark } from '../../model/parking/parking.model';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  selector: 'page-addcarpark',
  templateUrl: 'addcarpark.html',
})
export class AddcarparkPage {
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
  picture: any;
  cam: any;
  constructor(private db: AngularFireDatabase, private getcamera: Camera
    , private FirebaseServiceProvider: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


    this.itemsRef = db.list('Parking');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(data => {
      return data.map(data => ({ key: data.payload.key, ...data.payload.val() }));

    });

  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad NotificationPage');

  }
  getpicture() {
    const options: CameraOptions = {
      targetWidth: 320,
      targetHeight: 240,

      quality: 70,
      destinationType: this.getcamera.DestinationType.DATA_URL,
      sourceType: this.getcamera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.getcamera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let cam_base64 = 'data:image/jpeg;base64,' + imageData;
      this.picture = cam_base64;

    }, (err) => {
      // Handle error
    });
  }
  camera() {
    const options: CameraOptions = {
      targetWidth: 320,
      targetHeight: 240,
      correctOrientation: true,
      quality: 50,
      destinationType: this.getcamera.DestinationType.DATA_URL,
      encodingType: this.getcamera.EncodingType.JPEG,
      mediaType: this.getcamera.MediaType.PICTURE
    }

    this.getcamera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let cam_base64 = 'data:image/jpeg;base64,' + imageData;
      this.picture = cam_base64;

    }, (err) => {
      // Handle error
    });
  }
  addParking(item: Carpark) {
    console.log(item)


    var namess;
    this.item.name = "P" + this.name;
    this.item.empty = 0;
    this.item.notempty = this.item.slots;
    this.item.status = false;

    if (this.picture) {
      const pic = firebase.storage().ref(`park/${this.item.name}`)
      pic.putString(this.picture, 'data_url').then(data => {
        data.ref.getDownloadURL().then(da => {
          this.item.url = da

          this.FirebaseServiceProvider.addPark(item);
        })
      })


    } else {
      this.FirebaseServiceProvider.addPark(item);
    }
    namess = this.item.name;
    for (var i = 1; i <= this.item.slots; i++) {
      console.log(this.name + i.toString());
      this.park.name = this.name + i.toString();
      this.park.standby = "none";
      this.park.status = true;
      this.park.local = this.item.location;
      this.FirebaseServiceProvider.addparklist(this.park, namess);


    }

    this.navCtrl.pop();
  }

}
