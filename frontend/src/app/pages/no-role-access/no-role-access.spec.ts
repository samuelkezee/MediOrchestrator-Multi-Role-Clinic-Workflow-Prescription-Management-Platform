import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRoleAccess } from './no-role-access';

describe('NoRoleAccess', () => {
  let component: NoRoleAccess;
  let fixture: ComponentFixture<NoRoleAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRoleAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(NoRoleAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
