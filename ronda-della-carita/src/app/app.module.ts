import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/service/auth.interceptor';

import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { HomeEsternoComponent } from './home-esterno/home-esterno.component';
import { SidebarMenuComponent } from './utils/sidebar-menu/sidebar-menu.component';

import { RegistrationComponent } from './create/registration/registration.component';
import { CreateClientComponent } from './create/create-client/create-client.component';
import { CreateOrderComponent } from './create/create-order/create-order.component';

import { StoricoAccessiComponent } from './utils/storico-accessi/storico-accessi.component';

import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';

import { ChangePasswordDialogComponent } from './dialog/change-password-dialog/change-password-dialog.component';
import { DeleteClientDialogComponent } from './dialog/client/delete-client-dialog/delete-client-dialog.component';
import { DeleteOrderDialogComponent } from './dialog/order/delete-order-dialog/delete-order-dialog.component';
import { DeleteUserDialogComponent } from './dialog/user/delete-user-dialog/delete-user-dialog.component';
import { EditClientDialogComponent } from './dialog/client/edit-client-dialog/edit-client-dialog.component';
import { EditUserDialogComponent } from './dialog/user/edit-user-dialog/edit-user-dialog.component';
import { EditOrderDialogComponent } from './dialog/order/edit-order-dialog/edit-order-dialog.component';
import { ViewOrderNotificationDialogComponent } from './dialog/view-order-notification-dialog/view-order-notification-dialog.component';
import { ConfirmOrderDialogComponent } from './dialog/order/confirm-order-dialog/confirm-order-dialog.component';
import { ChangeMansionDialogComponent } from './dialog/change-mansion-dialog/change-mansion-dialog.component';
import { InvalidClientDataDialogComponent } from './dialog/invalid-client-data-dialog/invalid-client-data-dialog.component';

import { ScannerQrComponent } from './utils/scanner-qr/scanner-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmDialogComponent } from './dialog/confirm/confirm-dialog/confirm-dialog.component';
import { UpdateClothesStatusComponent } from './dialog/order/update-clothes-status/update-clothes-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeEsternoComponent,
    PageNotFoundComponent,
    DeleteClientDialogComponent,
    DeleteOrderDialogComponent,
    LoginComponent,
    SidebarMenuComponent,
    DeleteUserDialogComponent,
    EditClientDialogComponent,
    EditUserDialogComponent,
    EditOrderDialogComponent,
    ChangePasswordDialogComponent,
    ScannerQrComponent,
    ViewOrderNotificationDialogComponent,
    HomeComponent,
    StoricoAccessiComponent,
    CreateClientComponent,
    CreateOrderComponent,
    RegistrationComponent,
    ConfirmOrderDialogComponent,
    ChangeMansionDialogComponent,
    InvalidClientDataDialogComponent,
    ConfirmDialogComponent,
    UpdateClothesStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
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
    MatBadgeModule,
    MatBottomSheetModule,
    MatTooltipModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
