import { Component, OnInit } from '@angular/core';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  constructor(private auth:AuthenticationServiceService,private router:Router) { }

  ngOnInit(): void {
  }

  onRegistre(value) {
    this.auth.register(value).subscribe(res=>{
      console.log(res)
      this.router.navigateByUrl('/login')
    })
  }

}
