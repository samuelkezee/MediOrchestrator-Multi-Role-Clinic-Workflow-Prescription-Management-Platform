import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesMaster } from './medicines-master';

describe('MedicinesMaster', () => {
  let component: MedicinesMaster;
  let fixture: ComponentFixture<MedicinesMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinesMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicinesMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
