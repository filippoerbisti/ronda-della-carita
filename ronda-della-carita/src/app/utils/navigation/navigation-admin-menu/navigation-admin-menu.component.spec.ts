import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAdminMenuComponent } from './navigation-admin-menu.component';

describe('NavigationAdminMenuComponent', () => {
  let component: NavigationAdminMenuComponent;
  let fixture: ComponentFixture<NavigationAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationAdminMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
