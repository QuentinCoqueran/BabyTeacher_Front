import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnexionUserComponent} from "./app/connexion-user/connexion-user.component";
import {SubscribeUserComponent} from "./app/subscribe-user/subscribe-user.component";
import {
  FirstConnectionBabysitterComponent
} from "./app/first-connection-babysitter/first-connection-babysitter.component";
import {AuthGuard} from "./app/auth.guard";



const routes: Routes = [
  {path: 'login', component: ConnexionUserComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'subscribe', component: SubscribeUserComponent},
  {path: 'first-connection-babysitter', component: FirstConnectionBabysitterComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
