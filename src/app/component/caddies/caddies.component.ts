import { Component, OnInit } from '@angular/core';
import {CaddyService} from '../../services/caddy.service';
import {Router} from '@angular/router';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {Caddy} from '../model/caddy.model';
import {ProductItem} from '../model/ProductItem.model';
import {CatyServiceService} from '../../services/caty-service.service';
import {OrderServiceService} from '../../services/order-service.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {

  public caddy:Caddy;
  public timeStamp:number=0;

  constructor(public caddyService:CaddyService,private  router:Router,
              private authService:AuthenticationServiceService,
              private catService:CatyServiceService,
              private ordreService:OrderServiceService
  ) { }


  ngOnInit() {
    this.caddy=this.caddyService.getCurrentCaddy();
    console.log(this.caddy);
  }

  onRemoveProductFromCaddy(p) {
    this.caddyService.removeProduct(p);
  }

  onNewOrder() {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }
    else {
      this.router.navigateByUrl('/client');
      this.ordreService.loadProductsFromCaddy();
      console.log(this.ordreService.loadProductsFromCaddy())
      for (const productItem of this.getBindedAuthors) {

        //  this.ordreService.loadProductsFromCaddy(productItem);
        console.log(productItem)
        this.ordreService.order.products.push(productItem);


      }
      ;

      console.log(this.ordreService.order.products.entries())

      console.log()

      this.ordreService.order.products = this.getBindedAuthors;
      console.log(this.ordreService.order.products)


      return this.getBindedAuthors;

    }
  }
  get getBindedAuthors(){
    return Array.from(this.caddyService.getCurrentCaddy().items.values());
  }

  deleteP(id) {
    this.catService.delete(id);
  }

  getTimest() {
    return this.timeStamp;
  }
}
