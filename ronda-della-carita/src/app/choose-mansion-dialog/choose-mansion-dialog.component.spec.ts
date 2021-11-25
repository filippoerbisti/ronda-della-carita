import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMansionDialogComponent } from './choose-mansion-dialog.component';

describe('ChooseMansionDialogComponent', () => {
  let component: ChooseMansionDialogComponent;
  let fixture: ComponentFixture<ChooseMansionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMansionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMansionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
