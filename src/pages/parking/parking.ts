import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase, FirebaseListObservable } from 'AngularFire/database';

import { Timeline, Parkinglist, Profileuser } from '../../model/parking/parking.model';

//import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
//import { database } from 'firebase/app';
import { CarparkPage } from '../carpark/carpark'
import { Parking } from '../../model/parking/parking.model';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Platform } from '../../../node_modules/ionic-angular/platform/platform';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { GetpicPage } from '../getpic/getpic';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the ParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html'

})

export class ParkingPage {
  time: Timeline = {
    uid: "",
    parkname: "",
    status: true,
    datetime: "",
    time: "",
  };
  pake;
  userP: Profileuser = {
    key: "",
    uid: "",
    Email: "",
    DisplayName: "",
    Password: "",
    status,
  };
  park: Parkinglist = {
    name: "",
    standby: "",
    status: true,
    local: "",
  };
  profile: Profileuser = {
    uid: "",
    key: "",
    Email: "",
    Password: "",
    DisplayName: "",
    status,
  }
  datetime;
  itemsRef: AngularFireList<any>;
  parkRef: AngularFireList<any>;
  items: Observable<any[]>;

  parkinglist$: Observable<Parking[]>
  itemsRefs: AngularFireList<any>;
  constructor(private localNotifications: LocalNotifications,
    private parkaht: AngularFireAuth, private db: AngularFireDatabase
    , private Lanch: LaunchNavigator, public alertCtrl: AlertController
    , public Platforms: Platform, public navCtrl: NavController,
    public navParams: NavParams, private firebaseservice: FirebaseServiceProvider, public Storage: Storage,
    private homeaut: AngularFireAuth, private photoViewer: PhotoViewer) {
    this.Platforms.ready().then(() => {
      // Use snapshotChanges().map() to store the key
      this.mycar();
      this.parkinglist$ = this.firebaseservice.getParkinglist().snapshotChanges().map(changes => {
        return changes.map(data => ({ key: data.payload.key, ...data.payload.val() }));
      });

      this.itemsRefs = db.list<Parkinglist>('/Parking-list/PA/');
      //this.items = this.itemsRefs.snapshotChanges().map(changes => {
      // return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      // });
    });
  }
  getui() {

  }
  mycar() {
    this.homeaut.authState.take(1).subscribe(data => {
      this.profile.Email = data.email;
      console.log(this.profile.Email);
      this.profile.DisplayName = data.displayName;
    });
  }
  nvigate() {
    this.Platforms.ready().then(() => {

      this.Lanch.navigate('18.81147,98.9542387')
        .then(
          success => {
            let alert = this.alertCtrl.create({
              title: 'Launched',
              subTitle: 'Launched navigator',
              buttons: ['ok']
            });
            alert.present();

          },
          error => {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Launched navigator' + error,
              buttons: ['ok']
            });
            alert.present();

          }
        );


    });
  }
  test(test: any) {
    console.log(test);
  }
  PA1(PA1: boolean, standby: string, name: string, key: string) {
    console.log(key);

    this.homeaut.authState.take(1).subscribe(data => {

      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'ท่านต้องการที่จะเข้าจอดหรือเข้าสู่ระบบนำทางไปยังลานจอด',
        buttons: [{
          text: "เข้าจอด",
          role: "เข้าจอด",
          handler: datae => {
            if (PA1 == true) {
              this.itemsRefs.update(key, { standby: "none" });
              let alert = this.alertCtrl.create({
                title: '',
                subTitle: 'กรุณารอจนกว่าช่องจอดของท่านจะเป็นสีแดง',
                buttons: ['ok']
              });
              alert.present();
            } else {
              if (standby == "none") {
                this.db.list<Parkinglist>(`/Parking-list/PA/`).snapshotChanges().take(1).subscribe((res) => {
                  res.forEach(park => {
                    let parks = park.payload.val();
                    let parkkey = park.key;
                    if (parks.standby == data.email) {
                      this.itemsRefs.update(parkkey, { standby: "none" });
                    }
                  })
                });

                this.park.status = false;
                this.time.uid = data.email;
                this.time.parkname = name;
                this.time.status = false;
                this.time.datetime = this.formateDate();
                this.time.time = this.formatime();
                this.itemsRefs.update(key, { standby: data.email });
                this.firebaseservice.addtime(this.time);
                this.Storage.get('Notification').then((datanoti) => {
                  if (datanoti == true) {
                    this.localNotifications.schedule({
                      title: 'Notifications',
                      text: 'ท่านได้ทำการเข้าจอดณช่อง' + name + 'เวลา :' + this.time.datetime,

                    });
                  }

                });
              }
              else {
                let alert = this.alertCtrl.create({
                  title: '',
                  subTitle: 'ท่านได้เข้าจอดแล้วหรือมีท่านอื่นจอดในช่องนั้นอยู่',
                  buttons: ['ok']
                });
                alert.present();
              }

            }
          }
        }, {
          text: "นำทาง",
          role: "นำทาง",
          handler: datae => {
            this.Platforms.ready().then(() => {

              this.Lanch.navigate('18.81147,98.9542387')
                .then(
                  success => {
                    let alert = this.alertCtrl.create({
                      title: 'Launched',
                      subTitle: 'Launched navigator',
                      buttons: ['ok']
                    });
                    alert.present();

                  },
                  error => {
                    let alert = this.alertCtrl.create({
                      title: 'Error',
                      subTitle: 'Launched navigator' + error,
                      buttons: ['ok']
                    });
                    alert.present();

                  }
                );


            });

          }
        }]
      });
      alert.present();
    });

    //this.park.standby = data.email;
    // this.park.name = name;

    /*  if(PA1 == true)
      {
        
        
        this.time.uid = data.email;
        this.time.parkname = name;
        this.time.status = false;
        this.time.datetime = this.formateDate();
        if(standby == "none")
        {
          
          this.itemsRefs.update(key,{});
        }
        else{
  
        }
        
        //this.firebaseservice.updategps(this.userP);
        this.firebaseservice.addtime(this.time);
  
      } 
        else
      {
        this.time.uid = data.email;
        this.park.status = true;
     
        this.time.parkname = name;
        this.time.status = true;
        this.time.datetime = this.formateDate();
        this.itemsRefs.update(key,{standby:data.email});
        //this.firebaseservice.updatePark(this.park);
      //  this.itemsRefs.update(key, { status: false, standby:data.email });
        this.firebaseservice.addtime(this.time);
      }
     */

  }
  getimg() {
    this.navCtrl.push(GetpicPage);
    // this.photoViewer.show('https://firebasestorage.googleapis.com/v0/b/blissful-flames-185507.appspot.com/o/images%2Fparking.jpg?alt=media&token=2b0b0e99-2025-4035-9a51-f242c0449adf', 'My image title', { share: false });
  }
  navigat() {
    let options: LaunchNavigatorOptions = {
      start: 'London, ON',
      app: this.Lanch.APP.UBER
    };

    this.Lanch.navigate('18.813133, ON', options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
  formateDate() {
    var dates = new Date();

    var day = dates.getDate().toString();
    var month = dates.getMonth() + 1;
    var Year = dates.getFullYear().toString();

    this.datetime = `${Year}/${month}/${day}`;
    return this.datetime;

  }
  formatime() {
    var dates = new Date();

    var hours = dates.getHours().toString();
    var min = dates.getMinutes().toString();

    var timeer = `${hours}:${min}`;
    return timeer;
  }
  back() {
    this.navCtrl.push(CarparkPage);
  }

  ionViewDidLoad() {

  }
}
