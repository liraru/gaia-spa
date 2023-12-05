import { IMenuItem } from '../interfaces/menu-item.interface';
import { IMAGE_ROUTES } from './image-routes.constant';
import { APP_ROUTES } from './routes.constant';

export const OWN_ROUTES: IMenuItem[] = [
  {
    buttonName: `Dashboard`,
    route: APP_ROUTES.DASHBOARD
  },
  {
    buttonName: `Administración`,
    route: APP_ROUTES.MANAGEMENT,
    icon: IMAGE_ROUTES.MANAGEMENT_LOGO
  },
  {
    buttonName: `Cibeles`,
    route: APP_ROUTES.CIBELES,
    icon: IMAGE_ROUTES.CIBELES_LOGO
  },
  {
    buttonName: `Minerva`,
    route: APP_ROUTES.MINERVA,
    icon: IMAGE_ROUTES.MINERVA_LOGO,
    innerRoutes: [
      {
        buttonName: `Libros`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.BOOKS}`
      },
      {
        buttonName: `Autores`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.AUTHORS}`
      },
      {
        buttonName: `Sagas`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.SAGAS}`
      },
      {
        buttonName: `Géneros`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.GENRES}`
      }
    ]
  }
];
