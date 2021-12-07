import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdineEsternoComponent } from './view-ordine-esterno.component';

describe('ViewOrdineEsternoComponent', () => {
  let component: ViewOrdineEsternoComponent;
  let fixture: ComponentFixture<ViewOrdineEsternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrdineEsternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdineEsternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
