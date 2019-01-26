import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrainBillComponent } from './grain-bill.component';

describe('GrainBillComponent', () => {
  let component: GrainBillComponent;
  let fixture: ComponentFixture<GrainBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrainBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
