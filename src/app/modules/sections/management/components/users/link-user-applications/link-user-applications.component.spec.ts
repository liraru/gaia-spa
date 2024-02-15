import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUserApplicationsComponent } from './link-user-applications.component';

describe('LinkUserApplicationsComponent', () => {
  let component: LinkUserApplicationsComponent;
  let fixture: ComponentFixture<LinkUserApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkUserApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkUserApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
