webpackJsonp([8],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mycar_mycar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parking_parking__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_notification__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timeline_timeline__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_firebase_service_firebase_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_toast_toast_controller__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_launch_navigator__ = __webpack_require__(159);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var HomePage = (function () {
    function HomePage(Platforms, launchNavigator, tosat, nav, navCtrl, platform, alertCtrl, homeaut, firebaseservice, afb) {
        var _this = this;
        this.Platforms = Platforms;
        this.launchNavigator = launchNavigator;
        this.tosat = tosat;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.homeaut = homeaut;
        this.firebaseservice = firebaseservice;
        this.afb = afb;
        this.pet = "puppies";
        this.isAndroid = true;
        this.isAndroid = platform.is('android');
        this.homeaut.authState.subscribe(function (data) {
            _this.itemsRef = _this.afb.list("/ProfileUser//" + data.uid);
            console.log("path", _this.afb.list("/ProfileUser//" + data.uid));
            _this.users = _this.itemsRef
                .snapshotChanges()
                .map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            _this.tosat.create({
                message: "Welcom to my App," + data.email,
                duration: 3000
            }).present();
            //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
        });
    }
    HomePage.prototype.goToSlide = function () {
        this.slides.slideTo(2, 500);
    };
    HomePage.prototype.Flogin = function () {
        var alert = this.alertCtrl.create({
            title: 'Login Facebook',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HomePage.prototype.Notification = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__notification_notification__["a" /* NotificationPage */]);
    };
    HomePage.prototype.Logout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.login = function () {
        if (this.user.value == "admin" && this.password.value == "admin") {
            var alert_1 = this.alertCtrl.create({
                title: 'Login',
                subTitle: 'this admin',
                buttons: ['ok']
            });
            alert_1.present();
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Login',
                subTitle: 'this user',
                buttons: ['ok']
            });
            alert_2.present();
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        }
    };
    HomePage.prototype.GoPark = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__parking_parking__["a" /* ParkingPage */]);
    };
    HomePage.prototype.Signout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.gTimeline = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__timeline_timeline__["a" /* TimelinePage */]);
    };
    HomePage.prototype.goMycarpage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__mycar_mycar__["a" /* MycarPage */]);
    };
    HomePage.prototype.goNavigatePage = function () {
        var _this = this;
        this.Platforms.ready().then(function () {
            _this.launchNavigator.navigate('18.81147,98.9542387')
                .then(function (success) {
                var alert = _this.alertCtrl.create({
                    title: 'Launched',
                    subTitle: 'Launched navigator',
                    buttons: ['ok']
                });
                alert.present();
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Launched navigator' + error,
                    buttons: ['ok']
                });
                alert.present();
            });
        });
    };
    HomePage.prototype.ionViewWillLoad = function () {
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
    __metadata("design:type", Object)
], HomePage.prototype, "user", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('passowrd'),
    __metadata("design:type", Object)
], HomePage.prototype, "password", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], HomePage.prototype, "slides", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\home\home.html"*/'\n<ion-header><div class="logoheader"></div>\n \n		<ion-slides  >\n				<ion-slide *ngFor="let item of users | async ">\n						{{item.Email}}\n				</ion-slide>\n				<ion-slide>\n					<h1> </h1>\n				</ion-slide>\n				<ion-slide>\n					<h1>Slide 3</h1>\n				</ion-slide>\n			</ion-slides>\n			\n \n</ion-header>\n\n<ion-content text-center class="icons-basic-page" padding>\n	\n		<div [ngSwitch]="pet">\n				<ion-grid *ngSwitchCase="\'puppies\'">\n						<ion-row class="row">\n								<ion-col class="col col-lef"><button class="btn-h" (click)="GoPark()"><ion-icon name="ios-car"></ion-icon><br>Parking</button></ion-col>\n								<ion-col class="col"><button class="btn-h" (click)="goMycarpage()" > <ion-icon name="ios-car-outline" ></ion-icon><br>My Car</button></ion-col>\n								<ion-col class="col col-ri"><button class="btn-h" (click)="goNavigatePage()"> <ion-icon name="navigate"></ion-icon><br>Navigate</button></ion-col>\n						</ion-row>\n						<ion-row class="row">\n								<ion-col class="col col-lef"><button class="btn-h" (click)="gTimeline()"><ion-icon name="clipboard" md="md-clipboard" color="bright"></ion-icon><br>Timeline</button></ion-col>\n								<ion-col class="col"><button class="btn-h"> <ion-icon  name="md-settings" > </ion-icon><br>Setting</button></ion-col>\n								<ion-col class="col col-ri"><button class="btn-h"> <ion-icon  name="md-contact" ></ion-icon><br>Aboutus</button></ion-col>\n						</ion-row>\n					 \n				</ion-grid> \n				\n		</div>\n	\n	</ion-content>\n<ion-footer>\n	<button  ion-button clear full color="light" (click)="Signout()">Sign out</button>\n</ion-footer>\n \n\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_launch_navigator__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_11_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_10__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabase */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__ = __webpack_require__(78);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase, FirebaseListObservable } from 'AngularFire/database';



/**
 * Generated class for the ParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParkingPage = (function () {
    function ParkingPage(db, navCtrl, navParams, firebaseservice) {
        // Use snapshotChanges().map() to store the key
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firebaseservice = firebaseservice;
        this.parkinglist$ = this.firebaseservice.getParkinglist().snapshotChanges().map(function (changes) {
            return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
        });
        // this.items = this.itemsRef.snapshotChanges().map(changes => {
        //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        // });
    }
    ParkingPage.prototype.PA1 = function (PA1, key) {
        if (PA1 == true) {
            this.itemsRef.update(key, { A1: false });
        }
        else {
            this.itemsRef.update(key, { A1: true });
        }
    };
    ParkingPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    ParkingPage.prototype.ionViewDidLoad = function () {
    };
    return ParkingPage;
}());
ParkingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-parking',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\parking\parking.html"*/'<!--\n  Generated template for the ParkingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<!--ion-content >\n    <!<ion-list>\n        <ion-item *ngFor="let item of items | async">\n            <ng-container *ngIf="item.A1 == 1; else newDeb" >\n       \n                    <div class="carbox">A</div>\n                \n            </ng-container>\n            <ng-template #newDeb>\n  \n                    <div class="carboxr">B</div>\n           \n            </ng-template> \n\n            <ion-list>\n                <ion-item *ngFor="let item of items | async">      \n                 <div *ngIf=" item.A1 == 1" class="carbox">A</div> \n                 <div *ngIf=" item.A1 == 0" class="carboxr">A</div> \n     //           </ion-item>\n              </ion-list>\n       \n    </ion-list>-->\n<!--</ion-content>-->\n\n  \n    <ion-content>\n        <ion-list ion-item *ngFor="let item of parkinglist$ | async ">\n            <ion-row>\n                     <ion-col col-4 *ngIf="item.status == 1" class="caron">{{item.name}}</ion-col>\n                    <ion-col col-4  *ngIf="item.status == 0"  class="caroff">{{item.name }} </ion-col>\n            </ion-row>   \n        </ion-list>\n  </ion-content>\n  <ion-footer>\n    <button class="bottom" ion-button clear full color="dark"(click)="back()">Back</button>\n</ion-footer>\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\parking\parking.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]])
], ParkingPage);

//# sourceMappingURL=parking.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(Reauth, navCtrl, navParams, alertCtrl, afdb) {
        this.Reauth = Reauth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.afdb = afdb;
        this.userP = {
            key: "",
            uid: "",
            Email: "",
            DisplayName: "",
            Password: "",
            GPS: {
                Latitut: 0,
                Longtitude: 0
            }
        };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.Llogin = function () {
        var alert = this.alertCtrl.create({
            title: 'Login Facebook',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.userP.Password == this.conpassword.value) {
            this.Reauth.auth.createUserWithEmailAndPassword(this.userP.Email, this.userP.Password)
                .then(function (data) {
                console.log(_this.Reauth.auth.currentUser);
                _this.Reauth.authState.subscribe(function (ui) {
                    console.log("" + ui.uid);
                    _this.userP.uid = ui.uid;
                    _this.afdb.list("/ProfileUser/" + ui.uid + "/").push(_this.userP)
                        .then(function (ref) {
                        _this.afdb.object("/ProfileUser/" + ui.uid + "/" + ref.key).update({ key: ref.key });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { key: ref.key });
                    });
                });
                console.log("User Registered succfully", data);
                var alert = _this.alertCtrl.create({
                    title: 'Sign in',
                    subTitle: 'User Registered succfully',
                    buttons: ['ok']
                });
                alert.present();
            })
                .catch(function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Sign in',
                    subTitle: 'email is already in use',
                    buttons: ['ok']
                });
                alert.present();
                console.log("error Registered user", error);
            });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Sign in',
                subTitle: 'password Not Math',
                buttons: ['ok']
            });
            alert_1.present();
        }
        //  
    };
    RegisterPage.prototype.backlogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    return RegisterPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('conpassword'),
    __metadata("design:type", Object)
], RegisterPage.prototype, "conpassword", void 0);
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\register\register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <ion-list >\n    \n      <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input [(ngModel)]="userP.Email" type="text"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>DisplayName</ion-label>\n        <ion-input [(ngModel)]="userP.DisplayName" type="text"></ion-input>\n      </ion-item>\n    \n      <ion-item>\n        <ion-label floating>password</ion-label>\n        <ion-input [(ngModel)]="userP.Password" type="password"  ></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Confirm Password</ion-label>\n        <ion-input type="password" #conpassword></ion-input>\n      </ion-item>\n      \n      <!-- \n      <button ion-button  full color="secondary" outline icon-start>\n        <ion-icon name=\'paw\' is-active="false"></ion-icon>\n        Sync With LINE\n      </button>-->\n      <button ion-button block outline color="primary" type="submit"(click)="register()">Sign in</button>\n      \n    </ion-list>\n\n</ion-content>\n<ion-footer>\n        <button ion-button clear full color="primary"(click)="backlogin()">Back</button>\n  </ion-footer>\n\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\register\register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MycarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(253);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MycarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MycarPage = (function () {
    function MycarPage(navCtrl, modal, loading, alert, http, para, platform) {
        //  this.loading_popup=this.loading.  create({content:"กำลังค้นหา...."});
        //this.loading_popup.present();
        var _this = this;
        this.navCtrl = navCtrl;
        this.modal = modal;
        this.loading = loading;
        this.alert = alert;
        this.http = http;
        this.para = para;
        this.platform = platform;
        platform.ready().then(function () {
            //this.locationTracker.startTracking();
            _this.des_lat = parseFloat(_this.para.get("lat"));
            _this.des_lng = parseFloat(_this.para.get("lng"));
            _this.destination = _this.para.get("destination");
            navigator.geolocation.getCurrentPosition(function (position) {
                // loading_popup.dismiss();
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
                _this.create_map(); //เมื่อเปิดหน้า app แล้วให้โหลดแผนที่
            });
        });
    }
    MycarPage.prototype.ajax = function (file_name, send_data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        return this.http.post(localStorage["server"] + file_name, send_data, options);
    };
    MycarPage.prototype.ionViewDidLoad = function () {
    };
    MycarPage.prototype.create_map = function () {
        var _this = this;
        var c;
        var latLng = new google.maps.LatLng(this.lat, this.lng);
        var mapOptions = {
            center: latLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //กำหนดให้แสดงแผนที่ใน map_div
        this.map = new google.maps.Map(document.getElementById("map_div_navigation"), mapOptions);
        this.marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(this.lat, this.lng),
            icon: "assets/pin.png"
        });
        this.marker1.setMap(this.map);
        this.marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(this.des_lat, this.des_lng),
            icon: "assets/pin.png"
        });
        this.marker2.setMap(this.map);
        var directionsDisplay = new google.maps.DirectionsRenderer(); //object ของ google map ให้เส้นทางในแผนที่
        var directionsService = new google.maps.DirectionsService(); //object ของ google map เพื่อค้นหาเส้นทาง
        directionsDisplay.setMap(null);
        var start_pos = new google.maps.LatLng(this.lat, this.lng); //object ละติจูด ลองติจูด ตำแหน่งปัจจุบัน
        var stop_pos = new google.maps.LatLng(this.des_lat, this.des_lng); //object ละติจูด ลองติจูด ที่ต้องการไป
        directionsDisplay.setPanel(document.getElementById("direction_list")); //กำหนดให้แสดง text เลี้ยวซ้าย ขวา วิธีการเดินทางที่  div id เป็น direction_list
        directionsDisplay.setMap(this.map); //ให้แสดงเส้นสีฟ้าในแผนที่
        directionsDisplay.setOptions({ suppressMarkers: true });
        // object ตำแหน่งต้นทาง ปลายทาง	 เพื่อให้ google mapค้นหาเส้นทาง		
        var request;
        //นำทางแบบขับรถ
        request = {
            origin: start_pos,
            destination: stop_pos,
            travelMode: google.maps.TravelMode.DRIVING
        };
        //ค้นทางเส้นทาง
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response); //เมื่อค้นหาเส้นทางเสร็จแล้ว ให้แสดงผลการค้นหาเลย
                // google.maps.event.trigger(this.map, 'resize');
                _this.loading_popup.dismiss();
            }
        });
    };
    return MycarPage;
}());
MycarPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-mycar',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\mycar\mycar.html"*/'<ion-header>\n  <ion-navbar color="main" >\n\n    \n\n    <ion-title>\n      นำทาง\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n \n      <!-- ส่วนแสดงแผนที่ -->\n<div id="map_div_navigation" style="width: 100%;height:50%"></div>\n<p><img src="assets/pin.png" />: ตำแหน่งปัจจุบันของคุณ</p>\n<p><img src="assets/des.png" />: ตำแหน่ง{{destination}}</p>\n<p id="direction_list"></p>\n\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\mycar\mycar.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
], MycarPage);

//# sourceMappingURL=mycar.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(46);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationPage = (function () {
    function NotificationPage(db, navCtrl, navParams, alertCtrl) {
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.itemsRef = db.list('Parking');
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().map(function (data) {
            return data.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
        });
    }
    NotificationPage.prototype.notify = function (event) {
        console.log(event.checked);
    };
    NotificationPage.prototype.datachanged = function (key, event) {
        console.log(event.checked);
        console.log(key);
        this.itemsRef.update(key, { Notification: event.checked });
    };
    NotificationPage.prototype.updateItem = function (key, newText) {
        console.log(newText);
        this.itemsRef.update(key, { Notification: newText });
    };
    NotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationPage');
    };
    return NotificationPage;
}());
NotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-notification',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\notification\notification.html"*/'<!--\n  Generated template for the NotificationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content *ngFor="let item of items | async" padding>\n  <ion-item *ngIf="item.Notification == true"> \n    <ion-label> การแจ้งเตือน </ion-label>\n    <ion-toggle checked="true" (ionChange)="datachanged(item.value,$event)" ></ion-toggle>\n  </ion-item>\n  <ion-item *ngIf="item.Notification == false"> \n    <ion-label> การแจ้งเตือน </ion-label>\n    <ion-toggle checked="false" (ionChange)="datachanged(item.value,$event)" ></ion-toggle>\n  </ion-item>\n  <ion-item *ngIf="item.Notification == true">\n    <ion-label> ปิดเสียงชั่วคราว </ion-label>\n    <ion-toggle  checked="true"></ion-toggle>\n  </ion-item>\n  <ion-item *ngIf="item.Notification == true">\n    <ion-label> เสียง </ion-label>\n    <ion-toggle  checked="true"></ion-toggle>\n  </ion-item>\n  <ion-item  *ngIf="item.Notification == true">\n    <ion-label> ระบบสั่น </ion-label>\n    <ion-toggle  checked="true"></ion-toggle>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\notification\notification.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__ = __webpack_require__(78);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TimelinePage = (function () {
    function TimelinePage(tosat, afb, navCtrl, navParams, platform, splashScreen, homeaut, firebaseservice) {
        var _this = this;
        this.tosat = tosat;
        this.afb = afb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homeaut = homeaut;
        this.firebaseservice = firebaseservice;
        platform.ready().then(function () {
            splashScreen.hide();
        });
        this.homeaut.authState.subscribe(function (data) {
            _this.timelinelist$ = _this.firebaseservice.getTimelinelist().snapshotChanges().map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            //console.log("path",this.afb.list<Profileuser>(`/ProfileUser//${ data.uid }`));
            _this.itemsRef = _this.afb.list("/ProfileUser//" + data.uid);
            console.log("path", _this.afb.list("/ProfileUser//" + data.uid));
            _this.users = _this.itemsRef
                .snapshotChanges()
                .map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            _this.tosat.create({
                message: "Welcom to my App," + data.email,
                duration: 3000
            }).present();
            //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
        });
    }
    TimelinePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimelinePage');
    };
    return TimelinePage;
}());
TimelinePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-timeline',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\timeline\timeline.html"*/'<ion-header>\n    <ion-navbar color="dark">\n      <ion-title text-center>Timeline</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n\n\n  <ion-content>\n   \n      <section id="cd-timeline" class="cd-container" *ngFor="let times of timelinelist$ | async">\n         <div *ngFor="let user of users | async">\n             <div *ngIf="times.uid == user.Email">\n            <div class="cd-timeline-block" *ngIf="times.status == true">\n                    <div class="cd-timeline-icon royal">\n                    <i class="timelineIcon"> <ion-icon name="ios-car-outline"> </ion-icon></i>\n                  </div>\n                  <div class="cd-timeline-content-left royal">\n                      <h5 class="marginBottom0 marginTop0"></h5>\n                      <div class="title-time">\n                          <p>เข้าจอด</p>\n                          <p>{{times.datetime}}</p>\n                      </div>\n                  </div>\n                </div>\n          \n            <div class="cd-timeline-block" *ngIf="times.status == false">\n                <div class="cd-timeline-icon royal"  >\n                <i class="timelineIcon"> <ion-icon name="ios-car-outline"> </ion-icon></i>\n              </div>\n              <div class="cd-timeline-content royal">\n                  <h5 class="marginBottom0 marginTop0"></h5>\n                  <div class="title-time">\n                      <p>นำรถออก</p>\n                      <p>{{times.datetime}}</p>\n                  </div>\n              </div>\n            </div>\n        </div>\n    </div>\n        </section>\n    \n  </ion-content>\n  \n  \n  '/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\timeline\timeline.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]])
], TimelinePage);

//# sourceMappingURL=timeline.js.map

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/launchnavigate/launchnavigate.module": [
		566,
		7
	],
	"../pages/login/login.module": [
		567,
		6
	],
	"../pages/mycar/mycar.module": [
		560,
		5
	],
	"../pages/navigate/navigate.module": [
		561,
		4
	],
	"../pages/notification/notification.module": [
		562,
		3
	],
	"../pages/parking/parking.module": [
		563,
		2
	],
	"../pages/register/register.module": [
		564,
		1
	],
	"../pages/timeline/timeline.module": [
		565,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 252;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationTracker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LocationTracker = (function () {
    function LocationTracker(zone, geolocation) {
        this.zone = zone;
        this.geolocation = geolocation;
        this.lat = 0;
        this.lng = 0;
    }
    LocationTracker.prototype.startTracking = function () {
        var _this = this;
        var config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 2000
        };
        // Background Tracking
        // Foreground Tracking
        var options = {
            frequency: 3000,
            enableHighAccuracy: true
        };
        this.watch = this.geolocation.watchPosition(options)
            .filter(function (p) { return p.code === undefined; }).subscribe(function (position) {
            console.log(position);
            // Run update inside of Angular's zone
            _this.zone.run(function () {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
            });
        });
    };
    LocationTracker.prototype.stopTracking = function () {
        console.log('stopTracking');
        this.watch.unsubscribe();
    };
    return LocationTracker;
}());
LocationTracker = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
], LocationTracker);

//# sourceMappingURL=location-track.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_location_track__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var NavigatePage = (function () {
    function NavigatePage(locationTracker, navCtrl, navParams, Geo, platform, homeaut, firebaseservice, afb, zone) {
        var _this = this;
        this.locationTracker = locationTracker;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Geo = Geo;
        this.platform = platform;
        this.homeaut = homeaut;
        this.firebaseservice = firebaseservice;
        this.afb = afb;
        this.zone = zone;
        this.userP = {
            key: "",
            uid: "",
            Email: "",
            DisplayName: "",
            Password: "",
            GPS: {
                Latitut: 0,
                Longtitude: 0
            }
        };
        this.img = 'assets/icon/pin.png';
        this.markers = [];
        this.icon = {
            url: 'assets/icon/pin.png',
            scaledSize: new google.maps.Size(18, 18),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0) // anchor
        };
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        platform.ready().then(function () {
            //this.locationTracker.startTracking();
            _this.update();
            _this.showMap();
            _this.startTracking();
        });
    }
    NavigatePage.prototype.update = function () {
        var _this = this;
        setTimeout(function () {
            console.log('a');
            _this.set();
        }, 500);
    };
    NavigatePage.prototype.set = function () {
        var _this = this;
        setTimeout(function () {
            _this.update();
        }, 500);
    };
    NavigatePage.prototype.ionViewDidLoad = function () {
        console.log("map", this.mapRef, this.lat, this.lng);
    };
    NavigatePage.prototype.startTracking = function () {
        var _this = this;
        var config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: true,
            interval: 2000
        };
        // Background Tracking
        // Foreground Tracking
        var options = {
            frequency: 3000,
            enableHighAccuracy: true,
        };
        this.watch = this.Geo.watchPosition(options)
            .filter(function (p) { return p.code === undefined; }).subscribe(function (position) {
            console.log(position);
            var locat = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.addMarker(locat, _this.map);
            _this.deleteMarkers();
            _this.addMarker(locat, _this.map);
            _this.setMapOnAll(_this.map);
            // Run update inside of Angular's zone
            _this.zone.run(function () {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
            });
        });
    };
    NavigatePage.prototype.showMap = function () {
        var _this = this;
        this.Geo.getCurrentPosition().then(function (pos) {
            _this.directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            var location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var option = {
                center: location,
                zoom: 50,
                streetViewControl: false,
                mapTypeId: 'terrain',
                rotateControl: true,
                fullscreenControl: true
            };
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, option);
            var end = new google.maps.LatLng(18.813133, 98.9536546);
            _this.directionsDisplay.setMap(_this.map);
            _this.directionsService.route({
                origin: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                destination: { lat: 18.813133, lng: 98.9536546 },
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status === 'OK') {
                    _this.directionsDisplay.setOptions({ preserveViewport: true });
                    _this.directionsDisplay.setDirections(response);
                    _this.addMarkerend(end, _this.map);
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }).catch(function (err) { return console.log(err); });
        //
    };
    NavigatePage.prototype.addMarkerend = function (position, map) {
        return new google.maps.Marker({
            position: position,
            map: this.map,
        });
    };
    NavigatePage.prototype.addMarker = function (position, map) {
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: this.icon
        });
        this.markers.push(marker);
    };
    NavigatePage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    NavigatePage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    NavigatePage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    NavigatePage.prototype.calculateAndDisplayRoute = function () {
    };
    return NavigatePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
], NavigatePage.prototype, "mapRef", void 0);
NavigatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-navigate',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\navigate\navigate.html"*/'<!--\n  Generated template for the NavigatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n  <p>latigut :{{ lat }}</p>\n<p>lontigut : {{ long }}</p>\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n<div #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\navigate\navigate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_location_track__["a" /* LocationTracker */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
], NavigatePage);

//# sourceMappingURL=navigate.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaunchnavigatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LaunchnavigatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LaunchnavigatePage = (function () {
    function LaunchnavigatePage(navCtrl, navParams, platform, Lanch) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.Lanch = Lanch;
        platform.ready().then(function () {
            //this.locationTracker.startTracking();
            _this.update();
        });
    }
    LaunchnavigatePage.prototype.ionViewDidLoad = function () {
    };
    LaunchnavigatePage.prototype.update = function () {
        var options = {
            start: 'London, ON',
            app: this.Lanch.APP.UBER
        };
        this.Lanch.navigate('18.813133, ON', options)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    return LaunchnavigatePage;
}());
LaunchnavigatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-launchnavigate',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\launchnavigate\launchnavigate.html"*/'<!--\n  Generated template for the LaunchnavigatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Launchnavigate</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\launchnavigate\launchnavigate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__["a" /* LaunchNavigator */]])
], LaunchnavigatePage);

//# sourceMappingURL=launchnavigate.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(371);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_timeline_timeline__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_notification_notification__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_parking_parking__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_navigate_navigate__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_mycar_mycar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_location_track__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_launchnavigate_launchnavigate__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_mergeMap__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_do__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_register_register__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_launch_navigator__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_firebase_service_firebase_service__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//import { Camera } from '@ionic-native/camera';











var firebaseAuth = {
    apiKey: "AIzaSyBmTXXnw3dOAHSglcshRXJOMMTMkAapaQo",
    authDomain: "blissful-flames-185507.firebaseapp.com",
    databaseURL: "https://blissful-flames-185507.firebaseio.com",
    projectId: "blissful-flames-185507",
    storageBucket: "blissful-flames-185507.appspot.com",
    messagingSenderId: "497240447227"
};
var cloudSettings = {
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



var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_parking_parking__["a" /* ParkingPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_timeline_timeline__["a" /* TimelinePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_navigate_navigate__["a" /* NavigatePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_mycar_mycar__["a" /* MycarPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_launchnavigate_launchnavigate__["a" /* LaunchnavigatePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/mycar/mycar.module#MycarPageModule', name: 'MycarPage', segment: 'mycar', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/navigate/navigate.module#NavigatePageModule', name: 'NavigatePage', segment: 'navigate', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/parking/parking.module#ParkingPageModule', name: 'ParkingPage', segment: 'parking', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/timeline/timeline.module#TimelinePageModule', name: 'TimelinePage', segment: 'timeline', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/launchnavigate/launchnavigate.module#LaunchnavigatePageModule', name: 'LaunchnavigatePage', segment: 'launchnavigate', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_19_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
            __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__["a" /* AngularFirestoreModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_parking_parking__["a" /* ParkingPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_timeline_timeline__["a" /* TimelinePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_navigate_navigate__["a" /* NavigatePage */], __WEBPACK_IMPORTED_MODULE_10__pages_mycar_mycar__["a" /* MycarPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_launchnavigate_launchnavigate__["a" /* LaunchnavigatePage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_11__providers_location_track__["a" /* LocationTracker */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_26__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n  <!--Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus --> \n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FirebaseServiceProvider = (function () {
    function FirebaseServiceProvider(db, auth) {
        var _this = this;
        this.db = db;
        this.auth = auth;
        this.parkinglistRef = this.db.list('/Parking-list/');
        this.timelinelistRef = this.db.list('Timeline-list');
        this.auth.authState.subscribe(function (data) {
            _this.users = _this.db.list("ProfileUser/" + data.uid + "//");
        });
    }
    FirebaseServiceProvider.prototype.getParkinglist = function () {
        return this.parkinglistRef;
    };
    FirebaseServiceProvider.prototype.getuser = function () {
        return this.userd1;
    };
    FirebaseServiceProvider.prototype.updategps = function (user) {
        return this.users.update(user.key, user);
    };
    FirebaseServiceProvider.prototype.getTimelinelist = function () {
        return this.timelinelistRef;
    };
    return FirebaseServiceProvider;
}());
FirebaseServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], FirebaseServiceProvider);

//# sourceMappingURL=firebase-service.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parking_parking__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(Loauth, navCtrl, navParams, alertCtrl) {
        this.Loauth = Loauth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.Fsiginin = function () {
        var alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'this admin',
            buttons: ['ok']
        });
        alert.present();
    };
    LoginPage.prototype.signin = function () {
        /**
        if(this.user.value =="admin" && this.password.value=="admin")
        {
          let alert = this.alertCtrl.create({
            title: 'Sign in',
            subTitle: 'admin',
            buttons: ['ok']
          });
          alert.present();
        }
        else
        {
          let alert = this.alertCtrl.create({
            title: 'Sign in',
            subTitle: 'not admin',
            buttons: ['ok']
          });
          alert.present();
        }*/
        var _this = this;
        this.Loauth.auth.signInWithEmailAndPassword(this.Email.value, this.password.value)
            .then(function (data) {
            console.log("User Registered succfully", data);
            var alert = _this.alertCtrl.create({
                title: 'Sign in',
                subTitle: 'User SignIN succfully',
                buttons: ['ok']
            });
            alert.present();
            _this.Loauth.authState.subscribe(function (ref) {
            });
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        })
            .catch(function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Sign in',
                subTitle: 'Email ro password not math',
                buttons: ['ok']
            });
            alert.present();
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.regis = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.Glogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__parking_parking__["a" /* ParkingPage */]);
    };
    return LoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('Email'),
    __metadata("design:type", Object)
], LoginPage.prototype, "Email", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
    __metadata("design:type", Object)
], LoginPage.prototype, "password", void 0);
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"E:\Pre-pro\pre-Test\src\pages\login\login.html"*/'<!-- \n<ion-header>\n <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n-->\n<ion-content class="background">\n	<h1>CARPARK</h1>\n		<ion-card>\n			<form>\n			<ion-card-header>\n			<label>เข้าสู่ระบบ</label>\n			</ion-card-header>\n			<ion-card-content>\n				<ion-list no-line>\n					<ion-item>\n						<ion-label floating>Email</ion-label>\n						<ion-input type="text" #Email></ion-input>\n					</ion-item>\n					<ion-item>\n						<ion-label floating>Password</ion-label>\n						<ion-input type="password" #password></ion-input>\n					</ion-item>\n					<p>\n		<ion-checkbox color="dark" checked="true"></ion-checkbox>จำรหัสผ่าน <a> ลืมรหัสผ่าน ?</a></p>\n					<button ion-button  block outline  color="oreng"(click)="signin()">Sign In</button>\n					<p>OR</p>\n					<button ion-button block color="facebook"(click)="Fsiginin()">\n						<ion-icon name="logo-facebook" ></ion-icon> Sign In with facebook\n					</button>\n		 \n					<button ion-button block color="danger"(click)="Glogin()">\n						<ion-icon name="logo-google" ></ion-icon> Sign In with GOOGLE\n					</button>\n				</ion-list>\n			</ion-card-content>\n			</form>\n		</ion-card>\n		\n	</ion-content>\n	<ion-footer>\n		<button class="bottom" ion-button clear full color="light"(click)="regis()">Don\'t have an account? Sign up</button>\n	</ion-footer>\n	 \n	\n	'/*ion-inline-end:"E:\Pre-pro\pre-Test\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

},[355]);
//# sourceMappingURL=main.js.map