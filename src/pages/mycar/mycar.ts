import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
//import { AngularFireObject, AngularFireList } from 'angularfire2/database/interfaces';
import { Profileuser, Timeline } from '../../model/parking/parking.model';
import { User } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
//import { Pipe, PipeTransform } from '@angular/core';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';

declare var google;//ประกาศให้ใช้ google map
/**
 * Generated class for the MycarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mycar',
  templateUrl: 'mycar.html',
})


export class MycarPage {
  myDate: String = new Date().toISOString();
  Povider = {
    email: "",
    displayname: "",
  }
  times = {
    uid: "",
    parkname: "",
    status: true,
    day: "",
    mon: "",
    year: "",
    time: "",
  }
  public timelist: Array<any>;

  items: Observable<any[]>;
  public itemsRef;
  users: Observable<User[]>;
  timelinelist$: Observable<Timeline[]>;
  constructor(private tosat: ToastController,
    private afb: AngularFireDatabase
    , public navCtrl: NavController,
    public navParams: NavParams
    , platform: Platform
    , splashScreen: SplashScreen,
    private homeaut: AngularFireAuth,
    private firebaseservice: FirebaseServiceProvider) {
    platform.ready().then(() => {

      splashScreen.hide();
    });
    this.homeaut.authState.take(1).subscribe(data => {

      this.timelinelist$ = this.firebaseservice.getTimelinelist().snapshotChanges().map(changes => {
        return changes.map(data => ({ key: data.payload.key, ...data.payload.val() }));
      });

      //console.log("path",this.afb.list<Profileuser>(`/ProfileUser//${ data.uid }`));
      this.Povider.email = data.email;
      this.itemsRef = this.afb.list<Profileuser>(`/ProfileUser/`);
      console.log("path", this.afb.list<Profileuser>(`/ProfileUser/`));
      this.users = this.itemsRef
        .snapshotChanges()
        .map
        (changes => {
          return changes.map(data => (
            {
              key: data.payload.key, ...data.payload.val()
            }));
        });
      this.afb.list(`/Timeline-list/`).valueChanges().subscribe((res: Timeline[]) => {
        let itemes = [];

        res.forEach((item) => {


          itemes.push(item);
        })


        this.timelist = itemes;
        console.log(this.timelist);
      });


      //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
    });


  }
  back() {
    this.navCtrl.push(TimelinePage);
  }
  click(i: any) {
    console.log(i)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }
  goback() {
    this.navCtrl.push(TimelinePage);
  }

}
