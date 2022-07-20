import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SugarlevelListComponent } from './sugarlevel-list/sugarlevel-list.component';
import SugarLevelService from './shared/api/sugar-level.service';
import { MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { SugarLevelEditComponent } from './sugarlevel-edit/sugarlevel-edit.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReactiveFormsModule } from '@angular/forms';
const config = {
  issuer: 'https://trial-5329408.okta.com/oauth2/default',
  clientId: '0oa1jtf4kzwmYNIjR697',
  redirectUri: window.location.origin + '/login/callback'
}
const oktaAuth = new OktaAuth(config);

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SugarlevelListComponent,
    SugarLevelEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [  { 
    provide: OKTA_CONFIG, 
    useFactory: () => {
      const oktaAuth = new OktaAuth(config);
      return {
        oktaAuth,
        onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
          const triggerLogin = async () => {
            await oktaAuth.signInWithRedirect();
          };
          if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
            // App initialization stage
            triggerLogin();
          } else {
           // triggerLogin();
          }
        }  
      }
    }
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  SugarLevelService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
