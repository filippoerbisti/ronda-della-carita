import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoAccessiAdminComponent } from './storico-accessi-admin.component';

describe('StoricoAccessiAdminComponent', () => {
  let component: StoricoAccessiAdminComponent;
  let fixture: ComponentFixture<StoricoAccessiAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoAccessiAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoAccessiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
