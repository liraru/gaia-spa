import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibelesComponent } from './cibeles.component';

describe('CibelesComponent', () => {
  let component: CibelesComponent;
  let fixture: ComponentFixture<CibelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CibelesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CibelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
