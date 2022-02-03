import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeAdminComponent } from './users/admin/home-admin/home-admin.component';
import { OrdineAdminComponent } from './users/admin/ordine-admin/ordine-admin.component';
import { RegistrazioneAdminComponent } from './users/admin/registrazione-admin/registrazione-admin.component';
import { UserAdminComponent } from './users/admin/user-admin/user-admin.component';

import { HomeEsternoComponent } from './users/vol-esterno/home-esterno/home-esterno.component';
import { OrdineEsternoComponent } from './users/vol-esterno/ordine-esterno/ordine-esterno.component';
import { RegistrazioneEsternoComponent } from './users/vol-esterno/registrazione-esterno/registrazione-esterno.component';
import { ViewOrdineEsternoComponent } from './users/vol-esterno/view-ordine-esterno/view-ordine-esterno.component';
import { ViewRegistrazioneEsternoComponent } from './users/vol-esterno/view-registrazione-esterno/view-registrazione-esterno.component';

import { HomeInternoComponent } from './users/vol-interno/home-interno/home-interno.component';
import { OrdineInternoComponent } from './users/vol-interno/ordine-interno/ordine-interno.component';
import { RegistrazioneInternoComponent } from './users/vol-interno/registrazione-interno/registrazione-interno.component';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';

import { HomeComponent } from './home/home.component';

import { CreateUserComponent } from './create/create-user/create-user.component';
import { CreateClientComponent } from './create/create-client/create-client.component';
import { CreateOrderComponent } from './create/create-order/create-order.component';

import { ConfirmUserComponent } from './utils/confirm-user/confirm-user.component';
import { StoricoAccessiComponent } from './utils/storico-accessi/storico-accessi.component';

import { ScannerQrComponent } from './utils/scanner-qr/scanner-qr.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home/:rule', component: HomeComponent },
  { path: 'create/user', component: CreateUserComponent },
  { path: 'create/client', component: CreateClientComponent },
  { path: 'create/order', component: CreateOrderComponent },
  { path: 'confirm/user', component: ConfirmUserComponent },
  { path: 'history', component: StoricoAccessiComponent },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }

  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'home-interno', component: HomeInternoComponent },
  { path: 'user-admin', component: UserAdminComponent },
  { path: 'ordine-admin', component: OrdineAdminComponent },
  { path: 'registrazione-admin', component: RegistrazioneAdminComponent },
  { path: 'home-esterno', component: HomeEsternoComponent },
  { path: 'ordine-esterno', component: OrdineEsternoComponent },
  { path: 'registrazione-esterno', component: RegistrazioneEsternoComponent, data: {state: 'fanculo'} },
  { path: 'scanner-qr', component: ScannerQrComponent },
  { path: 'view-ordine-esterno', component: ViewOrdineEsternoComponent },
  { path: 'view-registrazione-esterno', component: ViewRegistrazioneEsternoComponent },
  { path: 'home-interno', component: HomeInternoComponent },
  { path: 'ordine-interno', component: OrdineInternoComponent },
  { path: 'registrazione-interno', component: RegistrazioneInternoComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
