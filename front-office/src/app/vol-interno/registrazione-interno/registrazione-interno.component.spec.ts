import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneInternoComponent } from './registrazione-interno.component';

describe('RegistrazioneInternoComponent', () => {
  let component: RegistrazioneInternoComponent;
  let fixture: ComponentFixture<RegistrazioneInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrazioneInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrazioneInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
