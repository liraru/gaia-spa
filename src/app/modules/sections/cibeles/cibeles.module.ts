import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinervaComponent } from './components/minerva/minerva.component';
import { CibelesComponent } from './components/cibeles/cibeles.component';



@NgModule({
  declarations: [
    MinervaComponent,
    CibelesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CibelesModule { }
