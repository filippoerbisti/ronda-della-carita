import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerQrComponent } from './scanner-qr.component';

describe('ScannerQrComponent', () => {
  let component: ScannerQrComponent;
  let fixture: ComponentFixture<ScannerQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
