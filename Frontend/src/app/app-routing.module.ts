import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { EditDetailComponent } from './Pages/edit-detail/edit-detail.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { MyDetailsComponent } from './Pages/my-details/my-details.component';
import { OrderFoodOnlineComponent } from './Pages/order-food-online/order-food-online.component';
import { OrderPageComponent } from './Pages/order-page/order-page.component';
import { PaymentPageComponent } from './Pages/payment-page/payment-page.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { ProductSearchPageComponent } from './Pages/product-search-page/product-search-page.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:"order-food-online",
    component:OrderFoodOnlineComponent,
    pathMatch:"full"
  },
  {
    path:"product-search-page",
    component:ProductSearchPageComponent,
    pathMatch:"full"
  },
  {
    path:"product-details",
    component:ProductDetailComponent,
    pathMatch:'full'
  },
  {
    path:'payment-page',
    component:PaymentPageComponent,
    pathMatch:'full'  
  },
  {
    path:'cart-page',
    component:CartPageComponent,
    pathMatch:'full'
  },
  {
    path:'register',
    component:RegisterPageComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginPageComponent,
    pathMatch:'full'
  },
  {
    path:'profile-page',
    component:ProfileComponent,
    children:[
      {
        path:'order-page',
        component:OrderPageComponent,
        pathMatch:'full'
      },
      {
        path:'',
        component:MyDetailsComponent,
        pathMatch:'full'
      },
      {
        path:'edit-detail',
        component:EditDetailComponent,
        pathMatch:'full'
      },
      {
        path:'change-password',
        component:ChangePasswordComponent,
        pathMatch:'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
