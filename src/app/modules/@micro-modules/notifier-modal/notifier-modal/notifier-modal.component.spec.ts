import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierModalComponent } from './notifier-modal.component';

describe('NotifierModalComponent', () => {
  let component: NotifierModalComponent;
  let fixture: ComponentFixture<NotifierModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotifierModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
