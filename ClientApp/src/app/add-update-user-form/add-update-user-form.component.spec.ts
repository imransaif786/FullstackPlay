import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateUserFormComponent } from './add-update-user-form.component';

describe('AddUpdateUserFormComponent', () => {
  let component: AddUpdateUserFormComponent;
  let fixture: ComponentFixture<AddUpdateUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
