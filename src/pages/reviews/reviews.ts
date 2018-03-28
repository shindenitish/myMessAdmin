import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';

import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {

  items: Observable<any[]>;

  constructor(public navParams: NavParams,
  public navCtrl: NavController,
  private afs:AngularFirestore,
  private authProvider: AuthProvider) {
  
    const collRef: AngularFirestoreCollection<any> = this.afs.collection(`mess/${this.authProvider.getUser().uid}/menu/${this.navParams.get('menuId')}/reviews`);    
    this.items=collRef.valueChanges();
  }
}
