 
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Parking, Profileuser, Timeline, Loglogin,Parkinglist ,Carpark} from '../../model/parking/parking.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
 
 
 
/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  private parkinglist;
  private allpark = this.db.list<Carpark>(`/Park-Car/`)
  private parkinglistRef = this.db.list<Parking>('/Parking-list/PA');
  private timelinelistRef = this.db.list<Timeline>(`/Timeline-list/`);
  private parkinglistRefs;
  
  private LogLogin = this.db.list<Loglogin>('/Log/Login/');
    private users;
    private userd1:Subscription[];
  
  constructor(private db:AngularFireDatabase,private auth:AngularFireAuth) {
    this.auth.authState.subscribe(data=>
    {
      this.users = this.db.list<Profileuser>(`ProfileUser/`);
      
    });
    this.parkinglistRefs = this.db.list<Parkinglist>(`/Parking-list/PA/`);
  }

  getParkinglist(){
    return this.parkinglistRef;
}
getcarpark(){
  return this.allpark;
}
logfirebase()
{
  return 1;
}

getuser()
{
  return this.userd1;
}
updateLog(Loglogins:Loglogin){
  return this.LogLogin.push(Loglogins);
}
updategps(user:Profileuser)
{
  return this.users.update(user.key, user);
}
getTimelinelist()
{
  return this.timelinelistRef;
}
addtime(time:Timeline){
  return this.timelinelistRef.push(time);
}
updatePark(park:Parkinglist)
{
   return this.parkinglistRefs.update(park.key,park);
}
login(UserP:Profileuser)
{
  return this.users.push(UserP);
  
}
addPark(item:Carpark)
{
    return this.allpark.push(item);
}
addparklist(item:Parkinglist,names:string)
{
  this.parkinglist = this.db.list<Parkinglist>(`/Parking-list/${names}/`);
  return this.parkinglist.push(item);
}
}
