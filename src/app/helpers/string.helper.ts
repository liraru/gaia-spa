export class StringHelper {
  static parseDBDate(str: string) {
    return `${str.substring(8, 10)}/${str.substring(5, 7)}/${str.substring(0, 4)}`
  }
}

