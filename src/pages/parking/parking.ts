import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase, FirebaseListObservable } from 'AngularFire/database';

import { Timeline, Parkinglist, Profileuser, stand } from '../../model/parking/parking.model';

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
import * as firebase from 'firebase';
/**
 * 
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
  standin: stand = {
    name: "",
    email: ""
  }
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
  standby: "";
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
    this.homeaut.authState.subscribe(data => {
      if (data) {
        // const queryss = firebase.database().ref('notification').orderByChild('email').equalTo(data.email);
        // queryss.once('value', (snapshots) => {
        //   if (snapshots.val()) {
        //     snapshots.forEach((childSnapshot) => {
        //       var keys = childSnapshot.key;
        //       var itemdata = childSnapshot.val();
        //       this.standby = itemdata.name;
        //       return true
        //     })
        //   }
        // })
        this.db.list<stand>(`/notification/`).snapshotChanges().subscribe((res1) => {
          let i = 0, parking = 0;
          res1.forEach(park2 => {
            console.log(park2)
            let standpark = park2.payload.val();
            let standparkkey = park2.key;
            if (standpark.email == data.email) {
              this.standby = standpark.name;
            } else {
              this.standby = null;
            }
          })
        });
      }
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
        subTitle: 'ท่านต้องการที่จะเปิดการแจ้งเตือนเมื่อมีรถเข้า-ออก',
        buttons: [{
          text: "รับการแจ้งเตือน",
          role: "รับการแจ้งเตือน",
          handler: datae => {
            if (PA1 == false) {


              const querypark = firebase.database().ref('Parking-list/PA/');
              const query = firebase.database().ref('notification').orderByChild('email').equalTo(data.email);
              query.once('value', (snapshot) => {
                if (snapshot.val()) {
                  snapshot.forEach((childSnapshot) => {
                    var keys = childSnapshot.key;
                    var itemdata = childSnapshot.val();
                    if (itemdata.name == name) {
                      this.db.list(`/notification/`).remove(keys);
                      // let alert1 = this.alertCtrl.create({
                      //   title: '',
                      //   subTitle: 'ท่านได้กดแจ้งเตือนที่ช่องนี้แล้วท่านต้องการยกเลิกการแจ้งเตือนหรือไม่',
                      //   buttons: [{
                      //     text: "ยกเลิกการแจ้งเตือน",
                      //     role: "ยกเลิกการแจ้งเตือน",
                      //     handler: dataes => {
                      //       this.db.list(`/notification/`).remove(keys);

                      //     }
                      //   }, {
                      //     text: "ยกเลิก",
                      //     role: "ยกเลิก",
                      //     handler: dataes => {
                      //     }
                      //   }]
                      // });
                      // alert1.present();
                    } else {
                      let alert2 = this.alertCtrl.create({
                        title: '',
                        subTitle: 'ท่านได้กดแจ้งเตือนที่ช่อง' + itemdata.name + 'แล้วท่านต้องการเปลี่ยนช่องรับการแจ้งเตือนหรือไม่',
                        buttons: [{
                          text: "เปลี่ยนช่องรับการแจ้งเตือน",
                          role: "เปลี่ยนช่องรับการแจ้งเตือน",
                          handler: dataea => {
                            this.db.list(`/notification/`).remove(keys);
                            this.standin.email = data.email;
                            this.standin.name = name;
                            this.db.list<stand>(`/notification/`).push(this.standin);
                            querypark.orderByChild('status').equalTo(false).once('value', (snapshots) => {
                              if (snapshots.val()) {
                                this.time.datetime = this.formateDate();
                                this.time.time = this.formatime();
                                this.time.uid = data.email;


                                this.time.parkname = name;
                                this.time.status = false;


                                this.firebaseservice.addtime(this.time);
                                this.Storage.get('Notification').then((datanoti) => {
                                  if (datanoti == true) {
                                    this.localNotifications.schedule({
                                      title: 'Notifications',
                                      text: 'ช่องจอด' + name + 'ที่ท่านรับการแจ้งเตือนมีการเข้าจอด\nเวลา :' + this.time.datetime,

                                    });
                                  }

                                });
                              }
                            });


                          }
                        }, {
                          text: "ยกเลิก",
                          role: "ยกเลิก",
                          handler: dataea => {
                          }
                        }]
                      });
                      alert2.present();
                    }


                    console.log(keys, itemdata.email)
                    return true
                  })

                } else {
                  this.standin.email = data.email;
                  this.standin.name = name;
                  this.db.list<stand>(`/notification/`).push(this.standin);
                  querypark.orderByChild('status').equalTo(false).once('value', (snapshots) => {
                    if (snapshots.val()) {
                      this.time.datetime = this.formateDate();
                      this.time.time = this.formatime();
                      this.time.uid = data.email;


                      this.time.parkname = name;
                      this.time.status = false;


                      this.firebaseservice.addtime(this.time);
                      this.Storage.get('Notification').then((datanoti) => {
                        if (datanoti == true) {
                          this.localNotifications.schedule({
                            title: 'Notifications',
                            text: 'ช่องจอด' + name + 'ที่ท่านรับการแจ้งเตือนมีการเข้าจอด\nเวลา :' + this.time.datetime,

                          });
                        }

                      });
                    }
                  });
                }
                //contains all users that has apply as true
              })


            } else {
              let alert = this.alertCtrl.create({
                title: '',
                subTitle: 'กรุณารอจนกว่าช่องจอดของท่านจะเป็นสีแดง',
                buttons: ['ok']
              });
              alert.present();
            }
          }




        }, {
          text: "ยกเลิก",
          role: "ยกเลิก",
          handler: datae => {
            // this.Platforms.ready().then(() => {

            //   this.Lanch.navigate('18.81147,98.9542387')
            //     .then(
            //       success => {
            //         let alert = this.alertCtrl.create({
            //           title: 'Launched',
            //           subTitle: 'Launched navigator',
            //           buttons: ['ok']
            //         });
            //         alert.present();

            //       },
            //       error => {
            //         let alert = this.alertCtrl.create({
            //           title: 'Error',
            //           subTitle: 'Launched navigator' + error,
            //           buttons: ['ok']
            //         });
            //         alert.present();

            //       }
            //     );


            // });

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
    if (min.length == 1) {
      min = "0" + min;
    }
    var timeer = `${hours}:${min}`;
    return timeer;
  }
  back() {
    this.navCtrl.push(CarparkPage);
  }

  ionViewDidLoad() {

  }
}
