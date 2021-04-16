import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { RegistreComponent } from './component/registre/registre.component';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CaddiesComponent} from './component/caddies/caddies.component';
import {ClientComponent} from './component/client/client.component';
import {NewProductComponent} from './component/new-product/new-product.component';
import {PaymentComponent} from './component/payment/payment.component';


const routes: Routes = [
    {path:'',redirectTo:'products/1/0',pathMatch:'full'},
    {path:'products/:p1/:p2',component:ProductComponent},
    {path:'login',component:LoginComponent},
    {path:'detail/:url',component:ProductDetailComponent},
    {path:'caddies',component:CaddiesComponent},
    {path:'client',component:ClientComponent},
    {path:'payment',component:PaymentComponent},
    {path:'register',component:RegistreComponent},
    {path:'new/:id',component:NewProductComponent}





];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
  })
  export class AppRoutingModule { }
