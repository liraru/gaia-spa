import { IUser } from 'app/modules/sections/management/interfaces/user.interface';

export interface IApplication {
  uuid: string;
  code: string;
  key?: string;
  description?: string;
  name?: string;
  route?: string;
  image: string;
  parentApplication?: string;
  users?: IUser[];
  usersCount?: number;
}
