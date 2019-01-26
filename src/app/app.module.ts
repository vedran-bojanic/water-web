import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/components/navbar/navbar.component';
import { FooterComponent } from './footer/components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/components/page-not-found.component';
import { RootPageComponent } from './root-page/components/root-page.component';
import { SpargeWaterComponent } from './water/components/sparge-water/sparge-water.component';
import { GrainBillComponent } from './water/components/grain-bill/grain-bill.component';
import { WaterAdjustmentComponent } from './water/components/water-adjustment/water-adjustment.component';
import { AdjustmentSummaryComponent } from './water/components/adjustment-summary/adjustment-summary.component';
import { WaterReportComponent } from './water/components/water-report/water-report.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WaterReportComponent,
    PageNotFoundComponent,
    RootPageComponent,
    SpargeWaterComponent,
    GrainBillComponent,
    WaterAdjustmentComponent,
    AdjustmentSummaryComponent
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
