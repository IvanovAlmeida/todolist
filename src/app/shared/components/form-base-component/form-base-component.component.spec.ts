import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBaseComponentComponent } from './form-base-component.component';

describe('FormBaseComponentComponent', () => {
  let component: FormBaseComponentComponent;
  let fixture: ComponentFixture<FormBaseComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBaseComponentComponent]
    });
    fixture = TestBed.createComponent(FormBaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
