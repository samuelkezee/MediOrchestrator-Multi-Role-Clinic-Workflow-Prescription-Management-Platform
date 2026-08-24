import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPatient } from './register-patient';

describe('RegisterPatient', () => {
  let component: RegisterPatient;
  let fixture: ComponentFixture<RegisterPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPatient],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
