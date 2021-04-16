import { Injectable } from '@angular/core';
import {Caddy} from '../component/model/caddy.model';
import {Product} from '../component/model/product.model';
import {ProductItem} from '../component/model/ProductItem.model';
import {AuthenticationServiceService} from './authentication-service.service';
import {Client} from '../component/model/Client.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  public currentCaddyName:string="Panier1";
  public caddies=new Map();
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Panier1'}];
  private product: ProductItem;


  constructor(private authService:AuthenticationServiceService) {

    let caddies=localStorage.getItem("Panier1")

   // if(caddies){
   ///   this.caddies=JSON.parse(caddies)
  //  }
      let caddy=new Caddy(this.currentCaddyName);
      this.caddies[this.currentCaddyName]=caddy
      this.caddies.set(this.currentCaddyName,caddy);





  }
  public removeProduct(id:number):void{
    let caddy=this.caddies[this.currentCaddyName];
    delete caddy.items[id];
    this.saveCaddy(caddy);
  }
  public getCaddy():Caddy{
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }
  public addProductToCaddy(products:Product):void{

    let caddy=this.caddies.get(this.currentCaddyName);
    let productItem:ProductItem=caddy.items.get(products.id);
    if(productItem){
      productItem.quantity+=products.quantity;
    }
    else {


      productItem=new ProductItem();
      productItem.totalAmount=products.currentPrice;
      productItem.quantity=products.quantity;
      productItem.products=products;
      productItem.products.id=products.id
      caddy.items.set(products.id,productItem);
      this.product=productItem
      console.log(productItem)
      console.log(this.product)
      caddy.items[products.id]=productItem;
      console.log(caddy)

      this.saveCaddy(caddy);
    }

  }

  getCurrentCaddy():Caddy{
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }

  getSize(){
    let caddy=this.caddies[this.currentCaddyName];
    return Object.keys(caddy.items).length;
  }

  getTotal():number {
    let totle=0;
    let items:IterableIterator<ProductItem>=this.getCurrentCaddy().items.values();
    for(let p of items){
      totle+=p.totalAmount*p.quantity;
    }
    return totle;

  }


  public saveCaddy(p) {
   // let caddy=this.caddies[p].push();
   //let caddy=this.caddies.set(i,p) ; // let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem('Panier1',JSON.stringify(p));
  }


  setClient(client: Client) {
    this.getCurrentCaddy().client=client;
   // this.saveCaddy();
  }

  addNewCaddy(c: { num: number; name: string }) {
    this.listCaddies.push(c);
    this.caddies[c.name]=new Caddy(c.name);
    localStorage.setItem("ListCaddies_"+this.authService.isAuthenticationUser(),JSON.stringify(this.listCaddies));
  }
}
