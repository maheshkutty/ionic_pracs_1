import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormControl, FormBuilder, Validator, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router"

interface Login {
  email: String,
  password: String
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = this.fb.group({
    email: ["", [Validators.required]],
    password: ["", [Validators.required]]
  })
  isSubmitted = false;
  constructor(public toastController: ToastController, public router: Router, public fb: FormBuilder) { }

  get errorControl() {
    return this.login.controls;
  }

  ngOnInit() {
  }

  async showMsg() {
    this.isSubmitted = true
    if (!this.login.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.login.value);
      const toast = await this.toastController.create({
        message: 'You logged in successfully.',
        duration: 2000
      });
      toast.present();
      this.router.navigate(["/home"]);
    }
  }
}
