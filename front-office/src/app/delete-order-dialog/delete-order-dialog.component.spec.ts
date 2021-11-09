import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderDialogComponent } from './delete-order-dialog.component';

describe('DeleteOrderDialogComponent', () => {
  let component: DeleteOrderDialogComponent;
  let fixture: ComponentFixture<DeleteOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
