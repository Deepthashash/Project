import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Summary2Component } from './summary2.component';

describe('SummaryComponent', () => {
  let component: Summary2Component;
  let fixture: ComponentFixture<Summary2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Summary2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Summary2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
