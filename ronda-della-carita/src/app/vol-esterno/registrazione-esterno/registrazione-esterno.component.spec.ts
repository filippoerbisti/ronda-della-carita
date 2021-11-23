import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneEsternoComponent } from './registrazione-esterno.component';

describe('RegistrazioneEsternoComponent', () => {
  let component: RegistrazioneEsternoComponent;
  let fixture: ComponentFixture<RegistrazioneEsternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrazioneEsternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrazioneEsternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
