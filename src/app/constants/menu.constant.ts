import { IMAGE_ROUTES } from 'app/constants/image-routes.constant';
import { APP_ROUTES } from 'app/constants/routes.constant';
import { IMenuItem } from 'app/interfaces/menu-item.interface';

export const MENU: IMenuItem[] = [
  {
    code: `DASHBOARD`,
    buttonName: `Dashboard`,
    route: APP_ROUTES.DASHBOARD
  },
  {
    code: `CIBELES`,
    buttonName: `Cibeles`,
    route: APP_ROUTES.CIBELES,
    icon: IMAGE_ROUTES.CIBELES_LOGO
  },
  {
    code: `MINERVA`,
    buttonName: `Minerva`,
    route: APP_ROUTES.MINERVA,
    icon: IMAGE_ROUTES.MINERVA_LOGO,
    innerRoutes: [
      {
        code: `MINERVA_BOOKS`,
        buttonName: `Libros`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.BOOKS}`
      },
      {
        code: `MINERVA_AUTHORS`,
        buttonName: `Autores`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.AUTHORS}`
      },
      {
        code: `MINERVA_SAGAS`,
        buttonName: `Sagas`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.SAGAS}`
      },
      {
        code: `MINERVA_GENRES`,
        buttonName: `Géneros`,
        route: `${APP_ROUTES.MINERVA}/${APP_ROUTES.GENRES}`
      }
    ]
  },
  {
    code: `VESTA`,
    buttonName: `Vesta`,
    route: APP_ROUTES.VESTA,
    icon: IMAGE_ROUTES.VESTA_LOGO
  },
  {
    code: `MAINTENANCE`,
    buttonName: `Administración`,
    route: APP_ROUTES.MANAGEMENT,
    icon: IMAGE_ROUTES.MANAGEMENT_LOGO
  }
];
