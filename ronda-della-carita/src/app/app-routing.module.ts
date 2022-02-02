import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonComponentsComponent } from './common-components/common-components.component';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';

import { HomeAdminComponent } from './users/admin/home-admin/home-admin.component';
import { StoricoAccessiAdminComponent } from './users/admin/storico-accessi-admin/storico-accessi-admin.component';
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

import { DeleteOrderDialogComponent } from './dialog/order/delete-order-dialog/delete-order-dialog.component';
import { DeleteClientDialogComponent } from './dialog/client/delete-client-dialog/delete-client-dialog.component';
import { DeleteUserDialogComponent } from './dialog/user/delete-user-dialog/delete-user-dialog.component';

import { EditOrderDialogComponent } from './dialog/order/edit-order-dialog/edit-order-dialog.component';
import { EditClientDialogComponent } from './dialog/client/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from './dialog/user/edit-user-dialog/edit-user-dialog.component';

import { ScannerQrComponent } from './utils/scanner-qr/scanner-qr.component';

const routes: Routes = [
  { path: 'commons', component: CommonComponentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'accessi-admin', component: StoricoAccessiAdminComponent },
  { path: 'user-admin', component: UserAdminComponent },
  { path: 'ordine-admin', component: OrdineAdminComponent },
  { path: 'registrazione-admin', component: RegistrazioneAdminComponent },
  { path: 'home-esterno', component: HomeEsternoComponent },
  { path: 'ordine-esterno', component: OrdineEsternoComponent },
  { path: 'registrazione-esterno', component: RegistrazioneEsternoComponent },
  { path: 'scanner-qr', component: ScannerQrComponent },
  { path: 'view-ordine-esterno', component: ViewOrdineEsternoComponent },
  { path: 'view-registrazione-esterno', component: ViewRegistrazioneEsternoComponent },
  { path: 'home-interno', component: HomeInternoComponent },
  { path: 'ordine-interno', component: OrdineInternoComponent },
  { path: 'registrazione-interno', component: RegistrazioneInternoComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
