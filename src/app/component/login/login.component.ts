import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private auth:AuthenticationServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(data){

    this.auth.login(data).subscribe(res=>{

      console.log(res.headers.get('Authorization'));

      let jwt=res.headers.get('Authorization');

      this.auth.saveToken(jwt)
      this.router.navigateByUrl('')


    },err=>{

    })



  }



}
