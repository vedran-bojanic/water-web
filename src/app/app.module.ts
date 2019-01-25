import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/components/navbar/navbar.component';
import { FooterComponent } from './footer/components/footer/footer.component';
import { WaterComponent } from './water/components/water.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/components/page-not-found.component';
import { RootPageComponent } from './root-page/components/root-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WaterComponent,
    PageNotFoundComponent,
    RootPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
