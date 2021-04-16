import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CaddyService} from '../../services/caddy.service';
import {Client} from '../model/Client.model';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {OrderServiceService} from '../../services/order-service.service';
import {Order} from '../model/Ordre.model';
import {ProductItem} from '../model/ProductItem.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  public mode:number=0;

  panelStyle:string= "panel-default";
  private idc: any;
  public att: boolean;

  public order:Order=new Order();

  constructor(public orderService:OrderServiceService,
              private authService:AuthenticationServiceService,
              public caddyService:CaddyService,
              private router:Router) { }
  ngOnInit() {
   // this.orderService.loadProductsFromCaddy();
  //  console.log(this.orderService.loadProductsFromCaddy())


  }

  onSaveClient(client:Client) {
    client.username=this.authService.isAuthenticationUser()
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode=1;

    this.orderService.order.client.products=[];
    for(let key in this.caddyService.getCurrentCaddy().items){
      this.orderService.order.client.products.push(this.caddyService.getCurrentCaddy().items[key])
      //  this.keyy=key
    }

    console.log(this.orderService.order.client.products)
   // return  this.orderService.order

  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{
      console.log("**********************************")
      console.log(data);
      console.log("********************************")
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
       data['orderItems']=this.orderService.order.products;
      this.orderService.order.products=data['orderItems']
      console.log(this.orderService.getTotal())
        let total=this.orderService.getTotal()
      data['totalAmount']=total
      this.orderService.order.totalAmount=data['totalAmount'];
      //this.orderService.order.products=this.orderService.loadProductsFromCaddy()
      this.orderService.order.orderItems=data['orderItems']
      console.log(data);
    //  console.log(this.orderService.order.products.forEach(res=>{
     //   console.log(res)
    //  }));


      this.panelStyle="panel-success"
    },err=>{
      console.log(err);
    });
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment");
  }



}
