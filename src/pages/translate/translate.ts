import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TranslatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export const availableLanguages = [{
  code: 'en',
  name: 'English'
}, {
  code: 'th',
  name: 'Thai'
}];

export const defaultLanguage = 'en';

export const sysOptions = {
  systemLanguage: defaultLanguage
};
@IonicPage()
@Component({
  selector: 'page-translate',
  templateUrl: 'translate.html',
})
export class TranslatePage {

  constructor(public translateService: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
  }
  changeLanguage(langauge) {
    this.translateService.use(langauge);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatePage');
  }
  back() {
    this.navCtrl.pop();
  }
}
