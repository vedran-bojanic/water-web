import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MashPhComponent } from './mash-ph.component';

describe('MashPhComponent', () => {
  let component: MashPhComponent;
  let fixture: ComponentFixture<MashPhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MashPhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MashPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
