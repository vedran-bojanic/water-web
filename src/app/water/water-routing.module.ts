import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterReportComponent } from './components/water-report/water-report.component';
import { GrainBillComponent } from './components/grain-bill/grain-bill.component';
import { WaterAdjustmentComponent } from './components/water-adjustment/water-adjustment.component';
import { AdjustmentSummaryComponent } from './components/adjustment-summary/adjustment-summary.component';
import { WaterComponent } from './components/water.component';
import { StepDetails } from '../shared/models/StepDetails';
import { AuthGuardService } from '../authentication/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'water',
    component: WaterComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'water-report',
        component: WaterReportComponent,
        data: {
          stepDetails: {
            name: 'Water Report',
            stepperPercentage: 25
          } as StepDetails
        }
      },
      {
        path: 'grain-bill',
        component: GrainBillComponent,
        data: {
          stepDetails: {
            name: 'Grain Bill',
            stepperPercentage: 50
          } as StepDetails
        }
      },
      {
        path: 'water-adjustment',
        component: WaterAdjustmentComponent,
        data: {
          stepDetails: {
            name: 'Water Adjustment',
            stepperPercentage: 75
          } as StepDetails
        }
      },
      {
        path: 'adjustment-summary',
        component: AdjustmentSummaryComponent,
        data: {
          stepDetails: {
            name: 'Summary',
            stepperPercentage: 100
          } as StepDetails
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterRoutingModule { }
