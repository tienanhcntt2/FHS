import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuminityComponent } from './huminity.component';

describe('HuminityComponent', () => {
  let component: HuminityComponent;
  let fixture: ComponentFixture<HuminityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuminityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuminityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
