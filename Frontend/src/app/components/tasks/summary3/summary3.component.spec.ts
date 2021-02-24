import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Summary3Component } from './summary3.component';

describe('SummaryComponent', () => {
  let component: Summary3Component;
  let fixture: ComponentFixture<Summary3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Summary3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Summary3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
