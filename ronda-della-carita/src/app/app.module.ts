import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

import { NavigationMenuComponent } from './navigation/navigation-menu/navigation-menu.component';
import { HomeAdminComponent } from './users/admin/home-admin/home-admin.component';
import { HomeInternoComponent } from './users/vol-interno/home-interno/home-interno.component';
import { HomeEsternoComponent } from './users/vol-esterno/home-esterno/home-esterno.component';
import { OrdineEsternoComponent } from './users/vol-esterno/ordine-esterno/ordine-esterno.component';
import { RegistrazioneEsternoComponent } from './users/vol-esterno/registrazione-esterno/registrazione-esterno.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangeMansionDialogComponent } from './dialog/change-mansion-dialog/change-mansion-dialog.component';
import { ViewOrdineEsternoComponent } from './users/vol-esterno/view-ordine-esterno/view-ordine-esterno.component';
import { ViewRegistrazioneEsternoComponent } from './users/vol-esterno/view-registrazione-esterno/view-registrazione-esterno.component';
import { DeleteClientDialogComponent } from './dialog/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from './dialog/delete-order-dialog/delete-order-dialog.component';
import { OrdineInternoComponent } from './users/vol-interno/ordine-interno/ordine-interno.component';
import { RegistrazioneInternoComponent } from './users/vol-interno/registrazione-interno/registrazione-interno.component';
import { LoginComponent } from './login/login.component';
import { SidebarMenuComponent } from './navigation/sidebar-menu/sidebar-menu.component';
import { SidebarAdminMenuComponent } from './navigation/sidebar-admin-menu/sidebar-admin-menu.component';
import { StoricoAccessiAdminComponent } from './users/admin/storico-accessi-admin/storico-accessi-admin.component';
import { RegistrazioneAdminComponent } from './users/admin/registrazione-admin/registrazione-admin.component';
import { OrdineAdminComponent } from './users/admin/ordine-admin/ordine-admin.component';
import { UserAdminComponent } from './users/admin/user-admin/user-admin.component';
import { DeleteUserDialogComponent } from './dialog/delete-user-dialog/delete-user-dialog.component';
import { EditClientDialogComponent } from './dialog/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from './dialog/edit-user-dialog/edit-user-dialog.component';
import { EditOrderDialogComponent } from './dialog/edit-order-dialog/edit-order-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChooseMansionDialogComponent } from './dialog/choose-mansion-dialog/choose-mansion-dialog.component';
import { ChangePasswordDialogComponent } from './dialog/change-password-dialog/change-password-dialog.component';

import { ScannerQrComponent } from './scanner-qr/scanner-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonComponentsComponent } from './common-components/common-components.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    HomeAdminComponent,
    HomeInternoComponent,
    HomeEsternoComponent,
    OrdineEsternoComponent,
    RegistrazioneEsternoComponent,
    PageNotFoundComponent,
    ChangeMansionDialogComponent,
    ViewOrdineEsternoComponent,
    ViewRegistrazioneEsternoComponent,
    DeleteClientDialogComponent,
    DeleteOrderDialogComponent,
    OrdineInternoComponent,
    RegistrazioneInternoComponent,
    LoginComponent,
    SidebarMenuComponent,
    SidebarAdminMenuComponent,
    StoricoAccessiAdminComponent,
    RegistrazioneAdminComponent,
    OrdineAdminComponent,
    UserAdminComponent,
    DeleteUserDialogComponent,
    EditClientDialogComponent,
    EditUserDialogComponent,
    EditOrderDialogComponent,
    ChooseMansionDialogComponent,
    ChangePasswordDialogComponent,
    ScannerQrComponent,
    CommonComponentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
