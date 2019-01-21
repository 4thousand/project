import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Header } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CodePush, SyncStatus } from '@ionic-native/code-push';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home'
import { SyncAsync } from '@angular/compiler/src/util';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
//import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { application } from '../../model/parking/parking.model';
import { AppVersion } from '@ionic-native/app-version';
import { TranslatePage } from '../translate/translate'
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import { AboutPage } from '../about/about';

export interface ItemA { version: string };
/**
 * f7735b995f49bb7d3474781bfbe086548d96603e
 * Production │ Os0dt9TatLWbS1caQ3hVIkhlhkOu219ab229-ec96-404d-a6c8-650e7db20341 │├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ ptAOYgtHcnpVLNnSKDYzFMRy0Mms219ab229-ec96-404d-a6c8-650e7db20341 │
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *  code-push release-cordova Carpark android --targetBinaryVersion "~1.1.0"
 */
import 'rxjs/add/operator/take';
import { BackgroundMode } from '@ionic-native/background-mode';
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  notifi: boolean;
  public setting = {
    notifycation: undefined,
    version: 0,
  }
  item: ItemA = {
    version: "",
  }
  titleupdate = "";
  Iprogress: any;
  Iupdate: any;
  Itotal: any;
  public thisversion;
  public ap = {
    version: "",
  }
  datas: Observable<any>;
  progre: string = "";
  versionapp: number;
  constructor(private storage: Storage,
    private db: AngularFireDatabase, public backgroundMode: BackgroundMode,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, private auth: AngularFireAuth,
    private codePush: CodePush,
    private nGzone: NgZone, platform: Platform,
    private http: Http, private appVersion: AppVersion) {
    platform.ready().then(() => {

      this.checkevent();
    });
    this.appVersion.getVersionNumber().then(data => {
      this.thisversion = data;
    });

  }

  translate() {
    this.navCtrl.push(TranslatePage);
  }

  checkevent() {

    var itemAA;
    this.http
      .get("/assets/data/datas.json")
      .map(data => data.json() as Array<ItemA>)
      .subscribe(data => {
        itemAA = data;
        this.item = itemAA;
        console.log(this.item.version);
      });

    this.storage.get('MyAppVersion').then((dataapp) => {

      this.ap.version = dataapp;

    });


    this.storage.get('Notification').then((data) => {

      this.setting.notifycation = data;

    });

    this.storage.get('Version').then((datav) => {

      this.setting.version = datav;

    });

  }
  notify(event) {


  }
  datachanged(event) {


    if (event.checked == true) {

      this.storage.set('Notification', true).then(data => {
        this.setting.notifycation = true;
      });
    }
    else {
      this.storage.set('Notification', false).then(data => {
        this.setting.notifycation = false;
      });
    }
    console.log(this.setting);

  }

  updateItem(key: string, newText: boolean) {

  }
  back() {
    this.navCtrl.push(HomePage);
  }
  checkupdate() {
    var version;
    this.db.list<application>(`application`).valueChanges().subscribe((res => {
      res.forEach(datas => {
        version = datas;

        this.storage.set('Version', version);
      })
    }));
    this.codePush.sync({}, (progress) => {

      this.nGzone.run(() => {
        this.progre = JSON.stringify(progress);
        this.Iprogress = (progress.receivedBytes / progress.totalBytes) * 100;
        this.Iprogress = Math.round(this.Iprogress).toFixed(0);
        this.Iupdate = Math.round(progress.receivedBytes / 100).toFixed(0);
        this.Itotal = Math.round(progress.totalBytes / 100).toFixed(0);
      });


    }).subscribe((status) => {
      if (status == SyncStatus.CHECKING_FOR_UPDATE) {
        this.titleupdate = "checking update";
      }
      if (status == SyncStatus.DOWNLOADING_PACKAGE) {

        this.titleupdate = "DOWNLOADING PACKAGE";
      }
      if (status == SyncStatus.IN_PROGRESS) {

        this.titleupdate = "IN PROGRES";
      }
      if (status == SyncStatus.INSTALLING_UPDATE) {

        this.titleupdate = "INSTALLING UPDATE";
      }
      if (status == SyncStatus.UP_TO_DATE) {

        this.titleupdate = "UP TO DATE";
      }
      if (status == SyncStatus.UPDATE_INSTALLED) {

        this.titleupdate = "UPDATE INSTALLED";
      }
      if (status == SyncStatus.ERROR) {

        this.titleupdate = "Error";
      }

    })

  }
  Logout() {
    this.auth.auth.signOut().then(data => {
      this.navCtrl.push(LoginPage);
      this.navCtrl.setRoot(LoginPage);



      this.backgroundMode.disable();

    })
  }
  account() {
    this.navCtrl.push(AboutPage);
  }
  ionViewDidLoad() {


  }

}

