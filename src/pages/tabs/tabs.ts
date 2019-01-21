import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { TimelinePage } from '../timeline/timeline';
import { CarparkPage } from '../carpark/carpark';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { SettingPage } from '../setting/setting';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;

  constructor(public navCtrl: NavController,
    private parkaht: AngularFireAuth,
    private db: AngularFireDatabase,
    public navParams: NavParams) {

    this.tab4Root = TimelinePage;
    this.tab1Root = CarparkPage;


    this.tab5Root = SettingPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
