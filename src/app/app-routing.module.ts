import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RootPageComponent } from './root-page/components/root-page.component';
import { WaterComponent } from './water/components/water.component';

const routes: Routes = [
  { path: '', component: RootPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
