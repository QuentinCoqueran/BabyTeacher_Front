import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ConnexionUserComponent } from './connexion-user/connexion-user.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SubscribeUserComponent} from "./subscribe-user/subscribe-user.component";
import { FirstConnectionBabysitterComponent } from './first-connection-babysitter/first-connection-babysitter.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionUserComponent,
    SubscribeUserComponent,
    FirstConnectionBabysitterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
