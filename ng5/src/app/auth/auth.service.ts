import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {map, filter, scan} from 'rxjs/operators';
// import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

    constructor( private http: Http ) { } 

    registerUser(newUser){
        let headers = new Headers();
        headers.append('content-Type', 'application/json');
        return this.http
        .post('http://localhost:3000/api/user', newUser, {headers: headers}).pipe(
        map(res => res.json()));
    }

    signin(user){
        let headers = new Headers();
        headers.append('content-Type', 'application/json');
        return this.http
        .post('http://localhost:3000/api/signin', user, {headers: headers}).pipe(
        map(res => res.json()));
    }

    getUsera(){
        return this.http.get('http://localhost:3000/api/users')
        .pipe(map(res => res.json()));
    }

    getAdmin(){
        return this.http.get('http://localhost:3000/api/useri')
        .pipe(map(res=> res.json()));
    }

    logout(){
        localStorage.clear();       
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

    isAdmin(){
        return localStorage.getItem('userId') == '5b978a35211b4d083471b170';
    }

    getUserId(){
        return localStorage.getItem('userId');
    }
    


    // getShoppingItems(){
    //     return this.http.get('http://localhost:3000/api/items')
    //     .pipe(map(res => res.json()));
    //   }
    
    //   addShoppingItem(newItem){
    //     let headers = new Headers();
    //     headers.append('content-Type', 'application/json');
    //     return this.http
    //     .post('http://localhost:3000/api/item', newItem, {headers: headers}).pipe(
    //       map(res => res.json())
    //     );
    //   }
    
    //   deleteShopingItem(id){
    //     return this.http.delete('http://localhost:3000/api/item/' + id)
    //     .pipe(map(res => res.json()));
    //   }
    
    //   updateShoppingItem(newItem){
    //     let headers = new Headers();
    //     headers.append('content-Type', 'application/json');
    //     return this.http
    //     .put('http://localhost:3000/api/item/' + newItem._id, newItem, {headers: headers}).pipe(
    //       map(res => res.json())
    //     );
    //   }

}