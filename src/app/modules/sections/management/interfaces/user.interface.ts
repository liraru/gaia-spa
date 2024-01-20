export interface IUser {
  uuid?: string;
  username?: string;
  name: string;
  lastname: string;
  fullname?: string;
  birthdate: string;
  genre: 'M' | 'F';
  height: number;
  password?: string;
  applications?: string[];
}
