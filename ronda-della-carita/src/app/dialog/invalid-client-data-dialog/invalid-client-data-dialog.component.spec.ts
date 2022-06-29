import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidClientDataDialogComponent } from './invalid-client-data-dialog.component';

describe('InvalidClientDataDialogComponent', () => {
  let component: InvalidClientDataDialogComponent;
  let fixture: ComponentFixture<InvalidClientDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidClientDataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidClientDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
