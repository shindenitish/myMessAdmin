import { Component } from '@angular/core';

import { NavController, Loading, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { EmailValidator } from '../../validators/email';

import { HomePage } from '../home/home';
import { Mess } from '../../models/model';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private signupForm: FormGroup;
  private loading: Loading;
  
  private user: Mess={
    messId:'',
    ownerName:'',
    messName:'',
    email:'',
    contact: null,
    address: null
  };

  appLogo: string="../../assets/imgs/appLogo.png";

  constructor(public nav: NavController,
  public authData: AuthProvider, 
  public formBuilder: FormBuilder, 
  public loadingCtrl: LoadingController, 
  public alertCtrl: AlertController, 
  public menu: MenuController,
  private afs: AngularFirestore) {   
    
    this.menu = menu;
    this.menu.enable(false, 'myMenu')
    
    this.signupForm = formBuilder.group({
      fullName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z\\s]*$')])],
      messName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z\\s]*$')])],
      email:    ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],      
      contact:  ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      address: [''],
      city: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\s]*$')])]
    });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.registerUser(this.signupForm.value.email, this.signupForm.value.password)
      .then((user) => {
        this.addUser(user);
      }, (error) => {
        this.loading.dismiss().then( () => {
          this.authData.showBasicAlert('Registration failed!', error.message);        
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  addUser(user){

    this.user.messId=user.uid;
    this.user.messName=this.signupForm.value.messName;
    this.user.ownerName=this.signupForm.value.fullName;
    this.user.email=this.signupForm.value.email;
    this.user.contact=this.signupForm.value.contact;
    this.user.address={
      address:this.signupForm.value.address,
      city:this.signupForm.value.city
    };

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`mess/${user.uid}`);
    
    userRef.set(this.user)
    .then( data => {
      this.authData.getUser().updateProfile({
        displayName: this.user.ownerName,
        photoURL: ""
      })
      .then( data=> {
        this.authData.sendVerfication()
        .then( data => {
          this.authData.showBasicAlert('Registered successfully!', "Please verify your email id to use services.");        
          this.nav.setRoot(HomePage);
        })
        .catch( error => {
          this.authData.showBasicAlert("Registration Failed", error.message);
          console.log("Registration Failed", error.message);
        })
      })
      .catch( error =>{
        this.authData.showBasicAlert("Registration Failed", error.message);
        console.log("Registration Failed", error.message);
      });
    })
    .catch( error => {
      this.authData.showBasicAlert("Registration Failed", error.message);
      console.log("Registration Failed", error.message);
    });    
  }
}