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
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WaterModule } from './water/water.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RootPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    WaterModule,
    SharedModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [GrainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
