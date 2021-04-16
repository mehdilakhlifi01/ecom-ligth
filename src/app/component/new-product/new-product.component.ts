import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product.model';
import {CatyServiceService} from '../../services/caty-service.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public cat:number ;
  product:Product={
    currentPrice:null,
    available:null,
    name:"",
    description:"",
    promotion:null,
    selected:null,
    photoName:"",

  }



  constructor(private route:ActivatedRoute,
              private catService:CatyServiceService,
              private router:Router) { }

  ngOnInit(): void {
   this.cat= this.route.snapshot.params.id
  }


  add(data) {
   this.catService.addProduct("/addProduct/"+this.cat,data).subscribe(res=>{
     console.log(res)
     this.router.navigateByUrl('/')
   })
  }
}
