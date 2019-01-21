import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Profileuser, Userdatas, Loglogin, Parkinglist } from '../../model/parking/parking.model';
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  profile = {
    uid: "",
    Email: "",
    DisplayName: "",
    Password: "",
    status: "",
    standby: "",
    version: "",

  };
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private homeaut: AngularFireAuth, private db: AngularFireDatabase) {
    this.loaduser();
  }
  loaduser() {
    this.db.list<Profileuser>(`/ProfileUser/`).valueChanges().take(1).subscribe((res: Profileuser[]) => {

      this.homeaut.authState.subscribe(data => {
        res.forEach(item => {
          if (data.email == item.Email) {
            this.profile.Email = item.Email;
            this.profile.DisplayName = item.DisplayName;
            this.profile.uid = data.uid;
          }

        });
      });
    });
    this.db.list<Parkinglist>(`/Parking-list/PA/`).valueChanges().subscribe((ress: Parkinglist[]) => {
      this.homeaut.authState.subscribe(data => {
        ress.forEach(item => {
          if (data.email == item.standby) {
            this.profile.standby = item.name;
          }
        });
      });
    });
    this.storage.get('Version').then((data) => {

      this.profile.version = data;

    });
  }
  back() {
    this.navCtrl.pop();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
