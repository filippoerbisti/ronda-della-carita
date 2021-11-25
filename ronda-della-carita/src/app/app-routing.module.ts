import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonComponentsComponent } from './common-components/common-components.component';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { StoricoAccessiAdminComponent } from './admin/storico-accessi-admin/storico-accessi-admin.component';
import { OrdineAdminComponent } from './admin/ordine-admin/ordine-admin.component';
import { RegistrazioneAdminComponent } from './admin/registrazione-admin/registrazione-admin.component';
import { UserAdminComponent } from './admin/user-admin/user-admin.component';

import { HomeEsternoComponent } from './vol-esterno/home-esterno/home-esterno.component';
import { OrdineEsternoComponent } from './vol-esterno/ordine-esterno/ordine-esterno.component';
import { RegistrazioneEsternoComponent } from './vol-esterno/registrazione-esterno/registrazione-esterno.component';
import { ViewOrdineEsternoComponent } from './vol-esterno/view-ordine-esterno/view-ordine-esterno.component';
import { ViewRegistrazioneEsternoComponent } from './vol-esterno/view-registrazione-esterno/view-registrazione-esterno.component';

import { HomeInternoComponent } from './vol-interno/home-interno/home-interno.component';
import { OrdineInternoComponent } from './vol-interno/ordine-interno/ordine-interno.component';
import { RegistrazioneInternoComponent } from './vol-interno/registrazione-interno/registrazione-interno.component';

import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

import { EditOrderDialogComponent } from './edit-order-dialog/edit-order-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ScannerQrComponent } from './scanner-qr/scanner-qr.component';


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
