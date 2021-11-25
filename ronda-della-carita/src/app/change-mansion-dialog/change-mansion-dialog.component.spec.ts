import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMansionDialogComponent } from './change-mansion-dialog.component';

describe('ChangeMansionDialogComponent', () => {
  let component: ChangeMansionDialogComponent;
  let fixture: ComponentFixture<ChangeMansionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMansionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMansionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
