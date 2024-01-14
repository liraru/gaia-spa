import { SECRETS } from 'private/secrets.constant';
import * as CryptoJS from 'crypto-js';

export class StringHelper {
  static ParseStringDate(str: string): string | undefined {
    if (str.length > 0) {
      if (str.indexOf(`/`) >= 0) {
        return `${str.substring(6, 10)}-${str.substring(3, 5)}-${str.substring(0, 2)}`;
      } else if (str.indexOf(`-`)) {
        return `${str.substring(0, 2)}-${str.substring(3, 5)}-${str.substring(6, 10)}`;
      }
    }
    return undefined;
  }

  static Encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password.trim(), SECRETS.ENCRYPT_KEY).toString();
  }
}
