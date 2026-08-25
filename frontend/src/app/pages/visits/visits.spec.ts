import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visits } from './visits';

describe('Visits', () => {
  let component: Visits;
  let fixture: ComponentFixture<Visits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Visits],
    }).compileComponents();

    fixture = TestBed.createComponent(Visits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
