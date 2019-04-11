import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from "@angular/router";
import {Http} from '@angular/http';
// import { DataService } from '../../data.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthService]
})
export class RegistrationComponent implements OnInit {

  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }


  registration(){

    let newUser: User = {
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      isAdmin: false,
      email: this.myForm.value.email,
      password: this.myForm.value.password
      }


    this.authService.registerUser(newUser)
    .subscribe(data => {
      if (data.msg == 'Uspesno logovanje!'){
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/');
      }
      else if (data.msg == 'Losa lozinka'){
        alert('Lozinka pogresna!');
      }
      else if (data.msg == 'Ne postoji'){
        alert('Korisnik sa tim emailom vec postoji u bazi');
      }
      else{
        alert('Neuspesno logovanje');
      }

    });
    
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
  });

  }

}
