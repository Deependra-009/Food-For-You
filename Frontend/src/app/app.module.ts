import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { OrderFoodOnlineComponent } from './Pages/order-food-online/order-food-online.component';
import { OtherPagesNavbarComponent } from './Components/other-pages-navbar/other-pages-navbar.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { PaymentPageComponent } from './Pages/payment-page/payment-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import { authInterceptorProvider } from './Service/auth.interceptors';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { rootReducer } from './NgRx_Functions/Reducers';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { OrderPageComponent } from './Pages/order-page/order-page.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { MyDetailsComponent } from './Pages/my-details/my-details.component';
import { ToastrModule } from 'ngx-toastr';
import {MatBadgeModule} from '@angular/material/badge';
import { EditDetailComponent } from './Pages/edit-detail/edit-detail.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductSearchPageComponent } from './Pages/product-search-page/product-search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    OrderFoodOnlineComponent,
    OtherPagesNavbarComponent,
    ProductDetailComponent,
    SearchBoxComponent,
    PaymentPageComponent,
    CartPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    OrderPageComponent,
    ProfileComponent,
    MyDetailsComponent,
    EditDetailComponent,
    ChangePasswordComponent,
    ProductSearchPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    StoreModule.forRoot(rootReducer, {})
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
