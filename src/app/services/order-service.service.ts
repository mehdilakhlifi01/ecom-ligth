import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CaddyService} from './caddy.service';
import {CatyServiceService} from './caty-service.service';
import {Client} from '../component/model/Client.model';
import {Observable} from 'rxjs';
import {Order} from '../component/model/Ordre.model';
import {OrdreItemsModel} from '../component/model/OrdreItems.model';
import {ProductItem} from '../component/model/ProductItem.model';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  public order:Order=new Order();
  public client:Client;
  private keyy: string;


  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatyServiceService){}

  public setClient(client:Client){
    this.order.client=client;
//  console.log(client.orderItems= this.order.products)

  }

  public setClientProduct(p){
   // this.client.orderItems=p;

  }

  public setProduct(product: Array<ProductItem>){
   // this.order.products.push(product);
  }



  public loadProductsFromCaddy(){
    console.log(this.order.products)
    this.order.products=[];
    for(let key in this.caddyService.getCurrentCaddy().items){
      this.order.products.push(this.caddyService.getCurrentCaddy().items[key])
      console.log(this.caddyService.getCurrentCaddy().items[key])
    //  this.keyy=key
    }
    return this.order.products ;

  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.products.currentPrice*p.products.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(this.catalService.host+"/orders",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.catalService.host+"/orders/"+id);
  }

}
