import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsortimanListComponent } from './asortiman-list/asortiman-list.component';
  
import { HttpModule } from '@angular/http';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AuthService } from './auth/auth.service';    
import { DataService } from './data.service';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';   
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { KupovineComponent } from './kupovine/kupovine.component';
import { KarijeraComponent } from './karijera/karijera.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FormaModalDriverComponent } from './forma-modal-driver/forma-modal-driver.component';
import { KonkursiComponent } from './konkursi/konkursi.component';
import { DropdownDirective } from './dropdown.directive';
import { AboutComponent } from './about/about.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    AsortimanListComponent,
    CarouselBasicComponent,
    WelcomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    KupovineComponent,
    KarijeraComponent,
    FormModalComponent,
    FormaModalDriverComponent,
    KonkursiComponent,
    DropdownDirective,
    AboutComponent
  ],
  imports: [
    NgbModule, ReactiveFormsModule,
    BrowserModule,HttpModule,FormsModule,
    AppRoutingModule, HttpClientModule,
    AngularFontAwesomeModule, NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD13sU1Z6vbzh_XBtNUbWErAGkB6OCb3MM'
    })
    
  ],
  providers: [DataService, AuthService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent, FormaModalDriverComponent]
})
export class AppModule { }
