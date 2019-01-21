import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs'
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import 'rxjs/add/operator/take';
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private translate: TranslateService, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private aut: AngularFireAuth) {
    this.initializeApp();
    platform.ready().then(() => {
      translate.setDefaultLang('en');
      // Okay, so the platform is ready and our plugins are available.
      //this.aut.authState.subscribe();
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  initializeApp() {
    this.aut.authState.subscribe(
      user => {
        if (user) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      }
    );
  }
}

