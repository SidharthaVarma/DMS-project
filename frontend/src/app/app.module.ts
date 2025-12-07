import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DocumentsComponent } from './pages/documents/documents.component';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { VersionDialogComponent } from './pages/documents/version-dialog/version-dialog.component';
import { PermissionsDialogComponent } from './pages/documents/permissions-dialog/permissions-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DocumentsComponent,
    VersionDialogComponent,
    PermissionsDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    // Material UI
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
    MatRippleModule,

    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '908595274538-dn3a6kkpukora9iti9nm40i2rkcddgfp.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
