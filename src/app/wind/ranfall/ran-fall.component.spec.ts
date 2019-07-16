import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RanFallComponent } from './ran-fall.component';

describe('RanFallComponent', () => {
  let component: RanFallComponent;
  let fixture: ComponentFixture<RanFallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RanFallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RanFallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
