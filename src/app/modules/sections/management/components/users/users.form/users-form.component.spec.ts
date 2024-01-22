import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCrudModalComponent } from './users-crud-modal.component';

describe('UsersCrudModalComponent', () => {
  let component: UsersCrudModalComponent;
  let fixture: ComponentFixture<UsersCrudModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersCrudModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersCrudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
