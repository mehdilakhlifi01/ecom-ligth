import { CatyServiceService } from './../../services/caty-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Product } from '../model/product.model';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import {CaddyService} from '../../services/caddy.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  currentTime: number;
  title:string ;
  timeStamp:number=0;
  totalRecords:Number;
  page:Number=1;
  public att;

  constructor(private catService:CatyServiceService,
    public route:ActivatedRoute,
    public router:Router,
    public auth:AuthenticationServiceService,
    public caddyService:CaddyService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){

       let url=val.url;
       console.log(url);

       let p1=this.route.snapshot.params.p1
       if(p1==1){
         this.att=1;
         this.title="Produit Selectionnner"
         this.getProducts('/products/search/selectedProducts');
       }
       else if(p1==2)
       {
         this.att=0;

         let idCat=this.route.snapshot.params.p2
         this.title="Produit de la Catégories "+idCat;
         this.getProducts('/categories/'+idCat+'/products');

       }
       else if(p1==3)
       {
         this.att=0;

         this.title="Produits en Promotion "
         this.getProducts('/products/search/promoProducts');

       }
       else if(p1==4)
       {
         this.att=0;

         this.title="Produits Disponibles "

         this.getProducts('/products/search/dispoProducts');

       }

       else if(p1==5)
       {
         this.att=0;
         let idCat=this.route.snapshot.params.p2
         this.title="Recherche ... "
         this.getProducts('/products/search/productsByKeyword?mc='+idCat);

       }

      }


    });

    let p1=this.route.snapshot.params.p1
    if(p1==1){
      this.att=1;

      this.getProducts('/products/search/selectedProducts');


    }

  }
  getProducts(url) {
    this.catService.getRessource(url)
    .subscribe(data=>{
      this.products=data;
    },err=>{
      console.log("err")
    })
  }

  onEditPhoto(p){
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event){
    //ensemble des fichier selectionner
      this.selectedFiles=event.target.files;
  }

  upload(){

    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.timeStamp=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  getTimest(){
    return this.timeStamp;
  }

  // onProductDetails(p:Product){
  //   let url=btoa(p._links.product.href);
  //    this.router.navigateByUrl('detail/'+url)
  // }


  isAdmin(){
    return this.auth.isAdmin();

  }

  isUser(){
    return this.auth.isUser();
  }

  isAuth(){
    return this.auth.isAuthenticated();
  }

  onProductDetail(p:Product) {
       let url=btoa(p._links.product.href);
        this.router.navigateByUrl('detail/'+url);
  }

  onAddProductToCaddy(p:Product) {
       this.caddyService.addProductToCaddy(p);
  }
}
