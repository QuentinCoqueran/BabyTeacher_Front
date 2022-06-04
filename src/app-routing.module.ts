import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnexionUserComponent} from "./app/connexion-user/connexion-user.component";
import {SubscribeUserComponent} from "./app/subscribe-user/subscribe-user.component";



const routes: Routes = [
  {path: 'login', component: ConnexionUserComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'subscribe', component: SubscribeUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
