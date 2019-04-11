import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../cart';
import { Item } from '../item';


@Component({
  selector: 'app-kupovine',
  templateUrl: './kupovine.component.html',
  styleUrls: ['./kupovine.component.scss']
})
export class KupovineComponent implements OnInit {

  listOfCarts: Cart [] = [];
  itemz: Item [] = [];
  listOfCartsAdmin: Cart [] = [];

  constructor(private router: Router, private dataservice: DataService, private authService: AuthService) {
  }

  ngOnInit() {
    if (!this.isAdminLogged())
      this.getCarts();
    else
      this.getCartsForAdmin();
  }

  isLogged(){
    if (this.listOfCarts.length<1)
      return false;
    else 
      return true;
  }
  isAdminLogged(){
    return this.authService.isAdmin();
  }

  getCartsForAdmin(){
    this.dataservice.getCartForAdmin()
    .subscribe(carts => {
      this.listOfCartsAdmin = carts;
    });
    
  }

  //izlistaj moje kupovine
   getCarts(){
    this.dataservice.getCartForUser(this.dataservice.getUserId())
    .subscribe(carts => {
      this.listOfCarts = carts;
    });
    
   }

   onKupovina(){
     this.router.navigateByUrl('/');
   }

}
