import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Menu } from '../../models/model';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  
  private menu: Menu;
  private loading: Loading;
  private menuForm:FormGroup;

  constructor(public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public navParams: NavParams,
  public formBuilder: FormBuilder, 
  private authProvider:AuthProvider,
  private afs:AngularFirestore) {
    this.menuForm = formBuilder.group({
      menuType: ['', Validators.compose([Validators.required])],
      menuCategory: ['', Validators.compose([Validators.required])],
      timeFrom: ['', Validators.compose([Validators.required])],
      timeTo: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      rate: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  addMenu(){
    if(!this.menuForm.valid){
      console.log(this.menuForm.value);
    } else {
      this.menu={
        menuId: '',
        menutype: '',
        menuCategory: '',
        timeFrom: null,
        timeTo: null,
        description: '',
        rate: null
      };

      const collRef: AngularFirestoreCollection<any> = this.afs.collection(`mess/${this.authProvider.getUser().uid}/menu`);
      collRef.doc('')
      const docRef: AngularFirestoreDocument<any>=this.afs.doc(collRef.ref.doc());
      this.loading = this.loadingCtrl.create({ dismissOnPageChange: true });
      this.loading.present();
    }
  }
}
