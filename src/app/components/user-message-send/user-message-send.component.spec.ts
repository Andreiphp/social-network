import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessageSendComponent } from './user-message-send.component';

describe('UserMessageSendComponent', () => {
  let component: UserMessageSendComponent;
  let fixture: ComponentFixture<UserMessageSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMessageSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessageSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
