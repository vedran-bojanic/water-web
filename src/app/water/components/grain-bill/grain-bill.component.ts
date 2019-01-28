import { Component, OnInit } from '@angular/core';
import { GrainService } from '../../services/grain.service';
import { Grain } from '../../models/grain';

@Component({
  selector: 'app-grain-bill',
  templateUrl: './grain-bill.component.html'
})
export class GrainBillComponent implements OnInit {
  grains: Array<Grain>;

  constructor(private grainService: GrainService) { }

  ngOnInit() {
    this.grains = this.grainService.getGrains();
  }

}
