import { Component } from '@angular/core';
import { IMAGE_ROUTES } from '../../../../../constants/image-routes.constant';
import { APP_ROUTES } from '../../../../../constants/routes.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public icon: string = IMAGE_ROUTES.GAIA_LOGO;
  public link: string = APP_ROUTES.DASHBOARD;
}
