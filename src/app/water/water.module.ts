import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterRoutingModule } from './water-routing.module';
import { WaterComponent } from './components/water.component';
import { WaterReportComponent } from './components/water-report/water-report.component';
import { GrainBillComponent } from './components/grain-bill/grain-bill.component';
import { WaterAdjustmentComponent } from './components/water-adjustment/water-adjustment.component';
import { AdjustmentSummaryComponent } from './components/adjustment-summary/adjustment-summary.component';
import { MashPhComponent } from './components/mash-ph/mash-ph.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StepperComponent } from './components/stepper/components/stepper.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WaterRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [
    WaterComponent,
    WaterReportComponent,
    GrainBillComponent,
    WaterAdjustmentComponent,
    AdjustmentSummaryComponent,
    StepperComponent,
    MashPhComponent
  ]
})
export class WaterModule { }
