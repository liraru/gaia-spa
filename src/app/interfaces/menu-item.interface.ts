export interface IMenuItem {
  buttonName: string;
  route: string;
  icon?: string;
  innerRoutes?: IMenuItem[];
}
