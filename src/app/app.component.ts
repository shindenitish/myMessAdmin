import { Component, OnInit } from '@angular/core';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any;

  constructor(private authProvider: AuthProvider) {
  }

  ngOnInit() {
    this.authProvider.getAuthState().subscribe((user) => {
      if(user){
        if(user.emailVerified)
        {
          this.rootPage = ProfilePage;
        }else{
          this.rootPage = LoginPage;  
        }
      }else{
        this.rootPage = LoginPage;  
      }
    });
  }
}

