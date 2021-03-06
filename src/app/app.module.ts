import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/components/navbar/navbar.component';
import { FooterComponent } from './footer/components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/components/page-not-found.component';
import { RootPageComponent } from './root-page/components/root-page.component';
import { GrainService } from 'app/water/services/grain.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WaterModule } from './water/water.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { WaterState } from './state/water.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { LoginComponent } from './authentication/components/login/login.component';
import { AuthHttpInterceptorService } from './authentication/services/auth-http-interceptor.service';
import { RegisterComponent } from './authentication/components/register/register.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    WaterModule,
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgSelectModule,
    NgxsModule.forRoot([
        WaterState
      ],
      { developmentMode: !environment.production }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RootPageComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    GrainService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
