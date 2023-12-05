export interface IMenuItem {
  buttonName: string;
  route: string;
  innerRoutes?: IMenuItem[];
}
