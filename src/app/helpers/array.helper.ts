import { Sort } from '@angular/material/sort';

export class ArrayHelper {
  private static _sort(a?: number | string, b?: number | string, isAsc: boolean = true) {
    if (!a || !b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  static Sort(sort: Sort, data: any[]) {
    if (sort?.active && sort?.direction && data) {
      return data.sort((a, b) => {
        const dataA = typeof a[sort.active] === `string` ? a[sort.active].trim().toLowerCase() : a;
        const dataB = typeof b[sort.active] === `string` ? b[sort.active].trim().toLowerCase() : b;
        return this._sort(dataA, dataB, sort.direction === `asc`);
      });
    }
    return data;
  }
}
