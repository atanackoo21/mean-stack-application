import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  public isAdminLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit() {

    this.myForm = new FormGroup({
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
  });
  }

  onSubmit(){
    let user: User={
      email: this.myForm.value.email,
      password: this.myForm.value.password
    };

  this.authService.signin(user)
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
          alert('Nepostojeci korisnik');
        }
        else{
          alert('Neuspesno logovanje');
        }

    });
 
    this.myForm.reset();
    
  }
  onLogOut(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
  
  adminStatus(){
    return this.isAdminLogin;
  }

  

 
}
