import { Component } from '@angular/core';
import { RRSS } from 'app/constants/rrss.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public footer = RRSS;
}
