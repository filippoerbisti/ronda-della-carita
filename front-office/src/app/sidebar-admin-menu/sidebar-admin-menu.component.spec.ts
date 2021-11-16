import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminMenuComponent } from './sidebar-admin-menu.component';

describe('SidebarAdminMenuComponent', () => {
  let component: SidebarAdminMenuComponent;
  let fixture: ComponentFixture<SidebarAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAdminMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
