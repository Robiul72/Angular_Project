import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  baseurl: string = "http://localhost:3000/posts";

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {

    this.http.post(this.baseurl, data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    // if (localStorage.getItem('seller')) {
    //   this.isSellerLoggedIn.next(true)
    //   this.router.navigate(['seller-home'])
    // }
  }

  userLogin(data: Login) {
    console.warn(data);
    // api call
    this.http.get(`http://localhost:3000/posts?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length) {
        console.warn("User Logged Success");

        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);

      } else {
        console.warn("Login Failed");
        this.isLoginError.emit(true)
      }
    });
  }



}
