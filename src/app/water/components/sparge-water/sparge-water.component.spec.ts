import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpargeWaterComponent } from './sparge-water.component';

describe('SpargeWaterComponent', () => {
  let component: SpargeWaterComponent;
  let fixture: ComponentFixture<SpargeWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpargeWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpargeWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
