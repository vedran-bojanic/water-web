import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiplyElementPipe } from './pipes/multiply-element.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MultiplyElementPipe ],
  exports: [ MultiplyElementPipe ],
})
export class SharedModule { }
