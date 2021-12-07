import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInternoComponent } from './home-interno.component';

describe('HomeInternoComponent', () => {
  let component: HomeInternoComponent;
  let fixture: ComponentFixture<HomeInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
