import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegistrazioneEsternoComponent } from './view-registrazione-esterno.component';

describe('ViewRegistrazioneEsternoComponent', () => {
  let component: ViewRegistrazioneEsternoComponent;
  let fixture: ComponentFixture<ViewRegistrazioneEsternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegistrazioneEsternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegistrazioneEsternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
