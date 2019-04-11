import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
   
import {map, filter, scan} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// import {Observable,of, from } from 'rxjs'; 
  
@Injectable()  
export class DataService {  
  
  constructor(private http: Http) { }  
  
  getShoppingItems(){
    return this.http.get('http://localhost:3000/api/items')
    .pipe(map(res => res.json()));
  }

  addShoppingItem(newItem){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
    .post('http://localhost:3000/api/item', newItem, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  deleteShopingItem(id){
    return this.http.delete('http://localhost:3000/api/item/' + id)
    .pipe(map(res => res.json()));
  }

  updateShoppingItem(newItem){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
    .put('http://localhost:3000/api/item/' + newItem._id, newItem, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  //SEKCIJA DODAVANJA PROIZVODA U KORPU
  getProizvoda(){
    return this.http.get('http://localhost:3000/api/proizvodi')
    .pipe(map(res => res.json()));
  }

  addProizvoda(newItem){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
    .post('http://localhost:3000/api/proizvod', newItem, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  deleteProizvoda(id){
    return this.http.delete('http://localhost:3000/api/proizvod/' + id)
    .pipe(map(res => res.json()));
  }

  deleteAllTempProizvoda(){
    return this.http.delete('http://localhost:3000/api/proizvodi')
    .pipe(map(res => res.json()));
  }

  deleteAllCarts(){
    return this.http.delete('http://localhost:3000/api/carts')
    .pipe(map(res => res.json()));
  }

  getCartForUser(id){
    let headers = new Headers();
      headers.append('content-Type', 'application/json');
      return this.http
      .get('http://localhost:3000/api/carts/'+ id).pipe(
      map(res => res.json()));
  }

  getCartForAdmin(){
    let headers = new Headers();
      headers.append('content-Type', 'application/json');
      return this.http
      .get('http://localhost:3000/api/carts/').pipe(
      map(res => res.json()));
  }

  updateProizvoda(newItem){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
    .put('http://localhost:3000/api/proizvod/' + newItem._id, newItem, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  //Da li je proizvod u korpi (dugme add)
  getPr(newPr){
      let headers = new Headers();
      headers.append('content-Type', 'application/json');
      return this.http
      .get('http://localhost:3000/api/proizvod/'+ newPr._id, newPr).pipe(
      map(res => res.json()));
}

  //korpa proba

  addCart(newCart){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
    .post('http://localhost:3000/api/cart', newCart, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  deleteCart(id){
    return this.http.delete('http://localhost:3000/api/proizvod/' + id)
    .pipe(map(res => res.json()));
  }

  getCarts(){
    return this.http.get('http://localhost:3000/api/carts')
    .pipe(map(res => res.json()));
  }

  getItem(id){
    return this.http.get('http://localhost:3000/api/item/'+ id)
    .pipe(map(res => res.json()));
  }

  getUserId(){
    return localStorage.getItem('userId');
  }

  //posao

  getJobs(){
    return this.http.get('http://localhost:3000/api/jobs')
    .pipe(map(res => res.json()));
  }

  addJob(newJob){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
    .post('http://localhost:3000/api/job', newJob, {headers: headers}).pipe(
      map(res => res.json())
    );
  }

  deleteJob(id){
    return this.http.delete('http://localhost:3000/api/job/' + id)
    .pipe(map(res => res.json()));
  }

  deleteAllJobs(){
    return this.http.delete('http://localhost:3000/api/jobs')
    .pipe(map(res => res.json()));
  }


}