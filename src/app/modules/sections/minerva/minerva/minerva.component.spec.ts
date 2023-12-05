import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinervaComponent } from './minerva.component';

describe('MinervaComponent', () => {
  let component: MinervaComponent;
  let fixture: ComponentFixture<MinervaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinervaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinervaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
