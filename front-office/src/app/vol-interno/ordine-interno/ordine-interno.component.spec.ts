import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineInternoComponent } from './ordine-interno.component';

describe('OrdineInternoComponent', () => {
  let component: OrdineInternoComponent;
  let fixture: ComponentFixture<OrdineInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdineInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
