import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';
import {DataService} from '../data.service';
import { FormGroup } from '@angular/forms';
import {LoginComponent} from '../auth/login/login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { Proizvodi } from '../proizvodi';

@Component({
  selector: 'app-asortiman-list',
  templateUrl: './asortiman-list.component.html',
  styleUrls: ['./asortiman-list.component.scss'],
  providers: [DataService, AuthService]
})



export class AsortimanListComponent implements OnInit {
  // editForm: FormGroup;

  shoppingItemList: Item[]=[];
  
  chartList: Item[]=[];

  niz: Item[]=[];

  itemsFromCart: Item []=[];

  selectedItem: Item;

  toggleForm: boolean = false;

  toggleAdding: boolean = false;

  event = new Date();

  racun: number = 0;

  sortsBy: String [] = ['Izaberite', 'Rastuce (cena)', 'Opadajuce (cena)'];

  sortBy: String;
  
  constructor(private router: Router, private dataservice: DataService, private authService: AuthService) {
   }

  ngOnInit() {
    this.getItems();
    this.getItemFromCart();
  }

  isLoggedAdmin(){
    return this.authService.isAdmin();
  }
  isLoggedSomeone(){
    return this.authService.isLoggedIn();
  }

  sirinaAsortimana(){
    return this.authService.isAdmin() ? 8 : 7 ; 
  }


  getItems(){
    this.dataservice.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemList = items;
    });
  }

  //izlistavanje proizvoda iz temp baze - korpe
  getItemFromCart(){
    this.racun=0;
    this.dataservice.getProizvoda()
    .subscribe(items => {
      this.chartList = items;
        for(var i=0; i < this.chartList.length;i++){
          this.racun = this.racun + this.chartList[i].quantity * this.chartList[i].price;
       }
    });
  }

  onOdustaniOdKupovine(){
    if (this.chartList.length<1){
      return alert('Korpa je prazna!');
    }
    this.dataservice.deleteAllTempProizvoda()
    .subscribe(data =>{
      this.chartList=[];
      this.getItemFromCart();
    });
    this.chartList=[];
    this.getItemFromCart();
  }

  addItemToCart(item){
    this.dataservice.getPr(item)
    .subscribe(poruka =>{
      if (poruka.msg == 'Not found'){
        this.dataservice.addProizvoda(item)
        .subscribe(item =>{
          console.log(item);
          this.getItemFromCart();
        });
      } else {
        alert("Proizvod ste vec dodali! Kolicinu mozete povecati direktno u vasoj korpi.");
      }
    });
    
  }

  deleteItemFromCart(item){

    if (item.quantity > 1){
      var br;
      br = parseInt(item.quantity)-1;

      let newItem: Proizvodi = {
        _id: item._id,
        quantity: br
      }
      this.dataservice.updateProizvoda(newItem)
      .subscribe(result => {
        this.getItemFromCart();
      });
    }
    else{
    this.dataservice.deleteProizvoda(item._id)
    .subscribe(data => {
      this.getItemFromCart();
    });
  }
  }

  changeItemFromCart(item){
    var br;
    br = parseInt(item.quantity)+1;

    let newItem: Proizvodi = {
      _id: item._id,
      quantity: br
    }
    this.dataservice.updateProizvoda(newItem)
    .subscribe(result => {
      this.getItemFromCart();
    });
  }

  onPoruci(form){
    if (this.chartList.length<1){
      return alert('Korpa je prazna!');
    }
    this.event.setUTCHours(this.event.getUTCHours()+2);

    this.chartList.forEach(el => {
      this.itemsFromCart.push(el);
    });


    let newCart: Cart = {
      userId: this.dataservice.getUserId(),
      items: this.itemsFromCart,
      napomena: 'Proslo',
      date: (this.event.toLocaleString('sr-Latn', { timeZone: 'UTC' }))
    }
    
    this.dataservice.addCart(newCart)
    .subscribe(data =>{
      if (data.msg == 'Cart added to db: '){
        this.onOdustaniOdKupovine();
        alert('Uspesna kupovina');
      }
      else{
        alert('Neuspesna kupovina');
      }
    });
    
  }


  onAddUnregister(){
    this.router.navigateByUrl('/login');
  }

  // adminovo dodavanje
  addItem(form){
    let newItem: Item = {
      name: form.value.name,
      quantity: form.value.quantity,
      price: form.value.price,
      bought: false,
      category: form.value.category,
      image: form.value.image
      }
    this.dataservice.addShoppingItem(newItem)
    .subscribe(item =>{
      this.getItems();
    });
     form.reset();
  }

  deleteItem(id){
    this.dataservice.deleteShopingItem(id)
    .subscribe(data =>{
      if (data.n == 1){
        for(var i=0; i<this.shoppingItemList.length;i++){
          if (id== this.shoppingItemList[i]._id){
            this.shoppingItemList.splice(i,1);
          }
        }
      }
    });
  }

  editItem(form){
    let newItem: Item = {
      _id: this.selectedItem._id,
      name: form.value.name,
      quantity: form.value.quantity,
      price: form.value.price,
      image: form.value.image,
      category: form.value.category,
      bought: false
    }
    this.dataservice.updateShoppingItem(newItem)
    .subscribe(result => {
      this.getItems();
    });

    this.toggleForm = !this.toggleForm;
  }

  showEditForm(item){
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  onOdustani(form){
    
    this.toggleForm = !this.toggleForm;
    form.reset();
  }

  

  onKeramika(){
    this.dataservice.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemList = items;
      for(var i = 0; i < this.shoppingItemList.length; i++){
        if (this.shoppingItemList[i].category == 'keramika'){
            this.niz.push(this.shoppingItemList[i]);
        }
      }
      this.shoppingItemList = this.niz;
      this.niz=[];
    });
  }
  onStaklo(){
    this.dataservice.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemList = items;
      for(var i = 0; i < this.shoppingItemList.length; i++){
        if (this.shoppingItemList[i].category == 'staklo'){
            this.niz.push(this.shoppingItemList[i]);
        }
      }
      this.shoppingItemList = this.niz;
      this.niz=[];
    });
    
  }
  onRosfraj(){
    this.dataservice.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemList = items;
      for(var i = 0; i < this.shoppingItemList.length; i++){
        if (this.shoppingItemList[i].category == 'rosfraj'){
            this.niz.push(this.shoppingItemList[i]);
        }
      }
      this.shoppingItemList = this.niz;
      this.niz=[];
    });
  }
  onKomletnaPonuda(){
    this.getItems();
  }

  
}


