import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClothesStatusComponent } from './update-clothes-status.component';

describe('UpdateClothesStatusComponent', () => {
  let component: UpdateClothesStatusComponent;
  let fixture: ComponentFixture<UpdateClothesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClothesStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClothesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
