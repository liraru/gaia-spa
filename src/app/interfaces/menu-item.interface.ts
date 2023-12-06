export interface IMenuItem {
  code: string;
  buttonName: string;
  route: string;
  icon?: string;
  innerRoutes?: IMenuItem[];
}
