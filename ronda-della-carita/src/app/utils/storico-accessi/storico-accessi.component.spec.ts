import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoAccessiComponent } from './storico-accessi.component';

describe('StoricoAccessiComponent', () => {
  let component: StoricoAccessiComponent;
  let fixture: ComponentFixture<StoricoAccessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoAccessiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoAccessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
