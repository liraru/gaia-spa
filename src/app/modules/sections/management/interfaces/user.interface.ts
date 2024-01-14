export interface IUser {
  uuid?: string;
  username?: string;
  name: string;
  lastname: string;
  fullname?: string;
  birthdate: string;
  height: number;
  password?: string;
  applications?: string[];
}
