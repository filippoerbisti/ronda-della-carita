import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderNotificationDialogComponent } from './view-order-notification-dialog.component';

describe('ViewOrderNotificationDialogComponent', () => {
  let component: ViewOrderNotificationDialogComponent;
  let fixture: ComponentFixture<ViewOrderNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderNotificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
