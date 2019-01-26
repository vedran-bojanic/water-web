import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WaterReportComponent } from './water/components/water-report/water-report.component';
import { PageNotFoundComponent } from './page-not-found/components/page-not-found.component';
import { RootPageComponent } from './root-page/components/root-page.component';
import { SpargeWaterComponent } from './water/components/sparge-water/sparge-water.component';
import { GrainBillComponent } from './water/components/grain-bill/grain-bill.component';
import { WaterAdjustmentComponent } from './water/components/water-adjustment/water-adjustment.component';
import { AdjustmentSummaryComponent } from './water/components/adjustment-summary/adjustment-summary.component';

const routes: Routes = [
  { path: '', component: RootPageComponent, pathMatch: 'full' },
  { path: 'water-report', component: WaterReportComponent },
  { path: 'sparge-water', component: SpargeWaterComponent },
  { path: 'grain-bill', component: GrainBillComponent },
  { path: 'water-adjustment', component: WaterAdjustmentComponent },
  { path: 'adjustment-summary', component: AdjustmentSummaryComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
