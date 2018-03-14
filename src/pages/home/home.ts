import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreatePage } from '../create/create';

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
  rate=50;

  constructor(public navCtrl: NavController, 
  private authProvider:AuthProvider,
  private afs:AngularFirestore) {
    const collRef: AngularFirestoreCollection<Menu> = this.afs.collection(`mess/${this.authProvider.getUser().uid}/menu`, ref => ref.where('timeFrom', '>=', new Date(0, 0, 0, 0)).orderBy('timeFrom'));    
    this.items=collRef.valueChanges();
  } 

  openPage(){
    this.navCtrl.push(CreatePage);
  }

}
