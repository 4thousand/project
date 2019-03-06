
export interface Parking {
  key?: String;
  name: String;
  status: boolean;
}
export interface stand {
  key?: string;
  name: string;
  email: string;
}
export interface Parkinglist {
  key?: string;
  name: string;
  standby: string;
  status: boolean;
  local: string;

}
export interface application {
  version: string;
}
export interface Carpark {
  key?: string;
  name: String;
  slots: number;
  empty: number;
  location: string;
  notempty: number;
  status: boolean;
  url: string;

}
export interface Timeline {
  uid?: string;
  parkname: string;
  status: boolean;
  datetime: string;
  time: string;
}
export interface Loglogin {
  uid?: string;
  email: string;
  status: string;
  datetime: string;
}

export interface Profileuser {
  key?: string;
  uid?: string;
  Email: string;
  DisplayName: string;
  Password: string;
  status: string;
}

export interface Socialuser {
  key?: string;
  uid?: string;
  Email: string;
  DisplayName: string;
}
export interface Userdatas {
  key?: string;
  uid?: string;
  Email: string;
  DisplayName: string;
  Password: string;
  GPS: {
    Latitut: number,
    Longtitude: number
  }

}