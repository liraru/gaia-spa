import { SECRETS } from 'private/secrets.constant';
import * as CryptoJS from 'crypto-js';

export class StringHelper {
  static parseDBDate(str: string) {
    return `${str.substring(8, 10)}/${str.substring(5, 7)}/${str.substring(0, 4)}`;
  }

  static parseDBStringDate(str: string) {
    return `${str.substring(8, 10)}/${str.substring(5, 7)}/${str.substring(0, 4)}`;
  }

  static parseDateToDB(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}/${date.getDate()}`;
  }

  static encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password.trim(), SECRETS.ENCRYPT_KEY).toString();
  }
}
