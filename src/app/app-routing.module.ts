import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WaterReportComponent } from './water/components/water-report/water-report.component';
import { RootPageComponent } from './root-page/components/root-page.component';
import { GrainBillComponent } from './water/components/grain-bill/grain-bill.component';
import { WaterAdjustmentComponent } from './water/components/water-adjustment/water-adjustment.component';
import { AdjustmentSummaryComponent } from './water/components/adjustment-summary/adjustment-summary.component';

const routes: Routes = [
  { path: '', component: RootPageComponent, pathMatch: 'full' },
  { path: 'water-report', component: WaterReportComponent, data: { showStepper: true } },
  { path: 'grain-bill', component: GrainBillComponent, data: { showStepper: true } },
  { path: 'water-adjustment', component: WaterAdjustmentComponent, data: { showStepper: true } },
  { path: 'adjustment-summary', component: AdjustmentSummaryComponent, data: { showStepper: true } },
  { path: '**', component: RootPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
