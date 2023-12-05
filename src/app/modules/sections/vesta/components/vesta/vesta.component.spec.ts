import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestaComponent } from './vesta.component';

describe('VestaComponent', () => {
  let component: VestaComponent;
  let fixture: ComponentFixture<VestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
