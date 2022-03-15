import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';

import { HomeComponent } from './home/home.component';
import { HomeEsternoComponent } from './home-esterno/home-esterno.component';

import { CreateUserComponent } from './create/create-user/create-user.component';
import { CreateClientComponent } from './create/create-client/create-client.component';
import { CreateOrderComponent } from './create/create-order/create-order.component';

import { StoricoAccessiComponent } from './utils/storico-accessi/storico-accessi.component';

import { ScannerQrComponent } from './utils/scanner-qr/scanner-qr.component';

import { PreviewPdfComponent } from './preview-pdf/preview-pdf.component';

import { AuthGuardService } from './shared/service/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/home', component: HomeComponent },
  { path: 'vol1/home', component: HomeComponent },
  { path: 'vol0/home', component: HomeEsternoComponent },
  { path: 'vol0/mob/home', component: HomeComponent },

  { path: ':rule/create/user', component: CreateUserComponent},
  { path: ':rule/create/client', component: CreateClientComponent },
  { path: ':rule/create/order', component: CreateOrderComponent },
  { path: ':rule/create/order/:n_tessera', component: CreateOrderComponent },
  { path: ':rule/history', component: StoricoAccessiComponent},
  { path: ':rule/scanner-qr', component: ScannerQrComponent },
  { path: ':rule/preview-pdf/:n_ordine', component: PreviewPdfComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },  
  { path: '**', component: PageNotFoundComponent }  

  // canActivate: [AuthGuardService] for admin controll
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuardService]
})
export class AppRoutingModule { }
