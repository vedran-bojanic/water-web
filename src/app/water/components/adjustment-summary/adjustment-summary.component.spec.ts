import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentSummaryComponent } from './adjustment-summary.component';

describe('AdjustmentSummaryComponent', () => {
  let component: AdjustmentSummaryComponent;
  let fixture: ComponentFixture<AdjustmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
