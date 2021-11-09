import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEsternoComponent } from './home-esterno.component';

describe('HomeEsternoComponent', () => {
  let component: HomeEsternoComponent;
  let fixture: ComponentFixture<HomeEsternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEsternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEsternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
