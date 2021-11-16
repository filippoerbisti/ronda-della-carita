import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineAdminComponent } from './ordine-admin.component';

describe('OrdineAdminComponent', () => {
  let component: OrdineAdminComponent;
  let fixture: ComponentFixture<OrdineAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdineAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
