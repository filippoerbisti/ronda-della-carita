import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserComponent } from './confirm-user.component';

describe('ConfirmUserComponent', () => {
  let component: ConfirmUserComponent;
  let fixture: ComponentFixture<ConfirmUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
