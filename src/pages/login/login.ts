import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { CarparkPage } from '../carpark/carpark'
import { TabsPage } from '../tabs/tabs'

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ParkingPage } from '../parking/parking';
//import {  } from '../notification/notification';
//import { NgModule } from '@angular/core';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Profileuser } from '../../model/parking/parking.model';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  @ViewChild('Email') Email;
  @ViewChild('password') password;
  constructor(private afb: AngularFireDatabase,
    public Loauth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public googleplus: GooglePlus,
    public facebook: Facebook, private Platforms: Platform,
    public firebaseservice: FirebaseServiceProvider,
    private storage: Storage) {
  }


  Fsiginin() {
    this.facebook.login(['public_profile', 'email']).then((loginres: FacebookLoginResponse) => {
      let credential = firebase.auth.FacebookAuthProvider.credential(loginres.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then(fs => {
        let alert = this.alertCtrl.create({
          title: ' ',
          subTitle: 'sign in successful',
          buttons: ['ok']
        });
        this.storage.set('setlogin', true);
        alert.present();
        this.navCtrl.push(TabsPage);
      }).catch(errs => {
        let alert = this.alertCtrl.create({
          title: ' ',
          subTitle: 'Not succfully',
          buttons: ['ok']
        });
        alert.present();
      })
    });

  }
  signin() {
    this.Loauth.auth.signInWithEmailAndPassword(this.Email.value, this.password.value)
      .then(data => {
        console.log("User Registered succfully", data);
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'sign in successful',
          buttons: ['ok']
        });
        this.storage.set('setlogin', true);
        alert.present();
        this.navCtrl.push(TabsPage);
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Sign in',
          subTitle: 'Email ro password not math',
          buttons: ['ok']
        });
        alert.present();
      });
  }

  regis() {
    this.navCtrl.push(RegisterPage);
  }
  Glogin() {
    this.googleplus.login({
      'webClientId': '497240447227-d2d7905ksm0pu76a2j3onqghqhv2ibp2.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      console.log(res);
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'sign in successful',
            buttons: ['ok']
          });
          this.storage.set('setlogin', true);
          this.navCtrl.push(TabsPage);
          alert.present();

          console.log(suc);
        }).catch(err => {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'sign in not successful',
            buttons: ['ok']
          });
          alert.present();
        })
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'sign in not successful' + err,
        buttons: ['ok']
      });
      alert.present();
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
