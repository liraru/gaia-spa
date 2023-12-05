import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [CommonModule, LandingRoutingModule],
  declarations: [LandingComponent]
})
export class LandingModule {}
