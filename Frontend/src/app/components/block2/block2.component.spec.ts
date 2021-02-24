import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Block2Component } from './block2.component';

describe('Block1Component', () => {
  let component: Block2Component;
  let fixture: ComponentFixture<Block2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Block2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Block2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
