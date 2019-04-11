import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AsortimanListComponent } from './asortiman-list/asortiman-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { DataService } from './data.service';
import { KupovineComponent } from './kupovine/kupovine.component';
import { KarijeraComponent } from './karijera/karijera.component';
import { KonkursiComponent } from './konkursi/konkursi.component';
import { AboutComponent } from './about/about.component';

 const appRoutes: Routes = [
   { path: '', component: AsortimanListComponent},
   { path: 'welcome', component: WelcomeComponent},
   { path: 'login', component: LoginComponent},
   { path: 'registration', component: RegistrationComponent},
   { path: 'not-found', component: PageNotFoundComponent},
   { path: 'kupovine', component: KupovineComponent},
   { path: 'karijera', component: KarijeraComponent},
   { path: 'konkursi', component: KonkursiComponent},
   { path: 'about', component: AboutComponent},
   { path: '**', redirectTo: '/not-found'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
