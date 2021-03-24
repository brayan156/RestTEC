import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/login/fake-backend';
import { fakeBackendProviderCrud } from './_helpers/crud/fake-backend-crud';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './_helpers/login/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/login/error.interceptor';
import { HomeComponent } from './home/home.component';
import { HomeComponentChef } from './home-chef/home-chef.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './components/crud/alert.component';
import { ErrorInterceptorCrud } from './_helpers/crud/error.interceptor-crud';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponentChef,
    LoginComponent,
    AlertComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorCrud, multi: true },

    // provider used to create fake backend
    fakeBackendProviderCrud,
    fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
