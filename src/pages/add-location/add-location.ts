import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase/app'

declare var google: any;
 
@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html'
})
export class AddLocationPage{
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  lng: any;
     
  constructor(public navCtrl: NavController,
  public navParams: NavParams, 
  public platform: Platform,
  private afs:AngularFirestore,
  private authProvider: AuthProvider,
  private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true })
    .then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
        
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 16,
        draggable: true,
        center: mylocation
      });
      
      let marker = new google.maps.Marker({
        position: this.map.getCenter(),
        map: this.map,
        // draggable: true,
        animation: google.maps.Animation.DROP,
      });

      this.lat=marker.getPosition().lat();
      this.lng=marker.getPosition().lng();

      google.maps.event.addListener(this.map, 'center_changed', () => {
        this.lat=marker.getPosition().lat();
        this.lng=marker.getPosition().lng();
      });

      this.addInfoWindow(marker, "<h4>"+this.navParams.get('messName')+"</h4>");

      marker.bindTo('position', this.map, 'center');

    },(err) =>{
      alert(err.message);
    }).catch((err) =>{
      alert(err.message);
    });

    // let watch = this.geolocation.watchPosition();    
    // watch.subscribe((data) => { });
  }
  
  addInfoWindow(marker, content){ 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });   
  }

  addLocation(){
    console.log("Co-ordinates:"+this.lat+", "+this.lng);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`mess/${this.authProvider.getUser().uid}`);

    userRef.set({
      location: new firebase.firestore.GeoPoint(this.lat, this.lng)
    }, { merge: true })
    .then(() => {
      console.log("Location saved successfully!");
      this.navCtrl.pop();
      this.authProvider.showBasicAlert('Alert', 'Location saved successfully!');
    })
    .catch( error =>  {
      console.error("Error in saving location", error);
      this.authProvider.showBasicAlert('Error', error.message);
    });
  }
}