import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineEsternoComponent } from './ordine-esterno.component';

describe('OrdineEsternoComponent', () => {
  let component: OrdineEsternoComponent;
  let fixture: ComponentFixture<OrdineEsternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdineEsternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineEsternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
