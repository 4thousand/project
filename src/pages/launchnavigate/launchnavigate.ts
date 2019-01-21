import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
/**
 * Generated class for the LaunchnavigatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-launchnavigate',
  templateUrl: 'launchnavigate.html',
})
export class LaunchnavigatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private Lanch: LaunchNavigator) {
    this.platform.ready().then(() => {
      //this.locationTracker.startTracking();
      this.update();
    });

  }


  update() {
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
}
