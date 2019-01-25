import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WaterComponent } from './water/components/water.component';
import { PageNotFoundComponent } from './page-not-found/components/page-not-found.component';
import { RootPageComponent } from './root-page/components/root-page.component';

const routes: Routes = [
  { path: '', component: RootPageComponent},
  { path: 'water', component: WaterComponent},
  { path: '*', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
