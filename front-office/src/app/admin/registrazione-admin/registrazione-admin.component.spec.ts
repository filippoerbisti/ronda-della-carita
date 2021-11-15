import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneAdminComponent } from './registrazione-admin.component';

describe('RegistrazioneAdminComponent', () => {
  let component: RegistrazioneAdminComponent;
  let fixture: ComponentFixture<RegistrazioneAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrazioneAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrazioneAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
