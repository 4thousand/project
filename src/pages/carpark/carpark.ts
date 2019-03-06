import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase, FirebaseListObservable } from 'AngularFire/database';

import { Timeline, Parkinglist, Profileuser, Carpark, application } from '../../model/parking/parking.model';

import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { database } from 'firebase/app';
import { ParkingPage } from '../parking/parking';
import { Parking } from '../../model/parking/parking.model';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Platform } from '../../../node_modules/ionic-angular/platform/platform';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the CarparkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ViewChild } from '@angular/core';
//
import { DateTime } from 'ionic-angular';


import { BackgroundMode } from '@ionic-native/background-mode'

import { MycarPage } from '../mycar/mycar'
//import { NavigatePage } from '../navigate/navigate';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/take';


import { LoginPage } from '../login/login';

//import { NotificationPage } from '../notification/notification';
import { Slides } from 'ionic-angular';
//import { TimelinePage } from '../timeline/timeline';

import { AngularFireObject } from 'angularfire2/database';
import { Loglogin } from '../../model/parking/parking.model';
import { AppVersion } from '@ionic-native/app-version';

import { User } from 'firebase/app';
//import { Subscription } from 'ionic-native/node_modules/rxjs/Subscription';

import { ToastController } from 'ionic-angular/components/toast/toast-controller';

//import { LaunchnavigatePage } from '../launchnavigate/launchnavigate';

import * as firebase from 'firebase';
import { SettingPage } from '../setting/setting';
import { AboutPage } from '../about/about';
import { Storage } from '@ionic/storage';
import { TimelinePage } from '../timeline/timeline';
import { AddcarparkPage } from '../addcarpark/addcarpark';
///

@IonicPage()
@Component({
  selector: 'page-carpark',
  templateUrl: 'carpark.html',
})
export class CarparkPage {

  parkinglist$: Observable<Parking[]>
  //   carpark:Carpark={

  //     name:"",
  //     slots:6,
  //     empty:undefined,
  //     location:"",
  //     notempty:undefined,
  //     status:undefined,
  //     GPS:{
  //       lat:undefined,
  //       long:undefined
  //    }
  // }
  myDate: String = new Date().toISOString();
  datetime;
  _arraData: Observable<User>;
  private userdata: AngularFireObject<Profileuser>;
  users: Observable<Profileuser[]>;
  usersT: Observable<Profileuser[]>;
  public itemsRef;
  Login: String = "Login";
  keyp: string;
  turn: number;
  Loglogins: Loglogin = {
    uid: "",
    email: "",
    status: "Login",
    datetime: "",
  };

  time: Timeline = {
    uid: "",
    parkname: "",
    status: true,
    datetime: "",
    time: "",
  };
  userp: Profileuser = {
    key: "",
    Email: "",
    DisplayName: "",
    Password: "",
    status,

  };
  private usersc: Observable<Profileuser[]> = null;
  PA;
  authState: any = null;
  park: Parkinglist = {
    name: "",
    standby: "",
    status: true,
    local: "",

  };
  userid: string;
  bgmod = false;
  itemsRefs: AngularFireList<any>;
  pet: string = "puppies";
  isAndroid: boolean = true;
  //
  public carparklist: AngularFireList<any>;
  constructor(private localNotifications: LocalNotifications,
    private parkaht: AngularFireAuth, private db: AngularFireDatabase
    , private Lanch: LaunchNavigator, public alertCtrl: AlertController
    , public Platforms: Platform, public navCtrl: NavController,
    public navParams: NavParams, private storage: Storage, private appVersion: AppVersion
    , private firebaseservice: FirebaseServiceProvider, public backgroundMode: BackgroundMode) {

    this.isAndroid = Platforms.is('android');
    //console.log(this.formateDate());
    Platforms.ready().then(() => {

      this.parkaht.authState.take(1).subscribe(data => {

        if (data) {


          ////console.log(data.email);
          //
          this.Loglogins.uid = data.uid;
          this.Loglogins.email = data.email;
          this.Loglogins.status = 'Login';
          this.Loglogins.datetime = this.formateDate();
          // this.formateDate(this.date); 
          this.firebaseservice.updateLog(this.Loglogins);
          

          if (this.backgroundMode.isEnabled()) {

          } else {
            this.bgnotiFunction();
          }

          //console.log("bg");
          this.backgroundMode.on('activate').take(1).subscribe(() => {
            this.bgnotiFunction();
          });

          this.backgroundMode.enable();
          //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();

        }
        //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
      });
      this.registerSocial();
      this.setdefault();

    });
    this.itemsRefs = this.db.list<Parkinglist>('/Parking-list/PA/');

    /*
      this.db.list<Parkinglist>(`/Parking-list/PA/`).snapshotChanges().subscribe((res) => {
        this.parkaht.authState.take(1).subscribe(datae => {
          if (datae) {
            res.forEach(data => {
              let parkstand = data.payload.val();
              if (parkstand.standby == datae.email) {
                this.navCtrl.push(ParkingPage);
              }
            });
          }
        })
      });
    */
    this.parkinglist$ = this.firebaseservice.getcarpark().snapshotChanges().map(changes => {
      return changes.map(data => ({ key: data.payload.key, ...data.payload.val() }));
    });

    this.carparklist = this.db.list<Carpark>(`/Park-Car/`);
    this.loadparkA();
    //console.log(this.parkinglist$);
  }

  setdefault() {
    //this.bgnotiFunction();
    this.storage.get('Notification').then((data) => {
      if (data == null || data == undefined) {
        //setdeful
        this.storage.set('Notification', true);
      }
    });


    this.storage.get('Version').then((datav) => {
      if (datav == null || datav == undefined) {
        //console.log(datav + "nohave");
        this.storage.set('Version', "1.0.7");
      }
    });
    var version;

    this.db.list<application>(`application`).valueChanges().subscribe((res => {
      res.forEach(datas => {
        version = datas;

        this.storage.set('MyAppVersion', version);
      })
    }));

  }

  formateDate() {
    var dates = new Date();
    var day = dates.getDate().toString();
    var month = dates.getMonth() + 1;
    var Year = dates.getFullYear().toString();

    this.datetime = `${Year}/${month}/${day}`;
    return this.datetime;

  }
  formatetime() {
    var dates = new Date();
    var hours = dates.getHours().toString();
    var min = dates.getMinutes().toString();
    if (min.length == 1) {
      min = "0" + min;
    }
    var time = `${hours}:${min}`;
    return time;
  }
  registerSocial() {
    var id = 0;



    ///this.userp.uid = data.uid;

    this.db.list<Profileuser>(`/ProfileUser/`).valueChanges().take(1).subscribe((res: Profileuser[]) => {
      this.parkaht.authState.take(1).subscribe(data => {
        this.userp.Email = data.email;
        this.userp.DisplayName = data.displayName;
        this.userp.status = "online";
        ////console.log(res);
        res.forEach((item) => {
          if (item.Email == data.email) {
            id = 1;
          }
          //console.log(id);
        });
        if (id == 0) {
          this.firebaseservice.login(this.userp)
            //.then(ref=>
            .then(ref => {

              this.db.object<Profileuser>(`/ProfileUser/${ref.key}`).update({ key: ref.key });
              this.navCtrl.setRoot(TabsPage, { key: ref.key });
            });
        }
      });

    });
  }

  bgnotiFunction() {
    //console.log("bg1");
    var itemthis;

    // this.db.list<Parkinglist>(`/Parking-list/PA/`).snapshotChanges().subscribe((res) => {
    //   this.parkaht.authState.subscribe(datae => {
    //     if (datae) {
    //       res.forEach(item => {

    //         let parkingrefts = item.payload.val();
    //         let parkey = item.key;
    //         //console.log(parkingrefts.name + " " + parkingrefts.status + " " + parkingrefts.standby);
    //         const querypark = firebase.database().ref('Parking-list/PA/');
    //         const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
    //         query.once('value', (snapshot) => {
    //           if (snapshot.val()) {
    //             snapshot.forEach((childSnapshot) => {
    //               var keys = childSnapshot.key;
    //               var itemdata = childSnapshot.val();
    //               if (itemdata.name == parkingrefts.name) {
    //                 console.log(parkingrefts)
    //               }
    //               return true
    //             })
    //           }
    //         })
    // if (parkingrefts.status == true && parkingrefts.standby != "none") {


    //   if (parkingrefts.standby == datae.email) {
    //     this.storage.get('Notification').then((datanoti) => {
    //       if (datanoti == true) {
    //         this.localNotifications.schedule({
    //           title: 'Notifications ',
    //           text: 'รถของท่านได้ทำการออกจากช\n ช่อง :' + parkingrefts.name + '\nเวลา :' + this.formateDate(),

    //         });
    //       }
    //     });
    //     this.time.uid = parkingrefts.standby;
    //     this.time.parkname = parkingrefts.name;
    //     this.time.status = true;
    //     this.time.datetime = this.formateDate();
    //     this.time.time = this.formatetime();
    //     this.firebaseservice.addtime(this.time);
    //     //console.log("none");
    //   }
    //   // this.itemsRefs.update(parkey, { standby: "none" }).then(data => {
    //   //   //console.log("then")
    //   // });
    // }
    //   })
    // }


    //       })
    //     })
    // ในส่วนนี้ ถ้าใช้ loop จะทำให้แจ้งเตือนแม้จะช่องที่จองไว้ไม่มีความเคลื่อนไหว เพื่อให้แจ้งเตือนเมื่อช่องจอดว่างหรือเต็มจำเป้นต้อง เจอะจงไปยังช่องนั้นๆ
    this.parkaht.authState.subscribe(datae => {
      if (datae) {
        this.db.list<Parkinglist>(`/Parking-list/PA/-LK0dEgrvK9jrDvXWAxP/`).snapshotChanges().subscribe((res) => {

          var items = []
          res.forEach(item => {
            items.push(item.payload.val());
          })

          const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
          query.once('value', (snapshot) => {
            if (snapshot.val()) {
              snapshot.forEach((childSnapshot) => {
                var keys = childSnapshot.key;
                var itemdata = childSnapshot.val();
                if (itemdata.name == items[1]) {
                  console.log(items)
                  if (items[3] == true) {
                    this.storage.get('Notification').then((datanoti) => {
                      if (datanoti == true) {

                        this.localNotifications.schedule({
                          title: 'Notifications ',
                          text: 'ช่องจอดรถที่ท่านได้ทำการแจ้งเตือนมีรถออกจาก\n ช่อง :' + itemdata.name + '\nเวลา :' + this.formateDate(),

                        });

                      }


                    });
                    this.db.list(`/notification/`).remove(keys);
                    this.time.uid = itemdata.email;
                    this.time.parkname = itemdata.name;
                    this.time.status = items[3];
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                }
                return true
              })
            }
          })
        });
        this.db.list<Parkinglist>(`/Parking-list/PA/-LK0dEgtIgTguejdK7uP/`).snapshotChanges().subscribe((res) => {

          var items = []
          res.forEach(item => {
            items.push(item.payload.val());
          })

          const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
          query.once('value', (snapshot) => {
            if (snapshot.val()) {
              snapshot.forEach((childSnapshot) => {
                var keys = childSnapshot.key;
                var itemdata = childSnapshot.val();
                if (itemdata.name == items[1]) {
                  console.log(items)
                  if (items[3] == true) {
                    this.storage.get('Notification').then((datanoti) => {
                      if (datanoti == true) {

                        this.localNotifications.schedule({
                          title: 'Notifications ',
                          text: 'ช่องจอดรถที่ท่านได้ทำการแจ้งเตือนมีรถออกจาก\n ช่อง :' + itemdata.name + '\nเวลา :' + this.formateDate(),

                        });

                      }


                    });
                    this.db.list(`/notification/`).remove(keys);
                    this.time.uid = itemdata.email;
                    this.time.parkname = itemdata.name;
                    this.time.status = items[3];
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                }
                return true
              })
            }
          })
        });
        this.db.list<Parkinglist>(`/Parking-list/PA/-LK0dEgulx-RBDKZyHCd`).snapshotChanges().subscribe((res) => {

          var items = []
          res.forEach(item => {
            items.push(item.payload.val());
          })

          const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
          query.once('value', (snapshot) => {
            if (snapshot.val()) {
              snapshot.forEach((childSnapshot) => {
                var keys = childSnapshot.key;
                var itemdata = childSnapshot.val();
                if (itemdata.name == items[1]) {
                  console.log(items)
                  if (items[3] == true) {
                    this.storage.get('Notification').then((datanoti) => {
                      if (datanoti == true) {

                        this.localNotifications.schedule({
                          title: 'Notifications ',
                          text: 'ช่องจอดรถที่ท่านได้ทำการแจ้งเตือนมีรถออกจาก\n ช่อง :' + itemdata.name + '\nเวลา :' + this.formateDate(),

                        });

                      }


                    });
                    this.db.list(`/notification/`).remove(keys);
                    this.time.uid = itemdata.email;
                    this.time.parkname = itemdata.name;
                    this.time.status = items[3];
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                }
                return true
              })
            }
          })
        });
        this.db.list<Parkinglist>(`/Parking-list/PA/-LK0dEgvLiv6YVFa2uNO`).snapshotChanges().subscribe((res) => {

          var items = []
          res.forEach(item => {
            items.push(item.payload.val());
          })

          const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
          query.once('value', (snapshot) => {
            if (snapshot.val()) {
              snapshot.forEach((childSnapshot) => {
                var keys = childSnapshot.key;
                var itemdata = childSnapshot.val();
                if (itemdata.name == items[1]) {
                  console.log(items)
                  if (items[3] == true) {
                    this.storage.get('Notification').then((datanoti) => {
                      if (datanoti == true) {

                        this.localNotifications.schedule({
                          title: 'Notifications ',
                          text: 'ช่องจอดรถที่ท่านได้ทำการแจ้งเตือนมีรถออกจาก\n ช่อง :' + itemdata.name + '\nเวลา :' + this.formateDate(),

                        });

                      }


                    });
                    this.db.list(`/notification/`).remove(keys);
                    this.time.uid = itemdata.email;
                    this.time.parkname = itemdata.name;
                    this.time.status = items[3];
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                }
                return true
              })
            }
          })
        });
        this.db.list<Parkinglist>(`/Parking-list/PA/-LK0dEgwJ04bq3sGOTax`).snapshotChanges().subscribe((res) => {

          var items = []
          res.forEach(item => {
            items.push(item.payload.val());
          })

          const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
          query.once('value', (snapshot) => {
            if (snapshot.val()) {
              snapshot.forEach((childSnapshot) => {
                var keys = childSnapshot.key;
                var itemdata = childSnapshot.val();
                if (itemdata.name == items[1]) {
                  console.log(items)
                  if (items[3] == true) {
                    this.storage.get('Notification').then((datanoti) => {
                      if (datanoti == true) {

                        this.localNotifications.schedule({
                          title: 'Notifications ',
                          text: 'ช่องจอดรถที่ท่านได้ทำการแจ้งเตือนมีรถออกจาก\n ช่อง :' + itemdata.name + '\nเวลา :' + this.formateDate(),

                        });

                      }


                    });
                    this.db.list(`/notification/`).remove(keys);
                    this.time.uid = itemdata.email;
                    this.time.parkname = itemdata.name;
                    this.time.status = items[3];
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                }
                return true
              })
            }
          })
        });
        this.db.list<Parkinglist>(`/Parking-list/PA/-LK0dEgy3nox7S14RBzz`).snapshotChanges().subscribe((res) => {

          var items = []
          res.forEach(item => {
            items.push(item.payload.val());
          })

          const query = firebase.database().ref('notification').orderByChild('email').equalTo(datae.email);
          query.once('value', (snapshot) => {
            if (snapshot.val()) {
              snapshot.forEach((childSnapshot) => {
                var keys = childSnapshot.key;
                var itemdata = childSnapshot.val();
                if (itemdata.name == items[1]) {
                  console.log(items)
                  if (items[3] == true) {
                    this.storage.get('Notification').then((datanoti) => {
                      if (datanoti == true) {

                        this.localNotifications.schedule({
                          title: 'Notifications ',
                          text: 'ช่องจอดรถที่ท่านได้ทำการแจ้งเตือนมีรถออกจาก\n ช่อง :' + itemdata.name + '\nเวลา :' + this.formateDate(),

                        });

                      }


                    });
                    this.db.list(`/notification/`).remove(keys);
                    this.time.uid = itemdata.email;
                    this.time.parkname = itemdata.name;
                    this.time.status = items[3];
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                }
                return true
              })
            }
          })
        });
      }
    })

  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad CarparkPage');
  }
  PA1(name: String) {
    if (name == "PA") {

      this.navCtrl.push(ParkingPage);
    }
    else {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'ลานจอดนี้ยังไม่มีการติดตั้ง',
        buttons: ['ok']
      });
      alert.present();

    }
  }

  loadparkA() {
    this.db.list<Parkinglist>(`/Parking-list/`).snapshotChanges().subscribe(res => {
      res.forEach(item => {
        this.db.list<Parkinglist>(`/Parking-list/${item.key}`).snapshotChanges().subscribe(res1 => {
          res1.forEach(item1 => {
            // //console.log(item1.payload.val());
          });
        })
      })
    })
    this.db.list<Parkinglist>(`/Parking-list/PA/`).valueChanges().subscribe((res: Parkinglist[]) => {
      var st = 0;
      var keys = "-LK0dEgqvv3bgzBFuKGg";
      res.forEach((item) => {
        if (item.status == false) {
          st += 1;
        }
      });
      if (st == 6) {
        this.carparklist.update(keys, { status: false, empty: 0, notempty: 6 });
      }
      else {
        this.carparklist.update(keys, { status: true, empty: (6 - st), notempty: st });

      }
      st = 0;
    });
  }
  addpark() {
    this.navCtrl.push(AddcarparkPage);
  }
  back() {
    this.navCtrl.push(HomePage);
  }
}
