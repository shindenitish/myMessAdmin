import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';

import { AuthProvider } from '../providers/auth/auth';

import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC_KeK56MdvteYU96PocSxfAaOgO9aVBSI",
  authDomain: "mymess-11f8c.firebaseapp.com",
  databaseURL: "https://mymess-11f8c.firebaseio.com",
  projectId: "mymess-11f8c",
  storageBucket: "mymess-11f8c.appspot.com",
  messagingSenderId: "201921251715"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatePicker,
    DatePipe
  ]
})
export class AppModule {}
