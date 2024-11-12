import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprojectsComponent } from './showprojects.component';

describe('ShowprojectsComponent', () => {
  let component: ShowprojectsComponent;
  let fixture: ComponentFixture<ShowprojectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowprojectsComponent]
    });
    fixture = TestBed.createComponent(ShowprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
