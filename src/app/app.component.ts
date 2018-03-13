import { Component } from '@angular/core';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RegisterPage;

  constructor() {
  }
}

