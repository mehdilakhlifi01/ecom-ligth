import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {



  jwt:string;
  username:string;
  roles:Array<string>;
  name:string;

  host2:string="http://localhost:8087"

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(this.host2+"/login",data,{observe:'response'})
  }

  saveToken(jwt: string) {
      localStorage.setItem('token',jwt);
      this.jwt=jwt;
      this.parseJWT();
  }

  parseJWT(){
    let jwtHelper=new JwtHelperService();
    let objJwt=jwtHelper.decodeToken(this.jwt);
    this.username=objJwt.obj;
    this.roles=objJwt.roles;

  }

  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0

  }

  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticationUser(){
    let jwtHelper=new JwtHelperService();
    let objJwt=jwtHelper.decodeToken(this.jwt).sub;
      console.log(objJwt)
    return   this.username=objJwt;
  }

  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser() );
  }

  loadToken() {
      this.jwt=localStorage.getItem('token');
      this.parseJWT();

     return this.isAuthenticated();

  }


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('Panier1')
    this.initParams();

  }

  initParams(){
    this.jwt=undefined;
    this.username=undefined;
    this.roles=undefined;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(value) {
    return this.http.post(this.host2+"/register",value,{observe:'response'})

  }
}
