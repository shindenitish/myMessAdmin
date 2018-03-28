import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreatePage } from '../create/create';
import { ReviewsPage } from '../reviews/reviews';

import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

import { Menu } from '../../models/model';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<Menu[]>;
  
  constructor(public navCtrl: NavController, 
  private authProvider:AuthProvider,
  private afs:AngularFirestore) {
    var d1= new Date();
    d1.setHours(0, 0, 0, 0);
    const collRef: AngularFirestoreCollection<Menu> = this.afs.collection(`mess/${this.authProvider.getUser().uid}/menu`, ref => ref.where('timeFrom', '>=', d1).orderBy('timeFrom'));    
    this.items=collRef.valueChanges();
  } 

  openPage(){
    this.navCtrl.push(CreatePage);
  }

  viewReviews(menuId, menuName){
    this.navCtrl.push(ReviewsPage, { menuId: menuId, menuName: menuName } );
  }

}
