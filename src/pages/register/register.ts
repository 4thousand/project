import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profileuser } from '../../model/parking/parking.model';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  userP: Profileuser = {
    key: "",
    uid: "",
    Email: "",
    DisplayName: "",
    Password: "",
    status,

  }
  //@ViewChild('Email') email;
  // @ViewChild('password') password;
  @ViewChild('conpassword') conpassword;

  constructor(public Reauth: AngularFireAuth, public firebaseservice: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private afdb: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  Llogin() {
    let alert = this.alertCtrl.create({
      title: 'Login Facebook',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  register() {
    if (this.userP.Password == this.conpassword.value) {

      this.Reauth.auth.createUserWithEmailAndPassword(this.userP.Email, this.userP.Password)
        .then(data => {
          console.log(this.Reauth.auth.currentUser);
          this.Reauth.authState.subscribe(ui => {
            console.log(`${ui.uid}`);
            this.userP.uid = ui.uid;

            this.afdb.list<Profileuser>(`/ProfileUser/`).push(this.userP)
              //.then(ref=>
              .then(ref => {

                this.afdb.object<Profileuser>(`/ProfileUser/${ref.key}`).update({ key: ref.key });
                this.navCtrl.setRoot(TabsPage, { key: ref.key });
              })



          })

          console.log("User Registered succfully", data);
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'registered successful',
            buttons: ['ok']
          });
          alert.present();

        })
        .catch(error => {

          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'email is already in use',
            buttons: ['ok']
          });
          alert.present();
          console.log("error Registered user", error);
        })
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Sign in',
        subTitle: 'password Not Math',
        buttons: ['ok']
      });
      alert.present();
    }
    //  



  }
  backlogin() {
    this.navCtrl.push(LoginPage);
  }
}
