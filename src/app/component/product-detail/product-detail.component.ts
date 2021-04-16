import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CatyServiceService} from '../../services/caty-service.service';
import {Product} from '../model/product.model';
import {AuthenticationServiceService} from '../../services/authentication-service.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public currentProduct;
  mode = 0;
  currentTime: number;
  editPhoto: boolean;
  progress: any;
  private selectedFiles: any;
  private currentFileUpload: File;

  constructor(private router: Router, private  route: ActivatedRoute,
              private catalService: CatyServiceService,
              private authService: AuthenticationServiceService) { }

  ngOnInit(): void {

    const url = atob(this.route.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data => {
       this.currentProduct = data;
    });
    console.log(url);
  }

  onEditProduct(){
    this.mode=1;
  }

  getTS(){
    return this.currentTime;
  }

  onEditPhoto(p: Product) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  onAddProductToCaddy(currentProduct: Product) {

  }

  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        console.log("*********************************");
        console.log(this.currentProduct)
        this.mode=0;
        console.log(d);
      },err=>{
        console.log(err);
      })
  }


  modifier() {
   return  this.authService.isAdmin();
  }
  isAdmin(){
    return this.authService.isAdmin();

  }

  isUser(){
    return this.authService.isUser();
  }

  isAuth(){
    return this.authService.isAuthenticated();
  }
}
