import { Component, ViewChild } from '@angular/core';
//import { platform, DateTime } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode'
import { Platform } from '../../../node_modules/ionic-angular/platform/platform';
import { MycarPage } from '../mycar/mycar'
//import { NavigatePage } from '../navigate/navigate';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/take';


import { LoginPage } from '../login/login';
import { ParkingPage } from '../parking/parking'
//import { NotificationPage } from '../notification/notification';
import { Slides } from 'ionic-angular';
//import { TimelinePage } from '../timeline/timeline';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profileuser, Loglogin, Parkinglist, Timeline, application } from '../../model/parking/parking.model';
import { AppVersion } from '@ionic-native/app-version';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { User } from 'firebase/app';
//import { Subscription } from 'ionic-native/node_modules/rxjs/Subscription';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { CarparkPage } from '../carpark/carpark'
//import { LaunchnavigatePage } from '../launchnavigate/launchnavigate';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import * as firebase from 'firebase';
import { SettingPage } from '../setting/setting';
import { AboutPage } from '../about/about';
import { Storage } from '@ionic/storage';
import { TimelinePage } from '../timeline/timeline';
//import { query } from '@angular/core/src/animation/dsl';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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

  authState: any = null;
  park: Parkinglist = {
    name: "",
    standby: "",
    status: true,
    local: ""
  };
  userid: string;
  bgmod = false;
  itemsRefs: AngularFireList<any>;
  pet: string = "puppies";
  isAndroid: boolean = true;
  @ViewChild('username') user;
  @ViewChild('passowrd') password;
  @ViewChild(Slides) slides: Slides;
  constructor(public backgroundMode: BackgroundMode, private Platforms: Platform, private launchNavigator: LaunchNavigator, private tosat: ToastController, private nav: NavParams, public navCtrl: NavController, platform: Platform, public alertCtrl: AlertController
    , private homeaut: AngularFireAuth, private firebaseservice: FirebaseServiceProvider, private afb: AngularFireDatabase
    , public localNotifications: LocalNotifications, private storage: Storage, private appVersion: AppVersion) {
    this.isAndroid = Platforms.is('android');
    Platforms.ready().then(() => {

      this.homeaut.authState.take(1).subscribe(data => {


        console.log(data.email);
        //
        this.Loglogins.uid = data.uid;
        this.Loglogins.email = data.email;
        this.Loglogins.status = 'Login';
        this.Loglogins.datetime = this.formateDate();
        // this.formateDate(this.date); 
        this.firebaseservice.updateLog(this.Loglogins);
        var carEmails = data.email;


        this.userp.Email = data.email;
        this.itemsRef = this.afb.list<Profileuser>(`/ProfileUser/`);

        this.users = this.itemsRef
          .snapshotChanges()
          .map
          (changes => {
            return changes.map(data => (
              {
                key: data.payload.key, ...data.payload.val()
              }));
          });

        this.bgnotiFunction();

        this.backgroundMode.on('activate').subscribe(() => {
          this.bgnotiFunction();
        });

        this.backgroundMode.enable();
        //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();


        //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
      });
      this.registerSocial();
      this.setdefault();
    });
    this.itemsRefs = this.afb.list<Parkinglist>('/Parking-list/PA/');


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
        console.log(datav + "nohave");
        this.storage.set('Version', "1.0.4");
      }
    });
    var version;

    this.afb.list<application>(`application`).valueChanges().subscribe((res => {
      res.forEach(datas => {
        version = datas;

        this.storage.set('MyAppVersion', version);
      })
    }));

  }

  registerSocial() {
    var id = 0;



    ///this.userp.uid = data.uid;

    this.afb.list<Profileuser>(`/ProfileUser/`).valueChanges().take(1).subscribe((res: Profileuser[]) => {
      this.homeaut.authState.take(1).subscribe(data => {
        this.userp.Email = data.email;
        this.userp.DisplayName = data.displayName;
        this.userp.status = "online";
        //console.log(res);
        res.forEach((item) => {
          if (item.Email == data.email) {
            id = 1;
          }
          console.log(id);
        });
        if (id == 0) {
          this.firebaseservice.login(this.userp)
            //.then(ref=>
            .then(ref => {

              this.afb.object<Profileuser>(`/ProfileUser/${ref.key}`).update({ key: ref.key });
              this.navCtrl.setRoot(HomePage, { key: ref.key });
            });
        }
      });

    });
  }

  bgnotiFunction() {
    var itemthis;
    this.storage.get('Notification').then((datas) => {
      this.afb.list<Parkinglist>(`/Parking-list/PA/`).snapshotChanges().subscribe((res) => {
        this.homeaut.authState.take(1).subscribe(datae => {
          if (datae) {
            res.forEach(item => {
              let parkingrefts = item.payload.val();
              let parkey = item.key;
              console.log(parkingrefts.name);
              if (parkingrefts.status == true && parkingrefts.standby != "none") {
                if (parkingrefts.standby == datae.email) {
                  if (datas == true) {
                    this.localNotifications.schedule({
                      title: 'Notifications ',
                      text: 'รถของท่านได้ทำการออกจากช\n ช่อง :' + parkingrefts.name + '\nเวลา :' + this.formateDate(),

                    });
                    this.time.uid = parkingrefts.standby;
                    this.time.parkname = parkingrefts.name;
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                    this.itemsRefs.update(parkey, { standby: "none" });
                  }
                }
              }
            })
          }


        })
      })


    });
  }
  backgroundNoti() {
    this.bgmod = true;
    this.storage.get('Notification').then((datas) => {
      this.afb.list<Parkinglist>(`/Parking-list/PA/`).valueChanges().subscribe((res) => {
        this.homeaut.authState.take(1).subscribe(datae => {
          if (datae) {
            res.forEach((item) => {

              if (item.name == "A1") {
                console.log(datae.email + "1");

                if (item.status == true && item.standby != "none") {
                  if (item.standby == datae.email) {
                    console.log("เข้าจ้อด" + datae.email);

                    if (datas == true) {
                      this.localNotifications.schedule({
                        title: 'Notifications ',
                        text: 'รถของท่านได้ทำการออกจากช่องA1' + '\nเวลา :' + this.formateDate(),

                      });
                    }
                    this.time.uid = item.standby;
                    this.time.parkname = "A1"
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                  var keyp = "-LK0dEgrvK9jrDvXWAxP";
                  this.itemsRefs.update(keyp, { standby: "none" });
                }
              }
              if (item.name == "A2") {

                if (item.status == true && item.standby != "none") {
                  if (item.standby == datae.email) {
                    if (datas == true) {
                      this.localNotifications.schedule({
                        title: 'Notifications ',
                        text: 'รถของท่านได้ทำการออกจากช่องA2' + '\nเวลา :' + this.formateDate(),

                      });
                    }
                    this.time.uid = datae.email;
                    this.time.parkname = "A2"
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                  var keyp = "-LK0dEgtIgTguejdK7uP";
                  this.itemsRefs.update(keyp, { standby: "none" });
                }
              }
              if (item.name == "A3") {

                if (item.status == true && item.standby != "none") {
                  if (item.standby == datae.email) {
                    if (datas == true) {
                      this.localNotifications.schedule({
                        title: 'Notifications ',
                        text: 'รถของท่านได้ทำการออกจากช่องA3' + '\nเวลา :' + this.formateDate(),

                      });
                    }
                    this.time.uid = datae.email;
                    this.time.parkname = "A3"
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                  var keyp = "-LK0dEgulx-RBDKZyHCd";
                  this.itemsRefs.update(keyp, { standby: "none" });
                }
              }
              if (item.name == "A4") {

                if (item.status == true && item.standby != "none") {
                  if (item.standby == datae.email) {
                    if (datas == true) {
                      this.localNotifications.schedule({
                        title: 'Notifications ',
                        text: 'รถของท่านได้ทำการออกจากช่องA4' + '\nเวลา :' + this.formateDate(),

                      });
                    }
                    this.time.uid = datae.email;
                    this.time.parkname = "A4"
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                  var keyp = "-LK0dEgvLiv6YVFa2uNO";
                  this.itemsRefs.update(keyp, { standby: "none" });
                }
              }
              if (item.name == "A5") {

                if (item.status == true && item.standby != "none") {
                  if (item.standby == datae.email) {
                    if (datas == true) {
                      this.localNotifications.schedule({
                        title: 'Notifications ',
                        text: 'รถของท่านได้ทำการออกจากช่องA5' + '\nเวลา :' + this.formateDate(),
                      });
                    }
                    this.time.uid = datae.email;
                    this.time.parkname = "A5"
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                  var keyp = "-LK0dEgwJ04bq3sGOTax";
                  this.itemsRefs.update(keyp, { standby: "none" });
                }
              }
              if (item.name == "A6") {

                if (item.status == true && item.standby != "none") {
                  if (item.standby == datae.email) {
                    if (datas == true) {
                      this.localNotifications.schedule({
                        title: 'Notifications ',
                        text: 'รถของท่านได้ทำการออกจากช่องA6' + '\nเวลา :' + this.formateDate(),

                      });
                    }
                    this.time.uid = datae.email;
                    this.time.parkname = "A6"
                    this.time.status = true;
                    this.time.datetime = this.formateDate();
                    this.time.time = this.formatetime();
                    this.firebaseservice.addtime(this.time);
                  }

                  var keyp = "-LK0dEgy3nox7S14RBzz";
                  this.itemsRefs.update(keyp, { standby: "none" });
                }
              }
            });
          }

        });
      });


    });
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  Flogin() {
    let alert = this.alertCtrl.create({
      title: 'Login Facebook',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  gosetting() {
    this.navCtrl.push(SettingPage);
  }
  Logout() {
    this.navCtrl.push(LoginPage);
  }
  login() {
    if (this.user.value == "admin" && this.password.value == "admin") {
      let alert = this.alertCtrl.create({
        title: 'Login',
        subTitle: 'this admin',
        buttons: ['ok']
      });
      alert.present();
      this.navCtrl.push(RegisterPage);
    }

    else {
      let alert = this.alertCtrl.create({
        title: 'Login',
        subTitle: 'this user',
        buttons: ['ok']
      });
      alert.present();
      this.navCtrl.push(RegisterPage);
    }
  }
  GoPark() {
    this.navCtrl.push(CarparkPage);
  }
  Signout() {
    this.homeaut.auth.signOut().then(data => {
      this.navCtrl.push(LoginPage);
      this.navCtrl.setRoot(LoginPage);

      firebase.auth().signOut();

      this.backgroundMode.disable();

    })


  }
  formateDate() {
    var dates = new Date();
    var day = dates.getDate().toString();
    var month = dates.getMonth().toString();
    var Year = dates.getFullYear().toString();

    this.datetime = `${Year}/${month}/${day}`;
    return this.datetime;

  }
  formatetime() {
    var dates = new Date();
    var hours = dates.getHours().toString();
    var min = dates.getMinutes().toString();

    var time = `${hours}:${min}`;
    return time;
  }
  gTimeline() {
    this.navCtrl.push(MycarPage);


  }
  gabout() {
    this.navCtrl.push(AboutPage);
  }
  goMycarpage() {
    this.navCtrl.push(ParkingPage);

    /*
    this.homeaut.authState.subscribe(data => {

      this.afb.list<Parkinglist>(`/Parking-list/PA/`).valueChanges().subscribe((res: Parkinglist[]) => {
        console.log(res);
        res.forEach((item) => {
          if(item.standby == data.email)
          {
            let alert = this.alertCtrl.create({
              title: 'Mesess',
              subTitle: 'รถชองท่านได้จอดอยู่ที่หน้าทค1อยู่ที่ช่อง'+item.name+'\nต้องการให้พาไปที่จอดรถหรือไม่',
              buttons: [{
                text: "นำทาง",
                role: "นำทาง",
                handler: datae => {
                  this.Platforms.ready().then(() => {

                    this.launchNavigator.navigate('18.81147,98.9542387')
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
              }, {
                text: "ยกเลิก",
                role: "ยกเลิก",
                handler: datae => {
                    
                }
        
              }]
            });
            alert.present();
          }
        });
        });
      });
      */
  }
  checksound() {
    this.storage.get('sound').then((datasound) => {
      if (datasound == null || datasound == undefined || datasound == true) {
        return 'file://assets/sounds/shame.mp3';
      }
      else {
        return null;
      }
    });
  }

  goNavigatePage() {

    this.Platforms.ready().then(() => {

      this.launchNavigator.navigate('18.81147,98.9542387')
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
  GPark() {
    this.navCtrl.push(CarparkPage);
  }
  ionViewWillLoad() {


  }
}
