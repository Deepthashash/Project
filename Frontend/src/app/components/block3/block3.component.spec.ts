import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Block3Component } from './block3.component';

describe('Block1Component', () => {
  let component: Block3Component;
  let fixture: ComponentFixture<Block3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Block3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Block3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
