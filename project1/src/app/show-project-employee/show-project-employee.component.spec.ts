import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectEmployeeComponent } from './show-project-employee.component';

describe('ShowProjectEmployeeComponent', () => {
  let component: ShowProjectEmployeeComponent;
  let fixture: ComponentFixture<ShowProjectEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProjectEmployeeComponent]
    });
    fixture = TestBed.createComponent(ShowProjectEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
