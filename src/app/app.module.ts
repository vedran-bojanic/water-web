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
import { WaterState } from './actions/water.actions';
import { WaterReportState } from './water/components/water-report/states/water-report.action';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { WaterAdjustmentState } from './water/components/water-adjustment/states/water-adjustment.actions';
import { GrainBillState } from './water/components/grain-bill/states/grain-bill.action';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    WaterModule,
    SharedModule,
    NgbModule.forRoot(),
    NgSelectModule,
    NgxsModule.forRoot([
        WaterState,
        WaterReportState,
        WaterAdjustmentState,
        GrainBillState
      ],
      { developmentMode: !environment.production }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RootPageComponent,
    PageNotFoundComponent
  ],
  providers: [GrainService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
