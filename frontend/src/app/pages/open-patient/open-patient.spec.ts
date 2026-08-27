import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPatient } from './open-patient';

describe('OpenPatient', () => {
  let component: OpenPatient;
  let fixture: ComponentFixture<OpenPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenPatient],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
