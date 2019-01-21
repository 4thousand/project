import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TimelinePage } from '../pages/timeline/timeline';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotificationPage } from '../pages/notification/notification';
import { ParkingPage } from '../pages/parking/parking';
import { NavigatePage } from '../pages/navigate/navigate'
import { MycarPage } from '../pages/mycar/mycar'
import { LocationTracker } from '../providers/location-track'
import { AppVersion } from '@ionic-native/app-version';
import { LaunchnavigatePage } from '../pages/launchnavigate/launchnavigate'
//import { Camera } from '@ionic-native/camera';
import { HttpModule, JsonpModule } from '@angular/http';
import { LocalNotifications } from '@ionic-native/local-notifications'
import { CarparkPage } from '../pages/carpark/carpark';
import { Facebook } from '@ionic-native/facebook';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CodePush } from '@ionic-native/code-push';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { GetpicPage } from '../pages/getpic/getpic';
import { AddcarparkPage } from '../pages/addcarpark/addcarpark';
const firebaseAuth = {
  apiKey: "AIzaSyBmTXXnw3dOAHSglcshRXJOMMTMkAapaQo",
  authDomain: "blissful-flames-185507.firebaseapp.com",
  databaseURL: "https://blissful-flames-185507.firebaseio.com",
  projectId: "blissful-flames-185507",
  storageBucket: "blissful-flames-185507.appspot.com",
  messagingSenderId: "497240447227"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'xxxxxxxxx',
  },
  'push': {
    'sender_id': 'xxxxxxxxxx',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
import { IonicImageViewerModule } from 'ionic-img-viewer'
//import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslatePage } from '../pages/translate/translate'
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { GroupByPipe } from '../pipes/group-by/group-by';

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/data/', '.json');
}
@NgModule({
  declarations: [
    MyApp, TabsPage,
    HomePage,
    LoginPage,
    GroupByPipe,
    RegisterPage,
    NotificationPage,
    ParkingPage,
    TimelinePage,
    NavigatePage,
    MycarPage,
    LaunchnavigatePage,
    CarparkPage, SettingPage,
    AboutPage, GetpicPage, AddcarparkPage,
    TranslatePage
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, JsonpModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    NotificationPage,
    TabsPage,
    ParkingPage,
    TimelinePage,
    NavigatePage, MycarPage,
    LaunchnavigatePage,
    CarparkPage, SettingPage,
    AboutPage, GetpicPage, AddcarparkPage,
    TranslatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation, GroupByPipe,
    LocationTracker, Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler, },
    FirebaseServiceProvider, CodePush, AppVersion, PhotoViewer,
    LaunchNavigator, LocalNotifications, BackgroundMode, GooglePlus, Facebook,
  ]
})
export class AppModule { }
