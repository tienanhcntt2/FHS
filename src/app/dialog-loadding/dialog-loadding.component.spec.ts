import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoaddingComponent } from './dialog-loadding.component';

describe('DialogLoaddingComponent', () => {
  let component: DialogLoaddingComponent;
  let fixture: ComponentFixture<DialogLoaddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLoaddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
