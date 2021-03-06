import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { LoginPage } from '../login/login';
import { AddLocationPage } from '../add-location/add-location';

import { Mess } from '../../models/model';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  flag=false;

  private user: Mess={
    messId:'',
    ownerName:'',
    messName:'',
    email:'',
    contact: null,
    address: {
      address:'',
      city:''
    }
  };

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private authProvider: AuthProvider,
  private afs:AngularFirestore) {
    this.getUserInfo();
  }

  ionViewCanEnter(){
    if(this.authProvider.getUser().uid == null){
      return false;
    }
    else{
      return true;
    }
  }

  getUserInfo(){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`mess/${this.authProvider.getUser().uid}`);

    userRef.ref.onSnapshot(doc => {
      this.flag=false;
      
      if(doc.exists) {
        this.user.ownerName= doc.data().ownerName;
        this.user.messName= doc.data().messName;
        this.user.email = doc.data().email;
        this.user.contact = doc.data().contact;
        this.user.address= doc.data().address;
        this.user.messId = doc.data().messId;

        if(!doc.data().location){
          this.flag=true;
          console.log("Location:"+!doc.data().location);
        }

      } else {
        console.log("No such document!");
        this.authProvider.showBasicAlert('Alert!', 'User data not found');        
      }
    },error => {
        console.log(error);
        //this.authProvider.showBasicAlert('Error', error.message);        
    });
  }

  addLocation(){
    this.navCtrl.push(AddLocationPage, { messName: this.user.messName });
  }

  signOut(){       
    this.authProvider.logoutUser().then( authData => {
      this.navCtrl.setRoot(LoginPage);
    }, error => {
        console.log(error);        
    });
  }
}
