import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuAdaptComponent } from './user-menu-adapt.component';

describe('UserMenuAdaptComponent', () => {
  let component: UserMenuAdaptComponent;
  let fixture: ComponentFixture<UserMenuAdaptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuAdaptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuAdaptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
