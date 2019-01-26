import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAdjustmentComponent } from './water-adjustment.component';

describe('WaterAdjustmentComponent', () => {
  let component: WaterAdjustmentComponent;
  let fixture: ComponentFixture<WaterAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
