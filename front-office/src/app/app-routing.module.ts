import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeEsternoComponent } from './vol-esterno/home-esterno/home-esterno.component';
import { HomeInternoComponent } from './vol-interno/home-interno/home-interno.component';
import { OrdineEsternoComponent } from './vol-esterno/ordine-esterno/ordine-esterno.component';
import { RegistrazioneEsternoComponent } from './vol-esterno/registrazione-esterno/registrazione-esterno.component';
import { ViewOrdineEsternoComponent } from './vol-esterno/view-ordine-esterno/view-ordine-esterno.component';
import { ViewRegistrazioneEsternoComponent } from './vol-esterno/view-registrazione-esterno/view-registrazione-esterno.component';
import { OrdineInternoComponent } from './vol-interno/ordine-interno/ordine-interno.component';
import { RegistrazioneInternoComponent } from './vol-interno/registrazione-interno/registrazione-interno.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-esterno', component: HomeEsternoComponent },
  { path: 'ordine-esterno', component: OrdineEsternoComponent },
  { path: 'registrazione-esterno', component: RegistrazioneEsternoComponent },
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
