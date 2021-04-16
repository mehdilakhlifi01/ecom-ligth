import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from '../component/model/product.model';


@Injectable({
  providedIn: 'root'
})
export class CatyServiceService {

  public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public getRessource(url){
    return this.http.get(this.host+url)
  }


  public getProduct(url):Observable<Product>{
    return this.http.get<Product>(url)
  }



  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  public patchResource(url,data){
    return this.http.patch(url,data);
  }

   public addProduct(url,data){
    return this.http.post(this.host+url,data);
   }

   public delete(id){
    this.http.delete(this.host+"/product",id);
   }

   public getProductsBykeyword(f) {
   return  this.http.get(this.host+"/products/search/productsByKeyword?mc="+f);
  }
}
