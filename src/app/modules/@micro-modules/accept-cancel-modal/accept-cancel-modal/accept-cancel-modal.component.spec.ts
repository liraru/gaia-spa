import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptCancelModalComponent } from 'app/modules/@micro-modules/accept-cancel-modal/accept-cancel-modal/accept-cancel-modal.component';

describe('NotifierModalComponent', () => {
  let component: AcceptCancelModalComponent;
  let fixture: ComponentFixture<AcceptCancelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptCancelModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptCancelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
