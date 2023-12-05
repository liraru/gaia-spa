import { IMenuItem } from '../interfaces/menu-item.interface';
import { APP_ROUTES } from './routes.constant';

export const OWN_ROUTES: IMenuItem[] = [
  {
    buttonName: `Dashboard`,
    route: APP_ROUTES.DASHBOARD
  },
  {
    buttonName: `Administración`,
    route: APP_ROUTES.MANAGEMENT
  },
  {
    buttonName: `Cibeles`,
    route: APP_ROUTES.CIBELES
  },
  {
    buttonName: `Minerva`,
    route: APP_ROUTES.MINERVA,
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
