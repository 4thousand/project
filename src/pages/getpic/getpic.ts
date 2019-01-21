import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the GetpicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getpic',
  templateUrl: 'getpic.html',
})
export class GetpicPage {
  Ober;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.storage().ref().child('images/parking.jpg').getDownloadURL().then(url => {
      this.Ober = url;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpicPage');
  }

  back() {
    this.navCtrl.insert(1, GetpicPage);
    this.navCtrl.pop();
  }
}
