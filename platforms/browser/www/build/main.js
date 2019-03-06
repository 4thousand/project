webpackJsonp([14],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarparkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parking_parking__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_platform_platform__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_take__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_version__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(71);
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














///
var CarparkPage = (function () {
    function CarparkPage(localNotifications, parkaht, db, Lanch, alertCtrl, Platforms, navCtrl, navParams, storage, appVersion, firebaseservice, backgroundMode) {
        var _this = this;
        this.localNotifications = localNotifications;
        this.parkaht = parkaht;
        this.db = db;
        this.Lanch = Lanch;
        this.alertCtrl = alertCtrl;
        this.Platforms = Platforms;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.appVersion = appVersion;
        this.firebaseservice = firebaseservice;
        this.backgroundMode = backgroundMode;
        //   carpark:Carpark={
        //     name:"",
        //     slots:6,
        //     empty:undefined,
        //     location:"",
        //     notempty:undefined,
        //     status:undefined,
        //     GPS:{
        //       lat:undefined,
        //       long:undefined
        //    }
        // }
        this.myDate = new Date().toISOString();
        this.Login = "Login";
        this.Loglogins = {
            uid: "",
            email: "",
            status: "Login",
            datetime: "",
        };
        this.time = {
            uid: "",
            parkname: "",
            status: true,
            datetime: "",
            time: "",
        };
        this.userp = {
            key: "",
            Email: "",
            DisplayName: "",
            Password: "",
            status: status,
        };
        this.usersc = null;
        this.authState = null;
        this.park = {
            name: "",
            standby: "",
            status: true,
            local: ""
        };
        this.bgmod = false;
        this.pet = "puppies";
        this.isAndroid = true;
        this.isAndroid = Platforms.is('android');
        console.log(this.formateDate());
        Platforms.ready().then(function () {
            _this.parkaht.authState.subscribe(function (data) {
                if (data) {
                    //console.log(data.email);
                    //
                    _this.Loglogins.uid = data.uid;
                    _this.Loglogins.email = data.email;
                    _this.Loglogins.status = 'Login';
                    _this.Loglogins.datetime = _this.formateDate();
                    // this.formateDate(this.date); 
                    _this.firebaseservice.updateLog(_this.Loglogins);
                    _this.bgnotiFunction();
                    console.log("bg");
                    _this.backgroundMode.on('activate').subscribe(function () {
                        _this.bgnotiFunction();
                    });
                    _this.backgroundMode.enable();
                    //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
                }
                //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
            });
            _this.registerSocial();
            _this.setdefault();
        });
        this.itemsRefs = this.db.list('/Parking-list/PA/');
        /*
          this.db.list<Parkinglist>(`/Parking-list/PA/`).snapshotChanges().subscribe((res) => {
            this.parkaht.authState.take(1).subscribe(datae => {
              if (datae) {
                res.forEach(data => {
                  let parkstand = data.payload.val();
                  if (parkstand.standby == datae.email) {
                    this.navCtrl.push(ParkingPage);
                  }
                });
              }
            })
          });
        */
        this.parkinglist$ = this.firebaseservice.getcarpark().snapshotChanges().map(function (changes) {
            return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
        });
        this.carparklist = this.db.list("/Park-Car/");
        this.loadparkA();
        console.log(this.parkinglist$);
    }
    CarparkPage.prototype.setdefault = function () {
        var _this = this;
        //this.bgnotiFunction();
        this.storage.get('Notification').then(function (data) {
            if (data == null || data == undefined) {
                //setdeful
                _this.storage.set('Notification', true);
            }
        });
        this.storage.get('Version').then(function (datav) {
            if (datav == null || datav == undefined) {
                console.log(datav + "nohave");
                _this.storage.set('Version', "1.0.4");
            }
        });
        var version;
        this.db.list("application").valueChanges().subscribe((function (res) {
            res.forEach(function (datas) {
                version = datas;
                _this.storage.set('MyAppVersion', version);
            });
        }));
    };
    CarparkPage.prototype.formateDate = function () {
        var dates = new Date();
        var day = dates.getDate().toString();
        var month = dates.getMonth() + 1;
        var Year = dates.getFullYear().toString();
        this.datetime = Year + "/" + month + "/" + day;
        return this.datetime;
    };
    CarparkPage.prototype.formatetime = function () {
        var dates = new Date();
        var hours = dates.getHours().toString();
        var min = dates.getMinutes().toString();
        var time = hours + ":" + min;
        return time;
    };
    CarparkPage.prototype.registerSocial = function () {
        var _this = this;
        var id = 0;
        ///this.userp.uid = data.uid;
        this.db.list("/ProfileUser/").valueChanges().take(1).subscribe(function (res) {
            _this.parkaht.authState.take(1).subscribe(function (data) {
                _this.userp.Email = data.email;
                _this.userp.DisplayName = data.displayName;
                _this.userp.status = "online";
                //console.log(res);
                res.forEach(function (item) {
                    if (item.Email == data.email) {
                        id = 1;
                    }
                    console.log(id);
                });
                if (id == 0) {
                    _this.firebaseservice.login(_this.userp)
                        .then(function (ref) {
                        _this.db.object("/ProfileUser/" + ref.key).update({ key: ref.key });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { key: ref.key });
                    });
                }
            });
        });
    };
    CarparkPage.prototype.bgnotiFunction = function () {
        var _this = this;
        console.log("bg1");
        var itemthis;
        this.storage.get('Notification').then(function (datas) {
            _this.db.list("/Parking-list/PA/").snapshotChanges().subscribe(function (res) {
                _this.parkaht.authState.subscribe(function (datae) {
                    if (datae) {
                        res.forEach(function (item) {
                            var parkingrefts = item.payload.val();
                            var parkey = item.key;
                            console.log(parkingrefts.name + " " + parkingrefts.status + " " + parkingrefts.standby);
                            if (parkingrefts.status == true && parkingrefts.standby != "none") {
                                if (parkingrefts.standby == datae.email) {
                                    if (datas == true) {
                                        _this.localNotifications.schedule({
                                            title: 'Notifications ',
                                            text: 'รถของท่านได้ทำการออกจากช\n ช่อง :' + parkingrefts.name + '\nเวลา :' + _this.formateDate(),
                                        });
                                    }
                                    _this.time.uid = parkingrefts.standby;
                                    _this.time.parkname = parkingrefts.name;
                                    _this.time.status = true;
                                    _this.time.datetime = _this.formateDate();
                                    _this.time.time = _this.formatetime();
                                    _this.firebaseservice.addtime(_this.time);
                                    console.log("none");
                                }
                                _this.itemsRefs.update(parkey, { standby: "none" }).then(function (data) {
                                    console.log("then");
                                });
                            }
                        });
                    }
                });
            });
        });
    };
    CarparkPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CarparkPage');
    };
    CarparkPage.prototype.PA1 = function (name) {
        if (name == "PA") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__parking_parking__["a" /* ParkingPage */]);
        }
        else {
            var alert = this.alertCtrl.create({
                title: 'Wrong',
                subTitle: 'ลานจอดนี้ยังไม่มีการติดตั้ง',
                buttons: ['ok']
            });
            alert.present();
        }
    };
    CarparkPage.prototype.loadparkA = function () {
        var _this = this;
        this.db.list("/Parking-list/").snapshotChanges().subscribe(function (res) {
            res.forEach(function (item) {
                _this.db.list("/Parking-list/" + item.key).snapshotChanges().subscribe(function (res1) {
                    res1.forEach(function (item1) {
                        console.log(item1.payload.val());
                    });
                });
            });
        });
        this.db.list("/Parking-list/PA/").valueChanges().subscribe(function (res) {
            var st = 0;
            var keys = "-LK0dEgqvv3bgzBFuKGg";
            res.forEach(function (item) {
                if (item.status == false) {
                    st += 1;
                }
            });
            if (st == 6) {
                _this.carparklist.update(keys, { status: false, empty: 0, notempty: 6 });
            }
            else {
                _this.carparklist.update(keys, { status: true, empty: (6 - st), notempty: st });
            }
            st = 0;
        });
    };
    CarparkPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    CarparkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-carpark',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\carpark\carpark.html"*/'<!--\n  Generated template for the CarparkPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n \n<ion-header>\n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n {{"Parking" | translate}}\n</ion-title>\n</ion-navbar>\n</ion-header>\n\n<ion-content    fullscreen class="bgcolor"> \n<div  *ngFor="let item of parkinglist$ | async">\n \n \n       \n          <ion-card (click)="PA1(item.name)" class="while"    fullscreen>\n               <div class="boximg">\n        <img src="{{item.url}}" height="80px" weight="40px" />\n       </div>\n             \n            \n          <div class="namepark ">\n            <h1 >{{item.location}}</h1>\n       \n            </div>\n            <div class="statuspark green vertical-align-content" height="100%"  *ngIf="item.status == 1"><div><h1>{{"Free" | translate}}</h1><h1>{{item.notempty}}/{{item.slots}}</h1></div></div>\n             <div class="statuspark red vertical-align-content" height="100%"  *ngIf="item.status == 0"><div><h1>{{"Full" | translate}}</h1><h1>{{item.notempty}}/{{item.slots}}</h1></div></div>\n \n          </ion-card>\n \n        </div>\n \n     \n  <ion-fab right bottom>\n     <button ion-fab mini color="danger"><ion-icon name="add"></ion-icon></button>\n    \n  </ion-fab>\n\n<!--\n<img src="../../assets/imgs/add.png" height="80px" weight="40px" /> \n  <div class="content">\n    <div  *ngFor="let item of parkinglist$ | async">\n        <div class="box1 green" *ngIf="item.status == 1" (click)="PA1(item.name)">\n            <h2 align="center">ลานจอด<br>ว่าง:{{item.empty}}</h2>\n            <p align="center">{{item.name}}</p>\n           <p align="center">ตำแหน่ง:{{item.location}}</p>\n         </div>\n         <div class="box1 red" *ngIf="item.status == 0" (click)="PA1(item.name)">\n            <h2 align="center">ลานจอด<br>เต็ม</h2>\n            <p align="center">{{item.name}}</p>\n           <p align="center">ตำแหน่ง:{{item.location}}</p>\n         </div>\n    </div>\n    \n  </div>\n \n  <ion-footer>\n      <button class="bottom" ion-button clear full color="dark"(click)="back()">{{"Back" | translate}}</button>\n  </ion-footer>\n</ion-content>\n -->'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\carpark\carpark.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator__["a" /* LaunchNavigator */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator__["a" /* LaunchNavigator */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_platform_platform__["a" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_platform_platform__["a" /* Platform */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_version__["a" /* AppVersion */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_version__["a" /* AppVersion */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */]) === "function" && _m || Object])
    ], CarparkPage);
    return CarparkPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
}());

//# sourceMappingURL=carpark.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__carpark_carpark__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__setting_setting__ = __webpack_require__(152);
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
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabsPage = (function () {
    function TabsPage(navCtrl, parkaht, db, navParams) {
        this.navCtrl = navCtrl;
        this.parkaht = parkaht;
        this.db = db;
        this.navParams = navParams;
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__timeline_timeline__["a" /* TimelinePage */];
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__carpark_carpark__["a" /* CarparkPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_6__setting_setting__["a" /* SettingPage */];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabsPage');
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\tabs\tabs.html"*/'<!--\n  Generated template for the TabsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>tabs</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n-->\n\n<ion-tabs selectedIndex="0" color="darklight" tabsPlacement="bottom">\n  <ion-tab [root]="tab1Root" tabTitle=\'{{"Parking" | translate}}\' tabIcon="ios-car"></ion-tab>\n <ion-tab [root]="tab4Root" tabTitle=\'{{"History" | translate}}\' tabIcon="clipboard"></ion-tab>\n <ion-tab [root]="tab5Root" tabTitle=\'{{"Setting" | translate}}\' tabIcon="md-settings"></ion-tab>\n</ion-tabs>\n '/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_background_mode__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_angular_platform_platform__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mycar_mycar__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__parking_parking__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_local_notifications__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_angular_navigation_nav_params__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_toast_toast_controller__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__carpark_carpark__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_launch_navigator__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_firebase__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__setting_setting__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__about_about__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_storage__ = __webpack_require__(71);
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

//import { platform, DateTime } from 'ionic-angular';





//import { NavigatePage } from '../navigate/navigate';




//import { NotificationPage } from '../notification/notification';

//import { TimelinePage } from '../timeline/timeline';




//import { Subscription } from 'ionic-native/node_modules/rxjs/Subscription';




//import { LaunchnavigatePage } from '../launchnavigate/launchnavigate';





//import { query } from '@angular/core/src/animation/dsl';
var HomePage = (function () {
    function HomePage(backgroundMode, Platforms, launchNavigator, tosat, nav, navCtrl, platform, alertCtrl, homeaut, firebaseservice, afb, localNotifications, storage, appVersion) {
        var _this = this;
        this.backgroundMode = backgroundMode;
        this.Platforms = Platforms;
        this.launchNavigator = launchNavigator;
        this.tosat = tosat;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.homeaut = homeaut;
        this.firebaseservice = firebaseservice;
        this.afb = afb;
        this.localNotifications = localNotifications;
        this.storage = storage;
        this.appVersion = appVersion;
        this.myDate = new Date().toISOString();
        this.Login = "Login";
        this.Loglogins = {
            uid: "",
            email: "",
            status: "Login",
            datetime: "",
        };
        this.time = {
            uid: "",
            parkname: "",
            status: true,
            datetime: "",
            time: "",
        };
        this.userp = {
            key: "",
            Email: "",
            DisplayName: "",
            Password: "",
            status: status,
        };
        this.usersc = null;
        this.authState = null;
        this.park = {
            name: "",
            standby: "",
            status: true,
            local: ""
        };
        this.bgmod = false;
        this.pet = "puppies";
        this.isAndroid = true;
        this.isAndroid = Platforms.is('android');
        Platforms.ready().then(function () {
            _this.homeaut.authState.take(1).subscribe(function (data) {
                console.log(data.email);
                //
                _this.Loglogins.uid = data.uid;
                _this.Loglogins.email = data.email;
                _this.Loglogins.status = 'Login';
                _this.Loglogins.datetime = _this.formateDate();
                // this.formateDate(this.date); 
                _this.firebaseservice.updateLog(_this.Loglogins);
                var carEmails = data.email;
                _this.userp.Email = data.email;
                _this.itemsRef = _this.afb.list("/ProfileUser/");
                _this.users = _this.itemsRef
                    .snapshotChanges()
                    .map(function (changes) {
                    return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
                });
                _this.bgnotiFunction();
                _this.backgroundMode.on('activate').subscribe(function () {
                    _this.bgnotiFunction();
                });
                _this.backgroundMode.enable();
                //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
                //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
            });
            _this.registerSocial();
            _this.setdefault();
        });
        this.itemsRefs = this.afb.list('/Parking-list/PA/');
    }
    HomePage_1 = HomePage;
    HomePage.prototype.setdefault = function () {
        var _this = this;
        //this.bgnotiFunction();
        this.storage.get('Notification').then(function (data) {
            if (data == null || data == undefined) {
                //setdeful
                _this.storage.set('Notification', true);
            }
        });
        this.storage.get('Version').then(function (datav) {
            if (datav == null || datav == undefined) {
                console.log(datav + "nohave");
                _this.storage.set('Version', "1.0.4");
            }
        });
        var version;
        this.afb.list("application").valueChanges().subscribe((function (res) {
            res.forEach(function (datas) {
                version = datas;
                _this.storage.set('MyAppVersion', version);
            });
        }));
    };
    HomePage.prototype.registerSocial = function () {
        var _this = this;
        var id = 0;
        ///this.userp.uid = data.uid;
        this.afb.list("/ProfileUser/").valueChanges().take(1).subscribe(function (res) {
            _this.homeaut.authState.take(1).subscribe(function (data) {
                _this.userp.Email = data.email;
                _this.userp.DisplayName = data.displayName;
                _this.userp.status = "online";
                //console.log(res);
                res.forEach(function (item) {
                    if (item.Email == data.email) {
                        id = 1;
                    }
                    console.log(id);
                });
                if (id == 0) {
                    _this.firebaseservice.login(_this.userp)
                        .then(function (ref) {
                        _this.afb.object("/ProfileUser/" + ref.key).update({ key: ref.key });
                        _this.navCtrl.setRoot(HomePage_1, { key: ref.key });
                    });
                }
            });
        });
    };
    HomePage.prototype.bgnotiFunction = function () {
        var _this = this;
        var itemthis;
        this.storage.get('Notification').then(function (datas) {
            _this.afb.list("/Parking-list/PA/").snapshotChanges().subscribe(function (res) {
                _this.homeaut.authState.take(1).subscribe(function (datae) {
                    if (datae) {
                        res.forEach(function (item) {
                            var parkingrefts = item.payload.val();
                            var parkey = item.key;
                            console.log(parkingrefts.name);
                            if (parkingrefts.status == true && parkingrefts.standby != "none") {
                                if (parkingrefts.standby == datae.email) {
                                    if (datas == true) {
                                        _this.localNotifications.schedule({
                                            title: 'Notifications ',
                                            text: 'รถของท่านได้ทำการออกจากช\n ช่อง :' + parkingrefts.name + '\nเวลา :' + _this.formateDate(),
                                        });
                                        _this.time.uid = parkingrefts.standby;
                                        _this.time.parkname = parkingrefts.name;
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                        _this.itemsRefs.update(parkey, { standby: "none" });
                                    }
                                }
                            }
                        });
                    }
                });
            });
        });
    };
    HomePage.prototype.backgroundNoti = function () {
        var _this = this;
        this.bgmod = true;
        this.storage.get('Notification').then(function (datas) {
            _this.afb.list("/Parking-list/PA/").valueChanges().subscribe(function (res) {
                _this.homeaut.authState.take(1).subscribe(function (datae) {
                    if (datae) {
                        res.forEach(function (item) {
                            if (item.name == "A1") {
                                console.log(datae.email + "1");
                                if (item.status == true && item.standby != "none") {
                                    if (item.standby == datae.email) {
                                        console.log("เข้าจ้อด" + datae.email);
                                        if (datas == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications ',
                                                text: 'รถของท่านได้ทำการออกจากช่องA1' + '\nเวลา :' + _this.formateDate(),
                                            });
                                        }
                                        _this.time.uid = item.standby;
                                        _this.time.parkname = "A1";
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                    }
                                    var keyp = "-LK0dEgrvK9jrDvXWAxP";
                                    _this.itemsRefs.update(keyp, { standby: "none" });
                                }
                            }
                            if (item.name == "A2") {
                                if (item.status == true && item.standby != "none") {
                                    if (item.standby == datae.email) {
                                        if (datas == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications ',
                                                text: 'รถของท่านได้ทำการออกจากช่องA2' + '\nเวลา :' + _this.formateDate(),
                                            });
                                        }
                                        _this.time.uid = datae.email;
                                        _this.time.parkname = "A2";
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                    }
                                    var keyp = "-LK0dEgtIgTguejdK7uP";
                                    _this.itemsRefs.update(keyp, { standby: "none" });
                                }
                            }
                            if (item.name == "A3") {
                                if (item.status == true && item.standby != "none") {
                                    if (item.standby == datae.email) {
                                        if (datas == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications ',
                                                text: 'รถของท่านได้ทำการออกจากช่องA3' + '\nเวลา :' + _this.formateDate(),
                                            });
                                        }
                                        _this.time.uid = datae.email;
                                        _this.time.parkname = "A3";
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                    }
                                    var keyp = "-LK0dEgulx-RBDKZyHCd";
                                    _this.itemsRefs.update(keyp, { standby: "none" });
                                }
                            }
                            if (item.name == "A4") {
                                if (item.status == true && item.standby != "none") {
                                    if (item.standby == datae.email) {
                                        if (datas == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications ',
                                                text: 'รถของท่านได้ทำการออกจากช่องA4' + '\nเวลา :' + _this.formateDate(),
                                            });
                                        }
                                        _this.time.uid = datae.email;
                                        _this.time.parkname = "A4";
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                    }
                                    var keyp = "-LK0dEgvLiv6YVFa2uNO";
                                    _this.itemsRefs.update(keyp, { standby: "none" });
                                }
                            }
                            if (item.name == "A5") {
                                if (item.status == true && item.standby != "none") {
                                    if (item.standby == datae.email) {
                                        if (datas == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications ',
                                                text: 'รถของท่านได้ทำการออกจากช่องA5' + '\nเวลา :' + _this.formateDate(),
                                            });
                                        }
                                        _this.time.uid = datae.email;
                                        _this.time.parkname = "A5";
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                    }
                                    var keyp = "-LK0dEgwJ04bq3sGOTax";
                                    _this.itemsRefs.update(keyp, { standby: "none" });
                                }
                            }
                            if (item.name == "A6") {
                                if (item.status == true && item.standby != "none") {
                                    if (item.standby == datae.email) {
                                        if (datas == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications ',
                                                text: 'รถของท่านได้ทำการออกจากช่องA6' + '\nเวลา :' + _this.formateDate(),
                                            });
                                        }
                                        _this.time.uid = datae.email;
                                        _this.time.parkname = "A6";
                                        _this.time.status = true;
                                        _this.time.datetime = _this.formateDate();
                                        _this.time.time = _this.formatetime();
                                        _this.firebaseservice.addtime(_this.time);
                                    }
                                    var keyp = "-LK0dEgy3nox7S14RBzz";
                                    _this.itemsRefs.update(keyp, { standby: "none" });
                                }
                            }
                        });
                    }
                });
            });
        });
    };
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
    HomePage.prototype.gosetting = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_19__setting_setting__["a" /* SettingPage */]);
    };
    HomePage.prototype.Logout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.login = function () {
        if (this.user.value == "admin" && this.password.value == "admin") {
            var alert_1 = this.alertCtrl.create({
                title: 'Login',
                subTitle: 'this admin',
                buttons: ['ok']
            });
            alert_1.present();
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Login',
                subTitle: 'this user',
                buttons: ['ok']
            });
            alert_2.present();
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
        }
    };
    HomePage.prototype.GoPark = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__carpark_carpark__["a" /* CarparkPage */]);
    };
    HomePage.prototype.Signout = function () {
        var _this = this;
        this.homeaut.auth.signOut().then(function (data) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
            __WEBPACK_IMPORTED_MODULE_18_firebase__["auth"]().signOut();
            _this.backgroundMode.disable();
        });
    };
    HomePage.prototype.formateDate = function () {
        var dates = new Date();
        var day = dates.getDate().toString();
        var month = dates.getMonth().toString();
        var Year = dates.getFullYear().toString();
        this.datetime = Year + "/" + month + "/" + day;
        return this.datetime;
    };
    HomePage.prototype.formatetime = function () {
        var dates = new Date();
        var hours = dates.getHours().toString();
        var min = dates.getMinutes().toString();
        var time = hours + ":" + min;
        return time;
    };
    HomePage.prototype.gTimeline = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__mycar_mycar__["a" /* MycarPage */]);
    };
    HomePage.prototype.gabout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_20__about_about__["a" /* AboutPage */]);
    };
    HomePage.prototype.goMycarpage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__parking_parking__["a" /* ParkingPage */]);
        /*
        this.homeaut.authState.subscribe(data => {
    
          this.afb.list<Parkinglist>(`/Parking-list/PA/`).valueChanges().subscribe((res: Parkinglist[]) => {
            console.log(res);
            res.forEach((item) => {
              if(item.standby == data.email)
              {
                let alert = this.alertCtrl.create({
                  title: 'Mesess',
                  subTitle: 'รถชองท่านได้จอดอยู่ที่หน้าทค1อยู่ที่ช่อง'+item.name+'\nต้องการให้พาไปที่จอดรถหรือไม่',
                  buttons: [{
                    text: "นำทาง",
                    role: "นำทาง",
                    handler: datae => {
                      this.Platforms.ready().then(() => {
    
                        this.launchNavigator.navigate('18.81147,98.9542387')
                          .then(
                            success => {
                              let alert = this.alertCtrl.create({
                                title: 'Launched',
                                subTitle: 'Launched navigator',
                                buttons: ['ok']
                              });
                              alert.present();
                  
                            },
                            error => {
                              let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: 'Launched navigator' + error,
                                buttons: ['ok']
                              });
                              alert.present();
                  
                            }
                          );
                  
                  
                      });
                  
                    }
                  }, {
                    text: "ยกเลิก",
                    role: "ยกเลิก",
                    handler: datae => {
                        
                    }
            
                  }]
                });
                alert.present();
              }
            });
            });
          });
          */
    };
    HomePage.prototype.checksound = function () {
        this.storage.get('sound').then(function (datasound) {
            if (datasound == null || datasound == undefined || datasound == true) {
                return 'file://assets/sounds/shame.mp3';
            }
            else {
                return null;
            }
        });
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
    HomePage.prototype.GPark = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__carpark_carpark__["a" /* CarparkPage */]);
    };
    HomePage.prototype.ionViewWillLoad = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('passowrd'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "password", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\home\home.html"*/'\n<ion-header><!--<div class="logoheader"></div>\n \n		<ion-slides  >\n				<ion-slide>\n						{{userp.Email}}\n				</ion-slide>\n				<ion-slide>\n					<h1> </h1>\n				</ion-slide>\n				<ion-slide>\n					<h1>Slide 3</h1>\n				</ion-slide>\n			</ion-slides>\n		\n		<div class="header">\n			<div class="color-overlay">\n			  <div class="day-number"><ion-datetime displayFormat="D" [(ngModel)]="myDate"></ion-datetime></div>\n			  <div class="date-right">\n				<div class="day-name"><ion-datetime displayFormat="DDDD" [(ngModel)]="myDate"></ion-datetime></div>\n				<div class="month"><ion-datetime displayFormat="MMMM | YYYY" [(ngModel)]="myDate"></ion-datetime></div>\n			  </div>\n			</div>\n \n	</div>\n	-->\n \n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n{{"Home" | translate}}\n</ion-title>\n</ion-navbar>\n \n</ion-header>\n\n<ion-content text-center class="icons-basic-page" padding>\n		<div [ngSwitch]="pet" style="margin-top:100px;">\n				<ion-grid *ngSwitchCase="\'puppies\'">\n						<ion-row class="row">\n								<ion-col class="col col-lef"><button class="btn-h" (click)="GoPark()"><ion-icon name="ios-car"></ion-icon><br>{{"Parking" | translate}}</button></ion-col>\n								<ion-col class="col"><button class="btn-h" (click)="goMycarpage()" > <ion-icon name="ios-car-outline" ></ion-icon><br>{{"Mycar" | translate}}</button></ion-col>\n								<ion-col class="col col-ri"><button class="btn-h" (click)="goNavigatePage()"> <ion-icon name="navigate"></ion-icon><br>{{"Navigator" | translate}}</button></ion-col>\n						</ion-row>\n						<ion-row class="row">\n								<ion-col class="col col-lef"><button class="btn-h" (click)="gTimeline()"><ion-icon name="clipboard" md="md-clipboard" color="bright"></ion-icon><br>{{"History" | translate}}</button></ion-col>\n								<ion-col class="col"><button class="btn-h" (click)="gosetting()" > <ion-icon  name="md-settings" > </ion-icon><br>{{"Setting" | translate}}</button></ion-col>\n								<ion-col class="col col-ri"><button class="btn-h" (click)="gabout()"> <ion-icon  name="md-contact" ></ion-icon><br>{{"About" | translate}}</button></ion-col>\n						</ion-row>\n				</ion-grid> \n		</div>\n	</ion-content>\n<ion-footer>\n	<button  ion-button clear full color="light" (click)="Signout()">{{"SignOut" | translate}}</button>\n</ion-footer>\n \n\n'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_launch_navigator__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_14_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_13__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__["a" /* AppVersion */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutPage = (function () {
    function AboutPage(storage, navCtrl, navParams, homeaut, db) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homeaut = homeaut;
        this.db = db;
        this.profile = {
            uid: "",
            Email: "",
            DisplayName: "",
            Password: "",
            status: "",
            standby: "",
            version: "",
        };
        this.loaduser();
    }
    AboutPage.prototype.loaduser = function () {
        var _this = this;
        this.db.list("/ProfileUser/").valueChanges().take(1).subscribe(function (res) {
            _this.homeaut.authState.subscribe(function (data) {
                res.forEach(function (item) {
                    if (data.email == item.Email) {
                        _this.profile.Email = item.Email;
                        _this.profile.DisplayName = item.DisplayName;
                        _this.profile.uid = data.uid;
                    }
                });
            });
        });
        this.db.list("/Parking-list/PA/").valueChanges().subscribe(function (ress) {
            _this.homeaut.authState.subscribe(function (data) {
                ress.forEach(function (item) {
                    if (data.email == item.standby) {
                        _this.profile.standby = item.name;
                    }
                });
            });
        });
        this.storage.get('Version').then(function (data) {
            _this.profile.version = data;
        });
    };
    AboutPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\about\about.html"*/'<!--\n  Generated template for the AboutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n  {{"Profile" | translate}}\n</ion-title>\n</ion-navbar>\n \n</ion-header>\n\n\n<ion-content fullscreen>\n \n<div class="headers">\n <div class="logoimg">\n  <ion-img width="80px" height="80px" src="../../assets/icon/logo-profile.png"></ion-img>\n </div>\n <div class="boxprofile"><h6>{{"Username" | translate}}</h6><h2>{{profile.DisplayName}}</h2></div>\n</div>\n   \n \n  <ion-list>\n    <ion-item>\n        <h6> {{"Email" | translate}} </h6> \n        {{profile.Email}}\n    </ion-item>\n    \n    <ion-item *ngIf="profile.standby">\n        <h6>{{"Status" | translate}}</h6> \n       {{profile.standby}}\n    </ion-item>\n    <ion-item *ngIf="!profile.standby">\n        <h6>{{"Status" | translate}}</h6> \n          No Parking\n    </ion-item>\n   <ion-item >\n        <h6>{{"Version" | translate}}</h6> \n              {{profile.version}}\n    </ion-item>\n      <ion-item>\n        <h6>{{"UserID" | translate}}</h6> \n        {{profile.uid}}\n    </ion-item>\n  </ion-list>\n\n \n</ion-content>\n<ion-footer>\n		<button class="bottom" ion-button clear full color="black"(click)="back()">{{"Back" | translate}}</button>\n	</ion-footer>'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\about\about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_take__);
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







//import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MycarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
        this.myDate = new Date().toISOString();
        this.Povider = {
            email: "",
            displayname: "",
        };
        this.times = {
            uid: "",
            parkname: "",
            status: true,
            day: "",
            mon: "",
            year: "",
            time: "",
        };
        platform.ready().then(function () {
            splashScreen.hide();
        });
        this.homeaut.authState.take(1).subscribe(function (data) {
            _this.timelinelist$ = _this.firebaseservice.getTimelinelist().snapshotChanges().map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            //console.log("path",this.afb.list<Profileuser>(`/ProfileUser//${ data.uid }`));
            _this.Povider.email = data.email;
            _this.itemsRef = _this.afb.list("/ProfileUser/");
            console.log("path", _this.afb.list("/ProfileUser/"));
            _this.users = _this.itemsRef
                .snapshotChanges()
                .map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            _this.afb.list("/Timeline-list/").valueChanges().subscribe(function (res) {
                var itemes = [];
                res.forEach(function (item) {
                    itemes.push(item);
                });
                _this.timelist = itemes;
                console.log(_this.timelist);
            });
            //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
        });
    }
    TimelinePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    TimelinePage.prototype.click = function (i) {
        console.log(i);
    };
    TimelinePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimelinePage');
    };
    TimelinePage.prototype.goback = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
    };
    TimelinePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-timeline',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\timeline\timeline.html"*/'<ion-header>\n<!--\n\n\n  <div class="header">\n    <div class="color-overlay">\n      <div class="day-number"><ion-datetime displayFormat="D" [(ngModel)]="myDate"></ion-datetime></div>\n      <div class="date-right">\n        <div class="day-name"><ion-datetime displayFormat="DDDD" [(ngModel)]="myDate"></ion-datetime></div>\n        <div class="month"><ion-datetime displayFormat="MMMM | YYYY" [(ngModel)]="myDate"></ion-datetime></div>\n      </div>\n    </div>\n    <div class="actionbutton" (click)="goback()">กลับ</div>\n  </div>\n\n\n   <li *ngIf="times.status == false">\n        <div class="bullet  pink"></div>\n        <div class="time">{{times.datetime}}</div>\n        <div class="desc">\n          <h1>นำรถออก</h1>\n          <h1>{{times.parkname}}</h1>\n        </div>\n      </li>\n-->\n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n {{"History" | translate}}\n</ion-title>\n</ion-navbar>\n</ion-header>\n\n<ion-content class="bgcolor"   scroll="false">\n\n  <div *ngFor="let times of timelist?.reverse()">\n   <div *ngIf="times.uid == Povider.email">\n      <div  *ngIf="times.status == false">\n        <ion-card  >\n        <div class="leftside   red w20" style="display:flex; align-items: center;"><div style="margin: auto;"> <h1> {{times.datetime | date: \'dd\'}}  </h1>  <h2> {{times.datetime | date: \'MMM\'}}</h2> </div> </div>\n          \n         \n          <div class="leftside" style="display:flex; align-items: center; margin-left:5px;"> <div><h1>{{times.parkname}}</h1> <h2> TC1 RMUTL </h2></div> </div>\n            <div class="rightside " >\n                  <div class=" red inset" style="border-radius: 1px 1px 1px 10px;display: grid; align-items: center;min-height: 50%;text-align: center;"><ion-icon name="ios-arrow-back">  <ion-icon name="ios-car" ></ion-icon></ion-icon></div>   \n                  <div style=" min-height:50%; display:flex; align-items: center; padding-left:5px; " ><div> <h2>{{times.time  }}</h2> </div> </div>\n            </div>\n        </ion-card>\n        </div>\n   \n        <div  *ngIf="times.status == true">\n        <ion-card  >\n        <div class="leftside   green w20" style="display:flex; align-items: center;"><div style="margin: auto;"> <h1> {{times.datetime | date: \'dd\'}}  </h1>  <h2> {{times.datetime | date: \'MMM\'}}</h2> </div> </div>\n          \n         \n          <div class="leftside" style="display:flex; align-items: center; margin-left:5px;"> <div><h1>{{times.parkname}}</h1> <h2> TC1 RMUTL </h2></div> </div>\n            <div class="rightside " >\n                  <div class=" green inset " style=" border-radius: 1px 1px 1px 10px;display: grid; align-items: center;min-height: 50%;text-align: center;"> <ion-icon name="ios-car" > <ion-icon name="ios-arrow-forward-outline"> </ion-icon></ion-icon></div>   \n                  <div style=" min-height:50%; display:flex; align-items: center; padding-left:5px; " ><div> <h2>{{times.time  }}</h2> </div> </div>\n            </div>\n        </ion-card>\n        </div>\n             </div>\n  </div>  \n</ion-content>\n<!--\n\n\n<ion-footer>\n  <button class="bottom" ion-button clear full color="dark"(click)="back()">{{"Back" | translate}}</button>\n</ion-footer>\n\n-->'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\timeline\timeline.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]])
    ], TimelinePage);
    return TimelinePage;
}());

//# sourceMappingURL=timeline.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { auth } from 'firebase/app';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(Reauth, firebaseservice, navCtrl, navParams, alertCtrl, afdb) {
        this.Reauth = Reauth;
        this.firebaseservice = firebaseservice;
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
            status: status,
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
                    _this.afdb.list("/ProfileUser/").push(_this.userP)
                        .then(function (ref) {
                        _this.afdb.object("/ProfileUser/" + ref.key).update({ key: ref.key });
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */], { key: ref.key });
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('conpassword'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "conpassword", void 0);
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\register\register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <ion-list >\n    \n      <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input [(ngModel)]="userP.Email" type="text"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>DisplayName</ion-label>\n        <ion-input [(ngModel)]="userP.DisplayName" type="text"></ion-input>\n      </ion-item>\n    \n      <ion-item>\n        <ion-label floating>password</ion-label>\n        <ion-input [(ngModel)]="userP.Password" type="password"  ></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Confirm Password</ion-label>\n        <ion-input type="password" #conpassword></ion-input>\n      </ion-item>\n      \n      <!-- \n      <button ion-button  full color="secondary" outline icon-start>\n        <ion-icon name=\'paw\' is-active="false"></ion-icon>\n        Sync With LINE\n      </button>-->\n      <button ion-button block outline color="primary" type="submit"(click)="register()">Sign in</button>\n      \n    </ion-list>\n\n</ion-content>\n<ion-footer>\n        <button ion-button clear full color="primary"(click)="backlogin()">Back</button>\n  </ion-footer>\n\n'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_version__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__translate_translate__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__about_about__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_take__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_background_mode__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { Http } from '@angular/http';






;
/**
 * f7735b995f49bb7d3474781bfbe086548d96603e
 * Production │ Os0dt9TatLWbS1caQ3hVIkhlhkOu219ab229-ec96-404d-a6c8-650e7db20341 │├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ ptAOYgtHcnpVLNnSKDYzFMRy0Mms219ab229-ec96-404d-a6c8-650e7db20341 │
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *  code-push release-cordova Carpark android --targetBinaryVersion "~1.1.0"
 */


var SettingPage = (function () {
    function SettingPage(storage, db, backgroundMode, navCtrl, navParams, alertCtrl, auth, codePush, nGzone, platform, http, appVersion) {
        var _this = this;
        this.storage = storage;
        this.db = db;
        this.backgroundMode = backgroundMode;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.codePush = codePush;
        this.nGzone = nGzone;
        this.http = http;
        this.appVersion = appVersion;
        this.setting = {
            notifycation: undefined,
            version: 0,
        };
        this.item = {
            version: "",
        };
        this.titleupdate = "";
        this.ap = {
            version: "",
        };
        this.progre = "";
        platform.ready().then(function () {
            _this.checkevent();
        });
        this.appVersion.getVersionNumber().then(function (data) {
            _this.thisversion = data;
        });
    }
    SettingPage.prototype.translate = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__translate_translate__["a" /* TranslatePage */]);
    };
    SettingPage.prototype.checkevent = function () {
        var _this = this;
        var itemAA;
        this.http
            .get("/assets/data/datas.json")
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            itemAA = data;
            _this.item = itemAA;
            console.log(_this.item.version);
        });
        this.storage.get('MyAppVersion').then(function (dataapp) {
            _this.ap.version = dataapp;
        });
        this.storage.get('Notification').then(function (data) {
            _this.setting.notifycation = data;
        });
        this.storage.get('Version').then(function (datav) {
            _this.setting.version = datav;
        });
    };
    SettingPage.prototype.notify = function (event) {
    };
    SettingPage.prototype.datachanged = function (event) {
        var _this = this;
        if (event.checked == true) {
            this.storage.set('Notification', true).then(function (data) {
                _this.setting.notifycation = true;
            });
        }
        else {
            this.storage.set('Notification', false).then(function (data) {
                _this.setting.notifycation = false;
            });
        }
        console.log(this.setting);
    };
    SettingPage.prototype.updateItem = function (key, newText) {
    };
    SettingPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    SettingPage.prototype.checkupdate = function () {
        var _this = this;
        var version;
        this.db.list("application").valueChanges().subscribe((function (res) {
            res.forEach(function (datas) {
                version = datas;
                _this.storage.set('Version', version);
            });
        }));
        this.codePush.sync({}, function (progress) {
            _this.nGzone.run(function () {
                _this.progre = JSON.stringify(progress);
                _this.Iprogress = (progress.receivedBytes / progress.totalBytes) * 100;
                _this.Iprogress = Math.round(_this.Iprogress).toFixed(0);
                _this.Iupdate = Math.round(progress.receivedBytes / 100).toFixed(0);
                _this.Itotal = Math.round(progress.totalBytes / 100).toFixed(0);
            });
        }).subscribe(function (status) {
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].CHECKING_FOR_UPDATE) {
                _this.titleupdate = "checking update";
            }
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].DOWNLOADING_PACKAGE) {
                _this.titleupdate = "DOWNLOADING PACKAGE";
            }
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].IN_PROGRESS) {
                _this.titleupdate = "IN PROGRES";
            }
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].INSTALLING_UPDATE) {
                _this.titleupdate = "INSTALLING UPDATE";
            }
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].UP_TO_DATE) {
                _this.titleupdate = "UP TO DATE";
            }
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].UPDATE_INSTALLED) {
                _this.titleupdate = "UPDATE INSTALLED";
            }
            if (status == __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["b" /* SyncStatus */].ERROR) {
                _this.titleupdate = "Error";
            }
        });
    };
    SettingPage.prototype.Logout = function () {
        var _this = this;
        this.auth.auth.signOut().then(function (data) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
            _this.backgroundMode.disable();
        });
    };
    SettingPage.prototype.account = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__about_about__["a" /* AboutPage */]);
    };
    SettingPage.prototype.ionViewDidLoad = function () {
    };
    SettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\setting\setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n  {{"Setting" | translate}}\n</ion-title>\n</ion-navbar>\n</ion-header>\n<ion-content>\n\n   <ion-item (click)="account()"> \n    <ion-label>{{"account" | translate}} </ion-label>\n  </ion-item>\n\n\n   <ion-item (click)="translate()"> \n    <ion-label>{{"Language" | translate}} </ion-label>\n  </ion-item>\n \n  <ion-item *ngIf="setting.notifycation == true"> \n    <ion-label>  {{"Notification" | translate}} </ion-label>\n    <ion-toggle checked="true" (ionChange)="datachanged($event)" ></ion-toggle>\n  </ion-item>\n  <ion-item *ngIf="setting.notifycation != true"> \n    <ion-label>  {{"Notification" | translate}} </ion-label>\n    <ion-toggle checked="false" (ionChange)="datachanged($event)" ></ion-toggle>\n  </ion-item>\n  <ion-item *ngIf="setting.version == ap.version">\n  <ion-label>  {{"Version" | translate}} </ion-label>\n  <ion-label align="right">  {{setting.version}}</ion-label>\n  </ion-item>\n  <ion-item *ngIf="setting.version != ap.version" class="bgnotver">\n  <ion-label>  {{"Version" | translate}} </ion-label>\n  <ion-label align="right">  {{setting.version}}</ion-label>\n  </ion-item>\n   <ion-item (click)="checkupdate()"> \n    <ion-label align="center"> {{"Update" | translate}} </ion-label>\n  </ion-item >\n \n\n \n    <div class="progressbar">\n      <div class=".inner-progressbar" [style.width]="Iprogress+\'%\'">\n      {{Iprogress}} {{titleupdate}}\n      </div>\n    </div>\n \n \n \n\n</ion-content>\n\n<ion-footer>\n  <button class="bottom" ion-button clear full color="dark" (click)="Logout()">{{"SignOut" | translate}}</button>\n</ion-footer>'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\setting\setting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_code_push__["a" /* CodePush */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_version__["a" /* AppVersion */]])
    ], SettingPage);
    return SettingPage;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__carpark_carpark__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_platform_platform__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__getpic_getpic__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_photo_viewer__ = __webpack_require__(375);
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


//import { HomePage } from '../home/home';



//import { database } from 'firebase/app';








/**
 * Generated class for the ParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParkingPage = (function () {
    function ParkingPage(localNotifications, parkaht, db, Lanch, alertCtrl, Platforms, navCtrl, navParams, firebaseservice, Storage, homeaut, photoViewer) {
        var _this = this;
        this.localNotifications = localNotifications;
        this.parkaht = parkaht;
        this.db = db;
        this.Lanch = Lanch;
        this.alertCtrl = alertCtrl;
        this.Platforms = Platforms;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firebaseservice = firebaseservice;
        this.Storage = Storage;
        this.homeaut = homeaut;
        this.photoViewer = photoViewer;
        this.time = {
            uid: "",
            parkname: "",
            status: true,
            datetime: "",
            time: "",
        };
        this.userP = {
            key: "",
            uid: "",
            Email: "",
            DisplayName: "",
            Password: "",
            status: status,
        };
        this.park = {
            name: "",
            standby: "",
            status: true,
            local: "",
        };
        this.profile = {
            uid: "",
            key: "",
            Email: "",
            Password: "",
            DisplayName: "",
            status: status,
        };
        this.Platforms.ready().then(function () {
            // Use snapshotChanges().map() to store the key
            _this.mycar();
            _this.parkinglist$ = _this.firebaseservice.getParkinglist().snapshotChanges().map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            _this.itemsRefs = db.list('/Parking-list/PA/');
            //this.items = this.itemsRefs.snapshotChanges().map(changes => {
            // return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            // });
        });
    }
    ParkingPage.prototype.getui = function () {
    };
    ParkingPage.prototype.mycar = function () {
        var _this = this;
        this.homeaut.authState.take(1).subscribe(function (data) {
            _this.profile.Email = data.email;
            console.log(_this.profile.Email);
            _this.profile.DisplayName = data.displayName;
        });
    };
    ParkingPage.prototype.nvigate = function () {
        var _this = this;
        this.Platforms.ready().then(function () {
            _this.Lanch.navigate('18.81147,98.9542387')
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
    ParkingPage.prototype.test = function (test) {
        console.log(test);
    };
    ParkingPage.prototype.PA1 = function (PA1, standby, name, key) {
        var _this = this;
        console.log(key);
        this.homeaut.authState.take(1).subscribe(function (data) {
            var alert = _this.alertCtrl.create({
                title: 'Message',
                subTitle: 'ท่านต้องการที่จะเข้าจอดหรือเข้าสู่ระบบนำทางไปยังลานจอด',
                buttons: [{
                        text: "เข้าจอด",
                        role: "เข้าจอด",
                        handler: function (datae) {
                            if (PA1 == true) {
                                _this.itemsRefs.update(key, { standby: "none" });
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Message',
                                    subTitle: 'กรุณารอจนกว่าช่องจอดของท่านจะเป็นสีแดง',
                                    buttons: ['ok']
                                });
                                alert_1.present();
                            }
                            else {
                                if (standby == "none") {
                                    _this.db.list("/Parking-list/PA/").snapshotChanges().take(1).subscribe(function (res) {
                                        res.forEach(function (park) {
                                            var parks = park.payload.val();
                                            var parkkey = park.key;
                                            if (parks.standby == data.email) {
                                                _this.itemsRefs.update(parkkey, { standby: "none" });
                                            }
                                        });
                                    });
                                    _this.park.status = false;
                                    _this.time.uid = data.email;
                                    _this.time.parkname = name;
                                    _this.time.status = false;
                                    _this.time.datetime = _this.formateDate();
                                    _this.time.time = _this.formatime();
                                    _this.itemsRefs.update(key, { standby: data.email });
                                    _this.firebaseservice.addtime(_this.time);
                                    _this.Storage.get('Notification').then(function (datanoti) {
                                        if (datanoti == true) {
                                            _this.localNotifications.schedule({
                                                title: 'Notifications',
                                                text: 'ท่านได้ทำการเข้าจอดณช่อง' + name + 'เวลา :' + _this.time.datetime,
                                            });
                                        }
                                    });
                                }
                                else {
                                    var alert_2 = _this.alertCtrl.create({
                                        title: 'Message',
                                        subTitle: 'ท่านได้เข้าจอดแล้วหรือมีท่านอื่นจอดในช่องนั้นอยู่',
                                        buttons: ['ok']
                                    });
                                    alert_2.present();
                                }
                            }
                        }
                    }, {
                        text: "นำทาง",
                        role: "นำทาง",
                        handler: function (datae) {
                            _this.Platforms.ready().then(function () {
                                _this.Lanch.navigate('18.81147,98.9542387')
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
                        }
                    }]
            });
            alert.present();
        });
        //this.park.standby = data.email;
        // this.park.name = name;
        /*  if(PA1 == true)
          {
            
            
            this.time.uid = data.email;
            this.time.parkname = name;
            this.time.status = false;
            this.time.datetime = this.formateDate();
            if(standby == "none")
            {
              
              this.itemsRefs.update(key,{});
            }
            else{
      
            }
            
            //this.firebaseservice.updategps(this.userP);
            this.firebaseservice.addtime(this.time);
      
          }
            else
          {
            this.time.uid = data.email;
            this.park.status = true;
         
            this.time.parkname = name;
            this.time.status = true;
            this.time.datetime = this.formateDate();
            this.itemsRefs.update(key,{standby:data.email});
            //this.firebaseservice.updatePark(this.park);
          //  this.itemsRefs.update(key, { status: false, standby:data.email });
            this.firebaseservice.addtime(this.time);
          }
         */
    };
    ParkingPage.prototype.getimg = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__getpic_getpic__["a" /* GetpicPage */]);
        // this.photoViewer.show('https://firebasestorage.googleapis.com/v0/b/blissful-flames-185507.appspot.com/o/images%2Fparking.jpg?alt=media&token=2b0b0e99-2025-4035-9a51-f242c0449adf', 'My image title', { share: false });
    };
    ParkingPage.prototype.navigat = function () {
        var options = {
            start: 'London, ON',
            app: this.Lanch.APP.UBER
        };
        this.Lanch.navigate('18.813133, ON', options)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    ParkingPage.prototype.formateDate = function () {
        var dates = new Date();
        var day = dates.getDate().toString();
        var month = dates.getMonth() + 1;
        var Year = dates.getFullYear().toString();
        this.datetime = Year + "/" + month + "/" + day;
        return this.datetime;
    };
    ParkingPage.prototype.formatime = function () {
        var dates = new Date();
        var hours = dates.getHours().toString();
        var min = dates.getMinutes().toString();
        var timeer = hours + ":" + min;
        return timeer;
    };
    ParkingPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__carpark_carpark__["a" /* CarparkPage */]);
    };
    ParkingPage.prototype.ionViewDidLoad = function () {
    };
    ParkingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-parking',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\parking\parking.html"*/'<!--\n  Generated template for the ParkingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<!--ion-content >\n    <!<ion-list>\n        <ion-item *ngFor="let item of items | async">\n            <ng-container *ngIf="item.A1 == 1; else newDeb" >\n       \n                    <div class="carbox">A</div>\n                \n            </ng-container>\n            <ng-template #newDeb>\n  \n                    <div class="carboxr">B</div>\n           \n            </ng-template> \n\n            <ion-list>\n                <ion-item *ngFor="let item of items | async">      \n                 <div *ngIf=" item.A1 == 1" class="carbox">A</div> \n                 <div *ngIf=" item.A1 == 0" class="carboxr">A</div> \n     //           </ion-item>\n              </ion-list>\n       \n    </ion-list>-->\n<!--</ion-content>-->\n\n<ion-header>\n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n  {{"ParkingTC-1" | translate}}\n</ion-title>\n</ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <div class="content">\n  <div cards >\n\n    <div class="grid-full gmd-2"  >\n      <ion-row >\n        <ion-col   *ngFor="let item of parkinglist$ | async" style="text-align:center">\n         <div *ngIf="item.status == 0">\n          <ion-card class="blue gmd-2"  *ngIf="item.standby == profile.Email" (click)="PA1(item.status,item.standby,item.name,item.key)">\n            <h1 orange>{{item.name}}</h1>\n               <h1 align="center"><ion-icon name="md-contact"></ion-icon> </h1>\n          </ion-card>\n          <ion-card  class="red gmd-2" *ngIf="item.standby != profile.Email" (click)="PA1(item.status,item.standby,item.name,item.key)">\n            <h1 orange>{{item.name}}</h1>\n               <h1 align="center"><ion-icon name="ios-car"> </ion-icon></h1>\n          </ion-card>\n          </div>\n          <div *ngIf="item.status == 1">\n           <ion-card (click)="PA1(item.status,item.standby,item.name,item.key)" class="green gmd-2">\n            <h1 orange>{{item.name}}</h1>\n               <h1 align="center">&nbsp;</h1>\n          </ion-card>\n          </div>\n        </ion-col>\n \n  </ion-row>\n    </div>\n\n   \n  <button class="bottom gmd-2" style="margin-top:30px;" ion-button clear  full  color="dark" (click)="getimg()">รูปลานจอด</button>\n</div>\n   \n <!--\n\n\n\n    <div  *ngFor="let item of parkinglist$ | async">\n    \n        <div *ngIf="item.status == 0">\n                \n                <div class="box1 blue" *ngIf="item.standby == profile.Email" (click)="PA1(item.status,item.standby,item.name,item.key)">\n                    <h2 align="center"> {{item.name}}</h2>\n                    <h2 align="center"><ion-icon name="md-contact"> </ion-icon></h2>\n                </div>\n                <div class="box1 red" *ngIf="item.standby!=profile.Email" (click)="PA1(item.status,item.standby,item.name,item.key)">\n                        <h2 align="center">{{item.name}}</h2>\n                        <h2 align="center"><ion-icon name="ios-car"> </ion-icon></h2>\n                    </div>\n         </div>\n         <div class="box1 green" *ngIf="item.status == 1" (click)="PA1(item.status,item.standby,item.name,item.key)">\n             \n            <h2 align="center">{{item.name}}</h2>\n            <h2 align="center"><ion-icon name="ios-car-outline"> </ion-icon> </h2>\n            \n         </div>\n    </div>\n   -->  \n  </div> \n\n\n</ion-content>\n\n  <ion-fab right>\n     <button ion-fab mini color="danger" (click)="nvigate()"><ion-icon name="md-navigate"></ion-icon></button>\n    \n  </ion-fab>\n \n<ion-footer>\n \n\n  <button class="bottom" ion-button clear full color="dark"(click)="back()">{{"Back" | translate}}</button>\n</ion-footer>'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\parking\parking.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_launch_navigator__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_photo_viewer__["a" /* PhotoViewer */]])
    ], ParkingPage);
    return ParkingPage;
}());

//# sourceMappingURL=parking.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MycarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timeline_timeline__ = __webpack_require__(150);
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
 * Generated class for the MycarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MycarPage = (function () {
    function MycarPage(tosat, afb, navCtrl, navParams, platform, splashScreen, homeaut, firebaseservice) {
        var _this = this;
        this.tosat = tosat;
        this.afb = afb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homeaut = homeaut;
        this.firebaseservice = firebaseservice;
        this.myDate = new Date().toISOString();
        this.Povider = {
            email: "",
            displayname: "",
        };
        this.times = {
            uid: "",
            parkname: "",
            status: true,
            day: "",
            mon: "",
            year: "",
            time: "",
        };
        platform.ready().then(function () {
            splashScreen.hide();
        });
        this.homeaut.authState.take(1).subscribe(function (data) {
            _this.timelinelist$ = _this.firebaseservice.getTimelinelist().snapshotChanges().map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            //console.log("path",this.afb.list<Profileuser>(`/ProfileUser//${ data.uid }`));
            _this.Povider.email = data.email;
            _this.itemsRef = _this.afb.list("/ProfileUser/");
            console.log("path", _this.afb.list("/ProfileUser/"));
            _this.users = _this.itemsRef
                .snapshotChanges()
                .map(function (changes) {
                return changes.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
            });
            _this.afb.list("/Timeline-list/").valueChanges().subscribe(function (res) {
                var itemes = [];
                res.forEach(function (item) {
                    itemes.push(item);
                });
                _this.timelist = itemes;
                console.log(_this.timelist);
            });
            //    this.users =  this.afb.list<Profileuser>(`/ProfileUser/${this._arraData}`).valueChanges();
        });
    }
    MycarPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__timeline_timeline__["a" /* TimelinePage */]);
    };
    MycarPage.prototype.click = function (i) {
        console.log(i);
    };
    MycarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimelinePage');
    };
    MycarPage.prototype.goback = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__timeline_timeline__["a" /* TimelinePage */]);
    };
    MycarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mycar',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\mycar\mycar.html"*/'<ion-header>\n<!--\n\n\n  <div class="header">\n    <div class="color-overlay">\n      <div class="day-number"><ion-datetime displayFormat="D" [(ngModel)]="myDate"></ion-datetime></div>\n      <div class="date-right">\n        <div class="day-name"><ion-datetime displayFormat="DDDD" [(ngModel)]="myDate"></ion-datetime></div>\n        <div class="month"><ion-datetime displayFormat="MMMM | YYYY" [(ngModel)]="myDate"></ion-datetime></div>\n      </div>\n    </div>\n    <div class="actionbutton" (click)="goback()">กลับ</div>\n  </div>\n\n\n   <li *ngIf="times.status == false">\n        <div class="bullet  pink"></div>\n        <div class="time">{{times.datetime}}</div>\n        <div class="desc">\n          <h1>นำรถออก</h1>\n          <h1>{{times.parkname}}</h1>\n        </div>\n      </li>\n-->\n<ion-navbar color="darklight" hideBackButton>\n<ion-title> \n {{"History" | translate}}\n</ion-title>\n</ion-navbar>\n</ion-header>\n\n<ion-content class="bgcolor"   scroll="false">\n\n  <div class="timeline" *ngFor="let times of timelist?.reverse()">\n    <ul *ngIf="times.uid == Povider.email">\n      <li  *ngIf="times.status == false">\n         <div class="time"> {{times.datetime | date: \'dd\'}} {{times.datetime | date: \'MMM\'}} <br> {{times.datetime | date:\'yyyy\'}} </div>\n         <div class="bullet green" ></div>\n        <ion-card>\n         <div class="namepark w20">   <h3>{{times.parkname}}</h3>   </div>\n          <div class="namepark w30"><h4> TC1 RMUTL </h4> </div>\n            <div class="statusp green" height="100%" >\n                    {{times.time }} <br>  <ion-icon name="ios-arrow-back">  <ion-icon name="ios-car" ></ion-icon></ion-icon>\n            </div>\n        </ion-card>\n      </li>\n      <li  *ngIf="times.status == true">\n         <div class="time"> {{times.datetime | date: \'dd\'}} {{times.datetime | date: \'MMM\'}} <br> {{times.datetime | date:\'yyyy\'}} </div>\n         <div class="bullet green" ></div>\n        <ion-card>\n         <div class="namepark w20" >   <h3>{{times.parkname}}</h3>   </div>\n          <div class="namepark  w30">  <h4> TC1 RMUTL<!-- {{"TakeOFF" | translate}}--> </h4> </div>\n            <div class="statusp red" >\n                    {{times.time }} <br>  <h1> <ion-icon name="ios-car"></ion-icon> <ion-icon name="ios-arrow-forward-outline"></ion-icon></h1>\n            </div>\n        </ion-card>\n      </li>\n     \n    </ul>\n  </div>  \n</ion-content>\n \n\n<ion-footer>\n  <button class="bottom" ion-button clear full color="dark"(click)="back()">{{"Back" | translate}}</button>\n</ion-footer>\n '/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\mycar\mycar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]])
    ], MycarPage);
    return MycarPage;
}());

//# sourceMappingURL=mycar.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export availableLanguages */
/* unused harmony export defaultLanguage */
/* unused harmony export sysOptions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(132);
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
 * Generated class for the TranslatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var availableLanguages = [{
        code: 'en',
        name: 'English'
    }, {
        code: 'th',
        name: 'Thai'
    }];
var defaultLanguage = 'en';
var sysOptions = {
    systemLanguage: defaultLanguage
};
var TranslatePage = (function () {
    function TranslatePage(translateService, navCtrl, navParams) {
        this.translateService = translateService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TranslatePage.prototype.changeLanguage = function (langauge) {
        this.translateService.use(langauge);
    };
    TranslatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TranslatePage');
    };
    TranslatePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    TranslatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-translate',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\translate\translate.html"*/'<!--\n  Generated template for the TranslatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n<ion-navbar color="darklight" hideBackButton>\n    <ion-title> {{"Language" | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n<ion-list radio-group [(ngModel)]="relationship">\n  <ion-item (click)="changeLanguage(\'en\')">\n    <ion-label>English</ion-label>\n  </ion-item>\n  <ion-item (click)="changeLanguage(\'th\')">\n    <ion-label>Thai</ion-label>\n  </ion-item>\n</ion-list>\n</ion-content>\n\n<ion-footer>\n  <button class="bottom" ion-button clear full color="dark"(click)="back()">{{"Back" | translate}}</button>\n</ion-footer>'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\translate\translate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], TranslatePage);
    return TranslatePage;
}());

//# sourceMappingURL=translate.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetpicPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
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
 * Generated class for the GetpicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GetpicPage = (function () {
    function GetpicPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        __WEBPACK_IMPORTED_MODULE_2_firebase__["storage"]().ref().child('images/parking.jpg').getDownloadURL().then(function (url) {
            _this.Ober = url;
        });
    }
    GetpicPage_1 = GetpicPage;
    GetpicPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GetpicPage');
    };
    GetpicPage.prototype.back = function () {
        this.navCtrl.insert(1, GetpicPage_1);
        this.navCtrl.pop();
    };
    GetpicPage = GetpicPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-getpic',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\getpic\getpic.html"*/'<!--\n  Generated template for the GetpicPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar  color="darklight"  hideBackButton>\n    <ion-title>{{"Parking" | translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content   >\n<div style="margin-top:50px;">\n<img src="{{Ober}}" imageViewer/>\n</div>\n</ion-content>\n<ion-footer>\n	<button  ion-button clear full color="dark" (click)="back()">{{"Back" | translate}}</button>\n</ion-footer>\n \n\n'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\getpic\getpic.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], GetpicPage);
    return GetpicPage;
    var GetpicPage_1;
}());

//# sourceMappingURL=getpic.js.map

/***/ }),

/***/ 262:
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
webpackEmptyAsyncContext.id = 262;

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		737,
		13
	],
	"../pages/carpark/carpark.module": [
		738,
		12
	],
	"../pages/getpic/getpic.module": [
		739,
		11
	],
	"../pages/launchnavigate/launchnavigate.module": [
		740,
		10
	],
	"../pages/login/login.module": [
		741,
		9
	],
	"../pages/mycar/mycar.module": [
		742,
		8
	],
	"../pages/navigate/navigate.module": [
		743,
		7
	],
	"../pages/notification/notification.module": [
		744,
		6
	],
	"../pages/parking/parking.module": [
		745,
		5
	],
	"../pages/register/register.module": [
		746,
		4
	],
	"../pages/setting/setting.module": [
		747,
		3
	],
	"../pages/tabs/tabs.module": [
		748,
		2
	],
	"../pages/timeline/timeline.module": [
		749,
		1
	],
	"../pages/translate/translate.module": [
		750,
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
webpackAsyncContext.id = 305;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationTracker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(210);
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
    LocationTracker = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], LocationTracker);
    return LocationTracker;
}());

//# sourceMappingURL=location-track.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaunchnavigatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__ = __webpack_require__(100);
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
        this.platform.ready().then(function () {
            //this.locationTracker.startTracking();
            _this.update();
        });
    }
    LaunchnavigatePage.prototype.update = function () {
        var options = {
            start: 'London, ON',
            app: this.Lanch.APP.UBER
        };
        this.Lanch.navigate('18.813133, ON', options)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    LaunchnavigatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-launchnavigate',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\launchnavigate\launchnavigate.html"*/'<!--\n  Generated template for the LaunchnavigatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Launchnavigate</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\launchnavigate\launchnavigate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__["a" /* LaunchNavigator */]])
    ], LaunchnavigatePage);
    return LaunchnavigatePage;
}());

//# sourceMappingURL=launchnavigate.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_location_track__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__ = __webpack_require__(96);
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




//import { AngularFireList } from 'angularfire2/database/interfaces';
//import { User } from 'firebase/app';
//import { Subscription } from 'ionic-native/node_modules/rxjs/Subscription';

//import { ToastController } from 'ionic-angular/components/toast/toast-controller';
//import { Firebase, Camera } from 'ionic-native';





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
            status: status,
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], NavigatePage.prototype, "mapRef", void 0);
    NavigatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-navigate',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\navigate\navigate.html"*/'<!--\n  Generated template for the NavigatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n  <p>latigut :{{ lat }}</p>\n<p>lontigut : {{ long }}</p>\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n<div #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\navigate\navigate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_location_track__["a" /* LocationTracker */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], NavigatePage);
    return NavigatePage;
}());

//# sourceMappingURL=navigate.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__ = __webpack_require__(48);
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
    function NotificationPage(db, FirebaseServiceProvider, navCtrl, navParams, alertCtrl) {
        this.db = db;
        this.FirebaseServiceProvider = FirebaseServiceProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.item = {
            name: "",
            empty: 6,
            slots: undefined,
            location: "",
            notempty: 0,
            status: undefined,
            url: "",
            GPS: {
                lat: 0,
                long: 0
            }
        };
        this.park = {
            name: "",
            standby: "",
            status: true,
            local: ""
        };
        this.itemsRef = db.list('Parking');
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().map(function (data) {
            return data.map(function (data) { return (__assign({ key: data.payload.key }, data.payload.val())); });
        });
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationPage');
    };
    NotificationPage.prototype.addParking = function (item) {
        var namess;
        this.item.name = "P" + this.name;
        this.item.empty = 6;
        this.item.notempty = 0;
        this.item.status = false;
        this.FirebaseServiceProvider.addPark(item);
        namess = this.item.name;
        for (var i = 1; i <= this.item.slots; i++) {
            console.log(this.name + i.toString());
            this.park.name = this.name + i.toString();
            this.park.standby = "none";
            this.park.status = true;
            this.FirebaseServiceProvider.addparklist(this.park, namess);
        }
    };
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\notification\notification.html"*/'<!--\n  Generated template for the AddParkingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>AddParking</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-item>\n  <ion-label>Name</ion-label>\n  <ion-input  [(ngModel)]="name" placeholder="A" ></ion-input>\n</ion-item>\n<ion-item>\n  <ion-label>กี่ช่อง</ion-label>\n  <ion-input [(ngModel)]="item.slots" placeholder="6"></ion-input>\n</ion-item>\n<ion-item>\n  <ion-label>สถานะ</ion-label>\n  <ion-input [(ngModel)]="item.status" placeholder="true"></ion-input>\n</ion-item>\n {{item | json}}\n<button ion-button block clear (click)="addParking(item)">add</button>\n</ion-content>\n'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\notification\notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(448);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_timeline_timeline__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_notification_notification__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_parking_parking__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_navigate_navigate__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_mycar_mycar__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_location_track__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_version__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_launchnavigate_launchnavigate__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_local_notifications__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_carpark_carpark__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_facebook__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_viewer__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_code_push__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_plus__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_login_login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_register_register__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angularfire2__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_launch_navigator__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_storage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_background_mode__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_about_about__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_setting_setting__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_tabs_tabs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_common_http__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_getpic_getpic__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_ionic_img_viewer__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_status_bar__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_translate_translate__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__providers_firebase_service_firebase_service__ = __webpack_require__(48);
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

//import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';




function setTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/data/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_34__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_parking_parking__["a" /* ParkingPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_timeline_timeline__["a" /* TimelinePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_navigate_navigate__["a" /* NavigatePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_mycar_mycar__["a" /* MycarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_launchnavigate_launchnavigate__["a" /* LaunchnavigatePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_carpark_carpark__["a" /* CarparkPage */], __WEBPACK_IMPORTED_MODULE_33__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_about_about__["a" /* AboutPage */], __WEBPACK_IMPORTED_MODULE_36__pages_getpic_getpic__["a" /* GetpicPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_translate_translate__["a" /* TranslatePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_35__angular_common_http__["b" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_14__angular_http__["b" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_14__angular_http__["c" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/carpark/carpark.module#CarparkPageModule', name: 'CarparkPage', segment: 'carpark', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/getpic/getpic.module#GetpicPageModule', name: 'GetpicPage', segment: 'getpic', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/launchnavigate/launchnavigate.module#LaunchnavigatePageModule', name: 'LaunchnavigatePage', segment: 'launchnavigate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mycar/mycar.module#MycarPageModule', name: 'MycarPage', segment: 'mycar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/navigate/navigate.module#NavigatePageModule', name: 'NavigatePage', segment: 'navigate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/parking/parking.module#ParkingPageModule', name: 'ParkingPage', segment: 'parking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/timeline/timeline.module#TimelinePageModule', name: 'TimelinePage', segment: 'timeline', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/translate/translate.module#TranslatePageModule', name: 'TranslatePage', segment: 'translate', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_37_ionic_img_viewer__["a" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_25_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
                __WEBPACK_IMPORTED_MODULE_26_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_27_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__["a" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (setTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_35__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_notification_notification__["a" /* NotificationPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_parking_parking__["a" /* ParkingPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_timeline_timeline__["a" /* TimelinePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_navigate_navigate__["a" /* NavigatePage */], __WEBPACK_IMPORTED_MODULE_10__pages_mycar_mycar__["a" /* MycarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_launchnavigate_launchnavigate__["a" /* LaunchnavigatePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_carpark_carpark__["a" /* CarparkPage */], __WEBPACK_IMPORTED_MODULE_33__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_about_about__["a" /* AboutPage */], __WEBPACK_IMPORTED_MODULE_36__pages_getpic_getpic__["a" /* GetpicPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_translate_translate__["a" /* TranslatePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_11__providers_location_track__["a" /* LocationTracker */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicErrorHandler */], },
                __WEBPACK_IMPORTED_MODULE_41__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_21__ionic_native_code_push__["a" /* CodePush */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_viewer__["a" /* PhotoViewer */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_launch_navigator__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_31__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_facebook__["a" /* Facebook */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(26);
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
        this.allpark = this.db.list("/Park-Car/");
        this.parkinglistRef = this.db.list('/Parking-list/PA');
        this.timelinelistRef = this.db.list("/Timeline-list/");
        this.LogLogin = this.db.list('/Log/Login/');
        this.auth.authState.subscribe(function (data) {
            _this.users = _this.db.list("ProfileUser/");
        });
        this.parkinglistRefs = this.db.list("/Parking-list/PA/");
    }
    FirebaseServiceProvider.prototype.getParkinglist = function () {
        return this.parkinglistRef;
    };
    FirebaseServiceProvider.prototype.getcarpark = function () {
        return this.allpark;
    };
    FirebaseServiceProvider.prototype.logfirebase = function () {
        return 1;
    };
    FirebaseServiceProvider.prototype.getuser = function () {
        return this.userd1;
    };
    FirebaseServiceProvider.prototype.updateLog = function (Loglogins) {
        return this.LogLogin.push(Loglogins);
    };
    FirebaseServiceProvider.prototype.updategps = function (user) {
        return this.users.update(user.key, user);
    };
    FirebaseServiceProvider.prototype.getTimelinelist = function () {
        return this.timelinelistRef;
    };
    FirebaseServiceProvider.prototype.addtime = function (time) {
        return this.timelinelistRef.push(time);
    };
    FirebaseServiceProvider.prototype.updatePark = function (park) {
        return this.parkinglistRefs.update(park.key, park);
    };
    FirebaseServiceProvider.prototype.login = function (UserP) {
        return this.users.push(UserP);
    };
    FirebaseServiceProvider.prototype.addPark = function (item) {
        return this.allpark.push(item);
    };
    FirebaseServiceProvider.prototype.addparklist = function (item, names) {
        this.parkinglist = this.db.list("/Parking-list/" + names + "/");
        return this.parkinglist.push(item);
    };
    FirebaseServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], FirebaseServiceProvider);
    return FirebaseServiceProvider;
}());

//# sourceMappingURL=firebase-service.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_take__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(132);
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
    function MyApp(translate, platform, statusBar, splashScreen, aut) {
        this.translate = translate;
        this.platform = platform;
        this.aut = aut;
        this.initializeApp();
        platform.ready().then(function () {
            translate.setDefaultLang('en');
            // Okay, so the platform is ready and our plugins are available.
            //this.aut.authState.subscribe();
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.aut.authState.subscribe(function (user) {
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
            }
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\app\app.html"*/'<!--<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n  Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus \n<ion-nav [root]="HomePage" #content swipeBackEnabled="false"></ion-nav>--> \n<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__node_modules_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_firebase_service_firebase_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {  } from '../notification/notification';
//import { NgModule } from '@angular/core';





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(afb, Loauth, navCtrl, navParams, alertCtrl, googleplus, facebook, Platforms, firebaseservice, storage) {
        this.afb = afb;
        this.Loauth = Loauth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.googleplus = googleplus;
        this.facebook = facebook;
        this.Platforms = Platforms;
        this.firebaseservice = firebaseservice;
        this.storage = storage;
    }
    LoginPage.prototype.Fsiginin = function () {
        var _this = this;
        this.facebook.login(['public_profile', 'email']).then(function (loginres) {
            var credential = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth.FacebookAuthProvider.credential(loginres.authResponse.accessToken);
            __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().signInWithCredential(credential).then(function (fs) {
                var alert = _this.alertCtrl.create({
                    title: 'Sign in',
                    subTitle: 'login succfully',
                    buttons: ['ok']
                });
                _this.storage.set('setlogin', true);
                alert.present();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            }).catch(function (errs) {
                var alert = _this.alertCtrl.create({
                    title: 'Sign in',
                    subTitle: 'login not succfully',
                    buttons: ['ok']
                });
                alert.present();
            });
        });
    };
    LoginPage.prototype.signin = function () {
        var _this = this;
        this.Loauth.auth.signInWithEmailAndPassword(this.Email.value, this.password.value)
            .then(function (data) {
            console.log("User Registered succfully", data);
            var alert = _this.alertCtrl.create({
                title: 'Sign in',
                subTitle: 'User SignIN succfully',
                buttons: ['ok']
            });
            _this.storage.set('setlogin', true);
            alert.present();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        })
            .catch(function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Sign in',
                subTitle: 'Email ro password not math',
                buttons: ['ok']
            });
            alert.present();
        });
    };
    LoginPage.prototype.regis = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.Glogin = function () {
        var _this = this;
        this.googleplus.login({
            'webClientId': '497240447227-d2d7905ksm0pu76a2j3onqghqhv2ibp2.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            console.log(res);
            __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().signInWithCredential(__WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth.GoogleAuthProvider.credential(res.idToken))
                .then(function (suc) {
                var alert = _this.alertCtrl.create({
                    title: 'Sign in',
                    subTitle: 'login succfully',
                    buttons: ['ok']
                });
                _this.storage.set('setlogin', true);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                alert.present();
                console.log(suc);
            }).catch(function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Sign in',
                    subTitle: 'login not succfully',
                    buttons: ['ok']
                });
                alert.present();
            });
        }).catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Sign in',
                subTitle: 'login not succfully' + err,
                buttons: ['ok']
            });
            alert.present();
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
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
            selector: 'page-login',template:/*ion-inline-start:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\login\login.html"*/'<!-- \n<ion-header>\n <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n-->\n<ion-content class="background">\n	<h1>CARPARK</h1>\n		<ion-card>\n			<form>\n			<ion-card-header>\n			<label>{{"Login" | translate}}</label>\n			</ion-card-header>\n			<ion-card-content>\n				<ion-list no-line>\n					<ion-item>\n						<ion-label floating>{{"Email" | translate}}</ion-label>\n						<ion-input type="text" #Email></ion-input>\n					</ion-item>\n					<ion-item>\n						<ion-label floating>{{"Password" | translate}}</ion-label>\n						<ion-input type="password" #password></ion-input>\n					</ion-item>\n					<p>\n	<!-- <ion-checkbox color="dark" checked="true"></ion-checkbox>จำรหัสผ่าน <a> ลืมรหัสผ่าน ?</a></p> -->\n					<button ion-button  block outline  color="oreng"(click)="signin()">Sign In</button>\n					<p>OR</p>\n					<button ion-button block color="facebook"(click)="Fsiginin()">\n						<ion-icon name="logo-facebook" ></ion-icon> Sign In with facebook\n					</button>\n		 \n					<button ion-button block color="danger"(click)="Glogin()">\n						<ion-icon name="logo-google" ></ion-icon> Sign In with GOOGLE\n					</button>\n				</ion-list>\n			</ion-card-content>\n			</form>\n		</ion-card>\n		\n	</ion-content>\n	<ion-footer>\n		<button class="bottom" ion-button clear full color="light"(click)="regis()">{{"Register" | translate}}</button>\n	</ion-footer>\n	 \n	\n	'/*ion-inline-end:"E:\Pre-pro\blackup\20-14\pre-Test\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[440]);
//# sourceMappingURL=main.js.map